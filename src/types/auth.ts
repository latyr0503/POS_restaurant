import { products } from './../lib/data';

export interface FormLogin {
  email: string
  password: string
}

export interface FormRegister extends FormLogin {
  prenom: string
  nom: string
  telephone?: string
  role?: string
  adresse?: string
  conditions?: boolean
  confirmPassword: string
}

export interface Product {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}
