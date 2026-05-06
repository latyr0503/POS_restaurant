import { Button, buttonVariants } from "@/components/button"
import { Input } from "@/components/input"
import { authStore, STORAGE_KEYS } from "@/lib/localforage"
import { cn } from "@/lib/utils"
import type { FormLogin } from "@/types/auth"
import { Lock, Mail } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function Login() {
  const navigate = useNavigate()

  const [form, setform] = useState<FormLogin>({
    email: "",
    password: "",
  })
  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!form.email || !form.password) {
      toast.error("Veuillez remplir tous les champs")
      return
    }

    try {
      // ── Récupérer la liste des utilisateurs inscrits ───────────────────
      const users = await authStore.getItem<
        Array<{
          email: string
          password: string
          nom?: string
          prenom?: string
          role?: string
        }>
      >(STORAGE_KEYS.USERS)

      if (!users || users.length === 0) {
        toast.error("Aucun compte trouvé. Veuillez vous inscrire.")
        return
      }

      // ── Vérifier si l'email existe ─────────────────────────────────────
      const foundUser = users.find(
        (u) => u.email.toLowerCase() === form.email.toLowerCase()
      )

      if (!foundUser) {
        toast.error("Aucun compte associé à cet email")
        return
      }

      // ── Vérifier le mot de passe ───────────────────────────────────────
      if (foundUser.password !== form.password) {
        toast.error("Mot de passe incorrect")
        return
      }

      // ── Créer la session ───────────────────────────────────────────────
      const { password: _pwd, ...sessionUser } = foundUser
      await localStorage.setItem("user", JSON.stringify(sessionUser))
      await localStorage.setItem("token", `token_${Date.now()}`)

      toast.success(
        `Bienvenue ${sessionUser.prenom ?? sessionUser.nom ?? ""} !`
      )
      navigate("/dashboard")
    } catch (error) {
      console.error("Erreur de connexion :", error)
      toast.error("Une erreur est survenue lors de la connexion")
    }
  }

  return (
    <>
      <div className="space-y-10">
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Bienvenue dans notre plateforme !
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            name="email"
            Icon={Mail}
            value={form.email}
            onChange={handlechange}
            type="email"
            placeholder="Adresse email"
          />
          <Input
            name="password"
            value={form.password}
            onChange={handlechange}
            Icon={Lock}
            type="password"
            placeholder="Mot de passe"
            className="w-full rounded-lg border px-4 py-2 pr-10 outline-none"
          />
          <div className="-mt-2 text-right">
            <Button variant="link">
              <Link to="/forgot-password">Mot de passe oublié ?</Link>
            </Button>
          </div>
          <Button className="w-full">Se connecter</Button>
        </form>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">ou</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full">
            <img
              className="size-4"
              src="/images/google-icon.png"
              alt="Google"
            />
            <span>Google</span>
          </Button>
          <Button variant="outline" className="w-full">
            <img
              className="size-4"
              src="/images/facebook-icon.png"
              alt="Facebook"
            />
            <span>Facebook</span>
          </Button>
        </div>

        <p className="text-center text-sm text-gray-400">
          Pas de compte ?{" "}
          <Link
            className={cn(
              buttonVariants({
                variant: "link",
              })
            )}
            to="/register"
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </>
  )
}