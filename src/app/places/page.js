"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import { fetchPlaces, getErrorMessage } from "@/lib/api";
import PlaceCard from "@/components/places/PlaceCard";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 22, delay: i * 0.07 },
  }),
};

function SelectBox({ icon, label, value, options, onChange, placeholder }) {
  return (
    <label className="relative flex flex-1 items-center gap-2 rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-sm transition-colors focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100">
      <span aria-hidden="true">{icon}</span>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-emerald-950 outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="size-4 shrink-0 text-emerald-600" aria-hidden="true">
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[1.75rem] border border-emerald-100 bg-white">
      <div className="aspect-[16/10] bg-emerald-100" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 rounded-full bg-emerald-200" />
        <div className="h-3 w-full rounded-full bg-emerald-100" />
        <div className="h-3 w-2/3 rounded-full bg-emerald-100" />
        <div className="flex gap-2 pt-2">
          <div className="h-8 w-16 rounded-full bg-emerald-100" />
          <div className="h-8 w-16 rounded-full bg-emerald-100" />
          <div className="h-8 w-16 rounded-full bg-emerald-100" />
        </div>
      </div>
    </div>
  );
}

export default function PlacesPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [place, setPlace] = useState("");
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        setPlaces(await fetchPlaces());
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const locations = useMemo(
    () => [...new Set(places.map((p) => p.location))].sort(),
    [places]
  );

  const placeOptions = useMemo(
    () =>
      [
        ...new Set(
          places
            .filter((p) => !location || p.location === location)
            .map((p) => p.place)
        ),
      ].sort(),
    [places, location]
  );

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return places.filter((p) => {
      if (query && !p.title.toLowerCase().includes(query)) return false;
      if (location && p.location !== location) return false;
      if (place && p.place !== place) return false;
      return true;
    });
  }, [places, q, location, place]);

  const totalReactions = useMemo(
    () =>
      filtered.reduce(
        (sum, p) =>
          sum +
          (p.reactions?.like || 0) +
          (p.reactions?.love || 0) +
          (p.reactions?.sad || 0) +
          (p.reactions?.angry || 0),
        0
      ),
    [filtered]
  );

  const requireAuth = () => router.push("/login");

  const clearFilters = () => {
    setQ("");
    setLocation("");
    setPlace("");
  };

  return (
    <div className="overflow-hidden">
      {/* ---------- hero with search ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-900 to-emerald-950 pb-24 pt-16 text-white lg:pb-28 lg:pt-20">
        <div className="pointer-events-none absolute -left-24 top-0 size-96 rounded-full bg-emerald-500/30 blur-3xl animate-drift" />
        <div className="pointer-events-none absolute -right-24 bottom-0 size-[26rem] rounded-full bg-teal-400/20 blur-3xl animate-drift" style={{ animationDelay: "-8s" }} />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mx-auto max-w-3xl text-center">
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-white/10 px-4 py-1.5 text-sm font-semibold text-lime-200 backdrop-blur-md"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-lime-300" />
              </span>
              Explore places
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Discover the{" "}
              <span className="bg-gradient-to-r from-lime-300 to-teal-200 bg-clip-text text-transparent">
                hidden gems
              </span>{" "}
              of Bangladesh
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-emerald-100/85 sm:text-lg">
              Search by title, then narrow things down by location and place.
              Found a favourite? React and leave a comment to help fellow
              travellers.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="show"
            className="mx-auto mt-10 flex max-w-4xl flex-col gap-3"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-md transition-all focus-within:border-lime-300/60">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5 shrink-0 text-lime-200" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by title — e.g. Cox's Bazar, Bhawal, Inani…"
                className="h-11 w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-emerald-100/50"
              />
              {/* results count */}
              <span className="hidden shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-lime-200 sm:inline">
                {loading ? "…" : `${filtered.length} places`}
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <SelectBox
                icon={<span>📍</span>}
                label="Filter by location"
                value={location}
                onChange={setLocation}
                options={locations}
                placeholder="All locations"
              />
              <SelectBox
                icon={<span>🏞️</span>}
                label="Filter by place"
                value={place}
                onChange={setPlace}
                options={placeOptions}
                placeholder="All places"
              />
              {(q || location || place) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-4 text-sm font-bold text-lime-200 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </motion.div>
        </div>

        <svg className="relative block w-full text-emerald-50" viewBox="0 0 1440 90" fill="currentColor" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 90h1440V30c-120 30-320 52-520 42S580 20 420 24 120 56 0 44Z" opacity="0.9" />
          <path d="M0 90h1440V55c-140 20-340 30-540 18S560 34 400 40 120 62 0 52Z" />
        </svg>
      </section>

      {/* ---------- results ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        {isPending ? null : (
          <p className="mb-8 text-center text-sm text-slate-500">
            {user ? (
              <>
                Signed in as <span className="font-bold text-emerald-700">{user.name}</span> —
                reactions &amp; comments are unlocked.
              </>
            ) : (
              <>
                <button onClick={requireAuth} className="font-bold text-emerald-700 underline-offset-4 hover:underline">
                  Sign in
                </button>{" "}
                to react &amp; comment on places.
              </>
            )}
            {"  ·  "}
            <span className="font-semibold text-slate-600">{filtered.length}</span> place
            {filtered.length === 1 ? "" : "s"}
            {totalReactions > 0 && (
              <>
                {"  ·  "}
                <span className="font-semibold text-emerald-700">{totalReactions}</span>{" "}
                reactions
              </>
            )}
          </p>
        )}

        {error && (
          <div className="mx-auto max-w-lg rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-bold text-red-700">Could not load places</p>
            <p className="mt-1 text-sm text-red-500">{error}</p>
            <button
              type="button"
              onClick={() => {
                loadedRef.current = false;
                setPlaces([]);
                setError("");
                setLoading(true);
                loadedRef.current = true;
                setTimeout(() => {
                  fetchPlaces().then(setPlaces).catch((e) => setError(getErrorMessage(e))).finally(() => setLoading(false));
                }, 0);
              }}
              className="mt-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 px-6 py-2 text-sm font-bold text-white shadow-md"
            >
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mx-auto max-w-md py-12 text-center">
            <div className="mx-auto grid size-20 place-items-center rounded-3xl bg-emerald-100 text-4xl">
              🔍
            </div>
            <h3 className="mt-5 text-xl font-extrabold text-emerald-950">
              No places found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try a different title, or clear the filters to see everything.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 px-7 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-500/25"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((placeItem, i) => (
              <PlaceCard
                key={placeItem._id}
                place={placeItem}
                user={user}
                onRequireAuth={requireAuth}
                index={i}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}