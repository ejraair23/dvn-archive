"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Ambient from "@/components/Ambient";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/Button";
import { puzzle } from "@/data/puzzle";
import { normalizeAnswer } from "@/lib/normalize";
import { getPuzzleSolved, setPuzzleSolved } from "@/lib/progress";

export default function PuzzlePage() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "wrong" | "correct">("idle");
  const [showHint, setShowHint] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (getPuzzleSolved()) {
      router.replace("/gifts");
      return;
    }
    setChecking(false);
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalized = normalizeAnswer(value);
    const isCorrect = puzzle.answers.some((a) => normalizeAnswer(a) === normalized);

    if (isCorrect) {
      setStatus("correct");
      setPuzzleSolved();
      setTimeout(() => router.push("/gifts"), 1100);
    } else {
      setStatus("wrong");
    }
  }

  if (checking) return null;

  return (
    <main className="relative flex min-h-screen flex-col">
      <Ambient />
      <NavBar backHref="/" backLabel="mulai lagi" />

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-md">
          {status === "correct" ? (
            <div className="animate-unlock text-center">
              <p className="text-3xl">✨</p>
              <p className="mt-4 font-display text-2xl italic text-paper">
                {puzzle.successMessage}
              </p>
            </div>
          ) : (
            <div className="animate-rise">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
                sebelum dibuka
              </p>
              <h1 className="mt-3 font-display text-2xl text-paper sm:text-3xl">
                {puzzle.question}
              </h1>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <input
                  autoFocus
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (status === "wrong") setStatus("idle");
                  }}
                  placeholder="jawaban lu..."
                  className={`focus-ring w-full rounded-2xl border bg-plum/60 px-5 py-4 text-base text-paper placeholder:text-paper/30 transition-colors ${
                    status === "wrong"
                      ? "border-blush/60 animate-shake"
                      : "border-paper/15 focus:border-amber/50"
                  }`}
                />

                {status === "wrong" && (
                  <p className="text-sm text-blush">{puzzle.wrongMessage}</p>
                )}

                <div className="flex items-center gap-4 pt-1">
                  <Button type="submit" disabled={value.trim().length === 0}>
                    jawab
                  </Button>
                  <button
                    type="button"
                    onClick={() => setShowHint((s) => !s)}
                    className="focus-ring text-sm text-paper/40 underline decoration-dotted underline-offset-4 hover:text-paper/60"
                  >
                    {showHint ? "sembunyiin hint" : "butuh hint?"}
                  </button>
                </div>

                {showHint && (
                  <p className="animate-rise text-sm text-paper/50">{puzzle.hint}</p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
