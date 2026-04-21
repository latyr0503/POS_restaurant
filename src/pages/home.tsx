import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, HandCoins } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-[url('/images/patrimoine-culinaire.jpeg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative flex flex-col items-center gap-8 px-10 py-12 text-center">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-500">
            <HandCoins className="h-10 w-10 text-white" strokeWidth={2.4} />
            <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md">
              <Check className="h-4 text-orange-500" strokeWidth={5} />
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-white">JAAYKAT</h1>
          <p className="mt-2.5 text-sm font-medium tracking-widest text-orange-300 uppercase">
            Point de Vente
          </p>
        </div>

        <Link
          to="/login"
          className={cn(
            buttonVariants({
              variant: "default",
              size: "lg",
            })
          )}
        >
          Commencer
        </Link>
      </div>
      <div className="absolute bottom-8 flex gap-2">
        <span className="h-2 w-6 rounded-full bg-orange-500" />
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="h-2 w-2 rounded-full bg-white/40" />
      </div>
    </section>
  )
}
