import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import type { RegisterRequest } from "../../../lib/types/types";
import AuthInput from "./AuthInput";
import Spinner from "../../components/ui/Spinner";
import { emailPattern } from "./LoginForm";

/** Converts Persian/Arabic digits to ASCII so "۰۹۱۲…" is accepted. */
const toEnDigits = (s: string) =>
  s.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

interface RegisterFormProps {
  onSubmit: (data: RegisterRequest) => Promise<void>;
}

function RegisterForm({ onSubmit }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>({
    mode: "onTouched",
    defaultValues: { firstName: "", lastName: "", email: "", password: "", phoneNumber: "" },
  });

  const submit = (data: RegisterRequest) =>
    onSubmit({
      ...data,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phoneNumber: toEnDigits(data.phoneNumber).replace(/\s/g, ""),
    });

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <AuthInput
          icon={<FaRegUser />}
          label="نام"
          autoComplete="given-name"
          error={errors.firstName?.message}
          {...register("firstName", {
            validate: (v) => v.trim().length > 0 || "نام خود را وارد کنید",
            maxLength: { value: 100, message: "حداکثر ۱۰۰ کاراکتر" },
          })}
        />
        <AuthInput
          icon={<FaRegUser />}
          label="نام خانوادگی"
          autoComplete="family-name"
          error={errors.lastName?.message}
          {...register("lastName", {
            validate: (v) => v.trim().length > 0 || "نام خانوادگی خود را وارد کنید",
            maxLength: { value: 100, message: "حداکثر ۱۰۰ کاراکتر" },
          })}
        />
      </div>
      <AuthInput
        icon={<FiPhone />}
        label="شماره موبایل"
        type="tel"
        dir="ltr"
        inputMode="numeric"
        autoComplete="tel"
        placeholder="09121234567"
        error={errors.phoneNumber?.message}
        {...register("phoneNumber", {
          validate: (v) => {
            const n = toEnDigits(v).replace(/\s/g, "");
            if (!n) return "شماره موبایل خود را وارد کنید";
            return /^09\d{9}$/.test(n) || "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود";
          },
        })}
      />
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
        autoComplete="new-password"
        hint="حداقل ۶ کاراکتر"
        error={errors.password?.message}
        {...register("password", {
          required: "یک رمز عبور انتخاب کنید",
          minLength: { value: 6, message: "رمز عبور باید حداقل ۶ کاراکتر باشد" },
        })}
      />

      <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg mt-2 w-full">
        {isSubmitting && <Spinner />}
        {isSubmitting ? "در حال ساخت حساب…" : "ساخت حساب کاربری"}
      </button>
    </form>
  );
}

export default RegisterForm;
