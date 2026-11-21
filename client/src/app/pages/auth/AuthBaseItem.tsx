import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
}

function AuthBaseItem({ icon, title, description }: Props) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-copper-500/15 text-xl text-copper-300">
        {icon}
      </span>
      <div>
        <h3 className="text-sm font-bold text-cream">{title}</h3>
        <p className="mt-0.5 text-xs text-stone-400">{description}</p>
      </div>
    </div>
  );
}

export default AuthBaseItem;
