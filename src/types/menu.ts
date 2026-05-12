import type { LucideIcon } from "lucide-react"

export interface MenuType {
  name?: string
  link: string
  icon: LucideIcon
}

export interface Menu {
  id: number,
  nom: string,
  prix: number,
  note: number,
  description: string,
  image: string,
}

 export interface PanierItem {
  menu: Menu
  quantite: number
}


export interface FormCommandeType {
  nom: string
  genre: string
  adresse: string
  telephone: string
  email: string
  customerId: string
  menu : Menu[]
}
