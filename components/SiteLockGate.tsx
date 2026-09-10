"use client";

import { useEffect, useState } from "react";
import Ambient from "@/components/Ambient";
import { siteUnlock } from "@/data/siteLock";
import { getPreviewUnlocked, setPreviewUnlocked } from "@/lib/progress";

const PREVIEW_CODE = process.env.NEXT_PUBLIC_PREVIEW_CODE ?? "";

function getRemaining(target: Date, now: Date) {
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return null;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export default function SiteLockGate({ children }: { children: React.ReactNode }) {
  const target = new Date(siteUnlock.unlockAt);

  // null = belum dicek (hindari flash konten sebelum tau status lock),
  // true/false = status setelah dicek di client.
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [remaining, setRemaining] = useState(() => getRemaining(target, new Date()));

  const [showPreviewForm, setShowPreviewForm] = useState(false);
  const [previewCode, setPreviewCode] = useState("");
  const [previewWrong, setPreviewWrong] = useState(false);

  useEffect(() => {
    function tick() {
      const now = new Date();
      const left = getRemaining(target, now);
      setRemaining(left);
      setUnlocked(left === null || getPreviewUnlocked());
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePreviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (PREVIEW_CODE.length > 0 && previewCode.trim() === PREVIEW_CODE) {
      setPreviewUnlocked();
      setUnlocked(true);
    } else {
      setPreviewWrong(true);
    }
  }

  if (unlocked === null) {
    // Render kosong sebentar di client sebelum status kebaca, supaya tidak
    // sempat kelihatan konten aslinya lalu ke-lock lagi.
    return <main className="min-h-screen bg-ink" />;
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Ambient />
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
        {formatTargetDate(target)}
      </p>
      <h1 className="mt-4 font-display text-3xl italic text-paper sm:text-4xl">
        {siteUnlock.lockedTitle}
      </h1>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/55">
        {siteUnlock.lockedMessage}
      </p>

      {remaining && (
        <div className="mt-8 flex gap-4 sm:gap-6">
          <TimeBlock value={remaining.days} label="hari" />
          <TimeBlock value={remaining.hours} label="jam" />
          <TimeBlock value={remaining.minutes} label="menit" />
          <TimeBlock value={remaining.seconds} label="detik" />
        </div>
      )}

      <div className="mt-10">
        {!showPreviewForm ? (
          <button
            onClick={() => setShowPreviewForm(true)}
            className="focus-ring text-xs text-paper/25 underline decoration-dotted underline-offset-4 hover:text-paper/45"
          >
            {siteUnlock.previewPrompt}
          </button>
        ) : (
          <form onSubmit={handlePreviewSubmit} className="flex flex-col items-center gap-3">
            <input
              autoFocus
              type="password"
              value={previewCode}
              onChange={(e) => {
                setPreviewCode(e.target.value);
                if (previewWrong) setPreviewWrong(false);
              }}
              placeholder="kode preview"
              className={`focus-ring w-48 rounded-xl border bg-plum/60 px-4 py-2.5 text-center text-sm text-paper placeholder:text-paper/30 transition-colors ${
                previewWrong ? "border-blush/60" : "border-paper/15 focus:border-amber/50"
              }`}
            />
            {previewWrong && (
              <p className="text-xs text-blush">{siteUnlock.previewWrongMessage}</p>
            )}
          </form>
        )}
      </div>
    </main>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-3xl text-amber tabular-nums sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-paper/35">
        {label}
      </span>
    </div>
  );
}

function formatTargetDate(target: Date) {
  return target.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
