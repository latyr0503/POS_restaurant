import { Bell, Search } from "lucide-react"

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-6">
      <span className="text-3xl font-bold">
        <span className="text-black">JAAY</span>
        <span className="text-primary">KAT</span>
      </span>
      <div className="flex items-center gap-6">
        <div className="flex w-72 items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
          <input
            type="text"
            placeholder="Recherchez un produit"
            className="flex-1 text-sm outline-none placeholder:text-gray-400"
          />
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
          <Bell className="text-white" />
        </button>
      </div>
    </header>
  )
}
