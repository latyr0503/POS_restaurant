import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button"
import type { FormCommandeType, Menu } from "@/types/menu"

export default function ModalImprimerComponent({
  customerId,
  nom,
  genre,
  adresse,
  telephone,
  email,
  panier,
  onPrint,
}: FormCommandeType & {
  panier: Menu[]
  onPrint: () => void
}) {
  const subtotal = panier.reduce(
    (total, item) => total + item.prix * item.quantity,
    0
  )
  const tax = Math.round(subtotal * 0.02)
  const total = subtotal + tax + 200

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-primary text-white hover:bg-primary/80">
          Imprimer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Receipt #{customerId.slice(0, 8).toUpperCase()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 border-b pb-4">
          <div className="flex justify-between">
            <span className="font-semibold">Recipient</span>
            <span>{nom || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Genre</span>
            <span>{genre || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Adresse</span>
            <span>{adresse || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Téléphone</span>
            <span>{telephone || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Email</span>
            <span>{email || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Customer ID</span>
            <span>{customerId.slice(0, 8).toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Date</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="space-y-2 border-b pb-4">
          {panier.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>
                {index + 1}. {item.nom}
              </span>
              <span>{item.quantity}</span>
              <span className="font-bold">{item.prix} FCFA</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>{subtotal} FCFA</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Tax</span>
            <span>{tax} FCFA</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Charges</span>
            <span>200 FCFA</span>
          </div>
          <div className="flex justify-between border-t pt-2 text-lg font-bold">
            <span>Total</span>
            <span>{total} FCFA</span>
          </div>
        </div>

        <Button
          onClick={onPrint}
          className="mt-4 w-full bg-primary text-white hover:bg-primary/80"
        >
          Imprimer la facture
        </Button>
      </DialogContent>
    </Dialog>
  )
}
