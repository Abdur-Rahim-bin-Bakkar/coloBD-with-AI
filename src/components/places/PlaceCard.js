"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  reactToPlace,
  fetchComments,
  addComment,
  deleteComment,
  getErrorMessage,
} from "@/lib/api";

export const REACTIONS = [
  { key: "like", emoji: "👍", label: "Like" },
  { key: "love", emoji: "😍", label: "Love" },
  { key: "sad", emoji: "😢", label: "Sad" },
  { key: "angry", emoji: "😡", label: "Angry" },
];

function timeAgo(iso) {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export function Comments({ placeId, user, onRequireAuth, autoLoad = false }) {
  const [comments, setComments] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setComments(await fetchComments(placeId));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!autoLoad) return;
    const timer = setTimeout(load, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLoad]);

  const submit = async (e) => {
    e.preventDefault();
    if (!user) return onRequireAuth();
    setSending(true);
    setError("");
    try {
      const created = await addComment(placeId, text);
      setComments((prev) => [created, ...(prev || [])]);
      setText("");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSending(false);
    }
  };

  const remove = async (id) => {
    try {
      await deleteComment(id);
      setComments((prev) => (prev || []).filter((c) => c._id !== id));
    } catch {
      /* keep list as-is on failure */
    }
  };

  if (comments === null) {
    return (
      <button
        type="button"
        onClick={load}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-emerald-200 py-4 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-60"
      >
        {loading ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
            Loading comments…
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            View comments
          </>
        )}
      </button>
    );
  }

  return (
    <div className="space-y-3 border-t border-emerald-100 pt-4">
      {!user ? (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-center">
          <p className="text-sm text-slate-600">
            <button
              type="button"
              onClick={onRequireAuth}
              className="font-bold text-emerald-700 underline-offset-4 hover:underline"
            >
              Sign in
            </button>{" "}
            to join the conversation.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment…"
            className="h-11 flex-1 rounded-2xl border border-emerald-200 bg-emerald-50/50 px-4 text-sm text-emerald-950 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
          />
          <button
            type="submit"
            disabled={!text.trim() || sending}
            className="grid h-11 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 font-bold text-white shadow-md shadow-emerald-500/25 transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send comment"
          >
            {sending ? (
              <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-4"><path d="m5 12 14-7-5 14-2.5-5.5L5 12Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </button>
        </form>
      )}

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      <div className="max-h-64 space-y-2.5 overflow-y-auto pr-1">
        {comments.length === 0 && (
          <p className="rounded-2xl bg-white p-4 text-center text-sm text-slate-500">
            No comments yet — be the first to share your thoughts.
          </p>
        )}
        {comments.map((c) => (
          <motion.div
            key={c._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-emerald-100"
          >
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700 text-xs font-bold text-white">
                {(c.userId?.name || "U").charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-emerald-950">
                  {c.userId?.name || "Anonymous"}
                </p>
                <p className="text-[11px] text-slate-400">{timeAgo(c.createdAt)}</p>
              </div>
              {user && String(c.userId?._id || c.userId) === user.id && (
                <button
                  type="button"
                  onClick={() => remove(c._id)}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  aria-label="Delete comment"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 4v6m4-6v6m4-6v6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              )}
            </div>
            <p className="mt-2 pl-[2.6rem] text-sm leading-relaxed text-slate-600">
              {c.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function PlaceCard({ place, user, onRequireAuth, index = 0 }) {
  const [reactions, setReactions] = useState(place.reactions);
  const [myReactions, setMyReactions] = useState(place.myReactions || []);
  const [busyReaction, setBusyReaction] = useState(null);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [actionError, setActionError] = useState("");

  const handleReact = async (reaction) => {
    if (!user) return onRequireAuth();
    if (busyReaction) return;
    setActionError("");

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
      const result = await reactToPlace(place._id, reaction);
      setReactions(result.reactions);
      setMyReactions(result.myReactions);
    } catch (err) {
      setReactions(prev.reactions);
      setMyReactions(prev.myReactions);
      setActionError(getErrorMessage(err));
    } finally {
      setBusyReaction(null);
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 24, delay: Math.min(index * 0.05, 0.4) }}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-emerald-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10"
    >
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-emerald-400 via-lime-400 to-teal-400 transition-transform duration-500 group-hover:scale-x-100" />
      <Link href={`/places/${place._id}`} className="relative aspect-[16/10] block overflow-hidden">
        {place.image ? (
          <Image
            src={place.image}
            alt={place.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-emerald-100 to-teal-100 text-4xl">
            🌿
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-emerald-950/70 px-3 py-1 text-[11px] font-bold text-lime-200 backdrop-blur-sm">
            📍 {place.location}
          </span>
          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-emerald-800 backdrop-blur-sm">
            {place.place}
          </span>
        </div>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-emerald-800 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          View details
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="size-3"><path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/places/${place._id}`}>
          <h3 className="text-base font-extrabold leading-snug text-emerald-950 transition-colors group-hover:text-emerald-700">
            {place.title}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {place.description || "A beautiful spot waiting to be explored in Bangladesh."}
        </p>

        {actionError && (
          <p className="mt-2 rounded-xl bg-red-50 px-3 py-1.5 text-xs font-medium text-red-500">
            {actionError}
          </p>
        )}

        <div className="mt-4 grid grid-cols-4 gap-1.5">
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
                className={`inline-flex items-center justify-center gap-1 rounded-xl px-1.5 py-2 text-xs font-bold transition-all ${
                  active
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-500/25"
                    : "bg-emerald-50 text-slate-600 hover:bg-emerald-100 hover:text-emerald-800"
                } ${busy ? "opacity-60" : "hover:-translate-y-0.5"}`}
              >
                <span className={active ? "" : "opacity-90"}>{r.emoji}</span>
                <span className="tabular-nums">{count}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setCommentsOpen((v) => !v)}
          className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-emerald-100 py-2 text-xs font-bold text-emerald-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span>{place.commentsCount || 0} comment{place.commentsCount === 1 ? "" : "s"}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={`size-3.5 transition-transform ${commentsOpen ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        <AnimatePresence initial={false}>
          {commentsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                <Comments
                  placeId={place._id}
                  user={user}
                  onRequireAuth={onRequireAuth}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}