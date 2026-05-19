import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import localforage from "localforage"
import { toast } from "sonner"

import type { FormCommandeType, Menu } from "@/types/menu"
import ModalImprimerComponent from "@/components/modal"
import OrderSuccess from "@/components/succes-page"

export default function FormCommande() {
  const [headerVisible, setHeaderVisible] = useState(true)
  const [panier, setPanier] = useState<Menu[]>([])
  const [form, setForm] = useState<FormCommandeType>({
    nom: "",
    genre: "",
    adresse: "",
    telephone: "",
    email: "",
    status: false,
    inSide: false,
    paiement: "",
    customerId: crypto.randomUUID(),
    menu: panier.map((item) => item),
  })

  useEffect(() => {
    localforage.getItem<{ menu: Menu }[] | Menu[]>("panier").then((data) => {
      if (data) {
        // some parts of the app store panier as [{ menu: Menu }],
        // so normalize to Menu[] for this component
        const normalized = (data as any).map ? (data as any).map((d: any) => d.menu ?? d) : []
        setPanier(normalized)
      }
    })
  }, [])

  console.log(panier)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = () => {
    if (!form.nom) {
      toast.error("Veuillez entrer votre nom")
      return
    }
    if (!form.genre) {
      toast.error("Veuillez sélectionner votre genre")
      return
    }
    if (!form.adresse) {
      toast.error("Veuillez entrer votre adresse")
      return
    }
    if (!form.telephone) {
      toast.error("Veuillez entrer votre numéro de téléphone")
      return
    }
    if (!form.email) {
      toast.error("Veuillez entrer votre email")
      return
    }
    setHeaderVisible(false)
  }

  const supprimerArticle = (index: number) => {
    setPanier(panier.filter((_, i) => i !== index))
  }

  const [isPrint, setIsPrint] = useState(false)

  const handlePrint = () => {
    setIsPrint(true)
    setHeaderVisible(false)
    window.print();
  }
    const subtotal = panier.reduce(
    (total, item) => total + item.prix * item.quantity,
    0
  )
  const tax = Math.round(subtotal * 0.02)
  const total = subtotal + tax + 200


  return (
    <div>
      {headerVisible ? (
        <div className="flex h-screen flex-col bg-white p-8">
          <h2 className="mb-6 text-2xl font-extrabold text-black">
            Order {form.customerId.slice(0, 5).toUpperCase()}
          </h2>
          <div className="mb-6 grid grid-cols-3 gap-4">
            <div>
              <label className="text-md font-semibold text-black">
                Recipient
              </label>
              <Input
                name="nom"
                value={form.nom}
                onChange={handleChange}
                placeholder="Entrez votre nom"
              />
            </div>
            <div>
              <label className="text-md font-semibold text-black">Genre</label>
              <select
                name="genre"
                value={form.genre}
                onChange={handleChange}
                className="h-11 w-full rounded-md border border-input px-3 text-sm"
              >
                <option value="">Sélectionner</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </select>
            </div>
            <div>
              <label className="text-md font-semibold text-black">
                Adresse
              </label>
              <Input
                name="adresse"
                value={form.adresse}
                onChange={handleChange}
                placeholder="Entrez votre adresse"
              />
            </div>
          </div>

          <div className="mb-6 grid grid-cols-3 gap-4">
            <div>
              <label className="text-md font-semibold text-black">
                Téléphone
              </label>
              <Input
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                placeholder="Entrez votre numéro"
              />
            </div>
            <div>
              <label className="text-md font-semibold text-black">Email</label>
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Entrez votre email"
              />
            </div>
            <div>
              <label className="text-md font-semibold text-black">
                Numéro client
              </label>
              <Input
                value={form.customerId.slice(0, 8).toUpperCase()}
                readOnly
                className="bg-gray-50 text-gray-400"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-1 gap-32">
            <div className="flex-1 space-y-3">
              {panier.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-18 rounded-xl border border-gray-100"
                >
                  <img
                    src={item.image}
                    alt={item.nom}
                    className="size-14 rounded-lg"
                  />
                  <span className="flex-1 font-bold text-black">
                    {item.nom}
                  </span>
                  <span className="font-bold text-primary">
                    {item.prix} FCFA
                  </span>
                  <span className="text-sm font-bold text-black">
                    Quantité : {item.quantity}
                  </span>
                  <button
                    onClick={() => supprimerArticle(index)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="size-5 text-black" />
                  </button>
                </div>
              ))}
            </div>

            <div className="w-52 space-y-7">
              <div className="flex justify-between text-lg font-bold text-black">
                <span>Subtotal</span>
                <span>{subtotal} FCFA</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax</span>
                <span>{tax} FCFA</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Charges</span>
                <span>200 FCFA</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2 text-lg font-bold text-black">
                <span>Total</span>
                <span>{total} FCFA</span>
              </div>
              <div className="flex gap-3 pt-4">
                <ModalImprimerComponent
                  adresse={form.adresse}
                  customerId={form.customerId}
                  menu={panier}
                  email={form.email}
                  genre={form.genre}
                  nom={form.nom}
                  telephone={form.telephone}
                  panier={panier}
                  onPrint={handlePrint}
                />
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-black text-white hover:bg-black/80"
                >
                  Valider le panier
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <OrderSuccess
          image={isPrint ? "/images/Printing.svg" : "/images/Successful.svg"}
          title={
            isPrint
              ? "Facture imprimée avec succès !"
              : "Votre commande a été enregistrée avec succès !"
          }
          description={
            isPrint
              ? "Veuillez patienter quelques minutes pour l'impression de la facture."
              : "Veuillez patienter 5 à 10 minutes pour votre commande."
          }
        />
      )}
    </div>
  )
}

