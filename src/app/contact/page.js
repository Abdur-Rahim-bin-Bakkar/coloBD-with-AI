"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import TiltCard from "@/components/TiltCard";
import SectionHeading from "@/components/SectionHeading";
import MagneticButton from "@/components/MagneticButton";

const PHONE = "+8801873135444";
const WA_NUMBER = "8801873135444";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 22, delay: i * 0.08 },
  }),
};

const CHANNELS = [
  {
    label: "Call us",
    desc: "Mon–Sat · 9am–6pm (GMT+6)",
    value: PHONE,
    href: `tel:${PHONE}`,
    copy: PHONE,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-7"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
    ),
  },
  {
    label: "WhatsApp",
    desc: "Fastest — usually within minutes",
    value: PHONE,
    href: `https://wa.me/${WA_NUMBER}`,
    copy: PHONE,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
    ),
  },
  {
    label: "Portfolio",
    desc: "Projects, stack & experience",
    value: "portfolio-eight-pi-mc123cjc5o.vercel.app",
    href: "https://portfolio-eight-pi-mc123cjc5o.vercel.app/",
    copy: "https://portfolio-eight-pi-mc123cjc5o.vercel.app/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-7"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm2 18c-.667.5-1.333.5-2 .5s-1.333 0-2-.5-.667-1-.667-1.5V16.5c-1.333-.5-2.333-1.667-2.667-3.333H6a6.96 6.96 0 0 1-.167-1.667c0-1.333.5-2.667 1.333-3.833.167-.667-.166-1.667-.5-2.667 1-.167 2 .167 2.5.5.833-.5 1.833-.833 2.833-.833s2 .333 2.833.833c.5-.333 1.5-.667 2.5-.5-.334 1-.667 2-.5 2.667.833 1.166 1.333 2.5 1.333 3.833a6.96 6.96 0 0 1-.167 1.667h-1.667c-.333 1.666-1.333 2.833-2.666 3.333v2c0 .5-.334.667-.667 1.5Z" /></svg>
    ),
  },
];

const SOCIALS = [
  {
    label: "GitHub",
    handle: "@Abdur-Rahim-bin-Bakkar",
    href: "https://github.com/Abdur-Rahim-bin-Bakkar",
    color: "from-slate-600 to-slate-800",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-6"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "Abdur Rahim Bin Bakkar",
    href: "https://www.linkedin.com/in/fswd-abdur-rahim-bin-bakkar",
    color: "from-blue-600 to-sky-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-6"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
    ),
  },
  {
    label: "Portfolio",
    handle: "portfolio-eight-pi…vercel.app",
    href: "https://portfolio-eight-pi-mc123cjc5o.vercel.app/",
    color: "from-emerald-500 to-teal-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-6"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm2 18c-.667.5-1.333.5-2 .5s-1.333 0-2-.5-.667-1-.667-1.5V16.5c-1.333-.5-2.333-1.667-2.667-3.333H6a6.96 6.96 0 0 1-.167-1.667c0-1.333.5-2.667 1.333-3.833.167-.667-.166-1.667-.5-2.667 1-.167 2 .167 2.5.5.833-.5 1.833-.833 2.833-.833s2 .333 2.833.833c.5-.333 1.5-.667 2.5-.5-.334 1-.667 2-.5 2.667.833 1.166 1.333 2.5 1.333 3.833a6.96 6.96 0 0 1-.167 1.667h-1.667c-.333 1.666-1.333 2.833-2.666 3.333v2c0 .5-.334.667-.667 1.5Z" /></svg>
    ),
  },
  {
    label: "WhatsApp",
    handle: `+88${WA_NUMBER}`,
    href: `https://wa.me/${WA_NUMBER}`,
    color: "from-green-500 to-emerald-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
    ),
  },
];

function CopyChip({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard blocked — ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 transition-all hover:bg-emerald-200 hover:shadow-sm"
    >
      {copied ? (
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-1 text-emerald-700"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-3.5"><path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Copied
        </motion.span>
      ) : (
        <span className="inline-flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5"><path d="M9 9h11v11H9zM5 15H3V3h12v2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Copy
        </span>
      )}
    </button>
  );
}

