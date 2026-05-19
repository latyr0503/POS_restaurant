import React from 'react'
import type { CustomerType } from "@/types/auth"
import { ArrowLeft, ImagePlus } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function AddCustomers() {
 
  const [preview, setPreview] = useState<string | null>(null)
  const [form, setForm] = useState<CustomerType>({
    id: 0,
    name: "",
    orders: 0,
    spent: "",
    gender: "male",
    address: "",
    image: "",
  })
 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target

  setForm({
    ...form,
    [name]:
      name === "orders"
        ? Number(value)
        : value,
  })
}

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

}

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-[#1F2937]">
        Add Customers
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white p-6 shadow-sm"
      >

        <Link
          to="/dashboard/customers-page"
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white"
        >
          <ArrowLeft size={18} />
        </Link>

        <div className="mt-6 flex flex-col items-center justify-center">
          <label className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-2xl bg-gray-100">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="h-full w-full rounded-2xl object-cover"
              />
            ) : (
              <>
                <ImagePlus
                  size={40}
                  className="text-gray-400"
                />

                <input
                  type="file"
                  className="hidden"
                  onChange={handleImage}
                />
              </>
            )}
          </label>

          <p className="mt-4 text-xl font-semibold text-[#1F2937]">
            Upload Image
          </p>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-8">
    
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Full Name :
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full Name"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Orders :
            </label>

            <input
              type="number"
              name="orders"
              value={form.orders}
              onChange={handleChange}
              placeholder="Enter Order Quantity"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Spent(F) :
            </label>

            <input
              type="text"
              name="spent"
              value={form.spent}
              onChange={handleChange}
              placeholder="Enter Spent Money"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Gender :
            </label>

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
            >
             <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Address :
            </label>

            <input
              type="text"
              name='address'
              value={form.address}
              onChange={handleChange}
              placeholder='Enter Full address'
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
