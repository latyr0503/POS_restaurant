import { useState } from "react"
import { Trash2, Pencil, Plus, X } from "lucide-react"
import { Link } from "react-router-dom"
import { initialProducts } from "@/lib/data"
import type { ProductType } from "@/types/auth"

export default function Product() {
  const [showDelete, setShowDelete] = useState<string | null>(null)
  const [products, setProducts] = useState<ProductType[]>(initialProducts)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerpage = 5
  const totalPages = Math.ceil(
    products.length / itemsPerpage
  )
  const startIndex = (currentPage - 1) * itemsPerpage
  const currentProducts = products.slice(startIndex + itemsPerpage)


  const handleDelete = (id: string) => {
  setProducts(products.filter((item) => item.productid !== id))

  setShowDelete(null)
}

  return (
    <div>
     
        <>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Product</h2>

            <Link
              to="/dashboard/add-product"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white"
            >
              <Plus size={18} />
              Add Product
            </Link>
          </div>

          <div className="rounded-xl bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="border-b text-gray-500">
                <tr>
                  <th className="border-r p-4 text-left">Product</th>
                  <th className="border-r">Status</th>
                  <th className="border-r">Product ID</th>
                  <th className="border-r">Qantity</th>
                  <th className="border-r">Price</th>

                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentProducts.map((item, index) => (
                  <tr key={index} className="border-b font-semibold">
                    <td className="flex items-center gap-3 border-r p-4">
                      <img
                        src={item.image}
                        alt="product"
                        className="h-12 w-12 object-cover rounded-lg"
                      />
                      {item.productname}
                    </td>

                    <td className="border-r px-4">
                      <span className="text-md font-semibold text-green-500">
                        {item.status}
                      </span>
                    </td>

                    <td className="border-r px-4 font-semibold">{item.productid}</td>
                    <td className="border-r px-4 font-semibold">{item.quantity}</td>
                    <td className="border-r px-4 font-semibold">{item.price}</td>

                    <td className="border-r p-4">
                      <div className="flex items-center justify-center gap-3">
                        <Pencil
                          className="cursor-pointer text-green-500"
                          size={18}
                        />
                        <span className="cursor-pointer font-semibold text-green-500">
                          Edit
                        </span>

                        <Trash2
                          className="cursor-pointer text-primary"
                          size={18}
                          onClick={() => setShowDelete(item.productid)}
                        />
                        <span className="cursor-pointer font-semibold text-primary">
                          Delete
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-6 py-4">
             <button 
             onClick={() => setCurrentPage((prev) => prev > 1 ? prev -1 : prev)}
             className="rounded-lg border px-4 py-2 text-sm font-medium"
             >
             Previous
             </button>
             <div className="flex items-center gap-2">
             {Array.from({ length: totalPages}, 
              (_, index)  => (
                <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`h-9 w-9 rounded-lg text-sm font-semibold $(currentPage === index + 1
                  ? "bg-primary text-white" : "bg-gray-100 text-gray-700")}
                >

                </button>
              )
             )}
             </div>
            </div>
          </div>

          {showDelete !== null && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40">
              <div className="relative w-[320px] rounded-xl bg-white p-6 text-center">
                <button
                  onClick={() => setShowDelete(null)}
                  className="absolute top-3 right-3 cursor-pointer"
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
                  <button 
                   onClick={() => handleDelete(showDelete)}
                   className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-white">
                    Yes
                  </button>
                  <button
                    onClick={() => setShowDelete(null)}
                    className="cursor-pointer rounded-lg bg-black px-4 py-2 text-white"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
    </div>
  )
}
