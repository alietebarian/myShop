import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  center?: boolean;
}

export default function SectionHeading({ eyebrow, title, description, action, center }: SectionHeadingProps) {
  return (
    <div
      className={`mb-8 flex flex-col gap-4 sm:flex-row sm:items-end ${
        center ? "items-center text-center sm:justify-center" : "sm:justify-between"
      }`}
    >
      <div>
        {eyebrow && <span className="text-xs font-bold tracking-wide text-copper-600">{eyebrow}</span>}
        <h2 className="mt-1.5 font-display text-3xl text-ink md:text-[2rem]">{title}</h2>
        {description && <p className="mt-2 max-w-xl text-sm leading-7 text-stone-600">{description}</p>}
      </div>
      {action}
    </div>
  );
}
