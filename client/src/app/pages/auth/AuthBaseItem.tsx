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
        <h3 className="text-lg font-bold text-[#1F1F1F]">{title}</h3>
      <div className="text-2xl text-[#C86B2A] mt-1">{icon}</div>

      </div>
        <p className="mt-1 text-sm text-[#6B6B6B]">{description}</p>
    </div>
  );
}

export default AuthBaseItem;
