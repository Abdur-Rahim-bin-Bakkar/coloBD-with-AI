"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import TiltCard from "@/components/TiltCard";
import CountUp from "@/components/CountUp";
import Marquee from "@/components/Marquee";
import SectionHeading from "@/components/SectionHeading";
import MagneticButton from "@/components/MagneticButton";

const PHONE = "+8801873135444";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
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
    tint: "from-emerald-500 to-teal-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
        <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Share",
    desc: "Real travellers share experiences, photos and honest tips with the community.",
    tint: "from-teal-500 to-cyan-600",
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
    tint: "from-lime-500 to-emerald-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Connect",
    desc: "Chat in real time and get AI-powered travel help whenever you need it.",
    tint: "from-amber-400 to-orange-600",
  },
];

const MILESTONES = [
  {
    year: "Q1 · 2025",
    title: "A love letter to Bangladesh",
    desc: "The idea is born during a late-night chat over chai — why is one of the greenest countries on Earth missing from the travel map?",
  },
  {
    year: "Mid · 2025",
    title: "The platform takes shape",
    desc: "Places, experiences and hotels come together under one roof — with managers onboarded to list real stays.",
  },
  {
    year: "Late · 2025",
    title: "Community first light",
    desc: "The first travellers publish stories. Chat and an AI co-pilot arrive so no question ever goes unanswered.",
  },
  {
    year: "Now",
    title: "The journey is just beginning",
    desc: "Every week brings new places, new stories and new travellers choosing to explore the Land of Green.",
  },
];

const ROUTE_PILLS = [
  { label: "Cox's Bazar — 120 km of sand", icon: "🏖️" },
  { label: "Sylhet — endless tea gardens", icon: "🍃" },
  { label: "Bandarban — misty hills", icon: "⛰️" },
  { label: "Sajek Valley — rooftop of the country", icon: "☁️" },
  { label: "Saint Martin — coral island", icon: "🐚" },
  { label: "Rangamati — lakeside calm", icon: "🛶" },
];

const CREATOR_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Abdur-Rahim-bin-Bakkar",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fswd-abdur-rahim-bin-bakkar",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
    ),
  },
  {
    label: "Portfolio",
    href: "https://portfolio-eight-pi-mc123cjc5o.vercel.app/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm2 18c-.667.5-1.333.5-2 .5s-1.333 0-2-.5-.667-1-.667-1.5V16.5c-1.333-.5-2.333-1.667-2.667-3.333H6a6.96 6.96 0 01-.167-1.667c0-1.333.5-2.667 1.333-3.833.167-.667-.166-1.667-.5-2.667 1-.167 2 .167 2.5.5.833-.5 1.833-.833 2.833-.833s2 .333 2.833.833c.5-.333 1.5-.667 2.5-.5-.334 1-.667 2-.5 2.667.833 1.166 1.333 2.5 1.333 3.833a6.96 6.96 0 01-.167 1.667h-1.667c-.333 1.666-1.333 2.833-2.666 3.333v2c0 .5-.334.667-.667 1.5z" /></svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/8801873135444",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
    ),
  },
];

