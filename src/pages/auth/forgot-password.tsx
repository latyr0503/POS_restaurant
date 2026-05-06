import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { Mail } from "lucide-react"
import { toast } from "sonner"

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email) {
      toast.error("Veuillez entrer votre email")
      return
    }

    localStorage.setItem("email", email)

    toast.success("Email envoyé avec succès")
    navigate("/reset-password")
  }
  return (
    <>
      <div className="space-y-10">
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Mot de passe oublié
        </h2>
        <p className="text-md max-w-md font-bold text-gray-800">
          Veuillez entrer votre email ci-dessous, vous recevrez un lien de
          vérification
        </p>

        <form onSubmit={handleSubmit} className="space-y-20">
          <Input
            name="email"
            type="email"
            value={email}
            Icon={Mail}
            onChange={handlechange}
            placeholder="Votre email"
          />

          <Button className="w-full">Continue</Button>
        </form>
      </div>
    </>
  )
}
