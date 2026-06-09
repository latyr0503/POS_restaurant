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
  quantity: number
}


export interface FormCommandeType {
  customerId: string
  nom: string
  genre: string
  adresse: string
  telephone: string
  email: string
  status?: boolean
  inSide?: boolean
  table?: number
  paiement?: string
  menu : Menu[]
  montant?: number
}


export interface Article {
  menuId: number
  quantite: number
}


export interface FormParametres {
  prenom: string
  nom: string
  email: string
  telephone: string
  dateNaissance: string
  position: string
}