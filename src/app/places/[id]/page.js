"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import {
  fetchPlace,
  fetchPlaces,
  reactToPlace,
  getErrorMessage,
} from "@/lib/api";
import { Comments, REACTIONS } from "@/components/places/PlaceCard";

const REACTION_LABEL = { like: "Like", love: "Love", sad: "Sad", angry: "Angry" };

export default function PlaceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [place, setPlace] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reactions, setReactions] = useState(null);
  const [myReactions, setMyReactions] = useState([]);
  const [busyReaction, setBusyReaction] = useState(null);
  const [savedKey, setSavedKey] = useState(null);
  const [actionError, setActionError] = useState("");
  const loadedRef = useRef(false);
  const savedTimer = useRef(null);

  const requireAuth = () => router.push("/login");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchPlace(id);
      setPlace(data);
      setReactions(data.reactions || { like: 0, love: 0, sad: 0, angry: 0 });
      setMyReactions(data.myReactions || []);
      try {
        const list = await fetchPlaces({ location: data.location });
        setRelated(list.filter((p) => p._id !== id).slice(0, 3));
      } catch {
        /* related places are optional */
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    load();
  }, [load]);

  const handleReact = async (reaction) => {
    if (!user) return requireAuth();
    if (busyReaction) return;
    setActionError("");
    clearTimeout(savedTimer.current);

    const prev = { reactions, myReactions };
    const wasActive = myReactions.includes(reaction);
    let nextMy = wasActive
      ? myReactions.filter((r) => r !== reaction)
      : [reaction];
    let next = {
      like: reactions.like,
      love: reactions.love,
      sad: reactions.sad,
      angry: reactions.angry,
    };
    if (wasActive) {
      next[reaction] = Math.max(0, (next[reaction] || 0) - 1);
    } else {
      for (const key of ["like", "love", "sad", "angry"]) {
        if (key === reaction) next[key] = (next[key] || 0) + 1;
        else if (myReactions.includes(key)) next[key] = Math.max(0, (next[key] || 0) - 1);
      }
    }

    setReactions(next);
    setMyReactions(nextMy);
    setBusyReaction(reaction);

    try {
      const result = await reactToPlace(id, reaction);
      setReactions(result.reactions);
      setMyReactions(result.myReactions);
      if (result.myReactions.includes(reaction)) {
        setSavedKey(reaction);
        savedTimer.current = setTimeout(() => setSavedKey(null), 2200);
      }
    } catch (err) {
      setReactions(prev.reactions);
      setMyReactions(prev.myReactions);
      setActionError(getErrorMessage(err));
    } finally {
      setBusyReaction(null);
    }
  };

  const myReaction = REACTIONS.find((r) => myReactions.includes(r.key));

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-pulse overflow-hidden rounded-[2.5rem] border border-emerald-100 bg-white">
          <div className="aspect-[16/7] bg-gradient-to-br from-emerald-100 to-teal-100" />
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_20rem]">
            <div className="space-y-4">
              <div className="h-10 w-2/3 rounded-2xl bg-emerald-200" />
              <div className="h-4 w-1/2 rounded-full bg-emerald-100" />
              <div className="h-3 w-full rounded-full bg-emerald-100" />
              <div className="h-3 w-5/6 rounded-full bg-emerald-100" />
              <div className="flex flex-wrap gap-2 pt-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-16 w-24 rounded-2xl bg-emerald-100" />
                ))}
              </div>
            </div>
            <div className="h-64 rounded-3xl bg-emerald-50" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <div className="mx-auto grid size-20 place-items-center rounded-3xl bg-emerald-100 text-4xl">
          🗺️
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-emerald-950">
          Could not load this place
        </h1>
        <p className="mt-2 text-sm text-slate-500">{error || "Place not found."}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              loadedRef.current = false;
              setPlace(null);
              load();
            }}
            className="rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-500/25"
          >
            Try again
          </button>
          <Link
            href="/places"
            className="rounded-full border border-emerald-200 px-6 py-2.5 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            Back to places
          </Link>
        </div>
      </div>
    );
  }

  const totalReactions =
    (reactions?.like || 0) +
    (reactions?.love || 0) +
    (reactions?.sad || 0) +
    (reactions?.angry || 0);

  return (
    <div className="overflow-hidden">
      {/* ================= hero ================= */}
      <section className="relative">
        <div className="absolute -left-32 top-16 z-10 size-96 rounded-full bg-emerald-400/20 blur-3xl animate-drift" />
        <div className="absolute -right-32 bottom-24 z-10 size-[28rem] rounded-full bg-teal-300/20 blur-3xl animate-drift" style={{ animationDelay: "-6s" }} />

        <div className="relative aspect-[16/8] overflow-hidden">
          {place.image ? (
            <Image
              src={place.image}
              alt={place.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-emerald-100 to-teal-100 text-6xl">
              🌿
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/25 to-emerald-950/40" />
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              <Link
                href="/places"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold text-lime-200 backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="size-3.5"><path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                All places
              </Link>

              <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-950/70 px-4 py-1.5 text-xs font-bold text-lime-200 backdrop-blur-sm">
                      📍 {place.location}
                    </span>
                    <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-emerald-800 backdrop-blur-sm">
                      🏞️ {place.place}
                    </span>
                  </div>
                  <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl">
                    {place.title}
                  </h1>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md">
                  <span aria-hidden="true">💥</span> {totalReactions} reaction{totalReactions === 1 ? "" : "s"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md">
                  <span aria-hidden="true">💬</span> {place.commentsCount || 0} comment{place.commentsCount === 1 ? "" : "s"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md">
                  <span aria-hidden="true">🗺️</span> {place.location} · {place.place}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= body ================= */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          {/* -------- main column -------- */}
          <div className="min-w-0 space-y-8">
            {/* about */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, type: "spring", stiffness: 200, damping: 24 }}
              className="overflow-hidden rounded-[2.5rem] border border-emerald-100 bg-white p-6 shadow-md shadow-emerald-900/5 sm:p-10"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-lg text-white shadow-md shadow-emerald-500/25">
                  📖
                </span>
                <div>
                  <h2 className="text-xl font-extrabold text-emerald-950">About this place</h2>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {place.location} · {place.place}
                  </p>
                </div>
              </div>

              <p className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-slate-600">
                {place.description ||
                  "A beautiful spot waiting to be explored in Bangladesh."}
              </p>

              <div className="mt-8 h-px w-full bg-gradient-to-r from-emerald-200 via-emerald-100 to-transparent" />

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold text-emerald-800">
                  Added {new Date(place.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </span>
                <span className="rounded-full bg-lime-100 px-4 py-1.5 text-xs font-bold text-lime-800">
                  {totalReactions > 50 ? "🔥 Trending" : totalReactions > 10 ? "⭐ Popular" : totalReactions > 0 ? "💬 Getting noticed" : "🌱 Newly listed"}
                </span>
                <span className="rounded-full bg-teal-100 px-4 py-1.5 text-xs font-bold text-teal-800">
                  Open to everyone
                </span>
              </div>
            </motion.div>

            {/* reaction sender */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, type: "spring", stiffness: 200, damping: 24 }}
              className="relative overflow-hidden rounded-[2.5rem] border border-emerald-100 bg-white p-6 shadow-md shadow-emerald-900/5 sm:p-10"
            >
              <div className="dotted-bg pointer-events-none absolute inset-0 opacity-60" />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-lime-500 to-emerald-600 text-lg text-white shadow-md shadow-emerald-500/25">
                      💚
                    </span>
                    <div>
                      <h2 className="text-xl font-extrabold text-emerald-950">Send your reaction</h2>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        It&apos;s saved to the database instantly
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {savedKey && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/30"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-3.5"><path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        {REACTION_LABEL[savedKey]} saved
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {actionError && (
                  <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-500">
                    {actionError}
                  </p>
                )}

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {REACTIONS.map((r) => {
                    const active = myReactions.includes(r.key);
                    const count = reactions?.[r.key] || 0;
                    const busy = busyReaction === r.key;
                    return (
                      <button
                        key={r.key}
                        type="button"
                        onClick={() => handleReact(r.key)}
                        title={`${r.label}${count ? ` (${count})` : ""}`}
                        className={`group/react relative flex flex-col items-center gap-1.5 rounded-3xl border-2 px-3 py-5 text-sm font-bold transition-all duration-200 ${
                          active
                            ? "scale-[1.02] border-emerald-500 bg-gradient-to-b from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-500/30"
                            : "border-emerald-100 bg-emerald-50/60 text-slate-600 hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900"
                        } ${busy ? "pointer-events-none opacity-80" : ""}`}
                      >
                        <span className={`text-3xl transition-transform duration-200 ${active ? "" : "group-hover/react:scale-125"}`}>
                          {r.emoji}
                        </span>
                        <span>{r.label}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 tabular-nums text-[11px] ${
                            active ? "bg-white/20 text-white" : "bg-white text-emerald-700"
                          }`}
                        >
                          {count}
                        </span>
                        {busy && (
                          <span className="absolute inset-0 grid place-items-center rounded-3xl bg-white/40 backdrop-blur-[1px]">
                            <span className="size-6 animate-spin rounded-full border-[3px] border-emerald-600 border-t-transparent" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-5 text-sm text-slate-500">
                  {isPending ? null : user ? (
                    myReaction ? (
                      <>
                        You reacted <span className="font-bold text-emerald-700">{myReaction.emoji} {myReaction.label}</span> —
                        tap it again to remove your reaction.
                      </>
                    ) : (
                      <>Pick how this place makes you feel — your reaction saves instantly.</>
                    )
                  ) : (
                    <button onClick={requireAuth} className="font-bold text-emerald-700 underline-offset-4 hover:underline">
                      Sign in
                    </button>
                  )}
                </p>
              </div>
            </motion.div>

            {/* comments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 24 }}
              className="overflow-hidden rounded-[2.5rem] border border-emerald-100 bg-white p-6 shadow-md shadow-emerald-900/5 sm:p-10"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-lg text-white shadow-md shadow-emerald-500/25">
                    💬
                  </span>
                  <div>
                    <h2 className="text-xl font-extrabold text-emerald-950">Comments</h2>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Join the conversation
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-800">
                  {place.commentsCount || 0}
                </span>
              </div>
              <div className="mt-6">
                <Comments
                  placeId={place._id}
                  user={user}
                  onRequireAuth={requireAuth}
                  autoLoad
                />
              </div>
            </motion.div>
          </div>

          {/* -------- sidebar -------- */}
          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, type: "spring", stiffness: 200, damping: 24 }}
              className="overflow-hidden rounded-[2.5rem] border border-emerald-100 bg-white shadow-md shadow-emerald-900/5"
            >
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 px-6 py-6 text-white">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-lime-300">
                  Quick info
                </h3>
                <p className="mt-1 text-lg font-extrabold">{place.title}</p>
              </div>
              <div className="divide-y divide-emerald-50 px-6 py-4">
                {[
                  { icon: "📍", label: "Location", value: place.location },
                  { icon: "🏞️", label: "Place", value: place.place },
                  {
                    icon: "📅",
                    label: "Added",
                    value: new Date(place.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }),
                  },
                  { icon: "💥", label: "Total reactions", value: totalReactions },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-3 py-3.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-base">
                      {row.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        {row.label}
                      </p>
                      <p className="truncate text-sm font-bold text-emerald-950">{row.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {related.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, type: "spring", stiffness: 200, damping: 24 }}
                className="overflow-hidden rounded-[2.5rem] border border-emerald-100 bg-white p-6 shadow-md shadow-emerald-900/5"
              >
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800">
                  More in {place.location}
                </h3>
                <div className="mt-4 space-y-3">
                  {related.map((p) => (
                    <Link
                      key={p._id}
                      href={`/places/${p._id}`}
                      className="group/rel flex items-center gap-3 rounded-2xl p-1.5 transition-colors hover:bg-emerald-50"
                    >
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl">
                        {p.image && (
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            sizes="56px"
                            className="object-cover transition-transform duration-300 group-hover/rel:scale-110"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-emerald-950 group-hover/rel:text-emerald-700">
                          {p.title}
                        </p>
                        <p className="text-[11px] text-slate-400">🏞️ {p.place}</p>
                      </div>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="ml-auto size-4 shrink-0 text-emerald-400" >
                        <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}