function Hero() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const orbX = useTransform(sx, [-0.5, 0.5], [-30, 30]);
  const orbY = useTransform(sy, [-0.5, 0.5], [-20, 20]);

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
      <div className="pointer-events-none absolute inset-0">
        <motion.div style={{ x: orbX, y: orbY }} className="absolute -left-24 -top-16 size-[28rem] rounded-full bg-emerald-500/30 blur-3xl animate-blob-pulse" />
        <motion.div style={{ x: orbX, y: orbY, animationDelay: "-3s" }} className="absolute -right-20 top-1/4 size-[24rem] rounded-full bg-teal-400/25 blur-3xl animate-blob-pulse" />
        <motion.div style={{ x: orbX, y: orbY, animationDelay: "-6s" }} className="absolute bottom-0 left-1/4 size-80 rounded-full bg-lime-400/20 blur-3xl animate-blob-pulse" />
      </div>
      <div className="dotted-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-24 text-center sm:px-6 lg:px-8 lg:pb-32 lg:pt-32">
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
            Contact us
          </motion.span>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Let&apos;s plan your{" "}
            <span className="animate-gradient-x inline-block bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
              next adventure
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-emerald-100/85 sm:text-lg"
          >
            A question, a hidden gem to suggest, or help booking your stay —
            we&apos;d love to hear from you. Call, WhatsApp, or drop a message
            below.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate="show"
          className="mx-auto mt-12 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm backdrop-blur-xl"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-lime-300" />
          </span>
          <span className="text-emerald-100/80">Average reply time:</span>
          <span className="font-extrabold text-lime-200">under 30 minutes</span>
          <span className="hidden text-emerald-100/40 sm:inline">·</span>
          <a href={`tel:${PHONE}`} className="hidden font-bold text-white hover:text-lime-200 sm:inline">
            {PHONE}
          </a>
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

function Channels() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {CHANNELS.map((c, i) => (
        <motion.div
          key={c.label}
          custom={i}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="[perspective:1200px]"
        >
          <TiltCard max={12} className="h-full rounded-[2rem]">
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex h-full flex-col rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-lg shadow-emerald-900/5 transition-colors hover:border-emerald-300"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  {c.icon}
                </span>
                <span className="grid size-9 place-items-center rounded-full border border-emerald-100 text-emerald-500 transition-all duration-300 group-hover:rotate-45 group-hover:border-emerald-300 group-hover:bg-emerald-50">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4"><path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-emerald-950">{c.label}</h3>
              <p className="mt-1 text-sm text-slate-500">{c.desc}</p>
              <p className="mt-auto break-all pt-6 text-base font-extrabold tracking-tight text-emerald-700">
                {c.value}
              </p>
              <div className="mt-4">
                <CopyChip text={c.copy} />
              </div>
            </a>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  );
}

function Social() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-10 pb-20 sm:px-6 lg:px-8 lg:pb-28">
      <SectionHeading
        eyebrow="Elsewhere online"
        title={
          <>
            Follow the work, connect{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              beyond the site
            </span>
          </>
        }
        desc="Built and maintained by developer Abdur Rahim Bin Bakkar — see the open-source code, connect professionally, or just say hi."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SOCIALS.map((s, i) => (
          <motion.div
            key={s.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="[perspective:1000px]"
          >
            <TiltCard max={10} className="h-full rounded-3xl">
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition-colors hover:border-emerald-300"
              >
                <span
                  className={`absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30 ${s.color}`}
                />
                <span className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${s.color}`}>
                  {s.icon}
                </span>
                <h3 className="mt-4 text-lg font-bold text-emerald-950">{s.label}</h3>
                <p className="mt-0.5 truncate text-sm text-slate-500">{s.handle}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-5 text-xs font-bold uppercase tracking-widest text-emerald-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  Open
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </a>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FormCard() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi coloBD! I'm ${form.name || "a traveller"}.\n\n${form.message || ""}\n\nReply to: ${form.email || "—"}`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <motion.div
      custom={0}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="relative overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-white shadow-2xl shadow-emerald-900/10"
    >
      <div className="h-1.5 bg-gradient-to-r from-lime-400 via-emerald-500 to-teal-500" />
      <div className="p-6 sm:p-12">
        <h3 className="text-2xl font-extrabold tracking-tight text-emerald-950">
          Send a message
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Fill this in and it opens straight in WhatsApp — the fastest way to
          reach us.
        </p>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0.4 }}
              animate={{ scale: [0.4, 1.15, 1] }}
              transition={{ duration: 0.6 }}
              className="mx-auto grid size-16 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-8"><path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.div>
            <p className="mt-4 text-lg font-bold text-emerald-900">
              Opening WhatsApp…
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Did the chat not open? Reach us directly on{" "}
              <a href={`tel:${PHONE}`} className="font-bold text-emerald-700 hover:underline">
                {PHONE}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-5 text-sm font-bold text-emerald-700 underline-offset-4 hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="group grid gap-5 sm:grid-cols-2">
              <div className="relative">
                <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-emerald-900">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahim"
                  className="w-full rounded-2xl border border-emerald-200 bg-emerald-50/50 px-4 py-3.5 text-sm text-emerald-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
                />
              </div>
              <div className="relative">
                <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-emerald-900">
                  Your email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-emerald-200 bg-emerald-50/50 px-4 py-3.5 text-sm text-emerald-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-emerald-900">
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your trip, a question or a suggestion…"
                className="w-full resize-none rounded-2xl border border-emerald-200 bg-emerald-50/50 px-4 py-3.5 text-sm text-emerald-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
              />
            </div>
            <MagneticButton
              type="submit"
              className="group/btn inline-flex h-13 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-shadow hover:shadow-xl hover:shadow-emerald-500/40"
            >
              <span className="inline-flex items-center gap-2">
                Send via WhatsApp
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
              </span>
            </MagneticButton>
            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" /></svg>
              No data is stored — your message goes straight to our WhatsApp.
            </p>
          </form>
        )}
      </div>
    </motion.div>
  );
}

function ConnectCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-950 to-teal-950 py-20 text-white lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 size-96 rounded-full bg-emerald-500/25 blur-3xl animate-blob-pulse" />
        <div className="absolute -right-16 bottom-0 size-[26rem] rounded-full bg-teal-400/20 blur-3xl animate-blob-pulse" style={{ animationDelay: "-4s" }} />
      </div>
      <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Prefer the old-school route?"
          title={<>One number, every way to reach us</>}
          desc="Call, WhatsApp or message through the form — it all lands in the same place. See you on the trail, traveller."
        />
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-8 inline-flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton
            as="a"
            href={`tel:${PHONE}`}
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 px-8 text-sm font-bold text-emerald-950 shadow-xl shadow-lime-500/25"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
            Call {PHONE}
          </MagneticButton>
          <MagneticButton
            as="a"
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full border-2 border-white/25 bg-white/10 px-8 text-sm font-bold text-white backdrop-blur-md transition-colors hover:border-lime-300/60 hover:bg-white/20"
          >
            WhatsApp us
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <div className="overflow-hidden bg-emerald-50/60">
      <Hero />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 overflow-hidden rounded-[2.5rem] border border-emerald-200/70 bg-white/80 p-6 shadow-2xl shadow-emerald-900/10 backdrop-blur-xl sm:p-10 lg:-mt-12">
          <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-emerald-200/40 blur-3xl" />
          <Channels />
        </div>
      </section>

      <Social />

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              align="left"
              eyebrow="Drop us a line"
              title={
                <>
                  Have a question?{" "}
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                    We&apos;ll answer fast
                  </span>
                </>
              }
              desc="Whether it&apos;s booking help, a place suggestion or just travel gossip about the tea gardens of Sylhet — we read every message."
            />
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="mt-8 space-y-4"
            >
              {[
                { t: "Booking questions", d: "Hotels, rooms and stays across Bangladesh." },
                { t: "Place recommendations", d: "Hidden gems hand-picked by locals." },
                { t: "Feedback & ideas", d: "Help us make the Land of Green even easier to explore." },
              ].map((f) => (
                <div key={f.t} className="flex items-start gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-3.5"><path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <div>
                    <p className="text-sm font-bold text-emerald-950">{f.t}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{f.d}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <FormCard />
        </div>
      </section>

      <ConnectCTA />
    </div>
  );
}