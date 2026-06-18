import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { slideImages } from "@/lib/data"

export default function Home() {
  const [slide, setSlide] = useState<number>(0)

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
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${index === slide ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundImage: `url('${img}')` }}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative flex flex-col items-center gap-6 px-6 py-12 text-center sm:gap-8 sm:px-10">
        {" "}
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 sm:h-20 sm:w-20">
            <ShoppingCart
              className="h-8 w-8 text-white sm:h-10 sm:w-10"
              strokeWidth={3}
            />
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md sm:-top-2 sm:-right-2 sm:h-7 sm:w-7">
              <Check className="h-3 text-orange-500 sm:h-4" strokeWidth={5} />
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            JAAYKAT
          </h1>
          <p className="mt-2 text-xs font-medium tracking-widest text-orange-300 uppercase sm:mt-2.5 sm:text-sm">
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
            className={`h-2 rounded-full transition-all duration-500 ${index === slide ? "w-6 bg-primary" : "w-2 bg-white"}`}
          />
        ))}
      </div>
    </section>
  )
}
