import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";

export default function SettingsPage() {
  const user = {
    name: "Current User",
    email: "user@example.com",
    plan: "Free Plan",
    joined: "January 2026",
  };

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

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-column gap-6"
      >
        {/* Header */}
        <div className="flex flex-column gap-1">
          <h1 className="text-4xl font-bold text-900 m-0">Settings</h1>
          <p className="text-600 font-medium">
            Manage your account and app preferences
          </p>
        </div>

        <div className="grid">
          {/* Left Column: Profile Card */}
          <div className="col-12 lg:col-4 mb-4">
            <motion.div variants={itemVariants}>
              <Card className="border-round-2xl shadow-1 text-center py-4">
                <div className="flex justify-content-center mb-4">
                  <Avatar
                    icon="pi pi-user"
                    size="xlarge"
                    shape="circle"
                    className="bg-primary-100 text-primary p-4"
                    style={{
                      width: "100px",
                      height: "100px",
                      fontSize: "3rem",
                    }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-900 mb-1">
                  {user.name}
                </h2>
                <p className="text-600 mb-3">{user.email}</p>
                <Tag
                  value={user.plan}
                  severity="info"
                  className="px-3 py-1 font-bold"
                />

                <Divider className="my-4" />

                <div className="flex flex-column gap-2 text-left px-2">
                  <div className="flex justify-content-between text-sm">
                    <span className="text-600">Member since</span>
                    <span className="text-900 font-semibold">
                      {user.joined}
                    </span>
                  </div>
                  <div className="flex justify-content-between text-sm">
                    <span className="text-600">Tasks Created</span>
                    <span className="text-900 font-semibold">12</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column: Settings Sections */}
          <div className="col-12 lg:col-8">
            <div className="flex flex-column gap-4">
              {/* Account Settings */}
              <motion.div variants={itemVariants}>
                <Card
                  title="Account Settings"
                  className="border-round-2xl shadow-1"
                >
                  <div className="p-fluid flex flex-column gap-4">
                    <div className="field">
                      <label
                        htmlFor="name"
                        className="font-bold text-900 mb-2 block"
                      >
                        Full Name
                      </label>
                      <InputText
                        id="name"
                        defaultValue={user.name}
                        className="p-3 border-round-xl"
                      />
                    </div>
                    <div className="field">
                      <label
                        htmlFor="email"
                        className="font-bold text-900 mb-2 block"
                      >
                        Email Address
                      </label>
                      <InputText
                        id="email"
                        defaultValue={user.email}
                        disabled
                        className="p-3 border-round-xl"
                      />
                    </div>
                    <div className="flex gap-2 justify-content-end mt-2">
                      <Button
                        label="Update Profile"
                        icon="pi pi-check"
                        className="p-button-raised border-round-xl px-4"
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Preferences */}
              <motion.div variants={itemVariants}>
                <Card title="Preferences" className="border-round-2xl shadow-1">
                  <div className="flex flex-column gap-3">
                    <div className="flex align-items-center justify-content-between p-3 border-round-xl hover:surface-50 cursor-pointer transition-colors duration-200">
                      <div className="flex align-items-center gap-3">
                        <i className="pi pi-palette text-xl text-primary"></i>
                        <div className="flex flex-column">
                          <span className="font-bold text-900">Appearance</span>
                          <span className="text-600 text-sm">
                            Dark mode, colors, and layout
                          </span>
                        </div>
                      </div>
                      <i className="pi pi-chevron-right text-400"></i>
                    </div>

                    <div className="flex align-items-center justify-content-between p-3 border-round-xl hover:surface-50 cursor-pointer transition-colors duration-200">
                      <div className="flex align-items-center gap-3">
                        <i className="pi pi-bell text-xl text-primary"></i>
                        <div className="flex flex-column">
                          <span className="font-bold text-900">
                            Notifications
                          </span>
                          <span className="text-600 text-sm">
                            Manage your alert preferences
                          </span>
                        </div>
                      </div>
                      <i className="pi pi-chevron-right text-400"></i>
                    </div>

                    <div className="flex align-items-center justify-content-between p-3 border-round-xl hover:surface-50 cursor-pointer transition-colors duration-200">
                      <div className="flex align-items-center gap-3">
                        <i className="pi pi-lock text-xl text-primary"></i>
                        <div className="flex flex-column">
                          <span className="font-bold text-900">Security</span>
                          <span className="text-600 text-sm">
                            Password and authentication settings
                          </span>
                        </div>
                      </div>
                      <i className="pi pi-chevron-right text-400"></i>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Danger Zone */}
              <motion.div variants={itemVariants}>
                <Card className="border-round-2xl border-1 border-red-100 bg-red-50">
                  <div className="flex align-items-center justify-content-between">
                    <div className="flex flex-column gap-1">
                      <span className="font-bold text-red-700">
                        Delete Account
                      </span>
                      <span className="text-red-500 text-sm">
                        Permanently remove your account and all data
                      </span>
                    </div>
                    <Button
                      label="Delete"
                      severity="danger"
                      text
                      className="font-bold"
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
