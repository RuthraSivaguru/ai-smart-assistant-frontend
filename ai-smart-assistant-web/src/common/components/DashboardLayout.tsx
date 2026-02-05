import { useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { Sidebar as DesktopSidebar } from "../../components/Sidebar";
import { Sidebar as MobileSidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { motion } from "framer-motion";

export const DashboardLayout = () => {
  const [mobileVisible, setMobileVisible] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 relative overflow-hidden flex-column md:flex-row">
      {/* Animated Background Mesh */}
      <div className="fixed inset-0 top-0 left-0 w-full h-full -z-1 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-30rem h-30rem bg-indigo-100 border-circle opacity-30 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-40rem h-40rem bg-purple-100 border-circle opacity-30 blur-3xl"
        />
      </div>

      {/* Mobile Header */}
      <div className="flex md:hidden align-items-center justify-content-between p-3 surface-card border-bottom-1 surface-border sticky top-0 z-5 bg-white-alpha-90 backdrop-blur-md">
        <div className="flex align-items-center gap-2">
          <div
            className="bg-primary border-round-lg p-2 flex align-items-center justify-content-center"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
            }}
          >
            <i className="pi pi-bolt text-white text-lg"></i>
          </div>
          <span className="text-xl font-bold text-900 tracking-tight">
            NeuraTask
          </span>
        </div>
        <Button
          icon="pi pi-bars"
          text
          rounded
          onClick={() => setMobileVisible(true)}
          className="text-700"
        />
      </div>

      {/* Mobile Drawer */}
      <MobileSidebar
        visible={mobileVisible}
        onHide={() => setMobileVisible(false)}
        className="w-full sm:w-20rem p-0"
        showCloseIcon={false}
      >
        <DesktopSidebar
          isMobile
          onMobileClose={() => setMobileVisible(false)}
        />
      </MobileSidebar>

      {/* Desktop Sidebar (Hidden on mobile) */}
      <div className="hidden md:block">
        <DesktopSidebar />
      </div>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
