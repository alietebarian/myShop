import { Link } from "react-router-dom";
import { LuSparkles, LuFlame, LuHammer } from "react-icons/lu";

const points = [
  {
    icon: LuSparkles,
    title: "زیبایی ماندگار",
    desc: "درخشش و رنگ گرم مس، هر فضایی را اصیل و دلنشین می‌کند و با گذر زمان زیباتر می‌شود.",
  },
  {
    icon: LuFlame,
    title: "رسانایی و کیفیت بالا",
    desc: "مس خالص با ضخامت استاندارد؛ حرارت را یکنواخت پخش می‌کند و در برابر ضربه مقاوم است.",
  },
  {
    icon: LuHammer,
    title: "ساخت دست‌ساز",
    desc: "هر قطعه به دست استادکاران چکش‌کاری می‌شود؛ اثری یکتا که مشابه آن را جای دیگری نمی‌یابید.",
  },
];

export default function WhyCopper() {
  return (
    <section id="why-copper" className="container-page scroll-mt-32 py-16 md:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <span className="text-xs font-bold tracking-wide text-copper-600">چرا مس‌کده</span>
          <h2 className="mt-1.5 font-display text-3xl leading-snug text-ink md:text-4xl">
            مسی که برایش وقت گذاشته‌ایم
          </h2>
          <p className="mt-4 max-w-md text-sm leading-8 text-stone-600">
            ما هر محصول را مستقیم از کارگاه‌های مسگری انتخاب می‌کنیم تا ظرفی سالم، اصیل و ماندگار به دست شما برسد.
          </p>
          <Link to="/products" className="btn btn-primary mt-6">
            شروع خرید
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {points.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-patina-50 text-2xl text-patina-600">
                <Icon />
              </span>
              <h3 className="font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-stone-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
