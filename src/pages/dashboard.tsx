import { menus } from "@/lib/data"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import localforage from "localforage"
import Header from "@/components/Header"
import CardPanier from "@/components/card-panier"
import CardProduit from "@/components/card-produit"
import type { Menu } from "@/types/menu"

export default function Dashboard() {
  const [panier, setPanier] = useState<{ menu: Menu }[]>([])
  const [recherche, setRecherche] = useState("")
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const produitsParPage = 9

  const menusFiltres = menus.filter((menu) =>
    menu.nom.toLowerCase().includes(recherche.toLowerCase())
  )

  const debut = (page - 1) * produitsParPage
  const fin = debut + produitsParPage
  const produitsPagines = menusFiltres.slice(debut, fin)
  const totalPages = Math.ceil(menusFiltres.length / produitsParPage)

  const ajouterAuPanier = (menu: Menu) => {
    const existe = panier.find((item) => item.menu.id === menu.id)
    if (existe) {
      setPanier(
        panier.map((item) =>
          item.menu.id === menu.id
            ? { ...item, menu: { ...item.menu, quantity: item.menu.quantity ? item.menu.quantity + 1 : 1 } }
            : item
        )
      )
    } else {
      setPanier([...panier, { menu }])
    }
  }

  const reduireQuantite = (id: number) => {
    setPanier(
      panier
        .map((item) =>
          item.menu.id === id ? { ...item, menu: { ...item.menu, quantity: item.menu.quantity ? item.menu.quantity - 1 : 0 } } : item
        )
        .filter((item) => item.menu.quantity && item.menu.quantity > 0)
    )
  }

  const validerCommande = async () => {
    await localforage.setItem("panier", panier)
    navigate("/dashboard/form-commande")
  }

  return (
    <div className="flex flex-1 overflow-hidden h-screen">
      <main className="flex-1 overflow-y-auto p-4">
        <Header onRecherche={setRecherche} />
        <h2 className="mb-4 text-2xl font-extrabold text-black">
          Special Menu
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {produitsPagines.map((menu: Menu) => (
            <CardProduit
              key={menu.id}
              menu={menu}
              ajouterAuPanier={ajouterAuPanier}
            />
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-gray-500">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </main>

      <div className="flex h-full w-72 flex-col border-l border-gray-200 bg-white">
        {panier.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-center text-xl text-gray-400">
              + <br /> Ajouter un produit
              <br />
              depuis le menu
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <span className="font-bold text-gray-800">Commande en cours</span>
              <button onClick={() => setPanier([])} className="text-black">
                <X className="h-5" />
              </button>
            </div>

            <div className="flex-1 space-y-3 p-4">
              {panier.map((item, index) => (
                <CardPanier
                  key={index}
                  item={item}
                  ajouterAuPanier={ajouterAuPanier}
                  reduireQuantite={reduireQuantite}
                />
              ))}
            </div>

            <div className="space-y-2 border-t border-gray-100 p-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>
                  {panier.reduce(
                    (total, item) => total + item?.menu?.prix * item?.menu?.quantity,
                    0
                  )}{" "}
                  FCFA
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Tax (2%)</span>
                <span>
                  {Math.round(
                    panier.reduce(
                      (total, item) => total + item?.menu?.prix * item?.menu?.quantity,
                      0
                    ) * 0.02
                  )}{" "}
                  FCFA
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Charges</span>
                <span>200 FCFA</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2 font-bold text-gray-800">
                <span>Total</span>
                <span>
                  {panier.reduce(
                    (total, item) => total + item?.menu?.prix * item?.menu?.quantity,
                    0
                  ) +
                    Math.round(
                      panier.reduce(
                        (total, item) => total + item?.menu?.prix * item?.menu?.quantity,
                        0
                      ) * 0.02
                    ) +
                    200}{" "}
                  FCFA
                </span>
              </div>
              <button
                onClick={validerCommande}
                className="mt-3 w-full rounded-xl bg-primary py-3 font-semibold text-white hover:bg-primary/80"
              >
                Valider la commande
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
