import CardPanier from "@/components/card-panier"
import { menus } from "@/lib/data"
import type { Menu } from "@/types/produits"
import {
  Bell,
  Check,
  Home,
  LayoutGrid,
  List,
  Search,
  Send,
  Settings,
  ShoppingCart,
  Star,
  User,
  X,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const [panier, setPanier] = useState<{ menu: Menu; quantite: number }[]>([])

  const ajouterAuPanier = (menu: Menu) => {
    const existe = panier.find((item) => item.menu.id === menu.id)
    if (existe) {
      setPanier(
        panier.map((item) =>
          item.menu.id === menu.id
            ? { ...item, quantite: item.quantite + 1 }
            : item
        )
      )
    } else {
      setPanier([...panier, { menu, quantite: 1 }])
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex w-20 flex-col items-center bg-white py-6">
        <div className="relative mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <ShoppingCart className="w-7 text-white" strokeWidth={3} />
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white">
            <Check className="h-4 text-primary" strokeWidth={4} />
          </span>
        </div>

        {/* Nav icons */}
        <nav className="flex flex-col items-center gap-10">
          <Link to="/dashboard" className="text-primary">
            <Home className="h-6 w-6" />
          </Link>
          <Link
            to="/dashboard/categories"
            className="text-gray-400 hover:text-primary"
          >
            <LayoutGrid className="h-6 w-6" />
          </Link>
          <Link
            to="/dashboard/commandes"
            className="text-gray-400 hover:text-primary"
          >
            <List className="h-6 w-6" />
          </Link>
          <Link
            to="/dashboard/panier"
            className="text-gray-400 hover:text-primary"
          >
            <ShoppingCart className="h-6 w-6" />
          </Link>
          <Link
            to="/dashboard/profil"
            className="text-gray-400 hover:text-primary"
          >
            <User className="h-6 w-6" />
          </Link>
          <Link
            to="/dashboard/livraisons"
            className="text-gray-400 hover:text-primary"
          >
            <Send className="h-6 w-6" />
          </Link>
          <Link
            to="/dashboard/parametres"
            className="text-gray-400 hover:text-primary"
          >
            <Settings className="h-6 w-6" />
          </Link>
        </nav>
      </div>

      <div className="flex flex-col">
        <header className="flex items-center justify-between border-b bg-white px-8 py-6">
          <span className="text-3xl font-bold">
            <span className="text-black">JAAY</span>
            <span className="text-primary">KAT</span>
          </span>

          <div className="flex items-center gap-6">
            <div className="flex w-72 items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
              <input
                type="text"
                placeholder="Recherchez un produit"
                className="flex-1 text-sm outline-none placeholder:text-gray-400"
              />
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Bell className="text-white" />
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            <h2 className="mb-6 text-2xl font-extrabold text-black">
              Special Menu
            </h2>

            <div className="grid grid-cols-3 gap-6">
              {menus.map((menu: Menu) => (
                <div key={menu.id} className="rounded-2xl bg-white p-4">
                  <img
                    src={menu.image}
                    alt={menu.nom}
                    className="h-48 w-full rounded-xl object-contain"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-800">
                      {menu.nom}
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {menu.prix} FCFA
                    </span>
                  </div>
                  <p className="text-md mt-1 text-gray-400">
                    {menu.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="text-md text-gray-500">{menu.note}</span>
                    </div>
                    <button
                      onClick={() => ajouterAuPanier(menu)}
                      className="rounded-xl bg-primary px-6 py-2 text-lg font-semibold text-white hover:bg-primary/80"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>

          <div className="flex w-96 flex-col">
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
                  <span className="font-bold text-gray-800">
                    Commande en cours
                  </span>
                  <button onClick={() => setPanier([])} className="text-black">
                    <X className="h-5" />
                  </button>
                </div>

                <div className="flex-1 space-y-3 p-4">
                  {panier.map((item) => (
                    <CardPanier 
                  item= {item} ajouterAuPanier={ajouterAuPanier} reduireQuantite={reduireQuantite} />
                  ))}
                </div>

                <div className="space-y-2 border-t border-gray-100 p-4">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>
                      {panier.reduce(
                        (total, item) => total + item.menu.prix * item.quantite,
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
                          (total, item) =>
                            total + item.menu.prix * item.quantite,
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
                        (total, item) => total + item.menu.prix * item.quantite,
                        0
                      ) +
                        Math.round(
                          panier.reduce(
                            (total, item) =>
                              total + item.menu.prix * item.quantite,
                            0
                          ) * 0.02
                        ) +
                        200}{" "}
                      FCFA
                    </span>
                  </div>
                  <button className="mt-3 w-full rounded-xl bg-primary py-3 font-semibold text-white hover:bg-primary/80">
                    Valider la commande
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
