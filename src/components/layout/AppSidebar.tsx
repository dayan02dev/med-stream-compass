import { useState } from "react";
import { 
  Calendar,
  FileText,
  TestTube,
  Pill,
  Settings,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { title: "My Day", url: "/my-day", icon: Calendar },
  { title: "Patient", url: "/patient", icon: User, disabled: true },
  { title: "Results", url: "/results", icon: TestTube },
  { title: "Orders", url: "/orders", icon: FileText, disabled: true },
  { title: "Templates", url: "/templates", icon: Pill, disabled: true },
  { title: "Settings", url: "/settings", icon: Settings },
];

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/patient") return location.pathname.includes("/patient");
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <aside 
      className={cn(
        "bg-card border-r border-border flex flex-col transition-all duration-normal",
        collapsed ? "w-sidebar-collapsed" : "w-sidebar"
      )}
    >
      {/* Toggle Button */}
      <div className="p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.disabled ? "#" : item.url}
                className={({ isActive: navIsActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    (navIsActive || isActive(item.url)) && !item.disabled
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground",
                    item.disabled && "opacity-50 cursor-not-allowed",
                    collapsed && "justify-center px-2"
                  )
                }
                onClick={(e) => item.disabled && e.preventDefault()}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};