"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

const BENEFITS = [
  { icon: "✍️", title: "Share your story", desc: "Post tour experiences with photos & tips" },
  { icon: "🏨", title: "Book hotels", desc: "Reserve rooms at top Bangladesh stays" },
  { icon: "🗺️", title: "Discover places", desc: "Cox's Bazar, Sylhet, Bandarban & beyond" },
];

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploadingAvatar(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (json.success) {
        setAvatar(json.url);
      } else {
        setError(json.message || "Avatar upload failed.");
      }
    } catch {
      setError("Could not upload your photo. Please try again.");
    } finally {
      setUploadingAvatar(false);
      e.target.value = "";
    }
  }

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: avatar || undefined,
        callbackURL: "/",
      });
      if (error) {
        setError(error.message || "Registration failed. Please try again.");
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
      setError("Google sign-up failed. Please try again.");
      setGoogleLoading(false);
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <div className="pointer-events-none absolute -left-24 bottom-10 size-96 rounded-full bg-teal-300/40 blur-3xl animate-drift" />
      <div className="pointer-events-none absolute -right-20 top-20 size-[28rem] rounded-full bg-emerald-300/40 blur-3xl animate-drift" style={{ animationDelay: "-7s" }} />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-stretch gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative hidden overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-teal-700 via-emerald-800 to-emerald-950 p-10 text-white shadow-2xl shadow-emerald-900/30 lg:flex lg:flex-col lg:justify-between"
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
            aria-hidden="true"
          >
            <defs>
              <pattern id="signup-leaves" width="80" height="80" patternUnits="userSpaceOnUse">
                <path
                  d="M40 10c5 8 5 22 0 30-5-8-5-22 0-30Z M40 40c5 8 5 22 0 30-5-8-5-22 0-30Z"
                  stroke="rgba(255,255,255,0.15)"
                  fill="none"
                  strokeWidth="1.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#signup-leaves)" />
          </svg>

          <div className="relative">
            <Logo onDark />
            <motion.h2
              variants={item}
              className="mt-10 text-4xl font-extrabold leading-tight"
            >
              Join the{" "}
              <span className="bg-gradient-to-r from-teal-300 to-lime-200 bg-clip-text text-transparent">
                green travellers
              </span>{" "}
              of Bangladesh.
            </motion.h2>

            <div className="mt-8 space-y-4">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b.title}
                  variants={item}
                  className={`flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md ${
                    i % 2 ? "lg:ml-14" : "lg:mr-14"
                  }`}
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal-500/30 text-xl">
                    {b.icon}
                  </span>
                  <div>
                    <p className="font-semibold">{b.title}</p>
                    <p className="text-sm text-emerald-100/70">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div variants={item} className="relative rounded-2xl border border-lime-300/20 bg-emerald-950/40 p-5 backdrop-blur-md">
            <div className="flex -space-x-3">
              {["#22c55e", "#0ea5e9", "#f59e0b", "#ef4444", "#a855f7"].map((c, i) => (
                <span
                  key={c}
                  className="grid size-10 place-items-center rounded-full border-2 border-emerald-900 text-sm font-bold text-white"
                  style={{ backgroundColor: c }}
                >
                  {["R", "M", "S", "A", "N"][i]}
                </span>
              ))}
              <span className="grid size-10 place-items-center rounded-full border-2 border-emerald-900 bg-white/20 text-xs font-bold text-white">
                +25K
              </span>
            </div>
            <p className="mt-4 text-sm text-emerald-100/90">
              Join <span className="font-bold text-lime-300">25,000+</span> travellers who explore the Land of Green with coloBD.
            </p>
          </motion.div>
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
                Create your account
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                A few details and you&apos;re ready to explore.
              </p>
            </motion.div>

            <motion.div variants={item} className="mt-6 flex flex-col items-center">
              <div className="relative">
                <div className="group relative grid size-24 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700 ring-4 ring-emerald-200">
                  {avatar ? (
                    <Image
                      src={avatar}
                      alt="Profile preview"
                      fill
                      sizes="96px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-3xl text-white/90">
                      {uploadingAvatar ? (
                        <span className="block size-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-9">
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" strokeLinecap="round" />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-1 -right-1 grid size-9 cursor-pointer place-items-center rounded-full bg-emerald-600 text-white shadow-lg ring-2 ring-white transition-transform hover:scale-110"
                  title="Upload photo"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
                  </svg>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFile}
                  />
                </label>
              </div>
              <p className="mt-3 text-xs font-medium text-slate-400">
                {avatar ? "Looking good! (tap the gear to change)" : "Add a profile photo (optional)"}
              </p>
            </motion.div>

            <motion.div variants={item} className="mt-5">
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
                Sign up with Google
              </button>

              <div className="flex items-center gap-4 py-1">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  or sign up with email
                </span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
            </motion.div>

            <form onSubmit={handleEmailSubmit} className="mt-1 space-y-4">
              <motion.div variants={item}>
                <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-emerald-950">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Farhana Akter"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </motion.div>

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
                <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-emerald-950">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
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
                <label htmlFor="confirm" className="mb-1.5 block text-sm font-semibold text-emerald-950">
                  Confirm password
                </label>
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter your password"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </motion.div>

              <motion.div variants={item} className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5">
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path d="M20 12a8 8 0 0 1-.94 3.72l-1.33 5.33-5.2-2.6A8 8 0 1 1 20 12Z" strokeLinecap="round" />
                  </svg>
                  Default role: User
                </span>
                <span className="text-xs text-slate-400">— you can upgrade later</span>
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
                    Creating account…
                  </span>
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </form>

            <motion.p variants={item} className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-700">
                Sign in
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}