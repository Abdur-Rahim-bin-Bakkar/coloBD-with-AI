"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const FAQS = [
  {
    q: "How do I create an account?",
    a: "Sign up in seconds with your Google account or your email + password. Your account is created with the default role “user” and you can start exploring places, reading experiences and booking rooms right away. You can optionally add a profile photo.",
  },
  {
    q: "How do I book a hotel room?",
    a: "Open any hotel in the area you’re visiting, pick a room type, choose your check-in and check-out dates and the number of guests, then hit “Book now”. The hotel manager reviews your booking — you can follow its status (pending, confirmed or cancelled) from your dashboard.",
  },
  {
    q: "Do I need to sign in to share a travel experience?",
    a: "Yes. Only signed-in users can post experiences (title, description, photos and the place you visited). After posting, your experience is reviewed and, once approved, it appears on the public feed for other travellers.",
  },
  {
    q: "What is the AI travel agent?",
    a: "It’s your personal Bangladesh trip concierge. Ask questions like “3 days in Sylhet?” or “cheapest rooms near Cox’s Bazar” and it suggests places, simple itineraries and hotels using the latest content on coloBD.",
  },
  {
    q: "What is the real-time chat feature?",
    a: "Real-time chat lets you message hotel managers and fellow travellers instantly — ask about a room, local tips or a route before you book. Messages arrive live while you’re signed in.",
  },
  {
    q: "How do I become a hotel manager?",
    a: "Managers are invited or assigned by an admin. As a manager you can add your hotels and rooms, manage availability, and confirm or cancel incoming bookings from travellers.",
  },
  {
    q: "Is coloBD free to use?",
    a: "Yes, browsing places, reading experiences and using the AI assistant are completely free. Travel bookings are arranged directly with the hotel through the platform.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  const [query, setQuery] = useState("");

  const filtered = FAQS.filter((f) =>
    f.q.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/60 to-white py-24 lg:py-36">
      <div className="pointer-events-none absolute -left-32 top-40 size-96 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 size-80 rounded-full bg-teal-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/70 px-4 py-1.5 text-sm font-semibold text-emerald-800"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 text-emerald-600" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" strokeLinecap="round" />
            </svg>
            Frequently asked questions
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.08 }}
            className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-emerald-950 sm:text-4xl"
          >
            Questions?{" "}
            <span className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              We&apos;ve
            </span>{" "}
            got answers
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.16 }}
            className="mt-4 max-w-md text-base leading-relaxed text-slate-600"
          >
            Everything travellers ask us most — from accounts and bookings to
            our AI assistant and real-time chat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.24 }}
            className="mt-8 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-emerald-600 to-emerald-900 p-7 text-white shadow-xl shadow-emerald-900/20"
          >
            <p className="text-lg font-bold">Still need help?</p>
            <p className="mt-1 text-sm text-emerald-100/80">
              Message us in real time or ask the coloBD AI — we usually reply in
              minutes.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-emerald-800 shadow-md transition-transform hover:scale-105"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Open Chat
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                Ask AI
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative mb-6"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-emerald-600" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions… e.g. booking"
              className="h-13 w-full rounded-2xl border border-emerald-200 bg-white pl-12 pr-4 text-sm text-emerald-950 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
          </motion.div>

          <div className="space-y-3">
            {filtered.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-dashed border-emerald-200 bg-white/60 p-6 text-center text-sm text-slate-500"
              >
                No questions match “{query}”. Try another search or{" "}
                <Link href="/chat" className="font-bold text-emerald-600">
                  ask us directly
                </Link>
                .
              </motion.p>
            )}

            {filtered.map((f, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={f.q}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.05 }}
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    isOpen
                      ? "border-emerald-300 bg-white shadow-lg shadow-emerald-900/5"
                      : "border-emerald-100 bg-white/80 hover:border-emerald-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  >
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-xl text-sm font-extrabold transition-colors ${
                        isOpen
                          ? "bg-gradient-to-br from-emerald-500 to-emerald-700 text-white"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm font-bold text-emerald-950 sm:text-base">
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors ${
                        isOpen ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="size-4" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 pl-[4.5rem] text-sm leading-relaxed text-slate-600">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}