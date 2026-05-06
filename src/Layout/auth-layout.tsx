import { Check, ShoppingCart } from "lucide-react"
import React from "react"
import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <section className="grid w-full grid-cols-1 items-center justify-center bg-gray-50 md:grid-cols-2">
      <div className="hidden w-full justify-center border-r-2 border-gray-100 p-4 md:block">
        <img
          src="/images/login-rafiki.svg"
          alt="Illustration de connexion"
          className="h-full w-full"
        />
      </div>
      <div className="flex flex-col justify-center gap-5 p-4 lg:p-16 xl:p-24">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <ShoppingCart className="h-4 w-4 text-white" strokeWidth={3} />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm">
              <Check className="h-3 text-primary" strokeWidth={4} />
            </span>
          </div>
          <span className="text-xl font-bold text-primary">JAAYKAT</span>
        </div>

        <Outlet />
      </div>
    </section>
  )
}
