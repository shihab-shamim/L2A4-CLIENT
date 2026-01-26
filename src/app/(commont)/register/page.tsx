"use client";
import { createUser } from "@/actions/user.actions";
import { authClient } from "@/lib/auth-client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation"
import { toast } from "react-toastify";

/* =====================
   Types
===================== */
type UserRole = "STUDENT" | "TUTOR";

type RegisterValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  acceptTerms: boolean;
};

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

type RegisterFormProps = {
  loading?: boolean;
  onSubmit?: (values: Omit<RegisterValues, "confirmPassword">) => Promise<void> | void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ loading = false, onSubmit }) => {
   const router = useRouter();
  const [values, setValues] = useState<RegisterValues>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const validate = (v: RegisterValues): RegisterErrors => {
    const next: RegisterErrors = {};

    if (!v.fullName.trim()) next.fullName = "Full name is required.";
    else if (v.fullName.trim().length < 3) next.fullName = "Name must be at least 3 characters.";

    if (!v.email.trim()) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(v.email)) next.email = "Enter a valid email.";

    if (!v.password) next.password = "Password is required.";
    else if (v.password.length < 6) next.password = "Password must be at least 6 characters.";

    if (!v.confirmPassword) next.confirmPassword = "Confirm your password.";
    else if (v.confirmPassword !== v.password) next.confirmPassword = "Passwords do not match.";

    if (!v.role) next.role = "Role is required.";

    if (!v.acceptTerms) next.acceptTerms = "You must accept the terms.";

    return next;
  };

  const canSubmit = useMemo(() => Object.keys(validate(values)).length === 0, [values]);

  const handleChange = <K extends keyof RegisterValues>(key: K, val: RegisterValues[K]): void => {
    // value update
    setValues((prev) => {
      const next = { ...prev, [key]: val };
      return next;
    });

    // live validate: field valid হলে error remove; invalid হলে field error set
    setErrors((prev) => {
      const nextValues: RegisterValues = { ...values, [key]: val } as RegisterValues;
      const freshErrors = validate(nextValues);

      return {
        ...prev,
        [key]: freshErrors[key],
        // password change হলে confirmPassword mismatch recalc করা দরকার
        ...(key === "password" || key === "confirmPassword"
          ? { confirmPassword: freshErrors.confirmPassword }
          : {}),
      };
    });
  };

  const handleBlur = (key: keyof RegisterValues) => {
    const freshErrors = validate(values);
    setErrors((prev) => ({ ...prev, [key]: freshErrors[key] }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const eMap = validate(values);
    setErrors(eMap);
    if (Object.keys(eMap).length > 0) return;

    // ✅ required: click করলে console এ সব value দেখাবে
  
    const name=values.fullName
    const email=values.email
    const password=values.password
    const role=values.role
    const info={name,email,password,role}
 

   
   try {
    const {data,error}=await authClient.signUp.email(info)
    
    if(data?.user){
      toast("Registration success")
        router.push("/login");
        router.refresh();

      }
        if(error){
        toast(error.message)
      }
    
   } catch (error) {
    console.log("error from res",error);
    
   }

    const payload: Omit<RegisterValues, "confirmPassword"> = {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      password: values.password,
      role: values.role,
      acceptTerms: values.acceptTerms,
    };

    await onSubmit?.(payload);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mx-auto w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-white font-bold">
              SB
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Create your account</h1>
            <p className="mt-1 text-sm text-gray-600">Choose a role and start using SkillBridge.</p>
          </div>

          {/* Form */}
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* Role */}
            <div>
              <label className="text-xs font-semibold text-gray-700">I am a</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleChange("role", "STUDENT")}
                  className={[
                    "rounded-xl border px-4 py-3 text-sm font-semibold transition",
                    values.role === "STUDENT"
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-900 hover:bg-gray-50",
                  ].join(" ")}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => handleChange("role", "TUTOR")}
                  className={[
                    "rounded-xl border px-4 py-3 text-sm font-semibold transition",
                    values.role === "TUTOR"
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-900 hover:bg-gray-50",
                  ].join(" ")}
                >
                  Tutor
                </button>
              </div>
              {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role}</p>}
            </div>

            {/* Full name */}
            <div>
              <label className="text-xs font-semibold text-gray-700">Full Name</label>
              <input
                value={values.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                onBlur={() => handleBlur("fullName")}
                placeholder="Your name"
                className="mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900/20"
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-gray-700">Email</label>
              <input
                type="email"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900/20"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-gray-700">Password</label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  placeholder="••••••••"
                  className="w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="shrink-0 rounded-xl border px-3 py-3 text-xs font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-semibold text-gray-700">Confirm Password</label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  onBlur={() => handleBlur("confirmPassword")}
                  placeholder="••••••••"
                  className="w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="shrink-0 rounded-xl border px-3 py-3 text-xs font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={values.acceptTerms}
                  onChange={(e) => handleChange("acceptTerms", e.target.checked)}
                  onBlur={() => handleBlur("acceptTerms")}
                  className="mt-1 h-4 w-4 rounded border-gray-300"
                />
                <span>
                  I agree to the{" "}
                  <a href="/terms" className="font-semibold text-gray-900 hover:underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="font-semibold text-gray-900 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="mt-1 text-xs text-red-600">{errors.acceptTerms}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !canSubmit}
              className="w-full rounded-xl cursor-pointer bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            {/* Footer */}
            <p className="pt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="font-semibold text-gray-900 hover:underline">
                Login
              </a>
            </p>

            {/* Note */}
            <p className="text-center text-xs text-gray-500">
              Admin accounts are managed by the platform (seeded in database).
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
