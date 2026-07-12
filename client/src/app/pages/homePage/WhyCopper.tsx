export default function WhyCopper() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid md:grid-cols-3 gap-6">
        {[
          ["✨", "زیبایی ماندگار"],
          ["🔥", "کیفیت بالا"],
          ["🖐", "ساخت دست‌ساز"],
        ].map((item) => (
          <div
            className="
bg-white
rounded-2xl
p-8
text-center
shadow-sm
border
"
          >
            <div className="text-4xl mb-4">{item[0]}</div>

            <h3 className="font-bold text-xl">{item[1]}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
