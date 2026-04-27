import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from "react-router-dom"
import { toast } from 'sonner'


export default function PasswordChanged() {

  const navigate = useNavigate()
  toast.success("lien de vérification envoyé avec succès.")
  

  return (
    <div className="text-center space-y-10">
      <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Changer mot de passe</h2>
      <p className='text md font-bold text-gray-800 max-w-md'>Nous avons envoyé un lien de vérification à votre adresse e-mail 
        <span className='text-green-500'> gafdhyvds23@gmail.com</span></p>
      <p className='font-bold'>Clique sur le lien dans votre boîte e-mail et tout est fait</p>

      <Button className="w-full"
      onClick={() => navigate("/") }>Retour à la connexion</Button>
      <Button variant="outline" className="w-full">Renvoyer le lien</Button>
    </div>
  )
}
