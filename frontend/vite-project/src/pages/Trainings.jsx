import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, Search, Users, X } from "lucide-react";

const API = "http://localhost:3000/api/trainings";

const initialForm = {
  title: "",
  category: "Safety",
  duration: "",
  status: "active",
  description: "",
};

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingTraining, setEditingTraining] = useState(null);

  const [formData, setFormData] = useState(initialForm);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  // Fetch trainings
  const fetchTrainings = async () => {
    try {
      const response = await axios.get(API);
      setTrainings(response.data);
    } catch (error) {
      console.error("Error fetching trainings:", error);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  // Form change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open Add modal
  const handleAdd = () => {
    setEditingTraining(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  // Open Edit modal
  const handleEdit = (training) => {
    setEditingTraining(training);

    setFormData({
      title: training.title,
      category: training.category,
      duration: training.duration,
      status: training.status,
      description: training.description || "",
    });

    setShowModal(true);
  };

  // Create / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTraining) {
        await axios.put(
          `${API}/updateTraining/${editingTraining._id}`,
          formData,
        );
      } else {
        await axios.post(`${API}/createTraining`, formData);
      }

      setShowModal(false);
      setEditingTraining(null);
      setFormData(initialForm);

      fetchTrainings();
    } catch (error) {
      console.error("Error saving training:", error);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this training course?",
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${API}/deleteTraining/${id}`);

      fetchTrainings();
    } catch (error) {
      console.error("Error deleting training:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/employees");

      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchMappings = async (trainingId) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/training-mappings",
      );

      const trainingMappings = response.data.filter(
        (mapping) => mapping.training?._id === trainingId,
      );

      setMappings(trainingMappings);
    } catch (error) {
      console.error("Error fetching mappings:", error);
    }
  };

  const handleManage = async (training) => {
    setSelectedTraining(training);
    setSelectedEmployee("");

    await fetchEmployees();
    await fetchMappings(training._id);

    setShowManageModal(true);
  };

  const handleAssign = async () => {
    if (!selectedEmployee) return;

    try {
      await axios.post(
        "http://localhost:3000/api/training-mappings/createMapping",
        {
          employee: selectedEmployee,
          training: selectedTraining._id,
        },
      );

      setSelectedEmployee("");

      await fetchMappings(selectedTraining._id);

      // Refresh course cards too
      fetchTrainings();
    } catch (error) {
      console.error("Error assigning training:", error);
      alert(error.response?.data?.message || "Unable to assign training.");
    }
  };

  const handleDeleteMapping = async (mappingId) => {
    const confirmed = window.confirm("Remove this employee from the training?");

    if (!confirmed) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/training-mappings/deleteMapping/${mappingId}`,
      );

      await fetchMappings(selectedTraining._id);
      fetchTrainings();
    } catch (error) {
      console.error("Error deleting mapping:", error);
    }
  };

  // Search
  const filteredTrainings = trainings.filter((training) =>
    `${training.title} ${training.category} ${training.trainingId}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 ml-[52px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Training Management
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Certifications & safety protocols — proficiency feeds the review
            workflow.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={16} />
          New course
        </button>
      </div>

      {/* Search */}
      <div className="relative w-[320px] ml-2 mb-6">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTrainings.map((training) => (
          <div
            key={training._id}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
          >
            {/* Top */}
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                {training.category}
              </span>

              <span
                className={`text-[10px] px-2 py-1 rounded-full ${
                  training.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {training.status === "active" ? "Active" : "Draft"}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-semibold text-sm text-slate-800">
              {training.title}
            </h2>

            {/* Description */}
            <p className="text-xs text-slate-500 mt-2 line-clamp-2 min-h-[32px]">
              {training.description || "No description available."}
            </p>

            {/* Details */}
            <div className="flex justify-between items-center text-xs text-slate-500 mt-4">
              <span>
                {training.duration}h · {training.trainingId}
              </span>

              <span className="flex items-center gap-1">
                <Users size={13} />0 assigned
              </span>
            </div>

            {/* Completion */}
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                <span>Completion</span>
                <span>0%</span>
              </div>

              <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-700 w-0"></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => handleManage(training)}
                className="border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-md text-xs font-medium"
              >
                Manage
              </button>

              <button
                onClick={() => handleEdit(training)}
                className="text-slate-600 hover:text-blue-700"
                title="Edit"
              >
                <Pencil size={15} />
              </button>

              <button
                onClick={() => handleDelete(training._id)}
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredTrainings.length === 0 && (
        <div className="text-center py-16 text-slate-500 text-sm">
          No training courses found.
        </div>
      )}

      {/* ================= MODAL ================= */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[500px] rounded-xl shadow-xl p-5">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                {editingTraining ? "Edit course" : "New course"}
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Category / Duration / Status */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {/* Category */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-md px-2 py-2 text-sm bg-white"
                  >
                    <option>Safety</option>
                    <option>Quality</option>
                    <option>Production</option>
                    <option>Process</option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Duration
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      min="1"
                      required
                      className="w-full border border-slate-300 rounded-md px-2 py-2 pr-7 text-sm outline-none"
                    />

                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                      h
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-md px-2 py-2 text-sm bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="mb-5">
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border border-slate-300 px-4 py-2 rounded-md text-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm"
                >
                  {editingTraining ? "Update course" : "Create course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showManageModal && selectedTraining && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[500px] rounded-xl shadow-xl p-5">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  {selectedTraining.title}
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Assign employees, track progress and proficiency.
                </p>
              </div>

              <button
                onClick={() => setShowManageModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* Assign */}
            <div className="flex gap-2 mb-5">
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-sm bg-white"
              >
                <option value="">Select employee...</option>

                {employees
                  .filter(
                    (employee) =>
                      !mappings.some(
                        (mapping) => mapping.employee?._id === employee._id,
                      ),
                  )
                  .map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.name}
                    </option>
                  ))}
              </select>

              <button
                onClick={handleAssign}
                disabled={!selectedEmployee}
                className="bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 text-white px-4 rounded-md text-sm font-medium"
              >
                Assign
              </button>
            </div>

            {/* Assigned Employees */}
            <div>
              <div className="grid grid-cols-3 text-xs font-medium text-slate-500 border-b pb-2">
                <span>Employee</span>
                <span>Progress</span>
                <span>Proficiency</span>
              </div>

              {mappings.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-400">
                  No employees assigned.
                </div>
              ) : (
                mappings.map((mapping) => (
                  <div
                    key={mapping._id}
                    className="grid grid-cols-3 items-center py-3 border-b text-sm"
                  >
                    {/* Employee */}
                    <span className="font-medium text-slate-700">
                      {mapping.employee?.name}
                    </span>

                    {/* Progress */}
                    <div className="pr-4">
                      <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                        <span>{mapping.progress}%</span>
                      </div>

                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-700"
                          style={{
                            width: `${mapping.progress}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Proficiency */}
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-500 text-xs">
                        {"★".repeat(mapping.proficiency)}
                        <span className="text-slate-300">
                          {"★".repeat(5 - mapping.proficiency)}
                        </span>
                      </span>

                      <button
                        onClick={() => handleDeleteMapping(mapping._id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Trainings;
