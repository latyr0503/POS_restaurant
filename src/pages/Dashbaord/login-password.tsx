import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function LoginPassword() {
  const [form, setForm] = useState({
    username: "",
    telephone: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.username) { toast.error("Veuillez entrer votre nom d'utilisateur"); return }
    if (!form.telephone) { toast.error("Veuillez entrer votre téléphone"); return }
    if (!form.email) { toast.error("Veuillez entrer votre email"); return }
    if (!form.password) { toast.error("Veuillez entrer votre mot de passe"); return }
    toast.success("Informations mises à jour avec succès !")
  }

  return (
    <div>
      <h3 className="mb-1 text-xl font-extrabold text-black">Identifiant et mot de passe</h3>
      <p className="mb-8 text-sm text-gray-400">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
      </p>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">Nom d'utilisateur</Label>
          <Input name="username" value={form.username} onChange={handleChange} placeholder="Username" />
        </div>
        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">Numéro de téléphone</Label>
          <Input name="telephone" value={form.telephone} onChange={handleChange} placeholder="Phone Number" />
        </div>
        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">Address email</Label>
          <Input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email Address" />
        </div>
        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">Mot de passe</Label>
          <Input name="password" value={form.password} onChange={handleChange} type="password" placeholder="••••••••" />
        </div>
      </div>

      <Button onClick={handleSubmit} className="mt-8 w-full bg-primary text-white hover:bg-primary/80">
        Enregistrer les modifications
      </Button>
    </div>
  )
}
