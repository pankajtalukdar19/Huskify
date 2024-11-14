import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useRef, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import type { RootState } from "@/store";
import Sidebar from "./Sidebar";
import { classNames } from "primereact/utils";
import { Avatar } from "primereact/avatar";

function DashboardLayout() {
  const user = useSelector((state: RootState) => state.auth.user);
  const menuRef = useRef<Menu>(null);
  const { logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/users":
        return "Users Management";
      case "/vendors":
        return "Vendors Management";
      case "/transactions":
        return "Transactions";
      case "/loyalty-points":
        return "Loyalty Points";
      case "/profile":
        return "Profile Settings";
      default:
        return "Dashboard";
    }
  };

  const menuItems = [
    {
      label: "Profile",
      icon: "pi pi-user",
      command: () => {
        window.location.href = "/profile";
      },
    },
    {
      separator: true,
    },
    {
      label: "Logout",
      icon: "pi pi-power-off",
      command: () => {
        logout();
      },
    },
  ];

  return (
    <div className="layout-wrapper">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onCollapse={setIsSidebarCollapsed}
      />
      <div
        className={classNames("layout-content", {
          "sidebar-collapsed": isSidebarCollapsed,
        })}
      >
        <div className="layout-topbar">
          <div className="topbar-left">
            <h2 className="page-title">{getPageTitle()}</h2>
          </div>
          <div className="topbar-right">
            <div className="user-profile">
              <Button
                className="p-button-text p-button-plain"
                onClick={(e) => menuRef.current?.toggle(e)}
              >
                <div className="flex align-items-center gap-2">
                  <Avatar
                    image={user?.avatarUrl}
                    label={user?.name?.[0] || user?.phoneNumber?.[0]}
                    shape="circle"
                    size="large"
                    className="user-avatar"
                  />
                  <span className="user-name">
                    {user?.name || user?.phoneNumber}
                  </span>
                  <i className="pi pi-angle-down" />
                </div>
              </Button>
              <Menu model={menuItems} popup ref={menuRef} />
            </div>
          </div>
        </div>
        <div className="layout-main">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
