"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession, signOut } from "@/lib/auth-client";
import Logo from "@/components/Logo";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

const AVATAR_COLORS = [
  "#22c55e",
  "#0ea5e9",
  "#f59e0b",
  "#ef4444",
  "#a855f7",
  "#14b8a6",
];

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, user, router]);

  if (isPending || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <span className="size-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  const initials = (user.name || "U").charAt(0).toUpperCase();
  const joined = user.createdAt ? new Date(user.createdAt) : null;

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="pointer-events-none absolute -left-24 top-10 size-96 rounded-full bg-emerald-300/40 blur-3xl animate-drift" />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-[28rem] rounded-full bg-teal-300/40 blur-3xl animate-drift" style={{ animationDelay: "-8s" }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <motion.div variants={item} className="mb-8 flex justify-center lg:justify-between lg:items-center">
          <div className="hidden lg:block">
            <Logo />
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="overflow-hidden rounded-[2.5rem] border border-emerald-100 bg-white shadow-2xl shadow-emerald-900/10"
        >
          <div className="relative h-40 bg-gradient-to-r from-emerald-500 via-emerald-700 to-teal-600">
            <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden="true">
              <defs>
                <pattern id="profile-leaves" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path
                    d="M30 8c4 4 4 20 0 22-4-2-4-18 0-22Z"
                    stroke="rgba(255,255,255,0.5)"
                    fill="none"
                    strokeWidth="1.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#profile-leaves)" />
            </svg>
            <div className="absolute right-5 top-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-lime-300" />
                </span>
                Active member
              </span>
            </div>
          </div>

          <div className="relative px-6 pb-8 sm:px-10">
            <div className="-mt-14 flex flex-col items-center gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:gap-6">
              <div className="relative">
                <div className="grid size-28 place-items-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-400 to-emerald-700 shadow-xl shadow-emerald-900/20 ring-4 ring-white sm:size-32 sm:rounded-[2.25rem]">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      fill
                      sizes="128px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-5xl font-extrabold text-white">{initials}</span>
                  )}
                </div>
                <span className="absolute -bottom-2 -right-2 grid size-10 place-items-center rounded-full bg-lime-400 text-lg text-emerald-950 shadow-lg ring-2 ring-white">
                  ✓
                </span>
              </div>

              <div className="pb-1 text-center sm:text-left">
                <h1 className="text-2xl font-extrabold tracking-tight text-emerald-950 sm:text-3xl">
                  {user.name}
                </h1>
                <p className="text-sm text-slate-500">{user.email}</p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold capitalize text-emerald-800">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5">
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path d="M20 12a8 8 0 0 1-.94 3.72l-1.33 5.33-5.2-2.6A8 8 0 1 1 20 12Z" strokeLinecap="round" />
                    </svg>
                    {user.role || "user"}
                  </span>
                  {joined && (
                    <span className="text-xs text-slate-400">
                      Member since {joined.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <motion.div
              variants={item}
              className="mt-8 grid grid-cols-3 gap-3"
            >
              {[
                { value: "0", label: "Experiences", icon: "✍️" },
                { value: "0", label: "Bookings", icon: "🏨" },
                { value: "0", label: "Places", icon: "🗺️" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-center"
                >
                  <span className="text-xl">{s.icon}</span>
                  <p className="mt-1 text-2xl font-extrabold text-emerald-700">{s.value}</p>
                  <p className="text-xs font-medium text-slate-500">{s.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={item}
              className="mt-6 overflow-hidden rounded-2xl border border-emerald-100"
            >
              {[
                { label: "Full name", value: user.name },
                { label: "Email", value: user.email },
                { label: "Role", value: (user.role || "user").toUpperCase() },
                { label: "User ID", value: user.id },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between gap-4 px-5 py-4 ${
                    i !== 3 ? "border-b border-emerald-100" : ""
                  } ${i % 2 ? "bg-emerald-50/40" : "bg-white"}`}
                >
                  <span className="text-sm font-semibold text-slate-500">{row.label}</span>
                  <span className="truncate text-sm font-bold text-emerald-950">
                    {row.label === "User ID" ? `${row.value.slice(0, 10)}…` : row.value}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  signOut();
                  router.push("/login");
                }}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 font-bold text-white shadow-lg shadow-red-500/30 transition-all hover:shadow-xl active:scale-[0.98]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Sign Out
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl active:scale-[0.98]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                  <rect x="3" y="3" width="7" height="9" rx="1.5" />
                  <rect x="14" y="3" width="7" height="5" rx="1.5" />
                  <rect x="14" y="12" width="7" height="9" rx="1.5" />
                  <rect x="3" y="16" width="7" height="5" rx="1.5" />
                </svg>
                Go to Dashboard
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}