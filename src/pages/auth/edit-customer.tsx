import { useState } from "react"
import { ArrowLeft, ImagePlus } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"

import type { CustomerType } from "@/types/auth"
import { initialCustomers } from "@/lib/data"

export default function EditCustomer() {
  const { id } = useParams()
  const [customers, setCustomers] = useState<CustomerType[]>(initialCustomers)
  const customer = customers.find((item) => item.id === String(id))
  if (!customer) {
    return <h1 className="p-10 text-xl">Customer not found</h1>
  }

  const [preview, setPreview] = useState<string | null>(customer?.image || null)
  const [form, setForm] = useState({
    name: customer?.name || "",
    orders: customer?.orders || 0,
    spent: customer?.spent || "",
    gender: customer?.gender || "",
    address: customer?.address || "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: name === "orders" ? Number(value) : value,
    })
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    setPreview(URL.createObjectURL(file))
  }

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updatedCustomers = customers.map((item) =>
      item.id === String(id)
        ? {
            ...item,
            ...form,
            image: preview || item.image,
          }
        : item
    )

    setCustomers(updatedCustomers)

    navigate("/dashboard/customers")
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#1F2937]">Edit Customer</h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <Link
          to="/dashboard/customers"
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white"
        >
          <ArrowLeft size={18} />
        </Link>

        <div className="mt-6 flex flex-col items-center justify-center">
          <label className="flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-gray-100">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <ImagePlus className="text-gray-400" size={35} />
            )}

            <input type="file" className="hidden" onChange={handleImage} />
          </label>

          <p className="mt-4 text-2xl font-semibold text-[#1F2937]">
            Upload Image
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Full Name :
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Orders
            </label>

            <input
              type="number"
              name="orders"
              value={form.orders}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Gender :
            </label>

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
            >
              <option value="male">Male</option>

              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Spent (F) :
            </label>

            <input
              type="text"
              name="spent"
              value={form.spent}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-orange-500 outline-none focus:border-orange-400"
            />
          </div>

          <div className="col-span-2">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Address
            </label>

            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <button
            type="submit"
            className="rounded-xl bg-primary px-10 py-3 text-sm font-medium text-white transition hover:bg-orange-600"
          >
            Save Customer
          </button>
        </div>
      </form>
    </div>
  )
}
