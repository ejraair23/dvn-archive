"use client";

import { useEffect, useState } from "react";
import Ambient from "@/components/Ambient";
import NavBar from "@/components/NavBar";
import RequirePuzzle from "@/components/RequirePuzzle";
import { hiddenObjects, reiraEjraaSecret } from "@/data/hiddenObjects";
import { getFoundObjects, markObjectFound } from "@/lib/hiddenObjects";

export default function HiddenObjectsPage() {
  const [found, setFound] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [justFoundId, setJustFoundId] = useState<string | null>(null);

  useEffect(() => {
    setFound(getFoundObjects());
    setChecked(true);
  }, []);

  const allFound = checked && found.length === hiddenObjects.length;

  function handleFind(id: string) {
    if (found.includes(id)) return;
    markObjectFound(id);
    setFound(getFoundObjects());
    setJustFoundId(id);
    setTimeout(() => setJustFoundId(null), 900);
  }

  if (!checked) return null;

  return (
    <RequirePuzzle>
      <main className="relative min-h-screen">
        <Ambient />
        <NavBar backHref="/gifts" backLabel="semua hadiah" />

        <div className="relative z-10 px-6 pb-24 pt-6 sm:px-10">
          <div className="mx-auto max-w-md">
            <p className="animate-rise font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
              🔍 find all hidden objects
            </p>
            <h1
              className="animate-rise mt-3 font-display text-3xl text-paper"
              style={{ animationDelay: "0.05s" }}
            >
              Ada yang gue sembunyiin.
            </h1>
            <p
              className="animate-rise mt-3 text-sm leading-relaxed text-paper/55"
              style={{ animationDelay: "0.1s" }}
            >
              Klik satu-satu buat nemuin semuanya. Gak ada urutan tertentu.
            </p>

            <p
              className="animate-rise mt-6 font-mono text-xs text-paper/40"
              style={{ animationDelay: "0.15s" }}
            >
              {found.length} / {hiddenObjects.length} ketemu
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {hiddenObjects.map((obj, i) => {
                const isFound = found.includes(obj.id);
                const justFound = justFoundId === obj.id;
                return (
                  <button
                    key={obj.id}
                    onClick={() => handleFind(obj.id)}
                    disabled={isFound}
                    className={`animate-rise focus-ring rounded-2xl border p-5 text-left transition-colors ${
                      isFound
                        ? "border-amber/30 bg-amber/5"
                        : "border-paper/10 bg-plum/40 hover:border-paper/25"
                    } ${justFound ? "animate-unlock" : ""}`}
                    style={{ animationDelay: `${0.2 + i * 0.04}s` }}
                  >
                    <span className="text-2xl">{isFound ? obj.emoji : "❔"}</span>
                    <p className="mt-2 text-sm leading-relaxed text-paper/60">
                      {isFound ? obj.label : "belum ketemu"}
                    </p>
                  </button>
                );
              })}
            </div>

            {allFound ? (
              <div className="animate-unlock mt-10 rounded-2xl border border-amber/30 bg-amber/5 p-6 text-center">
                <p className="text-2xl">🔓</p>
                <h2 className="mt-3 font-display text-xl text-paper">{reiraEjraaSecret.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">
                  {reiraEjraaSecret.body}
                </p>
              </div>
            ) : (
              <p className="mt-10 text-center text-xs text-paper/30">
                Ada sesuatu yang cuma muncul kalau semuanya udah ketemu.
              </p>
            )}
          </div>
        </div>
      </main>
    </RequirePuzzle>
  );
}
