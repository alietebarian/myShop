import AuthInput from "./AuthInput";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


function LoginForm({ email, password, onEmailChange, onPasswordChange } : LoginFormProps) {
  return (
    <div className="flex flex-col gap-6">
      <AuthInput
        icon={<MdOutlineEmail />}
        label="ایمیل"
        placeholder="ایمیل خود را وارد کنید"
        type="email"
        name="email"
        value={email}
        onChange={onEmailChange}
      />
      <AuthInput
        icon={<RiLockPasswordLine />}
        label="رمز عبور"
        placeholder="رمز عبور خود را وارد کنید"
        type="password"
        name="password"
        value={password}
        onChange={onPasswordChange}
      />
    </div>
  );
}

export default LoginForm
