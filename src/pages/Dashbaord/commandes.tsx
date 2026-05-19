import { commandes, menus } from "@/lib/data"
import type { FormCommandeType } from "@/types/menu"
import { useState } from "react"
import OrderSuccess from "@/components/succes-page"
import ModalImprimerComponent from "@/components/modal"

export default function Commandes() {
  const [commandeSelectionnee, setCommandeSelectionnee] =
    useState<FormCommandeType | null>(null)

  const [isPrinted, setIsPrinted] = useState(false)

  if (isPrinted) {
    return (
      <OrderSuccess
        image="/images/Printing.svg"
        title="Invoice Printed Successfully !"
        description="Please wait five Minute for print Invoice"
      />
    )
  }

  const handlePrint = () => {
    setIsPrinted(true)
    window.print()
  }

  return (
    <div className="flex flex-1">
      {/* Colonne gauche */}
      <div className="w-96 border-r border-gray-200 bg-white p-4">
        <h2 className="mb-1 text-xl font-extrabold text-black">
          Commande en attente
        </h2>
        <p className="mb-4 text-sm text-gray-400">Toutes les commandes</p>

        <div className="space-y-3">
          {commandes.map((commande) => (
            <div
              key={commande.customerId}
              onClick={() => setCommandeSelectionnee(commande)}
              className={`cursor-pointer rounded-xl border p-3 transition-all ${
                commandeSelectionnee?.customerId === commande.customerId
                  ? "border-primary bg-primary text-white"
                  : "border-gray-100 bg-white hover:border-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-bold ${commandeSelectionnee?.customerId === commande.customerId ? "text-white" : "text-black"}`}
                >
                  Order #{commande.customerId.slice(0, 15)}
                </span>
                <span
                  className={`text-xs font-semibold ${commandeSelectionnee?.customerId === commande.customerId ? "text-white" : commande.status === true ? "text-green-500" : "text-red-500"}`}
                >
                  {commande.status === true ? "Payé" : "Non payé"}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span
                  className={`text-xs ${commandeSelectionnee?.customerId === commande.customerId ? "text-white/80" : "text-gray-400"}`}
                >
                  Table: {commande.table}
                </span>
                <span
                  className={`text-xs font-bold ${commandeSelectionnee?.customerId === commande.customerId ? "text-white" : "text-black"}`}
                >
                  {commande.montant} FCFA
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Colonne droite */}
      <div className="flex flex-1 flex-col bg-gray-50 p-6">
        {!commandeSelectionnee ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-gray-400">Aucun détail de la commande</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-black">
                Order #{commandeSelectionnee.customerId}
              </h2>
              <span
                className={`text-sm font-bold ${commandeSelectionnee.status === true ? "text-green-500" : "text-red-500"}`}
              >
                {commandeSelectionnee.status === true ? "Payé" : "Non payé"}
              </span>
            </div>

            {/* Details */}
            <div className="mb-6 grid grid-cols-4 gap-4 rounded-xl bg-white p-4">
              <div>
                <p className="text-xs text-gray-400">N. de table</p>
                <p className="font-bold text-black">
                  {commandeSelectionnee.table}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Client</p>
                <p className="font-bold text-black">
                  {commandeSelectionnee.nom}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Paiement</p>
                <p className="font-bold text-black">
                  {commandeSelectionnee.paiement}
                </p>
              </div>
            </div>

            {/* Articles */}
            <p className="mb-3 font-bold text-black">commande</p>
            <div className="flex-1 space-y-3 overflow-y-auto">
              {commandeSelectionnee.menu.map((article, index) => {
                const menu = menus.find((m) => m.id === article.id)
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl bg-white p-3"
                  >
                    {menu && (
                      <img
                        src={menu.image}
                        alt={menu.nom}
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                    )}
                    <span className="flex-1 px-3 font-semibold text-black">
                      {menu?.nom} x {article.quantity}
                    </span>
                    <span className="font-bold text-primary">
                      {menu ? menu.prix * article.quantity : 0} FCFA
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="flex">
              {/* Bouton Print Invoice */}
              <ModalImprimerComponent
                adresse={commandeSelectionnee.adresse}
                paiement={commandeSelectionnee.paiement}
                customerId={commandeSelectionnee.customerId}
                menu={commandeSelectionnee.menu}
                email={commandeSelectionnee.email}
                genre={commandeSelectionnee.genre}
                nom={commandeSelectionnee.nom}
                telephone={commandeSelectionnee.telephone}
                panier={commandeSelectionnee.menu}
                onPrint={handlePrint}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
