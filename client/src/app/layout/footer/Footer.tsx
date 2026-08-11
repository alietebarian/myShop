import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTelegram,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer dir="rtl" className="mt-24 bg-ink text-cream-200">
      {/* hammered texture strip -- signature detail carried into the footer */}
      <div className="hammered-texture-light h-2 w-full bg-copper-800" />

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="font-display text-3xl tracking-wide text-copper-300">
              مس‌کده
            </h2>

            <p className="text-sm leading-7 text-stone-400">
              فروشگاه تخصصی ظروف مسی دست‌ساز. ارائه محصولات با کیفیت برای
              آشپزخانه، پذیرایی و دکوراسیون منزل.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-cream">
              دسترسی سریع
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="transition hover:text-copper-300">
                  صفحه اصلی
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="transition hover:text-copper-300"
                >
                  محصولات
                </Link>
              </li>

              <li>
                <Link to="/cart" className="transition hover:text-copper-300">
                  سبد خرید
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="transition hover:text-copper-300"
                >
                  ورود / ثبت نام
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-cream">پشتیبانی</h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <FaPhone className="text-copper-300" />

                <span>۰۹۱۲۱۲۳۴۵۶۷</span>
              </li>

              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-copper-300" />

                <span>تهران، بازار مس</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-cream">
              همراه ما باشید
            </h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-700 transition hover:bg-copper-600 hover:text-cream"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-700 transition hover:bg-copper-600 hover:text-cream"
              >
                <FaTelegram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-ink-700 py-5 text-center text-sm text-stone-400">
        <p>© {new Date().getFullYear()} مس‌کده. تمامی حقوق محفوظ است.</p>
      </div>
    </footer>
  );
}

export default Footer;
