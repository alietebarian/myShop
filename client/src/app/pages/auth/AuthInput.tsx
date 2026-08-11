import React from "react";

function AuthInput({
  label,
  type,
  placeholder,
  icon,
  name,
  value,
  onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full">
      {/* لیبل */}
      <label className="block text-sm font-medium text-gray-700 mb-1.5 text-right">
        {label}
      </label>

      {/* کانتینر اینپوت + آیکون */}
      <div className="relative">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
          {icon}
        </div>

        {/* اینپوت */}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          dir="rtl"
          className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-300 rounded-sm text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9a5322] focus:border-transparent transition-all duration-200 text-right"
        />
      </div>
    </div>
  );
}

export default AuthInput;
