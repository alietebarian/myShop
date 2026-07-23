import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthBase from "./AuthBase";
import AuthHeader from "./AuthHeader";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

import { useAuth } from "../../../features/context/useAuth";
import { authApi } from "../../../lib/api/authApi";

function AuthPage() {
  const [btn, setBtn] = useState<"login" | "register">("login");

  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await authApi.login({
      email,
      password,
    });

    login(response.accessToken, {
      userId: response.userId,
      email: response.email,
      fullName: response.fullName,
      role: response.role
    });
        
    navigate("/");
  };

  const handleRegister = async () => {
    await authApi.register({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    });

    // بعد از ثبت نام فرم پاک شود
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");

    // انتقال به صفحه ورود
    setBtn("login");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (btn === "login") {
        await handleLogin();
      } else {
        await handleRegister();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AuthHeader />

      <div className="flex justify-between">

        {/* Right Side */}
        <div className="w-[30%]">
          <AuthBase />
        </div>
        {/* Left Side */}
        <div className="mx-auto mt-16">
          <div className="flex py-1 w-120">
            <button
              type="button"
              className={`flex-1 p-3 px-8 text-sm font-medium transition-all duration-300 cursor-pointer rounded-r-none ${
                btn === "login"
                  ? "bg-[#B5451A] text-white shadow-md border-2 border-[#B5451A]"
                  : "bg-transparent text-gray-600 hover:text-gray-800 border-2 border-gray-300"
              }`}
              onClick={() => setBtn("login")}
            >
              ورود به حساب کاربری
            </button>

            <button
              type="button"
              className={`flex-1 p-3 px-8 text-sm font-medium transition-all duration-300 cursor-pointer rounded-l-none ${
                btn === "register"
                  ? "bg-[#B5451A] text-white shadow-md border-2 border-[#B5451A]"
                  : "bg-transparent text-gray-600 hover:text-gray-800 border-2 border-gray-300"
              }`}
              onClick={() => setBtn("register")}
            >
              ثبت نام
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mt-8">
              <div className="text-right my-8">
                <span className="text-xl font-semibold">
                  {btn === "login"
                    ? "ورود به حساب کاربری"
                    : "ایجاد حساب کاربری"}
                </span>

                <div className="flex justify-end gap-1 pt-3">
                  <span
                    className="text-[#B5451A] border-b font-semibold cursor-pointer"
                    onClick={() =>
                      setBtn(btn === "login" ? "register" : "login")
                    }
                  >
                    {btn === "login" ? "ثبت نام کنید" : "وارد شوید"}
                  </span>

                  <span>
                    {btn === "login"
                      ? "حساب کاربری ندارید؟"
                      : "قبلا ثبت نام کرده اید؟"}
                  </span>
                </div>
              </div>

              {btn === "login" ? (
                <LoginForm
                  email={email}
                  password={password}
                  onEmailChange={(e) => setEmail(e.target.value)}
                  onPasswordChange={(e) => setPassword(e.target.value)}
                />
              ) : (
                <RegisterForm
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  password={password}
                  phoneNumber={phoneNumber}
                  onFirstNameChange={(e) => setFirstName(e.target.value)}
                  onLastNameChange={(e) => setLastName(e.target.value)}
                  onEmailChange={(e) => setEmail(e.target.value)}
                  onPasswordChange={(e) => setPassword(e.target.value)}
                  onPhoneNumberChange={(e) => setPhoneNumber(e.target.value)}
                />
              )}
            </div>

            <button
              type="submit"
              className="mt-12 w-full bg-[#B5451A] text-white py-3 cursor-pointer px-4 rounded-md hover:bg-[#9c3a15] focus:outline-none focus:ring-2 focus:ring-[#B5451A]"
            >
              {btn === "login" ? "ورود به حساب کاربری" : "ثبت نام"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
