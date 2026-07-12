import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTelegram,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer dir="rtl" className="bg-gray-900 text-gray-300 mt-20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4 
          gap-10
        "
        >
          {/* Brand */}
          <div className="space-y-4">
            <h2
              className="
              text-3xl 
              font-extrabold 
              text-amber-500
            "
            >
              مس کده
            </h2>

            <p
              className="
              text-sm 
              leading-7 
              text-gray-400
            "
            >
              فروشگاه تخصصی ظروف مسی دست‌ساز. ارائه محصولات با کیفیت برای
              آشپزخانه، پذیرایی و دکوراسیون منزل.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="
              text-lg
              font-bold
              text-white
              mb-5
            "
            >
              دسترسی سریع
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-500 transition">
                  صفحه اصلی
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="hover:text-amber-500 transition"
                >
                  محصولات
                </Link>
              </li>

              <li>
                <Link to="/cart" className="hover:text-amber-500 transition">
                  سبد خرید
                </Link>
              </li>

              <li>
                <Link to="/login" className="hover:text-amber-500 transition">
                  ورود / ثبت نام
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3
              className="
              text-lg
              font-bold
              text-white
              mb-5
            "
            >
              پشتیبانی
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <FaPhone className="text-amber-500" />

                <span>۰۹۱۲۱۲۳۴۵۶۷</span>
              </li>

              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-amber-500" />

                <span>تهران، بازار مس</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3
              className="
              text-lg
              font-bold
              text-white
              mb-5
            "
            >
              همراه ما باشید
            </h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="
                w-10
                h-10
                rounded-full
                bg-gray-800
                flex
                items-center
                justify-center
                hover:bg-amber-600
                hover:text-white
                transition
                "
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="
                w-10
                h-10
                rounded-full
                bg-gray-800
                flex
                items-center
                justify-center
                hover:bg-amber-600
                hover:text-white
                transition
                "
              >
                <FaTelegram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        className="
        border-t 
        border-gray-800
        py-5
        text-center
        text-sm
        text-gray-500
      "
      >
        <p>© {new Date().getFullYear()} مس کده. تمامی حقوق محفوظ است.</p>
      </div>
    </footer>
  );
}

export default Footer;
