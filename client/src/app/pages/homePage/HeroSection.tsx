import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-l from-amber-100 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
            زیبایی و اصالت
            <span className="text-amber-700"> ظروف مسی</span>
          </h1>

          <p className="text-gray-600 text-lg leading-8">
            خرید ظروف مسی دست‌ساز با کیفیت بالا، مناسب آشپزخانه، پذیرایی و
            دکوراسیون منزل
          </p>

          <Link
            to="/products"
            className="inline-block bg-amber-600 hover:bg-amber-700 
            text-white px-8 py-3 rounded-full transition"
          >
            مشاهده محصولات
          </Link>
        </div>

        <div className="h-80 bg-amber-200 rounded-3xl flex items-center justify-center">
          <span className="text-8xl">🥘</span>
        </div>
      </div>
    </section>
  );
}
