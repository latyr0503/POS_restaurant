import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { Outlet } from "react-router-dom"
import { useState } from "react"

export default function DashboardLayout() {
 

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}