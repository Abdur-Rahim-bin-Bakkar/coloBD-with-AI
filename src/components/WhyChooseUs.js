"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 22, delay: i * 0.08 },
  }),
};

const FEATURES = [
  {
    title: "Curated destinations",
    desc: "50+ famous and hidden places — Cox's Bazar, Sylhet, Bandarban, Sajek and beyond — researched and organised for you.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
        <path d="M12 21c0-5 3.5-8.5 8-9.7C19.2 16 15.9 19.8 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 21V4.5M12 21c-4.5-1.2-8-5.4-8-9.7 4.5 1.2 8 4.7 8 9.7Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Real traveller stories",
    desc: "No sponsored fluff — genuine experiences, photos and tips shared by travellers like you.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
        <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Easy hotel booking",
    desc: "Compare rooms and prices, check availability and book your stay in a couple of clicks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
        <path d="M3 21V7l6 3V7l6 3 3-1.5V21" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 21h18M7 13h2M11 13h2M15 13h2M7 17h2M11 17h2M15 17h2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "AI travel agent",
    desc: "Ask anything — “3 days in Sylhet?” — and get instant place picks, itineraries and hotel tips from our AI concierge.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
        <path d="M12 3v3M7 9H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="13" r="4" />
        <path d="M9.5 4.5 8 3M14.5 4.5 16 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Real-time chat",
    desc: "Message hotel managers and fellow travellers live — ask about a room or a route before you even book.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Secure & simple",
    desc: "Safe Google or email sign-in, your data protected, and a clean experience on every device.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/70 to-white py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-32 top-24 size-96 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-10 size-80 rounded-full bg-teal-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <motion.div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/70 px-4 py-1.5 text-sm font-semibold text-emerald-800"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 text-emerald-600" aria-hidden="true">
                <path d="M12 21c0-5 3.5-8.5 8-9.7C19.2 16 15.9 19.8 12 21Z" fill="currentColor" />
                <path d="M12 21V4.5M12 21c-4.5-1.2-8-5.4-8-9.7 4.5 1.2 8 4.7 8 9.7Z" fill="currentColor" opacity=".75" />
              </svg>
              Why travellers choose coloBD
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.08 }}
              className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-emerald-950 sm:text-4xl lg:text-5xl"
            >
              Everything you need, one{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                green
              </span>{" "}
              app
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.16 }}
              className="mt-5 max-w-md text-base leading-relaxed text-slate-600"
            >
              coloBD brings places, traveller stories, hotels and smart helpers
              together — so planning your Bangladesh trip feels effortless.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.24 }}
              className="mt-8 relative rounded-[1.75rem] border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-900/5"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-lime-400 to-emerald-600 text-white shadow-md shadow-emerald-500/30">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
                    <path d="M12 3v3M7 9H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-bold text-emerald-950">Meet coloBD AI</p>
                  <p className="text-xs text-slate-500">Your Bangladesh trip concierge</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-600" />
                  </span>
                  Online
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-emerald-50 px-4 py-2.5 text-sm text-emerald-950">
                  Plan a 2-day trip to Bandarban for me 🔍
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-lime-400 to-emerald-500 px-4 py-2.5 text-sm text-white shadow-md shadow-emerald-500/20">
                  Day 1: Nilgiri &amp; Meghla… want the full plan + hotel picks? 🏕️
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-[11px] font-medium text-slate-400">AI is typing…</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className={`group rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10 ${
                  f.title === "AI travel agent" || f.title === "Real-time chat"
                    ? "border-lime-200 bg-gradient-to-br from-white to-lime-50"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {f.icon}
                  </span>
                  {(f.title === "AI travel agent" || f.title === "Real-time chat") && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-600" />
                      </span>
                      New
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-bold text-emerald-950">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}