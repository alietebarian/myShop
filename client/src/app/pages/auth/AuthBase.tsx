import { LuShieldCheck, LuTruck, LuRefreshCw, LuHammer } from "react-icons/lu";
import Logo from "../../components/ui/Logo";
import AuthBaseItem from "./AuthBaseItem";

/** Brand panel shown beside the form on large screens. */
function AuthBase() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-ink p-10 xl:p-14">
      <div className="hammered-texture-light absolute inset-0 opacity-40" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-copper-700/30 blur-3xl" />

      <div className="relative">
        <Logo tone="light" />
        <h1 className="mt-14 font-display text-5xl leading-[1.35] text-cream">
          به خانواده
          <br />
          <span className="text-copper-400">مس‌کده</span> بپیوندید
        </h1>
        <p className="mt-5 max-w-sm text-sm leading-7 text-stone-400">
          با ساخت حساب کاربری، سفارش‌هایتان را ثبت و پیگیری کنید و از جدیدترین ظروف مسی دست‌ساز باخبر شوید.
        </p>
      </div>

      <div className="relative grid grid-cols-2 gap-6">
        <AuthBaseItem icon={<LuShieldCheck />} title="خرید امن" description="ضمانت اصالت کالا" />
        <AuthBaseItem icon={<LuTruck />} title="ارسال ایمن" description="بسته‌بندی مخصوص ظروف" />
        <AuthBaseItem icon={<LuHammer />} title="دست‌ساز" description="ساخت استادکاران مس" />
        <AuthBaseItem icon={<LuRefreshCw />} title="پیگیری آسان" description="وضعیت سفارش در لحظه" />
      </div>
    </div>
  );
}

export default AuthBase;
