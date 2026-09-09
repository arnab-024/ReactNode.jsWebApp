import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const AdminDashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/employees");
        setTotalEmployees(response.data.length);
      } catch (error) {
        console.error("Error Fetching Employees: ", error);
      }
    };
    fetchEmployees();
  }, []);

  const departmentReviewData = [
    //this is hardcoded and is used by recharts to represent in bar graph
    {
      department: "Polymer R&D",
      completed: 48,
      pending: 5,
    },
    {
      department: "Production",
      completed: 92,
      pending: 8,
    },
    {
      department: "Quality Control",
      completed: 36,
      pending: 4,
    },
    {
      department: "Supply Chain",
      completed: 42,
      pending: 6,
    },
    {
      department: "Maintenance",
      completed: 29,
      pending: 3,
    },
    {
      department: "HR & Admin",
      completed: 18,
      pending: 2,
    },
  ];
  const ratingDistributionData = [
    {
      rating: "Outstanding",
      count: 42,
    },
    {
      rating: "Exceeds Expectations",
      count: 86,
    },
    {
      rating: "Meets Expectations",
      count: 118,
    },
    {
      rating: "Needs Improvement",
      count: 31,
    },
  ];
  const performanceTrendData = [
    { month: "Apr", rating: 3.2, target: 4.0 },
    { month: "May", rating: 3.4, target: 4.0 },
    { month: "Jun", rating: 3.5, target: 4.0 },
    { month: "Jul", rating: 3.6, target: 4.0 },
    { month: "Aug", rating: 3.8, target: 4.0 },
    { month: "Sep", rating: 4.0, target: 4.0 },
  ];
  return (
    <div className="px-20 py-10">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Q3 2026 review cycle . 14 Days remaining . cycle owner: HR Admin
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-6">
        {/* Total Employees */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">Total Employees</p>
          <h2 className="text-2xl font-semibold mt-2">{totalEmployees}</h2>
          <p className="text-xs text-green-600 mt-1">↗ 12% this month</p>
        </div>

        {/* Active Reviews */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">Active Reviews</p>
          <h2 className="text-2xl font-semibold mt-2">137</h2>
          <p className="text-xs text-green-600 mt-1">↗ 8% vs last cycle</p>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">Pending Approvals</p>
          <h2 className="text-2xl font-semibold mt-2">24</h2>
          <p className="text-xs text-gray-500 mt-1">9 overdue</p>
        </div>

        {/* Completed Reviews */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">Completed Reviews</p>
          <h2 className="text-2xl font-semibold mt-2">311</h2>
          <p className="text-xs text-green-600 mt-1">↗ 92% on time</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-5 mt-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Department Review Activity
        </h2>

        <p className="text-sm text-gray-500 mt-1 mb-5">
          Review completion and pending reviews by department
        </p>
        <span className="text-sm border border-gray-200 bg-gray-200 p-3 rounded-xl">
          Q3 2026
        </span>
        <ResponsiveContainer width="100%" height={300} className="mt-10">
          <BarChart data={departmentReviewData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" name="Completed" fill="green" />
            <Bar dataKey="pending" name="Pending" fill="orange" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-5 mt-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Rating Distribution
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Distribution of employee performance ratings
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={ratingDistributionData}
              dataKey="count"
              nameKey="rating"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {ratingDistributionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={["#2563eb", "#22c55e", "#f59e0b", "#ef4444"][index]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-5 mt-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Overall Performance
        </h2>

        <p className="text-sm text-gray-500 mt-1 mb-5">
          Average employee performance compared with the target rating
        </p>

        <span className="text-sm border border-gray-200 bg-gray-200 p-3 rounded-xl">
          Q3 2026
        </span>
        <div className="grid grid-cols-2 gap-6 mt-9">
          <div>
            <p className="text-sm text-gray-500">Average Rating</p>
            <p className="text-3xl font-semibold text-gray-900 mt-1">3.6 / 5</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Target Rating</p>
            <p className="text-3xl font-semibold text-gray-900 mt-1">4.0 / 5</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300} className="mt-9">
          <LineChart data={performanceTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="rating" name="Average Rating" fill="orange" />

            <Line type="monotone" dataKey="target" name="Target Rating" fill="green"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
