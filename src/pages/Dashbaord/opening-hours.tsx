import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { ChevronLeft } from "lucide-react"

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

export default function OpeningHours() {
  const [isEdit, setIsEdit] = useState(false)
  const [horaires, setHoraires] = useState(
    jours.reduce((acc, jour) => ({ ...acc, [jour]: "08:00 AM - 09:00 PM" }), {} as Record<string, string>)
  )

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isEdit && (
            <button onClick={() => setIsEdit(false)}>
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </button>
          )}
          <h3 className="text-xl font-extrabold text-black">Heures d'ouverture</h3>
        </div>
        {isEdit ? (
          <button
            onClick={() => {
              setIsEdit(false)
              toast.success("Horaires sauvegardés !")
            }}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Edit
          </button>
        )}
      </div>

      {/* Liste des horaires */}
      <div className="space-y-4">
        {jours.map((jour) => (
          <div key={jour}>
            {isEdit ? (
              <>
                <p className="mb-1 text-sm font-semibold text-primary">{jour}</p>
                <Input
                  value={horaires[jour]}
                  onChange={(e) => setHoraires({ ...horaires, [jour]: e.target.value })}
                  className="w-full"
                />
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium text-gray-700">{jour}</span>
                </div>
                <span className="text-sm text-gray-500">{horaires[jour]}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
