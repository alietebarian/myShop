import AuthInput from "./AuthInput";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";

interface RegisterFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  onFirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLastNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function RegisterForm({
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPasswordChange,
  onPhoneNumberChange
}: RegisterFormProps) {
  return (
    <div className="flex flex-col gap-6">
      <AuthInput
        icon={<FaRegUser />}
        label="نام"
        placeholder="نام خود را وارد کنید"
        type="text"
        name="firstName"
        value={firstName}
        onChange={onFirstNameChange}
      />
      <AuthInput
        icon={<FaRegUser />}
        label="نام خانوادگی"
        placeholder="نام خانوادگی خود را وارد کنید"
        type="text"
        name="lastName"
        value={lastName}
        onChange={onLastNameChange}
      />
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
      <AuthInput
        icon={<FiPhone />}
        label="شماره تلفن"
        placeholder="شماره تلفن خود را وارد کنید"
        type="text"
        name="phoneNumber"
        value={phoneNumber}
        onChange={onPhoneNumberChange}
      />
    </div>
  );
}

export default RegisterForm;
