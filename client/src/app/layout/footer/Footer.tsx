import { Link } from "react-router-dom";
import { FaInstagram, FaTelegram } from "react-icons/fa";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { LuTruck, LuShieldCheck, LuHammer, LuHeadphones } from "react-icons/lu";
import Logo from "../../components/ui/Logo";

const perks = [
  { icon: LuTruck, title: "ارسال به سراسر کشور", desc: "بسته‌بندی ایمن و مخصوص ظروف" },
  { icon: LuShieldCheck, title: "ضمانت اصالت کالا", desc: "مس خالص با کیفیت تضمینی" },
  { icon: LuHammer, title: "کاملاً دست‌ساز", desc: "ساخته استادکاران مس" },
  { icon: LuHeadphones, title: "پشتیبانی پاسخگو", desc: "همراه شما قبل و بعد از خرید" },
];

function Footer() {
  return (
    <footer className="mt-20 md:mt-28">
      {/* Perks strip */}
      <div className="border-y border-line bg-white">
        <div className="container-page grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-copper-50 text-2xl text-copper-600">
                <Icon />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">{title}</p>
                <p className="mt-0.5 text-xs text-stone-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-ink text-cream-200">
        <div className="hammered-texture-light h-1.5 w-full bg-copper-700" />

        <div className="container-page grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Logo tone="light" />
            <p className="max-w-xs text-sm leading-7 text-stone-400">
              فروشگاه تخصصی ظروف مسی دست‌ساز؛ محصولاتی اصیل و ماندگار برای آشپزخانه، پذیرایی و دکوراسیون منزل شما.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-cream">دسترسی سریع</h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><Link to="/" className="transition-colors hover:text-copper-300">صفحه اصلی</Link></li>
              <li><Link to="/products" className="transition-colors hover:text-copper-300">همه محصولات</Link></li>
              <li><Link to="/cart" className="transition-colors hover:text-copper-300">سبد خرید</Link></li>
              <li><Link to="/orders" className="transition-colors hover:text-copper-300">پیگیری سفارش‌ها</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-cream">تماس با ما</h3>
            <ul className="space-y-3.5 text-sm text-stone-400">
              <li className="flex items-center gap-2.5">
                <FiPhone className="shrink-0 text-copper-300" />
                <a href="tel:09121234567" className="transition-colors hover:text-copper-300">۰۹۱۲۱۲۳۴۵۶۷</a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMapPin className="shrink-0 text-copper-300" />
                <span>تهران، بازار مس</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-cream">همراه ما باشید</h3>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="اینستاگرام مس‌کده"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-700 transition-colors hover:bg-copper-600 hover:text-white"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                aria-label="تلگرام مس‌کده"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-700 transition-colors hover:bg-copper-600 hover:text-white"
              >
                <FaTelegram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-ink-700">
          <p className="container-page py-5 text-center text-xs text-stone-400">
            © {new Date().toLocaleDateString("fa-IR", { year: "numeric" })} مس‌کده — تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
