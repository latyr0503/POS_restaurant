

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
  name: string
  price: number
  note: number
  image: string
  status: string
  description: string
}
