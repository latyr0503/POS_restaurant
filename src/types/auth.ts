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
}
