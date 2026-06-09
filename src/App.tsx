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
import Product from "./pages/auth/product"
import AppLayout from "./Layout/app-layout"
import AddProduct from "./pages/auth/add-product"
import CustomersPage from "./pages/auth/customers-page"
import AddCustomers from "./pages/auth/add-customers"
import EditCustomer from "./pages/auth/edit-customer"
import FormCommande from "./pages/Dashbaord/form-commande"
import EditProduct from "./pages/auth/edit-product"
import Commandes from "./pages/Dashbaord/commandes"
import Parametres from "./pages/Dashbaord/parametres"
import Manager from "./pages/Dashbaord/manager"

export function App() {

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" richColors duration={5000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<AppLayout />}>
            <Route path="form-commande" element={<FormCommande />} />
            <Route index element={<Dashboard />} />
            <Route path="form-commande" element={<FormCommande />} />
            <Route path="product" element={<Product />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="manager" element={<Manager/>} />
            <Route path="sales" element={<h1>sales</h1>} />
            <Route path="customers" element={<CustomersPage/>} />
            <Route path="add-customers" element={<AddCustomers />} />
            <Route path="edit-customer/:id" element={<EditCustomer/>} />
            <Route path="sales" element={<Commandes />} />  
            <Route path="customers-page" element={<CustomersPage />} />
            <Route path="add-customers" element={<AddCustomers />} />
            <Route path="edit-customer/:id" element={<EditCustomer />} />
            <Route path="notifications" element={<h1>notifications</h1>} />
            <Route path="history" element={<h1>history</h1>} />
            <Route path="settings" element={<Parametres />} />
          </Route>

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
