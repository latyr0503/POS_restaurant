

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

export interface ProductType {
  productid: string
  productname: string
  category: string
  productunit: number
  price: number
  quantity: number
  image: string
  status: string
  description: string
}

export interface CustomerType {
   id: number
  name: string
  orders: number
  gender: string
  spent: string
  address: string
  image: string
}