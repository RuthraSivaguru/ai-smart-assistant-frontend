import { useAuthStore } from "../../../store/auth.store";
import { useAuth } from "../hooks/useAuth";
import { EnterpriseCard } from "../../../components/EnterpriseCard";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useNavigate } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin: loginAction } = useAuth();
  const form = useAuthStore((s) => s.loginForm);
  const setForm = useAuthStore((s) => s.setLoginForm);
  const loading = useAuthStore((s) => s.loginLoading);

  const submit = async () => {
    // Validation logic can stay or move to hook; keeping it here for now as per plan
    await loginAction();
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
        label="Sign In"
        icon="pi pi-sign-in"
        loading={loading}
        onClick={submit}
        className="w-full p-button-raised p-button-primary border-round-xl py-3 font-bold"
      />
      <div className="flex align-items-center justify-content-center">
        <span className="text-gray-500 text-sm">Don't have an account?</span>
        <Button
          label="Create Account"
          link
          className="p-0 ml-2 font-bold text-primary-600"
          onClick={() => navigate({ to: "/register" })}
        />
      </div>
    </div>
  );

  return (
    <EnterpriseCard
      title="Welcome Back"
      subtitle="Sign in to your account"
      footer={footer}
    >
      <div className="flex flex-column gap-4 mt-2">
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
          <span className="p-float-label w-full p-fluid">
            <Password
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              toggleMask
              feedback={false}
              className="w-full"
              inputStyle={{ width: "100%" }}
              inputClassName="w-full border-none surface-100 border-round-right-2xl py-3"
            />
            <label htmlFor="password" className="ml-2 -mt-1 text-gray-500">
              Password
            </label>
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex justify-content-end"
        >
          <Button
            label="Forgot Password?"
            link
            className="p-0 text-sm text-primary-600"
          />
        </motion.div>
      </div>
    </EnterpriseCard>
  );
}
