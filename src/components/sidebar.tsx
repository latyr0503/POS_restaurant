import { menu } from "@/lib/data"
import { ShoppingCart, Check } from "lucide-react"
import {NavLink } from "react-router-dom"

export default function Sidebar() {
  return (
    <div className="flex w-20 flex-col items-center gap-8 bg-white py-6 text-white">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border-b text-gray-500">
        <div className="relative">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <ShoppingCart className="h-4 w-4 text-white" strokeWidth={3} />
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm">
            <Check className="h-3 text-primary" strokeWidth={4} />
          </span>
        </div>
      </div>

      {menu.map((item) => (
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-gray-400"
          }
          to={item.link}
          key={item.link}
        >
          <item.icon className="cursor-pointer hover:text-primary" />
        </NavLink>
      ))}
    </div>
  )
}
