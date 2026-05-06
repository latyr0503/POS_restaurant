import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { Lock } from "lucide-react"

export default function ResetPassword() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!form.password || !form.confirmPassword) {
      toast.error("Veuillez remplir tous les champs")
      return
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas")
      return
    }

    toast.success("Mot de passe modifié avec succès")
    navigate("/password-changed")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold">
        Réinitialiser le mot de passe
      </h2>

      <Input
        type="password"
        name="password"
        placeholder="Nouveau mot de passe"
        value={form.password}
        onChange={handleChange}
        Icon={Lock}
      />

      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirmer mot de passe"
        value={form.confirmPassword}
        onChange={handleChange}
        Icon={Lock}
      />

      <Button className="w-full">
        Changer mot de passe
      </Button>
    </form>
  )
}