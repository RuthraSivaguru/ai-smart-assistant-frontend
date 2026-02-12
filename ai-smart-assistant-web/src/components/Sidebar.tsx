import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/auth.store";
import { Button } from "primereact/button";
import { useLocation, useNavigate } from "@tanstack/react-router";
import styles from "../styles/common/Sidebar.module.css";

interface SidebarProps {
  isMobile?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar = ({ isMobile, onMobileClose }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const setIsAuthenticating = useAuthStore((s) => s.setIsAuthenticating);

  const handleLogout = () => {
    setIsAuthenticating(true);
    // Add a small delay for the animation to be visible
    setTimeout(() => {
      logout();
    }, 1000);
  };

  const menuItems = [
    {
      icon: "pi-home",
      label: "Dashboard",
      id: "dashboard",
      path: "/dashboard",
    },
    { icon: "pi-list", label: "My Tasks", id: "tasks", path: "/tasks" },
    {
      icon: "pi-calendar",
      label: "Calendar",
      id: "calendar",
      path: "/calendar",
    },
    {
      icon: "pi-chart-bar",
      label: "Analytics",
      id: "analytics",
      path: "/analytics",
    },
    { icon: "pi-cog", label: "Settings", id: "settings", path: "/settings" },
  ];

  const sidebarVariants = {
    expanded: { width: isMobile ? "100%" : "260px" },
    collapsed: { width: isMobile ? "100%" : "80px" },
  };

  return (
    <motion.div
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      className={`flex flex-column ${isMobile ? "h-full" : "h-screen sticky top-0 left-0"} bg-white z-5 shadow-2 ${styles.sidebar}`}
    >
      {/* Logo Section */}
      <div className={`p-4 flex align-items-center justify-content-between`}>
        <AnimatePresence mode="wait">
          {(!isCollapsed || isMobile) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex align-items-center gap-2"
            >
              <div
                className={`bg-primary border-round-lg p-2 flex align-items-center justify-content-center ${styles.logoIcon}`}
              >
                <i className="pi pi-bolt text-white text-xl"></i>
              </div>
              <span className="text-xl font-bold text-900 tracking-tight">
                NeuraTask
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {isMobile ? (
          <Button
            icon="pi pi-times"
            text
            rounded
            onClick={onMobileClose}
            className="text-700"
          />
        ) : (
          <Button
            icon={isCollapsed ? "pi pi-chevron-right" : "pi pi-chevron-left"}
            text
            rounded
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-400"
          />
        )}
      </div>

      {/* Profile Section */}
      <div className="px-3 mb-4">
        <div
          className={`flex align-items-center gap-3 p-3 border-round-xl bg-primary-50 transition-all duration-300 ${isCollapsed ? "justify-content-center" : ""}`}
        >
          <div className="w-3rem h-3rem border-circle bg-primary-200 flex align-items-center justify-content-center flex-shrink-0">
            <i className="pi pi-user text-primary text-xl"></i>
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-column overflow-hidden"
            >
              <span className="text-900 font-bold text-sm white-space-nowrap overflow-hidden text-overflow-ellipsis">
                Current User
              </span>
              <span className="text-600 text-xs">Free Plan</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex-1 px-3 flex flex-column gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`flex align-items-center gap-3 p-3 border-round-xl cursor-pointer transition-colors duration-200 ${
                isActive
                  ? "bg-primary text-black shadow-2"
                  : "text-600 hover:bg-primary-50 hover:text-primary"
              }`}
              onClick={() => navigate({ to: item.path as any })}
            >
              <i className={`pi ${item.icon} text-lg`}></i>
              {!isCollapsed && (
                <span className="font-semibold text-sm">{item.label}</span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-3">
        <Button
          label={isCollapsed ? "" : "Logout"}
          icon="pi pi-power-off"
          severity="danger"
          text
          className={`w-full ${isCollapsed ? "flex justify-content-center" : "justify-content-start"} font-semibold`}
          onClick={handleLogout}
        />
      </div>
    </motion.div>
  );
};
