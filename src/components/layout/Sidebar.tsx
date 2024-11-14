import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { selectUser } from "@/features/auth/authSlice";
import { classNames } from "primereact/utils";

interface MenuItem {
  label: string;
  icon: string;
  path: string;
  roles: string[];
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: "pi pi-home",
    path: "/",
    roles: ["user", "vendor", "admin"],
  },
  {
    label: "Points Earn",
    icon: "pi pi-users",
    path: "/earn",
    roles: ["user"],
  },
  {
    label: "Points Redeem",
    icon: "pi pi-users",
    path: "/redeem",
    roles: ["user"],
  },
  {
    label: "Users",
    icon: "pi pi-users",
    path: "/users",
    roles: ["admin"],
  },
  {
    label: "Vendors",
    icon: "pi pi-briefcase",
    path: "/vendors",
    roles: ["admin"],
  },
  {
    label: "Transactions",
    icon: "pi pi-money-bill",
    path: "/transactions",
    roles: ["user", "vendor", "admin"],
  },
  {
    label: "Loyalty Points",
    icon: "pi pi-star",
    path: "/loyalty-points",
    roles: ["admin"],
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

function Sidebar({ isCollapsed, onCollapse }: SidebarProps) {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  return (
    <aside className={classNames("sidebar", { collapsed: isCollapsed })}>
      <div className="sidebar-header">
        <div className="logo-container">
          <i className="pi pi-prime text-4xl text-primary"></i>
          {!isCollapsed && <span className="app-name">Huskify</span>}
        </div>
        <Button
          icon={isCollapsed ? "pi pi-angle-right" : "pi pi-angle-left"}
          rounded
          text
          severity="secondary"
          onClick={() => onCollapse(!isCollapsed)}
          className="sidebar-toggle"
        />
      </div>

      <div className="sidebar-content">
        <nav className="sidebar-menu">
          {filteredMenuItems.map((item) => (
            <div
              key={item.path}
              className={classNames("menu-item", {
                active: location.pathname === item.path,
              })}
              onClick={() => navigate(item.path)}
            >
              <i className={classNames(item.icon, "menu-icon")} />
              {!isCollapsed && <span className="menu-label">{item.label}</span>}
              {isCollapsed && <div className="menu-tooltip">{item.label}</div>}
            </div>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="user-info">
          <i className="pi pi-user text-xl"></i>
          {!isCollapsed && (
            <div className="user-details">
              <span className="user-name">{user?.name || "User"}</span>
              <span className="user-role">{user?.email}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
