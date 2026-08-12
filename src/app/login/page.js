"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import Logo from "@/components/Logo";
import GoogleIcon from "@/components/auth/GoogleIcon";
import FormError from "@/components/auth/FormError";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

const DESTINATIONS = [
  { name: "Cox's Bazar", tag: "120 km beach", icon: "🏖️" },
  { name: "Sylhet", tag: "Tea country", icon: "🍃" },
  { name: "Bandarban", tag: "Hill tracks", icon: "⛰️" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data, error } = await authClient.signIn.email({ email, password });
      if (error) {
        setError(error.message || "Invalid email or password.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      setError("Google sign-in failed. Please try again.");
      setGoogleLoading(false);
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="pointer-events-none absolute -left-24 top-10 size-96 rounded-full bg-emerald-300/40 blur-3xl animate-drift" />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-[28rem] rounded-full bg-teal-300/40 blur-3xl animate-drift" style={{ animationDelay: "-8s" }} />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-stretch gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative hidden overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 p-10 text-white shadow-2xl shadow-emerald-900/30 lg:flex lg:flex-col lg:justify-between"
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
            aria-hidden="true"
          >
            <defs>
              <pattern id="login-leaves" width="80" height="80" patternUnits="userSpaceOnUse">
                <path
                  d="M40 10c5 8 5 22 0 30-5-8-5-22 0-30Z M40 40c5 8 5 22 0 30-5-8-5-22 0-30Z"
                  stroke="rgba(255,255,255,0.15)"
                  fill="none"
                  strokeWidth="1.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#login-leaves)" />
          </svg>

          <div className="relative">
            <Logo onDark />
            <motion.h2
              variants={item}
              className="mt-10 text-4xl font-extrabold leading-tight"
            >
              Welcome back to the{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent">
                Land of Green.
              </span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-md text-emerald-100/80">
              Your next adventure in Bangladesh is one sign-in away. Continue
              where you left off — your bookings, experiences and favourite
              places are waiting.
            </motion.p>
          </div>

          <div className="relative space-y-5">
            {DESTINATIONS.map((d, i) => (
              <motion.div
                key={d.name}
                variants={item}
                className={`flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md ${
                  i % 2 ? "lg:ml-16" : "lg:mr-16"
                }`}
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-emerald-500/30 text-2xl">
                  {d.icon}
                </span>
                <div>
                  <p className="font-semibold">{d.name}</p>
                  <p className="text-sm text-emerald-100/70">{d.tag}</p>
                </div>
              </motion.div>
            ))}

            <motion.blockquote
              variants={item}
              className="rounded-2xl border border-lime-300/20 bg-emerald-950/40 p-5 backdrop-blur-md"
            >
              <p className="text-sm leading-relaxed text-emerald-100/90">
                &ldquo;coloBD made planning our Sajek trip effortless — booked a
                cabin and read real traveller tips before we left.&rdquo;
              </p>
              <footer className="mt-3 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-lime-400 to-emerald-600 text-sm font-bold text-emerald-950">
                  F
                </span>
                <span className="text-sm text-emerald-100/70">Farhana, Dhaka</span>
              </footer>
            </motion.blockquote>

            <motion.div
              variants={item}
              className="flex items-center justify-around rounded-2xl bg-white/5 py-4 backdrop-blur-md"
            >
              {[
                ["50+", "Places"],
                ["2K+", "Experiences"],
                ["300+", "Hotels"],
              ].map(([value, label]) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-extrabold text-lime-300">{value}</p>
                  <p className="text-xs text-emerald-100/70">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex items-center justify-center py-4"
        >
          <motion.div
            variants={item}
            className="w-full max-w-md rounded-[2rem] border border-emerald-100 bg-white/90 p-8 shadow-xl shadow-emerald-900/5 backdrop-blur-xl sm:p-10"
          >
            <div className="lg:hidden">
              <Logo />
            </div>

            <motion.div variants={item} className="mt-6 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-emerald-950">
                Sign in
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Welcome back! Let&apos;s keep exploring Bangladesh.
              </p>
            </motion.div>

            <motion.div variants={item} className="mt-7 space-y-3">
              <button
                type="button"
                onClick={handleGoogle}
                disabled={googleLoading || loading}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white font-semibold text-slate-700 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {googleLoading ? (
                  <span className="size-5 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
                ) : (
                  <GoogleIcon />
                )}
                Continue with Google
              </button>

              <div className="flex items-center gap-4 py-1">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  or with email
                </span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
            </motion.div>

            <form onSubmit={handleEmailSubmit} className="mt-5 space-y-4">
              <motion.div variants={item}>
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-emerald-950">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </motion.div>

              <motion.div variants={item}>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-semibold text-emerald-950">
                    Password
                  </label>
                  <Link href="#" className="text-xs font-medium text-emerald-600 hover:text-emerald-700">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 pr-12 text-sm text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 1l22 22" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={item}>
                <FormError message={error} />
              </motion.div>

              <motion.button
                variants={item}
                type="submit"
                disabled={loading || googleLoading}
                className="h-12 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Signing in…
                  </span>
                ) : (
                  "Sign In"
                )}
              </motion.button>
            </form>

            <motion.p variants={item} className="mt-6 text-center text-sm text-slate-500">
              New to coloBD?{" "}
              <Link href="/signup" className="font-bold text-emerald-600 hover:text-emerald-700">
                Create an account
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}