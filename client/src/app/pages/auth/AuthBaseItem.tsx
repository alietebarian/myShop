import React from "react";

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function AuthBaseItem({ icon, title, description }: Props) {
  return (
      <div className="flex flex-col gap-4">

      <div className="text-right flex gap-3 items-center">
        <h3 className="text-lg font-bold text-[#221a15]">{title}</h3>
      <div className="text-2xl text-[#b96b2c] mt-1">{icon}</div>

      </div>
        <p className="mt-1 text-sm text-[#6f6055]">{description}</p>
    </div>
  );
}

export default AuthBaseItem;
