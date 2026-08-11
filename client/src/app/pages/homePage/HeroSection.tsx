import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* hammered-copper texture -- the signature motif of the page */}
      <div className="hammered-texture-light absolute inset-0 opacity-40" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-copper-700/30 blur-3xl" />
      <div className="absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-patina-600/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 py-20 md:grid-cols-2 md:py-28">
        <div className="space-y-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-copper-500/40 bg-copper-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-copper-300">
            <span className="h-1.5 w-1.5 rounded-full bg-patina-400" />
            دست‌ساز و اصیل، از دل کارگاه تا سفره شما
          </span>

          <h1 className="font-display text-5xl leading-[1.15] text-cream md:text-6xl">
            جایی که مس
            <br />
            <span className="text-copper-400">جان می‌گیرد</span>
          </h1>

          <p className="max-w-md text-lg leading-8 text-stone-400">
            ظروف مسی دست‌ساز با کیفیت بالا، چکش‌کاری‌شده توسط استادکاران مس؛
            مناسب آشپزخانه، پذیرایی و دکوراسیون منزل شما.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-copper-500 px-8 py-3.5 font-bold text-cream shadow-lg shadow-copper-900/40 transition hover:-translate-y-0.5 hover:bg-copper-400"
            >
              مشاهده محصولات
            </Link>

            <a
              href="#why-copper"
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-8 py-3.5 font-medium text-cream transition hover:border-copper-400 hover:text-copper-300"
            >
              چرا مس؟
            </a>
          </div>

          {/* trust strip */}
          <div className="grid grid-cols-3 gap-4 border-t border-cream/10 pt-7 text-center sm:text-right">
            <div>
              <p className="font-display text-2xl text-copper-300">۱۰۰٪</p>
              <p className="text-xs text-stone-400">مس خالص</p>
            </div>
            <div>
              <p className="font-display text-2xl text-copper-300">دستی</p>
              <p className="text-xs text-stone-400">چکش‌کاری سنتی</p>
            </div>
            <div>
              <p className="font-display text-2xl text-copper-300">ضمانت</p>
              <p className="text-xs text-stone-400">اصالت کالا</p>
            </div>
          </div>
        </div>

        {/* Illustration: a hammered copper vessel, not a stock emoji */}
        <div className="relative mx-auto flex h-80 w-80 items-center justify-center md:h-[420px] md:w-[420px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-copper-500/20 via-copper-700/10 to-transparent blur-2xl" />
          <svg
            viewBox="0 0 320 320"
            className="relative h-full w-full drop-shadow-2xl"
            fill="none"
          >
            <defs>
              <radialGradient id="potBody" cx="35%" cy="30%" r="80%">
                <stop offset="0%" stopColor="#e2ab77" />
                <stop offset="55%" stopColor="#b96b2c" />
                <stop offset="100%" stopColor="#7c421f" />
              </radialGradient>
              <linearGradient id="potNeck" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d1873f" />
                <stop offset="100%" stopColor="#9a5322" />
              </linearGradient>
            </defs>

            {/* handles */}
            <path
              d="M70 130c-30 0-30 55 0 55"
              stroke="#7c421f"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M250 130c30 0 30 55 0 55"
              stroke="#7c421f"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />

            {/* body */}
            <path
              d="M60 150c0-60 40-95 100-95s100 35 100 95c0 65-45 100-100 100S60 215 60 150Z"
              fill="url(#potBody)"
            />

            {/* hammered dimples -- ties to the hammered-texture motif */}
            <g fill="#7c421f" opacity="0.35">
              <circle cx="120" cy="110" r="4" />
              <circle cx="150" cy="95" r="4" />
              <circle cx="185" cy="100" r="4" />
              <circle cx="210" cy="120" r="4" />
              <circle cx="100" cy="150" r="4" />
              <circle cx="135" cy="140" r="4" />
              <circle cx="170" cy="150" r="4" />
              <circle cx="205" cy="145" r="4" />
              <circle cx="235" cy="155" r="4" />
              <circle cx="110" cy="190" r="4" />
              <circle cx="145" cy="200" r="4" />
              <circle cx="180" cy="205" r="4" />
              <circle cx="215" cy="195" r="4" />
            </g>

            {/* neck */}
            <path d="M130 55h60l8 30h-76l8-30Z" fill="url(#potNeck)" />
            <ellipse cx="160" cy="55" rx="30" ry="8" fill="#e2ab77" />

            {/* base */}
            <ellipse cx="160" cy="248" rx="55" ry="12" fill="#5e321c" />

            {/* patina highlight -- the signature accent, used once */}
            <path
              d="M95 165c8 30 30 50 65 50"
              stroke="#5f8672"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.55"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
