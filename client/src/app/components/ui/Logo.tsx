import { Link } from "react-router-dom";

export function CopperMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={`shrink-0 ${className}`} aria-hidden>
      <circle cx="24" cy="24" r="23" fill="#b96b2c" />
      <path d="M13 20c2-6 8-10 11-10s9 4 11 10c-2 3-6 4-11 4s-9-1-11-4Z" fill="#7c421f" />
      <ellipse cx="24" cy="20" rx="11" ry="3.4" fill="#e2ab77" />
      <path
        d="M14 22c0 7 4.5 13 10 13s10-6 10-13"
        stroke="#3f2316"
        strokeWidth="1.4"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

interface LogoProps {
  tone?: "dark" | "light";
  showTagline?: boolean;
  onClick?: () => void;
}

export default function Logo({ tone = "dark", showTagline = true, onClick }: LogoProps) {
  return (
    <Link to="/" onClick={onClick} className="flex shrink-0 items-center gap-2.5" aria-label="مس‌کده - صفحه اصلی">
      <CopperMark />
      <div className="flex flex-col leading-tight">
        <span
          className={`font-display text-2xl tracking-wide ${
            tone === "dark" ? "text-copper-700" : "text-copper-300"
          }`}
        >
          مس‌کده
        </span>
        {showTagline && (
          <span
            className={`text-[10px] font-medium ${
              tone === "dark" ? "text-stone-500" : "text-stone-400"
            }`}
          >
            ظروف و صنایع دستی مسی
          </span>
        )}
      </div>
    </Link>
  );
}
