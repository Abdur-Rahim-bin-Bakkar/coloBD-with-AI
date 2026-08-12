"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import { fetchPlaces, getErrorMessage } from "@/lib/api";
import PlaceCard from "@/components/places/PlaceCard";

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[1.75rem] border border-emerald-100 bg-white">
      <div className="aspect-[16/10] bg-emerald-100" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 rounded-full bg-emerald-200" />
        <div className="h-3 w-full rounded-full bg-emerald-100" />
        <div className="flex gap-2 pt-2">
          <div className="h-8 w-14 rounded-xl bg-emerald-100" />
          <div className="h-8 w-14 rounded-xl bg-emerald-100" />
          <div className="h-8 w-14 rounded-xl bg-emerald-100" />
          <div className="h-8 w-14 rounded-xl bg-emerald-100" />
        </div>
      </div>
    </div>
  );
}

export default function FeaturedPlaces() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        setPlaces(await fetchPlaces({ sort: "popular", limit: 4 }));
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const requireAuth = () => router.push("/login");

  return (
    <section className="relative overflow-hidden bg-emerald-50/60 py-16 sm:py-20">
      <div className="dotted-bg pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-sm font-semibold text-emerald-700 shadow-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Traveller favourites
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              places
            </span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            The spots travellers are reacting to and talking about the most —
            loved, laughed at, and rated by the coloBD community.
          </p>
        </motion.div>

        {error ? (
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm font-medium text-red-500">{error}</p>
          </div>
        ) : loading ? (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : places.length === 0 ? (
          <p className="mt-12 text-center text-sm text-slate-500">
            No featured places yet — check back soon.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {places.map((p, i) => (
              <PlaceCard key={p._id} place={p} user={user} onRequireAuth={requireAuth} index={i} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/places"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30 group-hover:gap-3"
          >
            Explore all places
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="size-4 transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}