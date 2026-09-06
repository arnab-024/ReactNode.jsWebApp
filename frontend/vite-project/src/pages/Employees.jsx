import { useEffect, useState } from "react";
import axios from "axios";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    manager: "",
    department: "",
    status: "active",
    joiningDate: "",
    rating: "",
    education: "",
    jpplExperience: 0,
    totalExperience: 0,
  });
  const [openMenu, setOpenMenu] = useState(null);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/departments");

      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      departmentFilter === "" || employee.department?.name === departmentFilter;

    const matchesDesignation =
      designationFilter === "" || employee.designation === designationFilter;

    const matchesStatus =
      statusFilter === "" || employee.status === statusFilter;

    return (
      matchesSearch && matchesDepartment && matchesDesignation && matchesStatus
    );
  });

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/employees");

      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeleteEmployee = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/employees/deleteEmployee/${id}`,
      );

      setOpenMenu(null);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingEmployee) {
        await axios.put(
          `http://localhost:3000/api/employees/updateEmployee/${editingEmployee._id}`,
          formData,
        );
      } else {
        await axios.post(
          "http://localhost:3000/api/employees/createEmployee",
          formData,
        );
      }

      setShowEmployeeModal(false);
      setEditingEmployee(null);

      setFormData({
        name: "",
        designation: "",
        manager: "",
        department: "",
        status: "active",
        joiningDate: "",
        rating: "",
        education: "",
        jpplExperience: 0,
        totalExperience: 0,
      });

      fetchEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  return (
    <div className="px-20 py-10">
      <h1 className="text-2xl font-semibold">Employees</h1>

      <p className="mt-1 text-sm text-gray-500">
        Manage employees and their information
      </p>

      <div className="pt-10 mb-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
        />

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="">Department</option>
          <option value="Polymer R&D">Polymer R&D</option>
          <option value="Production">Production</option>
          <option value="Human Resources and Admin">
            Human Resources and Admin
          </option>
        </select>

        <select
          value={designationFilter}
          onChange={(e) => setDesignationFilter(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="">Designation</option>
          <option value="HR Business Partner">HR Business Partner</option>
          <option value="Process Chemist">Process Chemist</option>
          <option value="Line Supervisor">Line Supervisor</option>
          <option value="Head of Polymer R&D">Head of Polymer R&D</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="on-leave">On Leave</option>
        </select>

        <button
          onClick={() => {
            console.log("add button clicked");
            setEditingEmployee(null);
            setShowEmployeeModal(true);
          }}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg justify-end cursor:active"
        >
          + Add Employee
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3">Employee ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Designation</th>
              <th className="px-4 py-3">Manager</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Rating</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id} className="border-b">
                <td className="px-4 py-3">{employee.employeeId}</td>

                <td className="px-4 py-3">{employee.name}</td>

                <td className="px-4 py-3">{employee.department?.name}</td>

                <td className="px-4 py-3">{employee.designation}</td>

                <td className="px-4 py-3">
                  {employee.manager ? employee.manager.name : "—"}
                </td>

                <td className="px-4 py-3">{employee.status}</td>

                <td className="px-4 py-3">
                  {new Date(employee.joiningDate).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">{employee.rating ?? "—"}</td>
                <td className="px-4 py-3 relative">
                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === employee._id ? null : employee._id,
                      )
                    }
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ⋮
                  </button>

                  {openMenu === employee._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-50">
                      <button
                        onClick={() => {
                          setEditingEmployee(employee);

                          setFormData({
                            name: employee.name || "",
                            designation: employee.designation || "",
                            manager: employee.manager?._id || "",
                            department: employee.department?._id || "",
                            status: employee.status || "active",
                            joiningDate: employee.joiningDate
                              ? employee.joiningDate.split("T")[0]
                              : "",
                            rating: employee.rating || "",
                            education: employee.education || "",
                            jpplExperience: employee.jpplExperience || 0,
                            totalExperience: employee.totalExperience || 0,
                          });

                          setOpenMenu(null);
                          setShowEmployeeModal(true);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteEmployee(employee._id)}
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

        {showEmployeeModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[500px]">
              <h2 className="text-xl font-semibold mb-4">
                {editingEmployee ? "Edit Employee" : "Add Employee"}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name
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

                  {/* Designation */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    >
                      <option value="">Select Department</option>

                      {departments.map((department) => (
                        <option key={department._id} value={department._id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Manager */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Manager
                    </label>
                    <select
                      name="manager"
                      value={formData.manager}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="">No Manager</option>

                      {employees.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                          {employee.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="on-leave">On Leave</option>
                    </select>
                  </div>

                  {/* Joining Date */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Joining Date
                    </label>
                    <input
                      type="date"
                      name="joiningDate"
                      value={formData.joiningDate}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Rating
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      min="1"
                      max="5"
                      step="0.1"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Education
                    </label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      disabled={!!editingEmployee}
                    />
                  </div>

                  {/* JPPL Experience */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      JPPL Experience (months)
                    </label>
                    <input
                      type="number"
                      name="jpplExperience"
                      value={formData.jpplExperience}
                      onChange={handleChange}
                      min="0"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  {/* Total Experience */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Total Experience (months)
                    </label>
                    <input
                      type="number"
                      name="totalExperience"
                      value={formData.totalExperience}
                      onChange={handleChange}
                      min="0"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEmployeeModal(false);
                        setEditingEmployee(null);
                      }}
                      className="px-4 py-2 border rounded-lg"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      {editingEmployee ? "Update Employee" : "Add Employee"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Employees;
