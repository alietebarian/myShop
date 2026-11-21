import { Link } from "react-router-dom";
import { CopperMark } from "../components/ui/Logo";

export default function NotFoundPage() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <CopperMark className="h-16 w-16 opacity-80" />
      <p className="mt-6 font-display text-6xl text-copper-600">۴۰۴</p>
      <h1 className="mt-3 text-xl font-bold text-ink">صفحه‌ای که دنبالش بودید پیدا نشد</h1>
      <p className="mt-2 max-w-sm text-sm leading-7 text-stone-600">
        ممکن است آدرس اشتباه وارد شده باشد یا این صفحه جابه‌جا شده باشد.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn btn-primary">بازگشت به صفحه اصلی</Link>
        <Link to="/products" className="btn btn-secondary">مشاهده محصولات</Link>
      </div>
    </div>
  );
}
