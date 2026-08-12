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

export default function SectionHeading({ eyebrow, title, desc, dark = false, align = "center" }) {
  const alignCls =
    align === "center"
      ? "mx-auto text-center items-center"
      : "text-left items-start";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={`flex max-w-2xl flex-col ${alignCls}`}
    >
      <motion.span
        variants={fadeUp}
        custom={0}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${
          dark
            ? "border-lime-300/30 bg-white/10 text-lime-200"
            : "border-emerald-200 bg-emerald-100/70 text-emerald-800"
        }`}
      >
        <span className="size-1.5 animate-pulse rounded-full bg-current" />
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        custom={1}
        className={`mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-emerald-950"
        }`}
      >
        {title}
      </motion.h2>
      {desc && (
        <motion.p
          variants={fadeUp}
          custom={2}
          className={`mt-4 text-base leading-relaxed ${
            dark ? "text-emerald-100/80" : "text-slate-600"
          }`}
        >
          {desc}
        </motion.p>
      )}
    </motion.div>
  );
}