import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthBase from "./AuthBase";
import AuthHeader from "./AuthHeader";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useAuth } from "../../../features/context/useAuth";
import { authApi } from "../../../lib/api/authApi";
import { getErrorMessage } from "../../../lib/hooks/getErrorMessage";
import type { LoginRequest, RegisterRequest } from "../../../lib/types/types";

type Mode = "login" | "register";

function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  if (token) return <Navigate to={from} replace />;

  const handleLogin = async (data: LoginRequest) => {
    try {
      const res = await authApi.login(data);
      login(res.accessToken, {
        userId: res.userId,
        email: res.email,
        fullName: res.fullName,
        role: res.role,
      });
      toast.success(`${res.fullName} عزیز، خوش آمدید`);
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error) || "ایمیل یا رمز عبور درست نیست.");
    }
  };

  const handleRegister = async (data: RegisterRequest) => {
    try {
      await authApi.register(data);
      toast.success("حساب شما ساخته شد. اکنون وارد شوید.");
      setRegisteredEmail(data.email);
      setMode("login");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const tab = (value: Mode, label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={mode === value}
      onClick={() => setMode(value)}
      className={`h-10 flex-1 rounded-lg text-sm font-semibold transition-colors ${
        mode === value ? "bg-white text-ink shadow-soft" : "text-stone-600 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex min-h-screen bg-cream">
      <aside className="sticky top-0 hidden h-screen w-[42%] max-w-xl lg:block">
        <AuthBase />
      </aside>

      <div className="flex flex-1 flex-col">
        <AuthHeader />

        <main className="flex flex-1 items-start justify-center px-4 pt-6 pb-16 sm:items-center sm:pt-0">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-extrabold text-ink">
              {mode === "login" ? "ورود به حساب کاربری" : "ساخت حساب کاربری"}
            </h1>
            <p className="mt-2 text-sm text-stone-600">
              {mode === "login" ? "حساب کاربری ندارید؟ " : "قبلاً ثبت‌نام کرده‌اید؟ "}
              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="font-semibold text-copper-700 hover:underline"
              >
                {mode === "login" ? "ثبت‌نام کنید" : "وارد شوید"}
              </button>
            </p>

            <div role="tablist" className="mt-6 flex gap-1 rounded-xl bg-cream-200/70 p-1">
              {tab("login", "ورود")}
              {tab("register", "ثبت‌نام")}
            </div>

            <div className="mt-6">
              {mode === "login" ? (
                <LoginForm key={registeredEmail} defaultEmail={registeredEmail} onSubmit={handleLogin} />
              ) : (
                <RegisterForm onSubmit={handleRegister} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AuthPage;
