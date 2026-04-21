import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/auth/login"
import Home from "./pages/home"
import { Toaster } from "sonner"

export function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors duration={5000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
