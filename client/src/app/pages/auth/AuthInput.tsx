import { useState, type InputHTMLAttributes, type ReactNode, type Ref } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: ReactNode;
  error?: string;
  hint?: string;
  ref?: Ref<HTMLInputElement>;
}

function AuthInput({ label, icon, error, hint, type = "text", id, name, ref, ...rest }: AuthInputProps) {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? name;
  const isPassword = type === "password";
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="field-label">
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-lg text-stone-400">
          {icon}
        </span>

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={isPassword && visible ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`input pr-11 ${isPassword ? "pl-11" : ""} ${
            error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""
          }`}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
            className="absolute inset-y-0 left-0 flex w-11 items-center justify-center text-stone-400 transition-colors hover:text-ink"
          >
            {visible ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>

      {error ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="field-hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export default AuthInput;
