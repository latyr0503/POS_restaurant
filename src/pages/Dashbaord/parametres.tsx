import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, Camera, ImagePlus, Pencil, User } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import type { FormParametres } from "@/types/menu"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import EmployeesSection from "./employees-section"
import OpeningHours from "./opening-hours"
import LoginPassword from "./login-password"

type Section = "personal" | "employees" | "hours" | "password"

export default function Parametres() {
  const [section, setSection] = useState<Section>("personal")
  const [form, setForm] = useState<FormParametres>({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
    position: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const [image, setImage] = useState<string | null>(null)
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImage(url)
    }
  }

  const handleSubmit = () => {
    if (!form.prenom) {
      toast.error("Veuillez entrer votre prénom")
      return
    }
    if (!form.nom) {
      toast.error("Veuillez entrer votre nom")
      return
    }
    if (!form.email) {
      toast.error("Veuillez entrer votre email")
      return
    }
    if (!form.telephone) {
      toast.error("Veuillez entrer votre téléphone")
      return
    }
    if (!form.dateNaissance) {
      toast.error("Veuillez entrer votre date de naissance")
      return
    }
    if (!form.position) {
      toast.error("Veuillez entrer votre poste")
      return
    }
    toast.success("Profil mis à jour avec succès !")
  }

  return (
    <div className="flex flex-1 flex-col md:flex-row gap-4 md:gap-6 overflow-y-auto md:overflow-hidden bg-gray-50 p-4 md:p-6">
      {/* Carte gauche */}
      <div className="flex w-full md:w-72 shrink-0 flex-col rounded-2xl border border-gray-100 bg-white p-4 md:p-6 shadow-sm">
        {/* Profil */}
        <div className="mb-6 flex flex-col items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <div className="relative cursor-pointer">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                  {image ? (
                    <img
                      src={image}
                      alt="profil"
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-gray-400" />
                  )}
                </div>
                <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow">
                  <Pencil className="h-3.5 w-3.5" />
                </span>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <div className="flex gap-4 p-4">
                <button className="flex flex-1 flex-col items-center gap-3 rounded-xl bg-gray-100 p-6 hover:bg-gray-200">
                  <Camera className="h-10 w-10 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Capture Image
                  </span>
                </button>
                <label className="flex flex-1 cursor-pointer flex-col items-center gap-3 rounded-xl bg-gray-100 p-6 hover:bg-gray-200">
                  <ImagePlus className="h-10 w-10 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Select Images
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImage}
                  />
                </label>
              </div>
            </DialogContent>
          </Dialog>

          <p className="mt-2 font-bold text-black">Saul latyr</p>
          <p className="text-sm text-gray-400">Manager</p>
        </div>

        {/* Menu */}
        <nav className="flex flex-col space-y-2">
          {[
            { id: "personal", label: "Informations personnelles" },
            { id: "employees", label: "Gestion des employés" },
            { id: "hours", label: "Heures d'ouverture" },
            { id: "password", label: "Identifiant et mot de passe" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id as Section)}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                section === item.id
                  ? "border-primary bg-primary text-white"
                  : "border-gray-100 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.label}
              <ChevronRight className="h-4 w-4" />
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button className="mt-6 flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          Logout
        </button>
      </div>

      {/* Zone de contenu */}
      <div className="flex-1 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-4 sm:p-8 shadow-sm">
        {section === "personal" && (
          <div>
            <h3 className="mb-1 text-xl font-extrabold text-black">
              Informations personnelles
            </h3>
            <p className="mb-8 text-sm text-gray-400">
              Modifiez les informations de votre profil et mettez à jour les détails de votre compte.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Prénom
                </Label>
                <Input
                  name="prenom"
                  value={form.prenom}
                  onChange={handleChange}
                  placeholder="Prénom"
                />
              </div>
              <div>
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Nom
                </Label>
                <Input
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  placeholder="Nom"
                />
              </div>
              <div>
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div>
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Numéro de téléphone
                </Label>
                <Input
                  name="telephone"
                  value={form.telephone}
                  onChange={handleChange}
                  placeholder="Numéro de téléphone"
                />
              </div>
              <div>
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Date de naissance
                </Label>
                <Input
                  name="dateNaissance"
                  value={form.dateNaissance}
                  onChange={handleChange}
                  placeholder="JJ/MM/AAAA"
                />
              </div>
              <div>
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Poste
                </Label>
                <Input
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  placeholder="Poste"
                />
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="mt-8 w-full bg-primary text-white hover:bg-primary/80"
            >
             Mettre à jour
            </Button>
          </div>
        )}

        {section === "employees" && <EmployeesSection />}

        {section === "hours" && <OpeningHours />}

        {section === "password" && <LoginPassword />}
      </div>
    </div>
  )
}
