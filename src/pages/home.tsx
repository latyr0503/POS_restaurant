import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { slideImages } from "@/data"

export default function Home() {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % slideImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="flex min-h-screen items-center justify-center">
      {slideImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 
            ${index === slide ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundImage: `url('${img}')` }}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative flex flex-col items-center gap-8 px-10 py-12 text-center">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-500">
            <ShoppingCart className="h-10 w-10 text-white" strokeWidth={3} />
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
        {slideImages.map((_, index) => (
          <span
            key={index}
            className={`h-2 rounded-full bg-primary transition-all duration-500 ${index === slide ? "w-6" : "w-2"}`}
          />
        ))}
      </div>
    </section>
  )
}
