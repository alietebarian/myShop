import { useForm } from "react-hook-form";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import type { LoginRequest } from "../../../lib/types/types";
import AuthInput from "./AuthInput";
import Spinner from "../../components/ui/Spinner";

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface LoginFormProps {
  defaultEmail?: string;
  onSubmit: (data: LoginRequest) => Promise<void>;
}

function LoginForm({ defaultEmail = "", onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({ mode: "onTouched", defaultValues: { email: defaultEmail, password: "" } });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <AuthInput
        icon={<MdOutlineEmail />}
        label="ایمیل"
        type="email"
        dir="ltr"
        autoComplete="email"
        placeholder="name@example.com"
        error={errors.email?.message}
        {...register("email", {
          required: "ایمیل خود را وارد کنید",
          pattern: { value: emailPattern, message: "ایمیل واردشده معتبر نیست" },
        })}
      />
      <AuthInput
        icon={<RiLockPasswordLine />}
        label="رمز عبور"
        type="password"
        dir="ltr"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password", { required: "رمز عبور خود را وارد کنید" })}
      />

      <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg mt-2 w-full">
        {isSubmitting && <Spinner />}
        {isSubmitting ? "در حال ورود…" : "ورود به حساب"}
      </button>
    </form>
  );
}

export default LoginForm;
