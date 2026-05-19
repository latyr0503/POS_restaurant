import { useEffect, useState } from "react"
import { Trash2, Pencil, Plus, X } from "lucide-react"
import { Link } from "react-router-dom"
import type { CustomerType } from "@/types/auth"
import { initialCustomers } from "@/lib/data"


export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerType[]>(initialCustomers)
  const [showDelete, setShowDelete] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5
  const totalPages = Math.ceil(customers.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage

  const currentCustomers = customers.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  useEffect(() => {
    const totalPages = Math.ceil(customers.length / itemsPerPage)

    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1)
    }
  }, [customers, currentPage])

  const handleDelete = (id: number) => {
    setCustomers(customers.filter((item) => item.id !== id))

    setShowDelete(null)
  }

  return (
    <div>
      <>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Customers</h2>

          <Link
            to="/dashboard/add-customers"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white"
          >
            <Plus size={18} />
            Add Customers
          </Link>
        </div>

        <div className="rounded-xl bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="border-r p-4 text-left">Name</th>
                <th className="border-r">Orders</th>
                <th className="border-r">Spent(F)</th>
                <th className="border-r">Gender</th>
                <th className="border-r">Address</th>

                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentCustomers.map((item, index) => (
                <tr key={index} className="border-b font-semibold">
                  <td className="flex items-center gap-3 border-r p-4">
                    <img
                      src={item.image}
                      alt="image"
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    {item.name}
                  </td>

                  <td className="border-r px-4 font-semibold">{item.orders}</td>

                  <td className="border-r px-4">
                    <span className="text-md font-semibold text-primary">
                      {item.spent}
                    </span>
                  </td>
                  <td className="border-r px-4 font-semibold">{item.gender}</td>
                  <td className="border-r px-4 font-semibold">
                    {item.address}
                  </td>

                  <td className="border-r p-4">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        to={`/dashboard/edit-customer/${item.id}`}
                        className="flex items-center gap-1 text-green-500"
                      >
                        <Pencil size={18} />

                        <span className="font-semibold">Edit</span>
                      </Link>

                      <div
                        onClick={() => setShowDelete(item.id)}
                        className="flex cursor-pointer items-center gap-1 text-primary"
                      >
                        <Trash2 size={18} />

                        <span className="font-semibold">Delete</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() =>
                setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
              }
              className="rounded-lg border px-4 py-2 text-sm font-medium"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`h-9 w-9 rounded-lg text-sm font-semibold ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              className="rounded-lg border px-4 py-2 text-sm font-medium"
            >
              Next
            </button>
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

              <h3 className="text-lg font-semibold">Delete This Customer?</h3>

              <p className="mt-2 mb-4 text-sm text-gray-500">
                Are you sure you want to delete this cutomer?
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleDelete(showDelete)}
                  className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-white"
                >
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
