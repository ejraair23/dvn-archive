"use client";

import { useEffect, useState } from "react";
import Ambient from "@/components/Ambient";
import NavBar from "@/components/NavBar";
import RequirePuzzle from "@/components/RequirePuzzle";
import { Button } from "@/components/Button";
import { secretFile } from "@/data/secretFile";
import { getSecretUnlocked, setSecretUnlocked } from "@/lib/progress";

const CORRECT_CODE = process.env.NEXT_PUBLIC_SECRET_CODE ?? "";

export default function SecretPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [code, setCode] = useState("");
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    setUnlocked(getSecretUnlocked());
    setChecked(true);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim() === CORRECT_CODE && CORRECT_CODE.length > 0) {
      setUnlocked(true);
      setSecretUnlocked();
      setWrong(false);
    } else {
      setWrong(true);
    }
  }

  if (!checked) return null;

  return (
    <RequirePuzzle>
      <main className="relative min-h-screen">
        <Ambient />
        <NavBar backHref="/gifts" backLabel="semua hadiah" />

        <div className="relative z-10 flex flex-col items-center px-6 pb-24 pt-6 text-center sm:px-10">
          <div className="w-full max-w-md">
            {unlocked ? (
              <div className="animate-unlock">
                <p className="text-3xl">🔓</p>
                <h1 className="mt-4 font-display text-2xl text-paper">{secretFile.title}</h1>
                <p className="mt-2 text-sm text-paper/50">{secretFile.unlockedIntro}</p>
                <div className="mt-6 space-y-3 text-left">
                  {secretFile.body.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-paper/70">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="animate-rise">
                <p className="text-3xl">🔒</p>
                <h1 className="mt-4 font-display text-2xl text-paper">{secretFile.title}</h1>
                <p className="mt-2 text-sm text-paper/50">
                  Ini masih terkunci. Masukin kode buat buka.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <input
                    autoFocus
                    type="password"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      if (wrong) setWrong(false);
                    }}
                    placeholder="masukin kode..."
                    className={`focus-ring w-full rounded-2xl border bg-plum/60 px-5 py-4 text-center text-base tracking-widest text-paper placeholder:text-paper/30 transition-colors ${
                      wrong ? "border-blush/60 animate-shake" : "border-paper/15 focus:border-amber/50"
                    }`}
                  />
                  {wrong && <p className="text-sm text-blush">{secretFile.wrongMessage}</p>}
                  <Button type="submit" disabled={code.trim().length === 0}>
                    buka
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </RequirePuzzle>
  );
}
