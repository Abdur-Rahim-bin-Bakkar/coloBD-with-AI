"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 22, delay: i * 0.08 },
  }),
};

const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
        <path d="M12 21c0-5 3.5-8.5 8-9.7C19.2 16 15.9 19.8 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 21V4.5M12 21c-4.5-1.2-8-5.4-8-9.7 4.5 1.2 8 4.7 8 9.7Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Explore",
    desc: "We curate famous and hidden places across every district of Bangladesh.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
        <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Share",
    desc: "Real travellers share experiences, photos and honest tips with the community.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
        <path d="M3 21V7l6 3V7l6 3 3-1.5V21" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 21h18M7 13h2M11 13h2M15 13h2M7 17h2M11 17h2M15 17h2" strokeLinecap="round" />
      </svg>
    ),
    title: "Stay",
    desc: "Managers list hotels & rooms and travellers book their perfect stay.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Connect",
    desc: "Chat in real time and get AI-powered travel help whenever you need it.",
  },
];

const CREATOR_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Abdur-Rahim-bin-Bakkar",
    icon: (
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fswd-abdur-rahim-bin-bakkar",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    ),
  },
  {
    label: "Portfolio",
    href: "https://portfolio-eight-pi-mc123cjc5o.vercel.app/",
    icon: (
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm2 18c-.667.5-1.333.5-2 .5s-1.333 0-2-.5-.667-1-.667-1.5V16.5c-1.333-.5-2.333-1.667-2.667-3.333H6a6.96 6.96 0 01-.167-1.667c0-1.333.5-2.667 1.333-3.833.167-.667-.166-1.667-.5-2.667 1-.167 2 .167 2.5.5.833-.5 1.833-.833 2.833-.833s2 .333 2.833.833c.5-.333 1.5-.667 2.5-.5-.334 1-.667 2-.5 2.667.833 1.166 1.333 2.5 1.333 3.833a6.96 6.96 0 01-.167 1.667h-1.667c-.333 1.666-1.333 2.833-2.666 3.333v2c0 .5-.334.667-.667 1.5z" />
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/8801873135444",
    icon: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-900 to-emerald-950 py-20 text-center text-white lg:py-28">
        <div className="pointer-events-none absolute -left-24 top-0 size-96 rounded-full bg-emerald-500/30 blur-3xl animate-drift" />
        <div className="pointer-events-none absolute -right-24 bottom-0 size-[26rem] rounded-full bg-teal-400/20 blur-3xl animate-drift" style={{ animationDelay: "-8s" }} />
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30" aria-hidden="true">
          <defs>
            <pattern id="about-leaves" width="84" height="84" patternUnits="userSpaceOnUse">
              <path d="M42 10c4 6 4 15 0 21-4-6-4-15 0-21Z M42 52c4 6 4 15 0 21-4-6-4-15 0-21Z" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-leaves)" />
        </svg>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
        >
          <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-white/10 px-4 py-1.5 text-sm font-semibold text-lime-200 backdrop-blur-md">
            About coloBD
          </motion.span>
          <motion.h1 variants={fadeUp} custom={1} className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            The story behind the{" "}
            <span className="bg-gradient-to-r from-lime-300 to-teal-200 bg-clip-text text-transparent">
              Land of Green
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-emerald-100/85 sm:text-lg">
            coloBD was born from a simple idea: Bangladesh is one of the
            world&apos;s most beautiful — yet under-appreciated — travel
            destinations. We help travellers discover places, share real
            experiences, and book stays across the country.
          </motion.p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/70 px-4 py-1.5 text-sm font-semibold text-emerald-800">
              Our mission
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
              Make every Bangladeshi trip{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                easier &amp; more enjoyable
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Whether it&apos;s the 120&nbsp;km beach of Cox&apos;s Bazar, the
              tea gardens of Sylhet or the misty hills of Bandarban — we bring
              the information, the people and the bookings together in one
              place, so you spend less time planning and more time exploring.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Real experiences written by actual travellers",
                "Hotels & rooms posted by verified managers",
                "Real-time chat and an AI assistant on demand",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-3.5" aria-hidden="true"><path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <div className="overflow-hidden rounded-[2rem] shadow-xl shadow-emerald-900/10">
              <img src="/mountain.svg" alt="Bandarban hills" className="aspect-[4/3] w-full object-cover" />
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="group rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-500/25 transition-transform group-hover:scale-110">
                {v.icon}
              </span>
              <h3 className="mt-4 text-lg font-bold text-emerald-950">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 text-center sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { value: "50+", label: "Tourist Places" },
            { value: "2K+", label: "Travel Experiences" },
            { value: "300+", label: "Hotels & Rooms" },
            { value: "25K+", label: "Happy Travellers" },
          ].map((s, i) => (
            <motion.div key={s.label} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              <p className="text-3xl font-extrabold text-emerald-700">{s.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-emerald-900 p-8 text-white shadow-2xl shadow-emerald-900/20 sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
            <div className="mx-auto grid size-32 place-items-center rounded-[2rem] bg-gradient-to-br from-lime-400 to-emerald-500 text-5xl font-extrabold text-emerald-950 shadow-xl ring-4 ring-white/30">
              AR
            </div>
            <div className="text-center lg:text-left">
              <p className="text-sm font-bold uppercase tracking-wider text-lime-300">Built with ❤️ by</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">Abdur Rahim Bin Bakkar</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-emerald-100/85">
                A full-stack web developer from Bangladesh who loves travel,
                clean code and green landscapes. coloBD is his way of giving
                back to the Land of Green — one better trip at a time.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                {CREATOR_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">{l.icon}</svg>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="text-lg font-medium text-slate-600">Ready to discover Bangladesh?</p>
          <Link href="/places" className="inline-flex h-13 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 px-8 font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40 active:scale-[0.98]">
            Start Exploring
          </Link>
        </motion.div>
      </section>
    </div>
  );
}