import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

function CopperVessel() {
  return (
    <svg viewBox="0 0 320 320" className="relative h-full w-full drop-shadow-2xl" fill="none" aria-hidden>
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
      <path d="M70 130c-30 0-30 55 0 55" stroke="#7c421f" strokeWidth="10" strokeLinecap="round" />
      <path d="M250 130c30 0 30 55 0 55" stroke="#7c421f" strokeWidth="10" strokeLinecap="round" />
      <path d="M60 150c0-60 40-95 100-95s100 35 100 95c0 65-45 100-100 100S60 215 60 150Z" fill="url(#potBody)" />
      <g fill="#7c421f" opacity="0.35">
        {[
          [120, 110], [150, 95], [185, 100], [210, 120], [100, 150], [135, 140], [170, 150],
          [205, 145], [235, 155], [110, 190], [145, 200], [180, 205], [215, 195],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
        ))}
      </g>
      <path d="M130 55h60l8 30h-76l8-30Z" fill="url(#potNeck)" />
      <ellipse cx="160" cy="55" rx="30" ry="8" fill="#e2ab77" />
      <ellipse cx="160" cy="248" rx="55" ry="12" fill="#5e321c" />
      <path d="M95 165c8 30 30 50 65 50" stroke="#5f8672" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="container-page pt-4 md:pt-6">
      <div className="relative overflow-hidden rounded-3xl bg-ink">
        <div className="hammered-texture-light absolute inset-0 opacity-40" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-copper-700/30 blur-3xl" />
        <div className="absolute right-0 -bottom-40 h-80 w-80 rounded-full bg-patina-600/10 blur-3xl" />

        <div className="relative grid grid-cols-1 items-center gap-8 px-6 py-12 sm:px-10 md:grid-cols-[1.1fr_1fr] md:py-16 lg:px-16 lg:py-20">
          <div className="space-y-6 text-center md:text-right">
            <span className="inline-flex items-center gap-2 rounded-full border border-copper-500/40 bg-copper-500/10 px-4 py-1.5 text-xs font-medium text-copper-300">
              <span className="h-1.5 w-1.5 rounded-full bg-patina-400" />
              دست‌ساز و اصیل، از کارگاه تا سفره شما
            </span>

            <h1 className="font-display text-4xl leading-[1.25] text-cream sm:text-5xl lg:text-6xl">
              جایی که مس <span className="text-copper-400">جان می‌گیرد</span>
            </h1>

            <p className="mx-auto max-w-md text-base leading-8 text-stone-400 md:mx-0 md:text-lg">
              ظروف مسی چکش‌کاری‌شده به دست استادکاران؛ برای آشپزخانه، پذیرایی و دکوراسیون خانه شما.
            </p>

            <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:justify-center md:justify-start">
              <Link to="/products" className="btn btn-lg bg-copper-500 text-white hover:bg-copper-400">
                خرید ظروف مسی
                <FiArrowLeft />
              </Link>
              <a
                href="#why-copper"
                className="btn btn-lg border border-cream/20 text-cream hover:border-copper-400 hover:text-copper-300"
              >
                چرا مس‌کده؟
              </a>
            </div>

            <dl className="grid grid-cols-3 gap-4 border-t border-cream/10 pt-6">
              {[
                ["۱۰۰٪", "مس خالص"],
                ["دستی", "چکش‌کاری سنتی"],
                ["ضمانت", "اصالت کالا"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-2xl text-copper-300">{value}</dd>
                  <dd className="mt-0.5 text-xs text-stone-400">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto hidden h-72 w-72 items-center justify-center sm:flex md:h-96 md:w-96">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-copper-500/25 via-copper-700/10 to-transparent blur-2xl" />
            <CopperVessel />
          </div>
        </div>
      </div>
    </section>
  );
}
