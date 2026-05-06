import { Button } from "@/components/button"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function PasswordChanged() {
  const navigate = useNavigate()

  return (
    <div className="space-y-10 text-center">
      <h2 className="-ml-20 text-2xl font-bold text-gray-800 md:text-3xl">
        Changer mot de passe
      </h2>
      <p className="max-w-xl text-xl font-bold text-gray-800">
        Nous avons envoyé un lien de vérification à votre boîte e-mail
        <span className="text-green-500"> gafdhyvds23@gmail.com</span>
      </p>
      <p className="font-bold">
        Clique sur le lien dans votre boîte e-mail et tout est fait
      </p>

      <Button className="w-full" onClick={() => navigate("/")}>
        Retour à la connexion
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() =>
          toast.success("lien de vérification envoyé avec succès.")
        }
      >
        Renvoyer le lien
      </Button>
    </div>
  )
}
