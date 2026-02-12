import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import styles from "../../../styles/features/settings/Settings.module.css";
import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../../../store/auth.store";
import { deleteUserApi } from "../../auth/api/auth.api";
import { getProfileApi } from "../api/settings.api";
import type { ProfileResponse } from "../types/settings.types";
import { useNavigate } from "@tanstack/react-router";
// import { jwtDecode } from "jwt-decode"; // Removed unused import if not needed for delete logic anymore or kept if needed
import { jwtDecode } from "jwt-decode";
import { Toast } from "primereact/toast";

export default function SettingsPage() {
  const [user, setUser] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const token = useAuthStore((state) => state.token);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileApi();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to load profile data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const handleDeleteUser = async () => {
    if (!token) return;
    try {
      setDeleteLoading(true);
      const decoded: any = jwtDecode(token);
      const userId = decoded.sub;
      console.log(token);
      console.log(decoded);
      console.log(userId);

      if (!userId) {
        throw new Error("User ID not found in token");
      }

      await deleteUserApi(userId);
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Account deleted successfully",
      });

      // Add a small delay for the user to see the success message/loading state
      setTimeout(() => {
        logout();
        navigate({ to: "/login" });
      }, 1000);
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to delete account. Please try again.",
      });
    } finally {
      // Only stop loading if we didn't succeed (success navigates away)
      // actually, keeping it loading until navigation is better UX
      // setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center h-screen">
        <i className="pi pi-spin pi-spinner text-4xl"></i>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-content-center align-items-center h-screen">
        <p>Failed to load profile.</p>
      </div>
    );
  }

  return (
    <div className="p-2 lg:p-4 max-w-5xl mx-auto ">
      <Toast ref={toast} />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-column gap-4"
      >
        {/* Header */}
        <div className="flex flex-column gap-1">
          <h1 className="text-3xl font-bold text-900 m-0">Settings</h1>
          <p className="text-500 font-medium">
            Manage your account and app preferences
          </p>
        </div>

        <div className="grid">
          {/* Left Column: Profile Card */}
          <div className="col-12 lg:col-4 mb-3">
            <motion.div variants={itemVariants}>
              <Card className="border-round-2xl shadow-1 text-center py-3">
                <div className="flex justify-content-center mb-3">
                  <Avatar
                    icon="pi pi-user"
                    size="xlarge"
                    shape="circle"
                    className={`bg-primary-100 text-primary p-3 ${styles.profileAvatar}`}
                  />
                </div>
                <h2 className="text-xl font-bold text-900 mb-1">{user.name}</h2>
                <p className="text-500 mb-2 text-sm">{user.email}</p>
                <Tag
                  value="Free Plan" // user.plan is not in the API response currently
                  severity="info"
                  className="px-2 py-1 font-bold text-sm"
                />

                <Divider className="my-3" />

                <div className="flex flex-column gap-2 text-left px-2">
                  <div className="flex justify-content-between text-sm">
                    <span className="text-500">Member since</span>
                    <span className="text-900 font-semibold">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-content-between text-sm">
                    <span className="text-500">Phone Number</span>
                    <span className="text-900 font-semibold">
                      {user.phoneNumber}
                    </span>
                  </div>
                  <div className="flex justify-content-between text-sm">
                    <span className="text-500">Address</span>
                    <span className="text-900 font-semibold">
                      {user.address}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column: Settings Sections */}
          <div className="col-12 lg:col-8">
            <div className="flex flex-column gap-3">
              {/* Account Settings */}
              <motion.div variants={itemVariants}>
                <Card
                  title="Account Settings"
                  className="border-round-2xl shadow-1"
                >
                  <div className="p-fluid flex flex-column gap-3">
                    <div className="field mb-0">
                      <label
                        htmlFor="name"
                        className="font-bold text-900 mb-1 block text-sm"
                      >
                        Full Name
                      </label>
                      <InputText
                        id="name"
                        defaultValue={user.name}
                        className="p-2 border-round-xl text-sm"
                      />
                    </div>
                    <div className="field mb-0">
                      <label
                        htmlFor="email"
                        className="font-bold text-900 mb-1 block text-sm"
                      >
                        Email Address
                      </label>
                      <InputText
                        id="email"
                        defaultValue={user.email}
                        disabled
                        className="p-2 border-round-xl text-sm"
                      />
                    </div>
                    <div className="field mb-0">
                      <label
                        htmlFor="phone"
                        className="font-bold text-900 mb-1 block text-sm"
                      >
                        Phone Number
                      </label>
                      <InputText
                        id="phone"
                        defaultValue={user.phoneNumber}
                        className="p-2 border-round-xl text-sm"
                      />
                    </div>
                    <div className="field mb-0">
                      <label
                        htmlFor="address"
                        className="font-bold text-900 mb-1 block text-sm"
                      >
                        Address
                      </label>
                      <InputText
                        id="address"
                        defaultValue={user.address}
                        className="p-2 border-round-xl text-sm"
                      />
                    </div>
                    <div className="flex gap-2 justify-content-end mt-1">
                      <Button
                        label="Update Profile"
                        icon="pi pi-check"
                        className="p-button-raised border-round-xl px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Preferences */}
              <motion.div variants={itemVariants}>
                <Card title="Preferences" className="border-round-2xl shadow-1">
                  <div className="flex flex-column gap-2">
                    <div className="flex align-items-center justify-content-between p-2 border-round-xl hover:surface-50 cursor-pointer transition-colors duration-200">
                      <div className="flex align-items-center gap-2">
                        <i className="pi pi-palette text-lg text-primary"></i>
                        <div className="flex flex-column">
                          <span className="font-bold text-900 text-sm">
                            Appearance
                          </span>
                          <span className="text-500 text-xs">
                            Dark mode, colors, and layout
                          </span>
                        </div>
                      </div>
                      <i className="pi pi-chevron-right text-400 text-sm"></i>
                    </div>

                    <div className="flex align-items-center justify-content-between p-2 border-round-xl hover:surface-50 cursor-pointer transition-colors duration-200">
                      <div className="flex align-items-center gap-2">
                        <i className="pi pi-bell text-lg text-primary"></i>
                        <div className="flex flex-column">
                          <span className="font-bold text-900 text-sm">
                            Notifications
                          </span>
                          <span className="text-500 text-xs">
                            Manage your alert preferences
                          </span>
                        </div>
                      </div>
                      <i className="pi pi-chevron-right text-400 text-sm"></i>
                    </div>

                    <div className="flex align-items-center justify-content-between p-2 border-round-xl hover:surface-50 cursor-pointer transition-colors duration-200">
                      <div className="flex align-items-center gap-2">
                        <i className="pi pi-lock text-lg text-primary"></i>
                        <div className="flex flex-column">
                          <span className="font-bold text-900 text-sm">
                            Security
                          </span>
                          <span className="text-500 text-xs">
                            Password and authentication settings
                          </span>
                        </div>
                      </div>
                      <i className="pi pi-chevron-right text-400 text-sm"></i>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Danger Zone */}
              <motion.div variants={itemVariants}>
                <Card className="border-round-2xl border-1 border-red-100 bg-red-50">
                  <div className="flex align-items-center justify-content-between">
                    <div className="flex flex-column gap-1">
                      <span className="font-bold text-red-700 text-sm">
                        Delete Account
                      </span>
                      <span className="text-red-500 text-xs">
                        Permanently remove your account and all data
                      </span>
                    </div>
                    <Button
                      label="Delete"
                      severity="danger"
                      text
                      className="font-bold text-sm"
                      loading={deleteLoading}
                      onClick={handleDeleteUser}
                    />
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
