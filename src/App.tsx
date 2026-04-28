import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/auth/login"
import Home from "./pages/home"
import { Toaster } from "sonner"
import Register from "./pages/auth/register"
import Dashboard from "./pages/dashboard"
import Categories from "./pages/dashboard/categories"
import Commandes from "./pages/dashboard/commandes"
import Panier from "./pages/dashboard/panier"
import Profil from "./pages/dashboard/profil"
import Livraisons from "./pages/dashboard/livraisons"
import Parametres from "./pages/dashboard/parametres"

export function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors duration={5000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/categories" element={<Categories />} />
        <Route path="/dashboard/commandes" element={<Commandes />} />
        <Route path="/dashboard/panier" element={<Panier />} />
        <Route path="/dashboard/profil" element={<Profil />} />
        <Route path="/dashboard/livraisons" element={<Livraisons />} />
        <Route path="/dashboard/parametres" element={<Parametres />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
