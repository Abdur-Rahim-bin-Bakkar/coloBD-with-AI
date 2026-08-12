import Link from "next/link";
import { Button, Input } from "@heroui/react";
import Logo from "./Logo";

const QUICK_LINKS = [
  { label: "Explore Places", href: "/places" },
  { label: "Travel Experiences", href: "/experiences" },
  { label: "Hotels & Rooms", href: "/hotels" },
  { label: "Plan a Trip", href: "/hotels" },
];

const DESTINATIONS = [
  { label: "Cox's Bazar", href: "/places/coxs-bazar" },
  { label: "Sylhet", href: "/places/sylhet" },
  { label: "Bandarban", href: "/places/bandarban" },
  { label: "Sajek Valley", href: "/places/sajek-valley" },
  { label: "Saint Martin", href: "/places/saint-martin" },
];

const SOCIALS = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
  {
    name: "X / Twitter",
    href: "#",
    icon: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-emerald-950 text-emerald-100">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="leaves"
              x="0"
              y="0"
              width="72"
              height="72"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M36 8c4 4 4 16 0 28-4-12-4-24 0-28ZM36 44c4 4 4 16 0 28-4-12-4-24 0-28Z"
                stroke="rgba(255,255,255,0.06)"
                fill="none"
                strokeWidth="1.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaves)" />
        </svg>
      </div>

      <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo onDark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-emerald-200/80">
              coloBD helps you discover the green heart of Bangladesh — from
              the golden sands of Cox&apos;s Bazar to the misty hills of
              Bandarban. Explore places, read real travel experiences, and book
              your stay in minutes.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Open for travellers, 24/7
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-emerald-100/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300">
              Top Destinations
            </h4>
            <ul className="mt-4 space-y-2.5">
              {DESTINATIONS.map((link) => (
                <li key={link.label} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-emerald-500" />
                  <Link
                    href={link.href}
                    className="text-sm text-emerald-100/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300">
              Stay Inspired
            </h4>
            <p className="mt-4 text-sm text-emerald-100/70">
              Get the latest hidden gems and travel tips from Bangladesh.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Input
                aria-label="Email address"
                type="email"
                placeholder="you@example.com"
                className="border-white/20 bg-white/5 text-white placeholder:text-emerald-200/50"
              />
              <Button
                className="bg-gradient-to-r from-emerald-400 to-emerald-600 font-semibold text-emerald-950 shadow-lg shadow-emerald-500/20"
                size="sm"
              >
                Subscribe
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="grid size-9 place-items-center rounded-full bg-white/10 text-emerald-100 transition-all hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-emerald-800/60 pt-6 sm:flex-row">
          <p className="text-xs text-emerald-200/60">
            © {new Date().getFullYear()} coloBD. Made with{" "}
            <span className="text-emerald-400">♥</span> for the Land of Green.
          </p>
          <div className="flex items-center gap-5 text-xs text-emerald-200/60">
            <Link href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}