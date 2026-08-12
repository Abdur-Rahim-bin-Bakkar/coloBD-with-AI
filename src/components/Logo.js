import Link from "next/link";

export default function Logo({ onDark = false, className = "" }) {
  return (
    <Link
      href="/"
      aria-label="coloBD — home"
      className={`group flex items-center gap-2.5 ${className}`}
    >
      <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/30 ring-1 ring-white/30 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-6 text-white"
          aria-hidden="true"
        >
          <path
            d="M12 21c0-5 3.5-8.5 8-9.7C19.2 16 15.9 19.8 12 21Z"
            fill="currentColor"
          />
          <path
            d="M12 21V4.5M12 21c-4.5-1.2-8-5.4-8-9.7 4.5 1.2 8 4.7 8 9.7Z"
            fill="currentColor"
            opacity="0.75"
          />
          <path
            d="M5.6 5.2C8.4 6.6 10.6 8.7 12 11.4 13.4 8.7 15.6 6.6 18.4 5.2c-.3 4.1-3 7.6-6.4 8.9-3.4-1.3-6.1-4.8-6.4-8.9Z"
            fill="#fff"
            opacity="0.9"
          />
        </svg>
      </span>
      <span
        className={`text-2xl font-extrabold tracking-tight ${
          onDark ? "text-white" : "text-emerald-950"
        }`}
      >
        colo
        <span className="bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
          BD
        </span>
      </span>
    </Link>
  );
}