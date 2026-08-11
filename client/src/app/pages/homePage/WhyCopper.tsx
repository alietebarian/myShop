export default function WhyCopper() {
  const points = [
    {
      title: "زیبایی ماندگار",
      desc: "درخشش و رنگ گرم مس، هر فضایی را اصیل و دلنشین می‌کند.",
      icon: (
        <path
          d="M12 3v3m0 12v3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M3 12h3m12 0h3M4.2 19.8l2.1-2.1m11.4-11.4 2.1-2.1"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ),
    },
    {
      title: "کیفیت بالا",
      desc: "مس خالص با ضخامت استاندارد، مقاوم در برابر ضربه و حرارت.",
      icon: (
        <path
          d="M12 21c4-4 7-7.5 7-11.5A7 7 0 0 0 5 9.5C5 13.5 8 17 12 21Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      ),
    },
    {
      title: "ساخت دست‌ساز",
      desc: "چکش‌کاری‌شده به‌دست استادکاران، هر قطعه اثری یکتاست.",
      icon: (
        <path
          d="M4 15l7-7m0 0 6-6 3 3-6 6m-3-3 3 3M5 20l3-3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
    },
  ];

  return (
    <section id="why-copper" className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-10 text-center">
        <span className="text-xs font-bold tracking-widest text-copper-600">
          چرا مس‌کده
        </span>
        <h2 className="mt-2 font-display text-3xl text-ink">
          مسی که برایش وقت گذاشته‌ایم
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {points.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-copper-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-copper-50 text-copper-700">
              <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                {item.icon}
              </svg>
            </div>

            <h3 className="font-bold text-xl text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
