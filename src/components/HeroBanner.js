"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 240, damping: 20 } },
};

const FLOATERS = [
  { label: "Cox's Bazar", icon: "🏖️", className: "left-[5%] top-[18%] lg:left-[8%]", dur: 6, delay: 0 },
  { label: "Sylhet", icon: "🍃", className: "right-[6%] top-[24%] lg:right-[9%]", dur: 7, delay: 1.2 },
  { label: "Bandarban", icon: "⛰️", className: "left-[8%] bottom-[22%] lg:left-[11%]", dur: 6.5, delay: 0.6 },
  { label: "Sajek Valley", icon: "☁️", className: "right-[8%] bottom-[26%] lg:right-[11%]", dur: 7.5, delay: 1.8 },
];

const FEATURES = [
  {
    label: "Places",
    desc: "Explore destinations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
        <path d="M12 21c0-5 3.5-8.5 8-9.7C19.2 16 15.9 19.8 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 21V4.5M12 21c-4.5-1.2-8-5.4-8-9.7 4.5 1.2 8 4.7 8 9.7Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.6 5.2C8.4 6.6 10.6 8.7 12 11.4 13.4 8.7 15.6 6.6 18.4 5.2c-.3 4.1-3 7.6-6.4 8.9-3.4-1.3-6.1-4.8-6.4-8.9Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Experiences",
    desc: "Read & share stories",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
        <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Hotels & Rooms",
    desc: "Book your stay",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
        <path d="M3 21V7l6 3V7l6 3 3-1.5V21" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 21h18M7 13h2M11 13h2M15 13h2M7 17h2M11 17h2M15 17h2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function HeroBanner() {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-900 to-emerald-950 px-4 py-16 text-white sm:min-h-[55vh]">
      <div className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-emerald-500/30 blur-3xl animate-drift" />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-[26rem] rounded-full bg-teal-400/20 blur-3xl animate-drift" style={{ animationDelay: "-9s" }} />
      <div className="pointer-events-none absolute right-[18%] top-10 size-40 rounded-full bg-lime-400/20 blur-2xl animate-drift" style={{ animationDelay: "-4s" }} />

      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30" aria-hidden="true">
        <defs>
          <pattern id="hero-leaves" width="90" height="90" patternUnits="userSpaceOnUse">
            <path
              d="M45 12c4 6 4 15 0 21-4-6-4-15 0-21Z M45 56c4 6 4 15 0 21-4-6-4-15 0-21Z"
              stroke="rgba(255,255,255,0.18)"
              fill="none"
              strokeWidth="1.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-leaves)" />
      </svg>

      <div className="pointer-events-none absolute left-1/2 top-[6%] hidden size-72 -translate-x-1/2 animate-spin-slower rounded-full border border-dashed border-lime-300/40 lg:block" />
      <div className="pointer-events-none absolute left-1/2 top-[6%] hidden size-48 -translate-x-1/2 rounded-full border border-emerald-400/40 lg:block" />

      {FLOATERS.map((f) => (
        <motion.div
          key={f.label}
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
          className={`pointer-events-none absolute z-10 hidden items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 shadow-xl shadow-emerald-950/20 backdrop-blur-md md:flex ${f.className}`}
        >
          <span className="text-2xl">{f.icon}</span>
          <div className="text-left">
            <p className="text-sm font-bold leading-none">{f.label}</p>
            <p className="mt-1 text-[11px] text-lime-200/90">Bengal&lsquo;s beauty</p>
          </div>
        </motion.div>
      ))}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 flex w-full max-w-4xl flex-col items-center text-center"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-white/10 px-4 py-1.5 text-sm font-semibold text-lime-200 backdrop-blur-md"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-lime-300" />
          </span>
          The Land of Green — Bangladesh
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
        >
          Discover the{" "}
          <span className="relative whitespace-nowrap">
            <span className="bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
              hidden gems
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 9"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 7C60 2 140 2 198 7"
                stroke="url(#underlineGrad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="underlineGrad" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#bef264" />
                  <stop offset="1" stopColor="#5eead4" />
                </linearGradient>
              </defs>
            </svg>
          </span>{" "}
          of Bangladesh
        </motion.h1>

        <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-relaxed text-emerald-100/85 sm:text-lg">
          coloBD is your all-in-one travel companion — explore famous and hidden
          places, read real experiences shared by fellow travellers, and book
          hotels &amp; rooms across the country.
        </motion.p>

        <motion.div variants={item} className="mt-7 w-full max-w-xl">
          <div className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-2 pl-5 pr-2 backdrop-blur-md transition-all focus-within:border-lime-300/60">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5 shrink-0 text-lime-200" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <span className="flex-1 truncate text-sm text-emerald-100/70">
              Search destinations: Cox&apos;s Bazar, Sylhet, Bandarban, Sajek…
            </span>
            <Link
              href="/places"
              className="shrink-0 rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 px-5 py-2 text-sm font-bold text-emerald-950 shadow-lg shadow-lime-500/20 transition-transform hover:scale-105"
            >
              Search
            </Link>
          </div>
        </motion.div>

        <motion.div variants={item} className="mt-8 grid w-full max-w-2xl grid-cols-3 gap-3">
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-4 backdrop-blur-md transition-colors hover:border-lime-300/40 hover:bg-white/10"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-lime-400/90 to-emerald-600/90 text-emerald-950">
                {f.icon}
              </span>
              <p className="text-sm font-bold">{f.label}</p>
              <p className="text-center text-[11px] leading-tight text-emerald-100/70">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/places"
            className="inline-flex h-13 items-center justify-center rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 px-8 font-bold text-emerald-950 shadow-xl shadow-lime-500/25 transition-all hover:shadow-2xl hover:shadow-lime-500/40 active:scale-[0.98]"
          >
            Explore Places
          </Link>
          <Link
            href="/experiences"
            className="inline-flex h-13 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 px-8 font-bold text-white backdrop-blur-md transition-all hover:border-lime-300/60 hover:bg-white/20 active:scale-[0.98]"
          >
            Read Experiences
          </Link>
        </motion.div>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-emerald-100/75">
          <span><span className="font-extrabold text-lime-300">50+</span> Tourist places</span>
          <span className="hidden sm:inline">·</span>
          <span><span className="font-extrabold text-lime-300">2K+</span> Traveller experiences</span>
          <span className="hidden sm:inline">·</span>
          <span><span className="font-extrabold text-lime-300">300+</span> Hotels &amp; rooms</span>
        </motion.div>

        <motion.div variants={item} className="mt-10 flex flex-col items-center gap-1 text-emerald-100/60">
          <span className="text-[11px] font-medium uppercase tracking-widest">Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="mt-1 size-6 rounded-full border-2 border-emerald-100/60"
          />
        </motion.div>
      </motion.div>

      <svg
        className="absolute bottom-0 left-0 w-full text-emerald-50"
        viewBox="0 0 1440 90"
        fill="currentColor"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 90h1440V30c-120 30-320 52-520 42S580 20 420 24 120 56 0 44Z" opacity="0.9" />
        <path d="M0 90h1440V55c-140 20-340 30-540 18S560 34 400 40 120 62 0 52Z" />
      </svg>
    </section>
  );
}