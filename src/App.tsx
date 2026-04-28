import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/auth/login"
import Home from "./pages/home"
import { Toaster } from "sonner"
import Register from "./pages/auth/register"
import Dashboard from "./pages/dashboard"
import AuthLayout from "./Layout/auth-layout"
import ForgotPassword from "./pages/auth/forgot-password"
import ResetPassword from "./pages/auth/reset-password"
import PasswordChanged from "./pages/auth/password-changed"

export function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" richColors duration={5000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route element={<AuthLayout />}>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/password-changed" element={<PasswordChanged />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
