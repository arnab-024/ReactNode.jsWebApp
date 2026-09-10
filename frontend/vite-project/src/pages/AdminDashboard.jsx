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
  const [departments, setDepartments] = useState([]);
  const pendingApprovalsData = [
    {
      review: "RV-2401",
      employee: "Anita Verma",
      departmentIndex: 0,
      status: "Under Review",
      progress: 80,
      due: "2026-05-22",
    },
    {
      review: "RV-2402",
      employee: "Manoj Pillai",
      departmentIndex: 1,
      status: "Approved",
      progress: 100,
      due: "2026-05-18",
    },
    {
      review: "RV-2403",
      employee: "Devika Rao",
      departmentIndex: 2,
      status: "Draft",
      progress: 35,
      due: "2026-05-30",
    },
    {
      review: "RV-2404",
      employee: "Arjun Mehta",
      departmentIndex: 3,
      status: "Rework Requested",
      progress: 60,
      due: "2026-05-25",
    },
    {
      review: "RV-2405",
      employee: "Sneha Kulkarni",
      departmentIndex: 4,
      status: "Submitted",
      progress: 100,
      due: "2026-05-20",
    },
  ];

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/employees");
        setTotalEmployees(response.data.length);
      } catch (error) {
        console.error("Error Fetching Employees: ", error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/departments",
        );

        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
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
  const recentActivityData = [
    {
      employee: "Rahul Sharma",
      action: "Performance review completed",
      time: "10 minutes ago",
    },
    {
      employee: "Priya Patel",
      action: "Training completed",
      time: "1 hour ago",
    },
    {
      employee: "Amit Verma",
      action: "Performance review submitted",
      time: "2 hours ago",
    },
    {
      employee: "Sneha Joshi",
      action: "Training assigned",
      time: "4 hours ago",
    },
    {
      employee: "Rohan Mehta",
      action: "Performance review completed",
      time: "Yesterday",
    },
  ];
  const departmentChartData = [
    { department: "Polymer R&D", headcount: 48, ctc: 10.5 },
    { department: "Production", headcount: 92, ctc: 8.2 },
    { department: "Quality Control", headcount: 36, ctc: 9.1 },
    { department: "Supply Chain", headcount: 42, ctc: 8.8 },
    { department: "Maintenance", headcount: 29, ctc: 7.6 },
    { department: "HR & Admin", headcount: 17, ctc: 6.9 },
  ];
  const packageBandData = [
    { band: "0-5L", employees: 32 },
    { band: "5-10L", employees: 86 },
    { band: "10-15L", employees: 74 },
    { band: "15-20L", employees: 48 },
    { band: "20L+", employees: 24 },
  ];
  const salaryCostData = [
    { department: "Production", salaryCost: 8.2 },
    { department: "Polymer R&D", salaryCost: 6.5 },
    { department: "Supply Chain", salaryCost: 4.8 },
    { department: "Quality Control", salaryCost: 4.1 },
    { department: "Maintenance", salaryCost: 2.9 },
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
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>

        <p className="text-sm text-gray-500 mt-1">
          Latest employee and review activities
        </p>
        <div className="mt-5">
          {recentActivityData.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {activity.employee}
                </p>
                <p className="text-sm text-gray-500 mt-1">{activity.action}</p>
              </div>

              <p className="text-xs text-gray-400">{activity.time}</p>
            </div>
          ))}
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

            <Line
              type="monotone"
              dataKey="rating"
              name="Average Rating"
              stroke="green"
            />
            <Line
              type="monotone"
              dataKey="target"
              name="Target Rating"
              stroke="#2563eb"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-5 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Pending Approvals
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Reviews awaiting action
            </p>
          </div>

          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View all →
          </button>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-600">
                <th className="py-3 font-medium">Review</th>
                <th className="py-3 font-medium">Employee</th>
                <th className="py-3 font-medium">Department</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 font-medium">Progress</th>
                <th className="py-3 font-medium">Due</th>
              </tr>
            </thead>
            <tbody>
              {pendingApprovalsData.map((approval, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 font-medium text-gray-900">
                    {approval.review}
                  </td>

                  <td className="py-4 text-gray-700">{approval.employee}</td>

                  <td className="py-4 text-gray-700">
                    {departments[approval.departmentIndex]?.name || "—"}
                  </td>

                  <td className="py-4">{approval.status}</td>

                  <td className="py-4">{approval.progress}%</td>

                  <td className="py-4 text-gray-600">{approval.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white border border-gray-200 mt-6 p-5 rounded-xl">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Department Overview
          </h1>
          <p className="text-sm text-gray-500">
            Headcount, salary & package distribution across departments
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6">
          {/* Total Department Count */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-500">Total Departments</p>
            <h2 className="text-2xl font-semibold mt-2">
              {departments.length}
            </h2>
            <p className="text-xs text-green-600 mt-1">+ 1 this month</p>
          </div>

          {/* Total Headcount */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-500">Total Headcount</p>
            <h2 className="text-2xl font-semibold mt-2">264</h2>
            <p className="text-xs text-green-600 mt-1">↗ 8% vs last cycle</p>
          </div>

          {/* Monthly payout */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-500">Pending Approvals</p>
            <h2 className="text-2xl font-semibold mt-2">Rs 2.06 Cr</h2>
            <p className="text-xs text-gray-500 mt-1">↗ 8%</p>
          </div>

          {/* Average CTC */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-500">Average CTC</p>
            <h2 className="text-2xl font-semibold mt-2">Rs 9.3L</h2>
            <p className="text-xs text-green-600 mt-1">↗ 10 increase</p>
          </div>

          {/*Highest CTC Department*/}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-500">Highest CTC Department</p>
            <h2 className="text-2xl font-semibold mt-2">Polymer R&D</h2>
          </div>

          {/*Largest Department */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-500">Largest Department</p>
            <h2 className="text-2xl font-semibold mt-2">Production</h2>
          </div>

          {/*Department Performance */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Overall Department Performance
            </p>
            <h2 className="text-2xl font-semibold mt-2">4.0/5</h2>
            <p className="text-xs text-gray-500 mt-1">↗ 8%</p>
          </div>

          {/*Annual Sales */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-500">Annual Sales</p>
            <h2 className="text-2xl font-semibold mt-2">Rs 17.5 Cr</h2>
            <p className="text-xs text-gray-500 mt-1">↗ 10% increase</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Headcount & Avg CTC by Department
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentChartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="department" />

                <YAxis yAxisId="left" />

                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(value) => `${value}L`}
                />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="headcount"
                  name="Headcount"
                  fill="#2563eb"
                  yAxisId="left"
                />
                <Line
                  type="monotone"
                  dataKey="ctc"
                  name="Avg CTC (₹L)"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  yAxisId="right"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Salary Distribution by Department
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentChartData}
                  dataKey="ctc"
                  nameKey="department"
                  cx="50%"
                  cy="45%"
                  outerRadius={90}
                >
                  {departmentChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        [
                          "#2563eb",
                          "#f97316",
                          "#10b981",
                          "#8b5cf6",
                          "#ec4899",
                          "#f59e0b",
                        ][index]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Package Band Distribution
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={packageBandData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="band" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar dataKey="employees" name="Employees" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Top 5 Departments by Salary Cost
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salaryCostData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis type="number" tickFormatter={(value) => `₹${value}Cr`} />

                <YAxis type="category" dataKey="department" width={100} />

                <Tooltip
                  formatter={(value) => [`₹${value} Cr`, "Salary Cost"]}
                />

                <Bar dataKey="salaryCost" name="Salary Cost" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
