import { Button, buttonVariants } from "@/components/button"
import { Input } from "@/components/input"
import { authStore, STORAGE_KEYS } from "@/lib/localforage"
import { cn } from "@/lib/utils"
import React from "react"
import { Lock, Mail, User2, Phone } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type { FormRegister } from "@/types/auth"

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormRegister>({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
    conditions: false,
    telephone: "",
    role: "",
    adresse: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // ── Validations ────────────────────────────────────────────────────────
    if (!form.conditions) {
      toast.error("Veuillez accepter les conditions d'utilisation")
      return
    }
    if (!form.email || !form.password || !form.telephone) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      return
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas")
      return
    }

    try {
      // ── Récupérer la liste existante ───────────────────────────────────
      const existing = await authStore.getItem<FormRegister[]>(
        STORAGE_KEYS.USERS
      )
      const users: FormRegister[] = existing ?? []

      // ── Vérifier si l'email est déjà pris ─────────────────────────────
      const emailExists = users.some(
        (u) => u.email.toLowerCase() === form.email.toLowerCase()
      )
      if (emailExists) {
        toast.error("Un compte avec cet email existe déjà")
        return
      } 

      // ── Sauvegarder le nouvel utilisateur ─────────────────────────────
      const { confirmPassword: _confirmPassword, ...userToSave } = form
      users.push(userToSave)
      await authStore.setItem(STORAGE_KEYS.USERS, users)

      toast.success("Inscription réussie ! Vous pouvez vous connecter.")
      navigate("/login")
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error)
      toast.error("Une erreur est survenue lors de l'inscription")
    }
  }

  return (
   <div className="space-y-10">

          <h2 className="text-3xl font-bold text-gray-800">
            Créer un compte !
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Input
                name="nom"
                value={form.nom}
                onChange={handleChange}
                Icon={User2}
                type="text"
                placeholder="Nom"
              />
              <Input
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                Icon={User2}
                type="text"
                placeholder="Prenom"
              />
            </div>
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              Icon={Mail}
              type="email"
              placeholder="Adresse email"
            />
            <Input
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              Icon={Phone}
              type="number"
              placeholder="Numero de telephone"
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                name="password"
                value={form.password}
                onChange={handleChange}
                Icon={Lock}
                type="password"
                placeholder="Mot de passe"
              />
              <Input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                Icon={Lock}
                type="password"
                placeholder="Confirmer le mot de passe"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="conditions"
                checked={form.conditions}
                onChange={(e) =>
                  setForm({ ...form, conditions: e.target.checked })
                }
                className="h-4 w-4 cursor-pointer accent-primary"
              />
              <label
                htmlFor="conditions"
                className="cursor-pointer text-sm text-gray-500"
              >
                J'accepte les{" "}
                <span className="cursor-pointer font-medium text-primary hover:underline">
                  conditions d'utilisation
                </span>
              </label>
            </div>
            <Button className="w-full">S'inscrire</Button>
          </form>

          <p className="text-center text-sm text-gray-400">
            Déjà un compte ?{" "}
            <Link
              className={cn(buttonVariants({ variant: "link" }))}
              to="/login"
            >
              Se connecter
            </Link>
          </p>
        </div>
      
  )
}
