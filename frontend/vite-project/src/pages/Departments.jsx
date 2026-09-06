import { useEffect, useState } from "react";
import axios from "axios";

function Departments() {
  const [departments, setDepartments] = useState([]);

  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    hod: "",
    budget: "",
    description: "",
  });

  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  // GET departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/departments");

      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingDepartment) {
        await axios.put(
          `http://localhost:3000/api/departments/updateDepartment/${editingDepartment._id}`,
          formData,
        );
      } else {
        await axios.post(
          "http://localhost:3000/api/departments/createDepartment",
          formData,
        );
      }

      setShowDepartmentModal(false);
      setEditingDepartment(null);

      setFormData({
        name: "",
        hod: "",
        budget: "",
        description: "",
      });

      fetchDepartments();
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?",
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/departments/deleteDepartment/${id}`,
      );

      setOpenMenu(null);
      fetchDepartments();
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  // Open edit modal
  const handleEdit = (department) => {
    setEditingDepartment(department);

    setFormData({
      name: department.name || "",
      hod: department.hod || "",
      budget: department.budget || "",
      description: department.description || "",
    });

    setOpenMenu(null);
    setShowDepartmentModal(true);
  };

  return (
    <div className="px-20 py-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Departments</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage departments and their information
          </p>
        </div>

        <button
          onClick={() => {
            setEditingDepartment(null);

            setFormData({
              name: "",
              hod: "",
              budget: "",
              description: "",
            });

            setShowDepartmentModal(true);
          }}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Department
        </button>
      </div>

      {/* Department table */}
      <div className="mt-8 overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3">Department ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">HOD</th>
              <th className="px-4 py-3">Employees</th>
              <th className="px-4 py-3">Budget</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {departments.map((department) => (
              <tr key={department._id} className="border-b">
                <td className="px-4 py-3">{department.departmentId}</td>

                <td className="px-4 py-3">{department.name}</td>

                <td className="px-4 py-3">{department.hod}</td>

                <td className="px-4 py-3">{department.employeeCount ?? 0}</td>

                <td className="px-4 py-3">
                  ₹{Number(department.budget).toFixed(1)} L
                </td>

                <td className="px-4 py-3 relative">
                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === department._id ? null : department._id,
                      )
                    }
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ⋮
                  </button>

                  {openMenu === department._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-50">
                      <button
                        onClick={() => handleEdit(department)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(department._id)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showDepartmentModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[600px]">
            <h2 className="text-xl font-semibold mb-5">
              {editingDepartment ? "Edit Department" : "Add Department"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Department Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>

                {/* HOD */}
                <div>
                  <label className="block text-sm font-medium mb-1">HOD</label>

                  <input
                    type="text"
                    name="hod"
                    value={formData.hod}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Budget (₹ Lakhs)
                  </label>

                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    min="10"
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                    rows="3"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowDepartmentModal(false);
                    setEditingDepartment(null);
                  }}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  {editingDepartment ? "Update Department" : "Add Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Departments;
