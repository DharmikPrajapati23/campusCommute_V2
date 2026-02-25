import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Manage_College = () => {
  const [colleges, setColleges] = useState([]);
  const [formData, setFormData] = useState({
    college: "",
    branch: "",
    semester: "",
    start_date: "",
    end_date: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/addCollege`, {
        withCredentials: true,
      });
      setColleges(res.data);
    } catch (error) {
      setError("Error fetching college details.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isEditing && editingId) {
        await axios.put(
          `${BASE_URL}/admin/updateCollege/${editingId}`,
          formData,
          { withCredentials: true }
        );
        setSuccess("College updated successfully.");
      } else {
        const res = await axios.post(
          `${BASE_URL}/admin/addCollege`,
          formData,
          { withCredentials: true }
        );
        setSuccess(res.data.message);
      }

      fetchColleges();
      resetForm();

      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Error submitting form.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleEdit = (college) => {
    setFormData({
      college: college.college,
      branch: college.branch,
      semester: college.semester,
      start_date: college.start_date.slice(0, 10),
      end_date: college.end_date.slice(0, 10),
    });
    setEditingId(college._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this college?")) return;

    try {
      await axios.delete(`${BASE_URL}/admin/deleteCollege/${id}`, {
        withCredentials: true,
      });
      fetchColleges();
    } catch (error) {
      setError("Error deleting college.");
    }
  };

  const resetForm = () => {
    setFormData({
      college: "",
      branch: "",
      semester: "",
      start_date: "",
      end_date: "",
    });
    setShowModal(false);
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Manage Colleges
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Configure college, branch, semester and academic duration.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition text-sm md:text-base"
        >
          + Add College
        </button>
      </div>

      {/* Alerts */}
      <div className="max-w-6xl mx-auto mb-4">
        {success && (
          <div className="mb-3 rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm text-green-800">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-3 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-800">
            {error}
          </div>
        )}
      </div>

      {/* Table Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto min-w-max text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-600">
                  College
                </th>
                <th className="px-4 py-3 font-semibold text-gray-600">
                  Branch
                </th>
                <th className="px-4 py-3 font-semibold text-gray-600">
                  Semester
                </th>
                <th className="px-4 py-3 font-semibold text-gray-600">
                  Start Date
                </th>
                <th className="px-4 py-3 font-semibold text-gray-600">
                  End Date
                </th>
                <th className="px-4 py-3 font-semibold text-gray-600 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {colleges.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No colleges found. Click{" "}
                    <span className="font-semibold text-blue-600">
                      “Add College”
                    </span>{" "}
                    to create one.
                  </td>
                </tr>
              ) : (
                colleges.map((college, index) => (
                  <tr
                    key={college._id || index}
                    className={`border-t ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-800">
                      {college.college}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {college.branch}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {college.semester}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(college.start_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(college.end_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(college)}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(college._id)}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                {isEditing ? "Update College" : "Add New College"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
              {["college", "branch", "semester"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                    required
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-sm border rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage_College;