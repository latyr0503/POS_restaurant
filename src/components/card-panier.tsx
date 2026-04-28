import type { Menu } from "@/types/produits"
import { Minus, Plus } from "lucide-react"
import React from "react"

interface CardPanierProps {
  item: {
    menu: Menu
    quantite: number
  }
  ajouterAuPanier: (menu: Menu) => void
  reduireQuantite: (menuId: number) => void
}

export default function CardPanier({ item, ajouterAuPanier, reduireQuantite }: CardPanierProps) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={item.menu.image}
        alt={item.menu.nom}
        className="h-12 w-12 rounded-lg object-cover"
      />
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">{item.menu.nom}</p>
        <p className="text-xs font-bold text-primary">{item.menu.prix} FCFA</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => reduireQuantite(item.menu.id)}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 text-gray-500"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="text-sm font-medium">{item.quantite}</span>
        <button
          onClick={() => ajouterAuPanier(item.menu)}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
