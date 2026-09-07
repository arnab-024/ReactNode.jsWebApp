import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Trainings from "./pages/Trainings";
import TNI from "./pages/TNI";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />

        <main className="flex-1 ml-[52px]">
          <Routes>
             {/*<Route path="/" element={<Dashboard />} />*/}

            <Route path="/employees" element={<Employees />} />

            <Route path="/departments" element={<Departments />} />

            <Route path="/trainings" element={<Trainings />} />

            {/*<Route path="/tni" element={<TNI />} />*/}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
