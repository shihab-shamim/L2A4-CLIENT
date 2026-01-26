"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";


type LoginValues = {
  email: string;
  password: string;
  remember: boolean;
};

type LoginErrors = Partial<Record<keyof LoginValues, string>>;

type LoginFormProps = {
  onSubmit?: (values: LoginValues) => Promise<void> | void;
  onGoogleLogin?: () => Promise<void> | void;
  loading?: boolean;
};

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onGoogleLogin,
  loading = false,
}) => {
   const router = useRouter();
  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
    remember: true,
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // IMPORTANT: submit চাপার আগে error দেখাবো না
  const [submitted, setSubmitted] = useState(false);

  const validate = (v: LoginValues): LoginErrors => {
    const next: LoginErrors = {};

    if (!v.email.trim()) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(v.email)) next.email = "Enter a valid email.";

    if (!v.password) next.password = "Password is required.";
    else if (v.password.length < 6)
      next.password = "Password must be at least 6 characters.";



    return next;
  };

  const canSubmit = useMemo(() => {
    // submitted না হলে disable করবো না (শুধু login ক্লিকেই validate হবে)
    if (!submitted) return true;

    const e = validate(values);
    return Object.keys(e).length === 0;
  }, [values, submitted]);

  const handleChange = <K extends keyof LoginValues>(
    key: K,
    val: LoginValues[K]
  ): void => {
    setValues((prev) => ({ ...prev, [key]: val }));

    // user টাইপ করলে ওই field এর error remove
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setSubmitted(true);

    const eMap = validate(values);
    setErrors(eMap);

    if (Object.keys(eMap).length > 0) return;


    
     try {
      const {data,error} =await authClient.signIn.email(values)
     if(data?.user){
      toast("log in success")
          router.push("/");
          router.refresh();
  
        }
          if(error){
          toast(error.message)
        }
      

      
     } catch (error) {
      toast.error("something is wrong");
      console.log(error);
      
     }


    await onSubmit?.(values);
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
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Login</h1>
            <p className="mt-1 text-sm text-gray-600">
              Access your dashboard and manage your sessions.
            </p>
          </div>

          {/* Form */}
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-gray-700">Email</label>
              <input
                type="email"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900/20"
              />
              {submitted && errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Password
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={(e) => handleChange("password", e.target.value)}
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
              {submitted && errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={values.remember}
                  onChange={(e) => handleChange("remember", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                />
                Remember me
              </label>

              <a
                href="/forgot-password"
                className="text-sm font-semibold text-gray-900 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !canSubmit}
              className="w-full rounded-xl bg-gray-900 cursor-pointer px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-2">
              <div className="h-px w-full bg-gray-200" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="h-px w-full bg-gray-200" />
            </div>

            {/* Google Login (optional) */}
            <button
              type="button"
              onClick={() => onGoogleLogin?.()}
              className="w-full rounded-xl border cursor-pointer bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Continue with Google
            </button>

            {/* Footer */}
            <p className="pt-2 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="font-semibold text-gray-900 hover:underline"
              >
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
