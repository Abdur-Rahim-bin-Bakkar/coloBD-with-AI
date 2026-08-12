"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PHONE = "+8801873135444";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 22, delay: i * 0.08 },
  }),
};

const CHANNELS = [
  {
    label: "Call us",
    desc: "Mon–Sat, 9am–6pm (GMT+6)",
    href: `tel:${PHONE}`,
    cta: PHONE,
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    ),
  },
  {
    label: "WhatsApp",
    desc: "Fastest response, usually within minutes",
    href: "https://wa.me/8801873135444",
    cta: PHONE,
    icon: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    ),
  },
  {
    label: "Portfolio",
    desc: "More work, projects & tech stack",
    href: "https://portfolio-eight-pi-mc123cjc5o.vercel.app/",
    cta: "portfolio-eight-pi-mc123cjc5o.vercel.app",
    icon: (
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm2 18c-.667.5-1.333.5-2 .5s-1.333 0-2-.5-.667-1-.667-1.5V16.5c-1.333-.5-2.333-1.667-2.667-3.333H6a6.96 6.96 0 0 1-.167-1.667c0-1.333.5-2.667 1.333-3.833.167-.667-.166-1.667-.5-2.667 1-.167 2 .167 2.5.5.833-.5 1.833-.833 2.833-.833s2 .333 2.833.833c.5-.333 1.5-.667 2.5-.5-.334 1-.667 2-.5 2.667.833 1.166 1.333 2.5 1.333 3.833a6.96 6.96 0 0 1-.167 1.667h-1.667c-.333 1.666-1.333 2.833-2.666 3.333v2c0 .5-.334.667-.667 1.5Z" />
    ),
  },
];

const SOCIALS = [
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
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm2 18c-.667.5-1.333.5-2 .5s-1.333 0-2-.5-.667-1-.667-1.5V16.5c-1.333-.5-2.333-1.667-2.667-3.333H6a6.96 6.96 0 0 1-.167-1.667c0-1.333.5-2.667 1.333-3.833.167-.667-.166-1.667-.5-2.667 1-.167 2 .167 2.5.5.833-.5 1.833-.833 2.833-.833s2 .333 2.833.833c.5-.333 1.5-.667 2.5-.5-.334 1-.667 2-.5 2.667.833 1.166 1.333 2.5 1.333 3.833a6.96 6.96 0 0 1-.167 1.667h-1.667c-.333 1.666-1.333 2.833-2.666 3.333v2c0 .5-.334.667-.667 1.5Z" />
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/8801873135444",
    icon: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    ),
  },
];

export default function ContactPage() {
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
    window.open(`https://wa.me/8801873135444?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <div className="relative overflow-hidden">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-900 to-emerald-950 py-20 text-center text-white lg:py-28">
        <div className="pointer-events-none absolute -left-24 top-0 size-96 rounded-full bg-emerald-500/30 blur-3xl animate-drift" />
        <div className="pointer-events-none absolute -right-24 bottom-0 size-[26rem] rounded-full bg-teal-400/20 blur-3xl animate-drift" style={{ animationDelay: "-8s" }} />
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30" aria-hidden="true">
          <defs>
            <pattern id="contact-leaves" width="84" height="84" patternUnits="userSpaceOnUse">
              <path d="M42 10c4 6 4 15 0 21-4-6-4-15 0-21Z M42 52c4 6 4 15 0 21-4-6-4-15 0-21Z" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-leaves)" />
        </svg>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
        >
          <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-white/10 px-4 py-1.5 text-sm font-semibold text-lime-200 backdrop-blur-md">
            Contact us
          </motion.span>
          <motion.h1 variants={fadeUp} custom={1} className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Let&apos;s plan your{" "}
            <span className="bg-gradient-to-r from-lime-300 to-teal-200 bg-clip-text text-transparent">
              next adventure
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-emerald-100/85 sm:text-lg">
            Have a question, a hidden gem to suggest, or need help booking your
            stay? We&apos;d love to hear from you. Reach out on phone, WhatsApp
            or any of the links below.
          </motion.p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="group flex flex-col rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-500/25 transition-transform group-hover:scale-110">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden="true">{c.icon}</svg>
              </span>
              <h3 className="mt-4 text-lg font-bold text-emerald-950">{c.label}</h3>
              <p className="mt-0.5 text-sm text-slate-500">{c.desc}</p>
              <p className="mt-4 break-all text-sm font-semibold text-emerald-700 group-hover:text-emerald-600">{c.cta}</p>
            </motion.a>
          ))}
        </div>

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/70 px-4 py-1.5 text-sm font-semibold text-emerald-800">
              Find me online
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
              Connect on{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                social &amp; code
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Built and maintained by developer{" "}
              <span className="font-semibold text-emerald-800">Abdur Rahim Bin Bakkar</span>.
              Follow the work, connect on LinkedIn, or explore the open-source
              projects on GitHub.
            </p>

            <div className="mt-6 space-y-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/10"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700 transition-colors group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-emerald-700 group-hover:text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">{s.icon}</svg>
                  </span>
                  <span className="flex-1 text-sm font-bold text-emerald-950">{s.label}</span>
                  <span className="text-xs text-slate-400 transition-colors group-hover:text-emerald-600">
                    Open →
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-xl shadow-emerald-900/10">
            <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />
            <div className="p-6 sm:p-10">
              <h3 className="text-2xl font-extrabold tracking-tight text-emerald-950">
                Send a message
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Fill in the form and it will open straight in WhatsApp — the
                fastest way to reach us.
              </p>

              {sent ? (
                <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                  <p className="text-base font-bold text-emerald-800">
                    Opening WhatsApp…
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Did the chat not open? Reach us directly on{" "}
                    <a
                      href={`tel:${PHONE}`}
                      className="font-semibold text-emerald-700 hover:underline"
                    >
                      {PHONE}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-emerald-950">
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
                        className="w-full rounded-xl border border-emerald-200 bg-emerald-50/50 px-4 py-3 text-sm text-emerald-950 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-emerald-950">
                        Your email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-emerald-200 bg-emerald-50/50 px-4 py-3 text-sm text-emerald-950 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-emerald-950">
                      Your message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your trip, a question or a suggestion…"
                      className="w-full resize-none rounded-xl border border-emerald-200 bg-emerald-50/50 px-4 py-3 text-sm text-emerald-950 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40 active:scale-[0.99]"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    Send via WhatsApp
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}