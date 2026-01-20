import { useState } from "react";
import { LoginSchema } from "../schemas/login.schema";
import { loginApi } from "../api/auth.api";
import { useAuthStore } from "../../../store/auth.store";
import { EnterpriseCard } from "../../../components/EnterpriseCard";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useNavigate } from "@tanstack/react-router";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const parsed = LoginSchema.safeParse(form);
    console.log(parsed);
    if (!parsed.success) return;

    setLoading(true);
    try {
      const res = await loginApi(form);
      console.log("Login response", res);
      login(res.access_token);
      navigate({ to: "/dashboard" });
      alert("Login successful");
    } catch (error) {
      console.log("Login error", error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <div className="flex flex-column gap-2">
      <Button
        label="Sign In"
        icon="pi pi-sign-in"
        loading={loading}
        onClick={submit}
        className="w-full p-button-raised"
      />
      <Button
        label="Create Account"
        icon="pi pi-user-plus"
        className="w-full p-button-outlined"
        onClick={() => navigate({ to: "/register" })}
      />
    </div>
  );

  return (
    <EnterpriseCard
      title="Welcome Back"
      subtitle="Sign in to your account"
      footer={footer}
    >
      <div className="flex flex-column gap-4 mt-2">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-envelope"></i>
          </span>
          <span className="p-float-label">
            <InputText
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full"
            />
            <label htmlFor="email">Email Address</label>
          </span>
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-lock"></i>
          </span>
          <span className="p-float-label">
            <Password
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              toggleMask
              feedback={false}
              className="w-full"
              inputClassName="w-full"
            />
            <label htmlFor="password">Password</label>
          </span>
        </div>
      </div>
    </EnterpriseCard>
  );
}
