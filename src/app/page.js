import Image from "next/image";
import { Button } from "@heroui/react";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-40 size-80 rounded-full bg-teal-300/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/70 px-4 py-1.5 text-sm font-semibold text-emerald-800">
              <svg viewBox="0 0 24 24" fill="none" className="size-4 text-emerald-600" aria-hidden="true">
                <path d="M12 21c0-5 3.5-8.5 8-9.7C19.2 16 15.9 19.8 12 21Z" fill="currentColor" />
                <path d="M12 21V4.5M12 21c-4.5-1.2-8-5.4-8-9.7 4.5 1.2 8 4.7 8 9.7Z" fill="currentColor" opacity=".75" />
              </svg>
              Land of Green
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-emerald-950 sm:text-5xl lg:text-6xl">
              Discover the{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                true beauty
              </span>{" "}
              of Bangladesh
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              From the endless sands of Cox&apos;s Bazar and the tea gardens of
              Sylhet to the misty hills of Bandarban — explore places, read real
              tour experiences, and book the perfect stay.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-emerald-700 font-semibold text-white shadow-lg shadow-emerald-500/30"
                href="/places"
                as="a"
              >
                Explore Places
              </Button>
              <Button size="lg" variant="bordered" href="/experiences" as="a">
                Read Experiences
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-3xl shadow-lg shadow-emerald-900/10">
                <Image
                  src="/sun.svg"
                  alt="Cox's Bazar beach"
                  width={400}
                  height={520}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-3xl shadow-lg shadow-emerald-900/10">
                <Image
                  src="/mountain.svg"
                  alt="Bandarban hills"
                  width={400}
                  height={300}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="overflow-hidden rounded-3xl shadow-lg shadow-emerald-900/10">
                <Image
                  src="/tea.svg"
                  alt="Sylhet tea gardens"
                  width={400}
                  height={300}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-3xl shadow-lg shadow-emerald-900/10">
                <Image
                  src="/boat.svg"
                  alt="River boat in Bangladesh"
                  width={400}
                  height={520}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white">
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