import HeroBanner from "@/components/HeroBanner";

export default function Home() {
  return (
    <div>
      <HeroBanner />

      <section className="border-b border-emerald-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 text-center sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { value: "50+", label: "Tourist Places" },
            { value: "2K+", label: "Travel Experiences" },
            { value: "300+", label: "Hotels & Rooms" },
            { value: "25K+", label: "Happy Travellers" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-emerald-700">{s.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}