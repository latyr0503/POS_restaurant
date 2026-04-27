import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ResetPassword() {
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  return (
    <>
    <div className="space-y-10">
      <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Réinitialiser mot de passe</h2>
      
      <form
        onSubmit={(e) => {
          e.preventDefault()
          navigate("/password-changed")
        }}
        className="space-y-10"
      >
        <Input
         type="password" 
         value={password} onChange={(e: any) => setPassword(e.target.value)} 
         placeholder="Nouveau mot de passe" 
         Icon={Lock}
         />

        <Input type="password"
         value={confirm} onChange={(e: any) => setConfirm(e.target.value)}
          placeholder="Confirmer mot de passe"
          Icon={Lock}
          />

       <Button className="w-full">Changer mot de passe</Button>
      </form>
       </div>
    </>
  )
}