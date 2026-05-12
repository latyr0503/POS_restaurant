import type { Menu } from "@/types/menu"
import { Star } from "lucide-react"

interface CardProduitProps {
  menu: Menu
  ajouterAuPanier: (menu: Menu) => void
}

export default function CardProduit({ menu, ajouterAuPanier }: CardProduitProps) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <img
        src={menu.image}
        alt={menu.nom}
        className="h-48 w-full rounded-xl object-contain"
      />
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-gray-800">{menu.nom}</span>
        <span className="text-lg font-bold text-primary">{menu.prix} FCFA</span>
      </div>
      <p className="text-md mt-1 text-gray-400">{menu.description}</p>
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
  )
}