import { useState } from "react"
import { Trash2, Pencil, Plus, ImagePlus, X } from "lucide-react"
import { products } from "@/lib/data"
import type { ProductType } from "@/types/auth"

export default function Product() {
  const [showDelete, setShowDelete] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [form, setForm] = useState<ProductType>({
    productid: `ID-${crypto.randomUUID()}`,
    name: "",
    price: 0,
    note: 4.5,
    status: "In Stock",
    description: "",
    image: "",
  })



  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  return (
    <div>
      {!showAdd ? (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Product</h2>

            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>

          <div className="rounded-xl bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="border-b text-gray-500">
                <tr>
                  <th className="border-r p-4 text-left">Product</th>
                  <th className="border-r">Product ID</th>
                  <th className="border-r">Note</th>
                  <th className="border-r">Price</th>
                  <th className="border-r">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="flex items-center gap-3 border-r p-4">
                      <img src={item.image} alt="product" className="h-12 w-12 rounded-lg" />
                      {item.name}
                    </td>

                    <td className="border-r">{item.productid}</td>
                    <td className="border-r">{item.note}</td>
                    <td className="border-r">{item.price}</td>

                    <td>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-600">
                        {item.status}
                      </span>
                    </td>

                    <td className="border-r p-4">
                      <div className="flex items-center justify-center gap-3">
                        <Pencil
                          className="cursor-pointer text-green-500"
                          size={18}
                        />

                        <Trash2
                          className="cursor-pointer text-red-500"
                          size={18}
                          onClick={() => setShowDelete(true)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40">
              <div className="relative w-[320px] rounded-xl bg-white p-6 text-center">
                <button
                  onClick={() => setShowDelete(false)}
                  className="absolute top-3 right-3"
                >
                  <X size={18} />
                </button>

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                  <Trash2 className="text-red-500" />
                </div>

                <h3 className="text-lg font-semibold">Delete This Product?</h3>

                <p className="mt-2 mb-4 text-sm text-gray-500">
                  Are you sure you want to delete this product?
                </p>

                <div className="flex justify-center gap-3">
                  <button className="rounded-lg bg-primary px-4 py-2 text-white">
                    Yes
                  </button>
                  <button
                    onClick={() => setShowDelete(false)}
                    className="rounded-lg bg-black px-4 py-2"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="mb-6 text-xl font-semibold">Add Product</h2>

          <form onSubmit={() => {}} className="max-w-3xl rounded-xl bg-white p-6 shadow-sm">
            <label className="flex h-52 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed">
              {preview ? (
                <img src={preview} className="h-40 rounded-lg" />
              ) : (
                <div className="text-center">
                  <ImagePlus className="mx-auto text-gray-400" size={30} />
                  <p className="mt-2 text-sm text-gray-400">Upload Image</p>
                </div>
              )}

              <input type="file" className="hidden" onChange={handleImage} />
            </label>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <input
                placeholder="Product Name"
                className="rounded-lg border p-3"
              />
              <input
                placeholder="Product Unit"
                className="rounded-lg border p-3"
              />
              <input placeholder="Category" className="rounded-lg border p-3" />
              <input placeholder="Price" className="rounded-lg border p-3" />
              <input placeholder="Status" className="rounded-lg border p-3" />
              <input
              disabled
              value={`ID-${crypto.randomUUID()}`}
                placeholder="Product ID"
                className="rounded-lg border p-3"
              />
            </div>

            <button
              onClick={() => setShowAdd(false)}
              className="mt-6 rounded-lg bg-primary px-6 py-3 text-white"
            >
              Save Product
            </button>   
          </form>
        </>
      )}
    </div>
  )
}
