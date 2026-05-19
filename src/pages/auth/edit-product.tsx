import React from 'react'
 import { useState } from "react"
import {ArrowLeft,ImagePlus,} from "lucide-react"
import {Link,useNavigate,useParams,} from "react-router-dom"
import { initialProducts } from '@/lib/data'

export default function EditProduct() {
 
  const { id } = useParams()
  const navigate = useNavigate()

  const product = initialProducts.find(
    (item) => item.productid === String(id)
  )
  if (!product) {
    return (
      <h1 className="p-10 text-xl">
        Product not found
      </h1>
    )
  }

  const [preview, setPreview] =
    useState<string | null>(
      product?.image || null
    )

  const [form, setForm] = useState({
    productname: product?.productname || "",
    productunit: product?.productunit || 0,
    category: product?.category || "",
    price: product?.price || 0,
    status: product?.status || "",
    productid: product?.productid || `ID-${crypto.randomUUID()}`,
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]:
        name === "productunit" ||
         name === "price"
          ? Number(value)
          : value,
    })
  }

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    setPreview(
      URL.createObjectURL(file)
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updatedProducts = initialProducts.map((item) =>
      item.productid === id
        ? { ...item, ...form, image: preview || item.image }
        : item
    )

    console.log("Updated products:", updatedProducts)

    navigate("/dashboard/product")
  }

  return (
     <div>
       <h1 className="mb-6 text-2xl font-semibold text-[#1F2937]">
         Edit Product
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
 