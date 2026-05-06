import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { Mail } from "lucide-react"

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")

  return (
    <>
    <div className="space-y-10">
      <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Mot de passe oublié</h2>
      <p className="max-w-md font-bold text-md text-gray-800">Veuillez entrer votre email ci-dessous, vous recevrez un lien de vérification</p>
     
      <form
        onSubmit={(e) => {
          e.preventDefault()
          navigate("/reset-password")
        }}
        className="space-y-20"
      >
        <Input
          name="email"
          type="email"
          value={email}
          Icon={Mail}
          onChange={(e: any) => setEmail(e.target.value)}
          placeholder="Votre email"
        />

       <Button className="w-full">Continue</Button>
      </form>
       </div>
    </>
  )
}