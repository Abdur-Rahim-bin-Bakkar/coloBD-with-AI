"use client";

export default function Marquee({ items, className = "", itemClassName = "" }) {
  const doubled = [...items, ...items];
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee items-center gap-3 pr-3 group-hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`flex items-center gap-3 whitespace-nowrap ${itemClassName}`}
          >
            {item}
            <span className="text-emerald-500/60" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-emerald-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-emerald-950 to-transparent" />
    </div>
  );
}