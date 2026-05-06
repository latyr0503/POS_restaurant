
import { Check, Home, LayoutGrid, List, Send, Settings, ShoppingCart, User } from "lucide-react"
import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <div className="flex w-20 flex-col items-center bg-white py-6">
      <div className="relative mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
          <ShoppingCart className="w-7 text-white" strokeWidth={3} />
        </div>
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white">
          <Check className="h-4 text-primary" strokeWidth={4} />
        </span>
      </div>
      <nav className="flex flex-col items-center gap-10">
        <Link to="/dashboard" className="text-primary"><Home className="h-6 w-6" /></Link>
        <Link to="/dashboard/categories" className="text-gray-400 hover:text-primary"><LayoutGrid className="h-6 w-6" /></Link>
        <Link to="/dashboard/commandes" className="text-gray-400 hover:text-primary"><List className="h-6 w-6" /></Link>
        <Link to="/dashboard/panier" className="text-gray-400 hover:text-primary"><ShoppingCart className="h-6 w-6" /></Link>
        <Link to="/dashboard/profil" className="text-gray-400 hover:text-primary"><User className="h-6 w-6" /></Link>
        <Link to="/dashboard/livraisons" className="text-gray-400 hover:text-primary"><Send className="h-6 w-6" /></Link>
        <Link to="/dashboard/parametres" className="text-gray-400 hover:text-primary"><Settings className="h-6 w-6" /></Link>
      </nav>
    </div>
  )
}