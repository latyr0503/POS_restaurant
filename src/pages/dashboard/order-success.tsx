export default function OrderSuccess() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-white">

      <img
        src="/images/Successful.svg"
        alt="Order Success"
        className="w-96"
      />

      <h2 className="mt-6 text-2xl font-extrabold text-black">
       Votre commande a été enregistrée avec succès !
      </h2>
      <p className="mt-2 text-sm text-gray-400">
       Veuillez patienter 5 à 10 minutes pour votre commande.
      </p>

    </div>
  )
}
