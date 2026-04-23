import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import React from "react"
import { ShoppingCart, Check, Lock, Mail, User2, Phone } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import type { FormRegister } from "@/types/auth"

export default function Register() {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas")
      return
    }
    console.log(form);
    
    toast.success("Inscription réussie")
    if (!form.conditions) {
      toast.error("Veuillez accepter les conditions d'utilisation")
      return
    }
  }

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gray-50">
      <div className="flex w-full rounded-lg">
        <div className="w-1/2 justify-center hidden rounded-xl border-r border-gray-100 bg-white p-8 md:flex">
          <img src="/images/login-rafiki.svg" alt="" />
        </div>
        <div className="flex flex-col justify-center gap-8 px-5 py-10 w-full md:px-28 md:w-1/2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <ShoppingCart className="h-4 w-4 text-white" strokeWidth={3} />
              </div>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm">
                <Check className="h-3 text-primary" strokeWidth={4} />
              </span>
            </div>
            <span className="text-xl font-bold text-primary">JAAYKAT</span>
          </div>

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
      </div>
    </section>
  )
}
