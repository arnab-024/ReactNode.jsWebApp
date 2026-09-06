import {
  LayoutGrid,
  Users,
  BriefcaseBusiness,
  Gauge,
  GraduationCap,
  Target,
  ClipboardList,
  SquareCheck,
  Activity,
  Shield,
  BarChart3,
  Bell,
  FileText,
} from "lucide-react";

const menuItems = [
  {
    icon: LayoutGrid,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: Users,
    label: "Employees",
    path: "/employees",
  },
  {
    icon: BriefcaseBusiness,
    label: "Departments",
    path: "/departments",
  },
  {
    icon: Gauge,
    label: "Department Dashboard",
    path: "/department-dashboard",
  },
  {
    icon: GraduationCap,
    label: "Training Management",
    path: "/trainings",
  },
  {
    icon: Target,
    label: "TNI & Competency",
    path: "/tni",
  },
  {
    icon: ClipboardList,
    label: "Training Plan",
    path: "/training-plan",
  },
  {
    icon: SquareCheck,
    label: "Evaluation",
    path: "/evaluation",
  },
  {
    icon: Activity,
    label: "Reports",
    path: "/reports",
  },
  {
    icon: Shield,
    label: "Security",
    path: "/security",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    path: "/analytics",
  },
  {
    icon: BarChart3,
    label: "Performance",
    path: "/performance",
  },
  {
    icon: Bell,
    label: "Notifications",
    path: "/notifications",
  },
  {
    icon: FileText,
    label: "Documents",
    path: "/documents",
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[52px] flex-col items-center bg-blue-800 py-4">
      <div className="mb-4">{/* Logo will go here */}</div>

      <nav className="flex flex-col items-center gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              title={item.label}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 transition hover:bg-blue-900 hover:text-white"
            >
              <Icon size={18} strokeWidth={1.8} />
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
