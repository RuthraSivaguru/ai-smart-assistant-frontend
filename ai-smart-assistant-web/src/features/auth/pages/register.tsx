import { useState } from "react";
import { registerApi } from "../api/auth.api";
import { RegisterSchema } from "../schemas/register.schema";
import { EnterpriseCard } from "../../../components/EnterpriseCard";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useNavigate } from "@tanstack/react-router";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
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

  const footer = (
    <div className="flex flex-column gap-2">
      <Button
        label="Create Account"
        icon="pi pi-user-plus"
        loading={loading}
        onClick={submit}
        className="w-full p-button-raised"
      />
      <Button
        label="Already have an account? Login"
        icon="pi pi-sign-in"
        className="w-full p-button-outlined"
        onClick={() => navigate({ to: "/login" })}
      />
    </div>
  );

  return (
    <EnterpriseCard
      title="Create Account"
      subtitle="Join us today"
      footer={footer}
    >
      <div className="flex flex-column gap-4 mt-2">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <span className="p-float-label">
            <InputText
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full"
            />
            <label htmlFor="name">Full Name</label>
          </span>
        </div>

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
