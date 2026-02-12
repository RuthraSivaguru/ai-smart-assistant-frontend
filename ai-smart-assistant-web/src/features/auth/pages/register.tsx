import { useState } from "react";
import { registerApi } from "../api/auth.api";
import { RegisterSchema } from "../schemas/register.schema";
import { EnterpriseCard } from "../../../components/EnterpriseCard";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useNavigate } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const parsed = RegisterSchema.safeParse(form);
    console.log(parsed);
    if (!parsed.success) {
      return alert("Invalid input");
    }

    setLoading(true);
    try {
      await registerApi(form);
      alert("Registration successful");
      navigate({ to: "/login" });
    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const footer = (
    <div className="flex flex-column gap-3 mt-4">
      <Button
        label="Create Account"
        icon="pi pi-user-plus"
        loading={loading}
        onClick={submit}
        className="w-full p-button-raised p-button-primary border-round-xl py-3 font-bold"
      />
      <div className="flex align-items-center justify-content-center">
        <span className="text-gray-500 text-sm">Already have an account?</span>
        <Button
          label="Sign In"
          link
          className="p-0 ml-2 font-bold text-primary-600"
          onClick={() => navigate({ to: "/login" })}
        />
      </div>
    </div>
  );

  return (
    <EnterpriseCard
      title="Create Account"
      subtitle="Join us today"
      footer={footer}
    >
      <div className="flex flex-column gap-4 mt-2">
        <motion.div variants={itemVariants} className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon bg-white border-round-left-2xl border-none surface-100">
            <i className="pi pi-user text-primary-500"></i>
          </span>
          <span className="p-float-label">
            <InputText
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border-none surface-100 border-round-right-2xl py-3 border-white-200"
            />
            <label htmlFor="name" className="ml-2 -mt-1 text-gray-500">
              Full Name
            </label>
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon bg-white border-round-left-2xl border-none surface-100">
            <i className="pi pi-envelope text-primary-500"></i>
          </span>
          <span className="p-float-label">
            <InputText
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border-none surface-100 border-round-right-2xl py-3"
            />
            <label htmlFor="email" className="ml-2 -mt-1 text-gray-500">
              Email Address
            </label>
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon bg-white border-round-left-2xl border-none surface-100">
            <i className="pi pi-lock text-primary-500"></i>
          </span>
          <div className="p-float-label w-full p-fluid">
            <Password
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              toggleMask
              className="w-full"
              inputStyle={{ width: "100%" }}
              inputClassName="w-full border-none surface-100 border-round-right-2xl py-3"
            />
            <label htmlFor="password" className="ml-2 -mt-1 text-gray-500">
              Password
            </label>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon bg-white border-round-left-2xl border-none surface-100">
            <i className="pi pi-map-marker text-primary-500"></i>
          </span>
          <span className="p-float-label">
            <InputText
              id="address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full border-none surface-100 border-round-right-2xl py-3"
            />
            <label htmlFor="address" className="ml-2 -mt-1 text-gray-500">
              Address
            </label>
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon bg-white border-round-left-2xl border-none surface-100">
            <i className="pi pi-phone text-primary-500"></i>
          </span>
          <span className="p-float-label">
            <InputText
              id="phoneNumber"
              value={form.phoneNumber}
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
              className="w-full border-none surface-100 border-round-right-2xl py-3"
            />
            <label htmlFor="phoneNumber" className="ml-2 -mt-1 text-gray-500">
              Phone Number
            </label>
          </span>
        </motion.div>
      </div>
    </EnterpriseCard>
  );
}
