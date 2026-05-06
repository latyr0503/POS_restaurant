import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import localforage from "localforage"
import type { PanierItem, FormCommandeType } from "@/types/produits"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import OrderSuccess from "@/components/succes-page"

export default function FormCommande() {
  const [headerVisible, setHeaderVisible] = useState(true)
  const [panier, setPanier] = useState<PanierItem[]>([])
  const [form, setForm] = useState<FormCommandeType>({
    nom: "",
    genre: "",
    adresse: "",
    telephone: "",
    email: "",
    customerId: crypto.randomUUID(),
    menu: panier.map((item) => item.menu),
  })

  useEffect(() => {
    localforage.getItem<PanierItem[]>("panier").then((data) => {
      if (data) setPanier(data)
    })
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const subtotal = panier.reduce(
    (total, item) => total + item.menu.prix * item.quantite,
    0
  )
  const tax = Math.round(subtotal * 0.02)
  const total = subtotal + tax + 200

  const handleSubmit = () => {
    setHeaderVisible(false)
  }

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

          <div className="flex flex-1 items-end gap-32">
            <div className="flex-1 space-y-3">
              {panier.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-18 rounded-xl border border-gray-100"
                >
                  <img
                    src={item.menu.image}
                    alt={item.menu.nom}
                    className="size-14 rounded-lg"
                  />
                  <span className="flex-1 font-bold text-black">
                    {item.menu.nom}
                  </span>
                  <span className="font-bold text-primary">
                    {item.menu.prix} FCFA
                  </span>
                  <span className="text-sm font-bold text-black">
                    Quantité : {item.quantite}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
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
                <ModalImprimer
                  adresse={form.adresse}
                  customerId={form.customerId}
                  menu={form.menu}
                  email={form.email}
                  genre={form.genre}
                  nom={form.nom}
                  telephone={form.telephone}
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
          image="/images/Successful.svg"
          title="Votre commande a été enregistrée avec succès !"
          description="Veuillez patienter 5 à 10 minutes pour votre commande."
        />
      )}
    </div>
  )
}

function ModalImprimer({
  adresse,
  customerId,
  menu,
  email,
  genre,
  nom,
  telephone,
}: FormCommandeType) {
  return (
    <Dialog>
      <DialogTrigger>Imprimer</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Resumer de la commande {customerId}
          </DialogTitle>
          <DialogDescription>
            <p>Nom : {nom}</p>
            <p>Genre : {genre}</p>
            <p>Adresse : {adresse}</p>
            <p>Téléphone : {telephone}</p>
            <p>Email : {email}</p>
            <p>Menu : {menu.map((item) => item.nom).join(", ")}</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
