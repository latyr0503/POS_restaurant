import type { FormRegister } from "@/types/auth"

export default function Dashboard() {
  const user:FormRegister = JSON.parse(localStorage.getItem("user") || "{}")
  return (
      <div className="">hello {user.prenom} {user.nom} {user.email} {user.telephone} {user.role} {user.adresse} {user.conditions}</div>
  )
}