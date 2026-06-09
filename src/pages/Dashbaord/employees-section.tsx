import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Pencil, X, User } from "lucide-react"
import { initialCustomers } from "@/lib/data"
import { toast } from "sonner"

export default function EmployeesSection() {
  const [employees, setEmployees] = useState(
    initialCustomers.map((c) => ({
      id: c.id,
      name: c.name,
      image: c.image,
      employeeId: crypto.randomUUID().slice(0, 8).toUpperCase(),
    }))
  )
  const [showDelete, setShowDelete] = useState<number | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState<number | null>(null)
  const [newEmployee, setNewEmployee] = useState({
    prenom: "", nom: "", email: "",
    telephone: "", genre: "", role: "",
  })

  const handleDelete = (id: number) => {
    setEmployees(employees.filter((e) => e.id !== id))
    setShowDelete(null)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-extrabold text-black">Employees</h3>
        <Button
          onClick={() => { setShowAdd(true); setShowEdit(null) }}
          className="bg-primary text-white hover:bg-primary/80"
        >
          Add Employees
        </Button>
      </div>

      {showAdd ? (
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-bold text-black">Add New Employees</h4>
            <button onClick={() => setShowAdd(false)}>
              <X className="h-4 w-4 text-gray-400" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input name="prenom" value={newEmployee.prenom} onChange={(e) => setNewEmployee({ ...newEmployee, prenom: e.target.value })} placeholder="First Name" />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input name="nom" value={newEmployee.nom} onChange={(e) => setNewEmployee({ ...newEmployee, nom: e.target.value })} placeholder="Last Name" />
            </div>
            <div>
              <Label>Email</Label>
              <Input name="email" value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} placeholder="Email" />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input name="telephone" value={newEmployee.telephone} onChange={(e) => setNewEmployee({ ...newEmployee, telephone: e.target.value })} placeholder="Phone Number" />
            </div>
            <div>
              <Label>Gender</Label>
              <Input name="genre" value={newEmployee.genre} onChange={(e) => setNewEmployee({ ...newEmployee, genre: e.target.value })} placeholder="Gender" />
            </div>
            <div>
              <Label>Role</Label>
              <Input name="role" value={newEmployee.role} onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })} placeholder="Role" />
            </div>
          </div>
          <Button
            onClick={() => {
              setEmployees([...employees, {
                id: Date.now(),
                name: `${newEmployee.prenom} ${newEmployee.nom}`,
                image: "",
                employeeId: crypto.randomUUID().slice(0, 8).toUpperCase(),
              }])
              setShowAdd(false)
              setNewEmployee({ prenom: "", nom: "", email: "", telephone: "", genre: "", role: "" })
              toast.success("Employé ajouté avec succès !")
            }}
            className="mt-4 w-full bg-primary text-white hover:bg-primary/80"
          >
            Add Employee
          </Button>
        </div>

      ) : showEdit !== null ? (
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-bold text-black">Edit Employees</h4>
            <button onClick={() => setShowEdit(null)}>
              <X className="h-4 w-4 text-gray-400" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>First Name</Label><Input placeholder="First Name" /></div>
            <div><Label>Last Name</Label><Input placeholder="Last Name" /></div>
            <div><Label>Email</Label><Input placeholder="Email" /></div>
            <div><Label>Phone Number</Label><Input placeholder="Phone Number" /></div>
            <div><Label>Gender</Label><Input placeholder="Gender" /></div>
            <div><Label>Role</Label><Input placeholder="Role" /></div>
          </div>
          <Button
            onClick={() => {
              setShowEdit(null)
              toast.success("Employé modifié avec succès !")
            }}
            className="mt-4 w-full bg-primary text-white hover:bg-primary/80"
          >
            Save Changes
          </Button>
        </div>

      ) : (
        <div className="rounded-xl bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="border-r p-4 text-left">Name</th>
                <th className="border-r p-4 text-left">Employee ID</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b">
                  <td className="flex items-center gap-3 border-r p-4">
                    {employee.image ? (
                      <img src={employee.image} alt={employee.name} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                    <span className="font-semibold text-black">{employee.name}</span>
                  </td>
                  <td className="border-r p-4 text-gray-500">{employee.employeeId}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => { setShowEdit(employee.id); setShowAdd(false) }} className="flex items-center gap-1 text-green-500">
                        <Pencil className="h-4 w-4" />
                        <span className="font-semibold">Edit</span>
                      </button>
                      <button onClick={() => setShowDelete(employee.id)} className="flex items-center gap-1 text-primary">
                        <Trash2 className="h-4 w-4" />
                        <span className="font-semibold">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal suppression */}
      {showDelete !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="relative w-80 rounded-xl bg-white p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="text-red-500" />
            </div>
            <h3 className="text-lg font-semibold">Delete This Employee?</h3>
            <p className="mt-2 mb-4 text-sm text-gray-500">Are you sure you want to delete this employee?</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => handleDelete(showDelete)} className="rounded-lg bg-primary px-4 py-2 text-white">Yes</button>
              <button onClick={() => setShowDelete(null)} className="rounded-lg bg-black px-4 py-2 text-white">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}