function Hero() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const ringX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const ringY = useTransform(sy, [-0.5, 0.5], [-18, 18]);
  const chipX = useTransform(sx, [-0.5, 0.5], [18, -18]);
  const chipY = useTransform(sy, [-0.5, 0.5], [12, -12]);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-950 to-teal-950 text-white"
    >
      {/* animated mesh */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-24 size-[30rem] rounded-full bg-emerald-500/30 blur-3xl animate-blob-pulse" />
        <div className="absolute -right-24 top-1/4 size-[26rem] rounded-full bg-teal-400/25 blur-3xl animate-blob-pulse" style={{ animationDelay: "-3s" }} />
        <div className="absolute bottom-0 left-1/3 size-96 rounded-full bg-lime-400/20 blur-3xl animate-blob-pulse" style={{ animationDelay: "-6s" }} />
      </div>
      {/* grid */}
      <div className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />

      {/* orbiting spur */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none absolute left-1/2 top-24 size-80 -translate-x-1/2 rounded-full animate-spin-slower border border-dashed border-lime-300/30 [mask-image:radial-gradient(circle,rgba(0,0,0,0.6)_30%,transparent_68%)]"
      >
        <span className="absolute -top-1 left-1/2 size-3 -translate-x-1/2 rounded-full bg-lime-300 shadow-[0_0_14px_3px_rgba(190,242,100,0.6)]" />
        <span className="absolute top-1/2 -right-1 size-2 -translate-y-1/2 rounded-full bg-teal-300 shadow-[0_0_12px_2px_rgba(94,234,212,0.6)]" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 pt-24 text-center sm:px-6 lg:px-8 lg:pt-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl"
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-white/10 px-4 py-1.5 text-sm font-semibold text-lime-200 backdrop-blur-md"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-lime-300" />
            </span>
            About coloBD
          </motion.span>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            The story behind{" "}
            <span className="animate-gradient-x inline-block bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
              the Land of Green
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-emerald-100/85 sm:text-lg"
          >
            Bangladesh is one of the world&apos;s most beautiful — yet
            under-appreciated — travel destinations. coloBD was born to shine a
            light on it: discover places, share real experiences, book your
            stay.
          </motion.p>

          {/* hero CTA pills */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton
              className="inline-flex h-13 items-center justify-center rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 px-8 text-sm font-bold text-emerald-950 shadow-xl shadow-lime-500/25"
              onClick={() =>
                document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Our mission
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-4"><path d="M12 5v14m0 0 6-6m-6 6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </MagneticButton>
            <Link
              href="/contact"
              className="inline-flex h-13 items-center justify-center rounded-full border-2 border-white/25 bg-white/10 px-8 text-sm font-bold text-white backdrop-blur-md transition-all hover:border-lime-300/60 hover:bg-white/20"
            >
              Say hello
            </Link>
          </motion.div>
        </motion.div>

        {/* floating glass chips */}
        <motion.div
          style={{ x: chipX, y: chipY }}
          className="relative mx-auto mb-0 mt-14 hidden max-w-4xl place-items-center md:grid"
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <div className="animate-float-slow rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-left shadow-2xl shadow-emerald-950/30 backdrop-blur-md">
              <p className="text-[11px] font-bold uppercase tracking-widest text-lime-200">Places curated</p>
              <p className="mt-1 text-2xl font-extrabold text-white">50+ districts</p>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <div className="animate-float-slow rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-left shadow-2xl shadow-emerald-950/30 backdrop-blur-md" style={{ animationDelay: "-3.5s" }}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-teal-200">Community</p>
              <p className="mt-1 text-2xl font-extrabold text-white">Real stories</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-[2rem] border border-white/15 bg-white/5 px-8 py-6 shadow-2xl shadow-emerald-950/40 backdrop-blur-xl">
            <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-lime-400 to-emerald-600 text-2xl shadow-lg shadow-lime-500/30">🌍</span>
            <div className="text-left">
              <p className="text-sm font-bold text-lime-200">The green heart of South Asia</p>
              <p className="text-sm text-emerald-100/70">One platform, every beautiful spot.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <svg
        className="relative block w-full text-emerald-50"
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

function StatsBand() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 45%"] });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const stats = [
    { to: 50, suffix: "+", label: "Tourist places" },
    { to: 2000, suffix: "+", label: "Travel experiences" },
    { to: 300, suffix: "+", label: "Hotels & rooms" },
    { to: 25000, suffix: "+", label: "Happy travellers" },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-emerald-50/60 py-20">
      <div className="dotted-bg absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-white p-10 shadow-xl shadow-emerald-900/10 sm:p-12">
          <motion.div
            style={{ width }}
            className="absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-lime-400 via-emerald-500 to-teal-500"
          />
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="text-center"
              >
                <p className="text-4xl font-extrabold text-emerald-700 lg:text-5xl">
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-slate-500">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800">
            <span className="size-1.5 animate-pulse rounded-full bg-current" />
            Our mission
          </span>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-emerald-950 sm:text-4xl lg:text-5xl">
            Make every Bangladeshi trip{" "}
            <span className="animate-gradient-x inline-block bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
              easier &amp; more enjoyable
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            Whether it&apos;s the 120&nbsp;km beach of Cox&apos;s Bazar, the tea
            gardens of Sylhet or the misty hills of Bandarban — we bring the
            information, the people and the bookings together in one place, so
            you spend less time planning and more time exploring.
          </p>

          <div className="mt-8 space-y-3">
            {[
              { t: "Real experiences written by actual travellers", icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
              ) },
              { t: "Hotels & rooms posted by verified managers", icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4"><path d="M3 21V7l6 3V7l6 3 3-1.5V21" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 21h18" strokeLinecap="round" /></svg>
              ) },
              { t: "Real-time chat and an AI assistant on demand", icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
              ) },
            ].map((item, i) => (
              <motion.div
                key={item.t}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/10"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">{item.icon}</span>
                <p className="text-sm font-semibold text-slate-700">{item.t}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* tilt photo stack */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mx-auto w-full max-w-lg [perspective:1200px]"
        >
          <TiltCard max={9} className="rounded-[2rem]">
            <Image
              src="/mountain.svg"
              alt="The hills of Bandarban"
              width={720}
              height={540}
              className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl shadow-emerald-900/20"
            />
          </TiltCard>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 16 }}
            className="absolute -bottom-8 -right-4 rounded-2xl border border-emerald-100 bg-white px-5 py-4 shadow-xl shadow-emerald-900/10 sm:-right-8"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Bandarban</p>
            <p className="mt-0.5 text-sm font-semibold text-slate-600">The hills that started it all ⛰️</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.45, type: "spring", stiffness: 120, damping: 16 }}
            className="absolute -left-4 -top-6 rounded-2xl border border-emerald-100 bg-white px-5 py-3 shadow-xl shadow-emerald-900/10 sm:-left-8"
          >
            <span className="text-2xl">⛰️</span>
            <p className="mt-0.5 text-xs font-bold text-slate-600">Misty mornings</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="relative overflow-hidden border-y border-emerald-100 bg-white py-20 lg:py-28">
      <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we stand for"
          title={<>Four values guide every line of code and every trip we power</>}
          desc="Everything on coloBD circles around these four simple ideas — explore openly, share honestly, stay comfortably and connect instantly."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="[perspective:1000px]"
            >
              <TiltCard className="h-full rounded-3xl">
                <div className="group flex h-full flex-col rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-colors hover:border-emerald-300">
                  <span className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg shadow-emerald-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${v.tint}`}>
                    {v.icon}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-emerald-950">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.desc}</p>
                  <span className="mt-auto pt-5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      0{i + 1}
                      <span className="h-px w-6 bg-emerald-400" />
                    </span>
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 70%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 to-white py-20 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 size-[30rem] -translate-x-1/2 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The journey so far"
          title={<>From a chai-table idea to a growing community</>}
          desc="Every platform has a story. Here&apos;s a quick (and honest) recap of how coloBD got here."
        />

        <div className="relative mt-16">
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-5 top-0 hidden h-full w-0.5 origin-top rounded-full bg-gradient-to-b from-lime-400 via-emerald-500 to-teal-500 md:left-6 md:block"
          />
          <div className="absolute left-5 top-0 hidden h-full w-0.5 rounded-full bg-emerald-100 md:left-6 md:block" />

          <div className="space-y-10">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="relative pl-14 md:pl-20"
              >
                <span className="absolute left-[1.15rem] top-1 grid size-5 -translate-x-1/2 place-items-center md:left-[1.4rem]">
                  <span className="absolute size-5 animate-ping rounded-full bg-emerald-300 opacity-50" />
                  <span className="relative size-3 rounded-full border-2 border-white bg-gradient-to-br from-emerald-400 to-emerald-700 shadow shadow-emerald-500/40" />
                </span>
                <div className="group rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10">
                  <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100/70 px-3 py-1 text-xs font-bold text-emerald-700">
                    {m.year}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-emerald-950">{m.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Creator() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-950 to-teal-950 py-20 text-white lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 size-96 rounded-full bg-emerald-500/25 blur-3xl animate-blob-pulse" />
        <div className="absolute -right-16 bottom-0 size-[26rem] rounded-full bg-teal-400/20 blur-3xl animate-blob-pulse" style={{ animationDelay: "-4s" }} />
      </div>
      <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 shadow-2xl shadow-emerald-950/40 backdrop-blur-xl">
          <div className="h-1 bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400" />
          <div className="grid items-center gap-12 p-8 sm:p-12 lg:grid-cols-[auto_1fr] lg:p-16">
            {/* avatar with pulsing ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 160, damping: 14 }}
              className="relative mx-auto"
            >
              <span className="absolute -inset-4 rounded-[2.5rem] border border-dashed border-lime-300/40 animate-spin-slower" />
              <div className="relative grid size-32 place-items-center rounded-[2rem] bg-gradient-to-br from-lime-400 via-emerald-500 to-teal-500 text-5xl font-extrabold text-emerald-950 shadow-2xl ring-4 ring-white/30 lg:size-40 lg:rounded-[2.5rem]">
                AR
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-3 -top-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold text-lime-200 backdrop-blur-md"
              >
                Full-stack dev ⚡
              </motion.div>
            </motion.div>

            <div className="text-center lg:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
                Built with ❤️ by
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Abdur Rahim Bin Bakkar
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-emerald-100/85">
                A full-stack web developer from Bangladesh who loves travel,
                clean code and green landscapes. coloBD is his way of giving
                back to the Land of Green — one better trip at a time.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
                {CREATOR_LINKS.map((l) => (
                  <MagneticButton
                    key={l.label}
                    as="a"
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    strength={0.22}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20"
                  >
                    {l.icon}
                    {l.label}
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 flex flex-col items-center gap-5 text-center"
        >
          <p className="text-lg font-medium text-emerald-100/85">
            Ready to discover Bangladesh?
          </p>
          <MagneticButton
            as="a"
            href="/places"
            className="inline-flex h-13 items-center justify-center rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 px-9 text-sm font-bold text-emerald-950 shadow-xl shadow-lime-500/30"
          >
            Start exploring
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-4"><path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Marquee
        items={ROUTE_PILLS.map((r) => (
          <span key={r.label} className="text-sm font-bold text-emerald-100/80">
            {r.icon} {r.label}
          </span>
        ))}
        className="border-b border-emerald-900 bg-emerald-950 py-4"
      />
      <StatsBand />
      <Mission />
      <Values />
      <Journey />
      <Creator />
    </div>
  );
}