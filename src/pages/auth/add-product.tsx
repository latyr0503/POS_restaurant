import { getItem, productsStore, setItem, STORAGE_KEYS } from "@/lib/localforage"
import type { ProductType } from "@/types/auth"
import { ArrowLeft, ImagePlus } from "lucide-react"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

export default function AddProduct() {
  const [preview, setPreview] = useState<string | null>(null)
  const [form, setForm] = useState<ProductType>({
    productid: `ID-${crypto.randomUUID()}`,
    productname: "",
    category: "",
    productunit: 0,
    price: 0,
    quantity: 45,
    status: "",
    description: "",
    image: "",
  })
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]:
        name === "price" || name === "productunit" || name === "quantity"
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
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white p-6 shadow-sm"
      >
        <Link
          to="/dashboard/product"
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
                <ImagePlus size={40} className="text-gray-400" />

                <input type="file" className="hidden" onChange={handleImage} />
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
              Product Name :
            </label>

            <input
              type="text"
              name="productname"
              value={form.productname}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Product Unit :
            </label>

            <input
              type="number"
              name="productunit"
              value={form.productunit}
              onChange={handleChange}
              placeholder="Enter Unit"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Category :
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
            >
               <option value="">Selectionner</option>
              <option>Fast Food</option>
              <option>Restaurant</option>
              <option>Glacier</option>
              <option>Pâtisserie</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Price :</label>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter Price"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Status :</label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
            >
              <option value="">Selectionner</option>
              <option>In Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Product ID :
            </label>

            <input
              type="text"
              value={form.productid}
              readOnly
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 outline-none"
            />
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <button
            type="submit"
            className="rounded-xl bg-primary px-10 py-3 text-sm font-medium text-white transition hover:bg-orange-600"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  )
}

