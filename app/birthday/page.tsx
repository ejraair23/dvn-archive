"use client";

import { useEffect, useState } from "react";
import Ambient from "@/components/Ambient";
import NavBar from "@/components/NavBar";
import RequirePuzzle from "@/components/RequirePuzzle";
import { Button } from "@/components/Button";
import { birthdayMessage } from "@/data/birthdayMessage";
import { thingsThatDied } from "@/data/thingsThatDied";
import {
  CapsuleEntry,
  getCapsuleEntries,
  saveCapsuleEntry,
  deleteCapsuleEntry,
  isCapsuleUnlocked,
} from "@/lib/capsule";

function formatDate(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function formatCreatedAt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber/70">{children}</p>
  );
}

export default function BirthdayPage() {
  const [entries, setEntries] = useState<CapsuleEntry[]>([]);
  const [now, setNow] = useState<Date | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [forWhom, setForWhom] = useState("");
  const [openAt, setOpenAt] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setEntries(getCapsuleEntries());
    setNow(new Date());
  }, []);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (body.trim().length === 0) return;

    saveCapsuleEntry({
      forWhom: forWhom.trim(),
      openAt: openAt || null,
      body: body.trim(),
    });

    setEntries(getCapsuleEntries());
    setForWhom("");
    setOpenAt("");
    setBody("");
    setShowForm(false);
  }

  function handleDelete(id: string) {
    deleteCapsuleEntry(id);
    setEntries(getCapsuleEntries());
    if (openId === id) setOpenId(null);
  }

  return (
    <RequirePuzzle>
      <main className="relative min-h-screen">
        <Ambient />
        <NavBar backHref="/gifts" backLabel="semua hadiah" />

        <div className="relative z-10 px-6 pb-24 pt-6 sm:px-10">
          <div className="mx-auto max-w-md">
            {/* ===== BIRTHDAY MESSAGE ===== */}
            <p className="animate-rise font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
              💌 birthday message
            </p>
            <h1
              className="animate-rise mt-3 font-display text-3xl italic text-paper"
              style={{ animationDelay: "0.06s" }}
            >
              {birthdayMessage.title}
            </h1>

            <div className="mt-6 space-y-4">
              {birthdayMessage.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="animate-rise text-[15px] leading-relaxed text-paper/75"
                  style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                >
                  {p}
                </p>
              ))}
            </div>

            <p
              className="animate-rise mt-8 font-display italic text-paper/50"
              style={{ animationDelay: `${0.1 + birthdayMessage.paragraphs.length * 0.08}s` }}
            >
              {birthdayMessage.signature}
            </p>

            {/* ===== BIRTHDAY WISHES / PRAYER ===== */}
            <div className="animate-rise mt-10 rounded-2xl border border-paper/10 bg-plum/40 p-6 text-left">
              <SectionLabel>doa & harapan</SectionLabel>
              <h2 className="mt-2 font-display text-xl italic text-paper">
                {birthdayMessage.wishesTitle}
              </h2>
              <ul className="mt-4 space-y-3">
                {birthdayMessage.wishes.map((wish, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-paper/75">
                    <span className="mt-1 text-amber/60">✦</span>
                    <span>{wish}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ===== THINGS THAT DIED THIS YEAR ===== */}
            <div className="mt-14">
              <SectionLabel>🪦 arsip receh</SectionLabel>
              <h2 className="mt-2 font-display text-2xl text-paper">Things That Died This Year</h2>
              <p className="mt-2 text-sm leading-relaxed text-paper/55">
                Bukan bagian serius. Cuma daftar hal-hal yang "gak selamat" sampai akhir tahun.
              </p>

              <div className="mt-6 space-y-3">
                {thingsThatDied.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-paper/10 bg-plum/30 p-4"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-display text-base text-paper">{item.name}</p>
                      <span className="shrink-0 font-mono text-[10px] text-paper/35">
                        {item.years}
                      </span>
                    </div>
                    <p className="mt-1 text-sm italic text-paper/50">{item.causeOfDeath}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== FUTURE MESSAGES ===== */}
            <div className="mt-14">
              <SectionLabel>⏳ ruang buat lu sendiri</SectionLabel>
              <h2 className="mt-2 font-display text-2xl text-paper">A Message From the Future</h2>
              <p className="mt-3 text-sm leading-relaxed text-paper/55">
                Ini bukan pesan dari gue. Ini tempat lu bisa nulis apa aja buat
                dibaca nanti — buat diri sendiri, buat orang lain, atau buat
                siapa pun yang lu mau. Tulis, simpen, baca lagi kapan pun.
              </p>

              {!showForm && (
                <div className="mt-6">
                  <Button onClick={() => setShowForm(true)}>tulis pesan baru</Button>
                </div>
              )}

              {showForm && (
                <form
                  onSubmit={handleSave}
                  className="mt-6 space-y-4 rounded-2xl border border-paper/10 bg-plum/50 p-5"
                >
                  <div>
                    <label className="text-xs text-paper/40">buat siapa? (opsional)</label>
                    <input
                      value={forWhom}
                      onChange={(e) => setForWhom(e.target.value)}
                      placeholder="misal: diri sendiri, masa depan, temen..."
                      className="focus-ring mt-1.5 w-full rounded-xl border border-paper/15 bg-ink/40 px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-amber/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-paper/40">
                      baru bisa dibuka tanggal (opsional)
                    </label>
                    <input
                      type="date"
                      value={openAt}
                      onChange={(e) => setOpenAt(e.target.value)}
                      className="focus-ring mt-1.5 w-full rounded-xl border border-paper/15 bg-ink/40 px-4 py-3 text-sm text-paper focus:border-amber/50"
                    />
                    <p className="mt-1 text-[11px] text-paper/35">
                      Kosongin aja kalau mau langsung bisa dibaca lagi kapan aja.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-paper/40">isi pesan</label>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={5}
                      placeholder="tulis apa aja..."
                      className="focus-ring mt-1.5 w-full resize-none rounded-xl border border-paper/15 bg-ink/40 px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-amber/50"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <Button type="submit" disabled={body.trim().length === 0}>
                      simpen
                    </Button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="focus-ring text-sm text-paper/40 hover:text-paper/60"
                    >
                      batal
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-8 space-y-3">
                {entries.length === 0 && !showForm && (
                  <p className="text-sm text-paper/35">
                    Belum ada pesan tersimpan. Coba tulis satu.
                  </p>
                )}

                {now &&
                  entries.map((entry, i) => {
                    const unlocked = isCapsuleUnlocked(entry, now);
                    const isOpen = openId === entry.id;

                    return (
                      <div
                        key={entry.id}
                        className="animate-rise overflow-hidden rounded-2xl border border-paper/10 bg-plum/50"
                        style={{ animationDelay: `${0.05 + i * 0.04}s` }}
                      >
                        <button
                          onClick={() => unlocked && setOpenId(isOpen ? null : entry.id)}
                          disabled={!unlocked}
                          className="focus-ring flex w-full items-center justify-between px-5 py-4 text-left disabled:cursor-not-allowed"
                        >
                          <div>
                            <p className="font-display text-base text-paper">
                              {entry.forWhom || "Tanpa judul"}
                            </p>
                            <p className="mt-0.5 font-mono text-[11px] text-paper/35">
                              {unlocked
                                ? `ditulis ${formatCreatedAt(entry.createdAt)}`
                                : `terbuka ${formatDate(entry.openAt as string)}`}
                            </p>
                          </div>
                          <span className="text-lg">{unlocked ? (isOpen ? "–" : "+") : "🔒"}</span>
                        </button>

                        {unlocked && isOpen && (
                          <div className="animate-rise border-t border-paper/10 px-5 py-4">
                            <p className="whitespace-pre-line text-sm leading-relaxed text-paper/70">
                              {entry.body}
                            </p>
                            <button
                              onClick={() => handleDelete(entry.id)}
                              className="focus-ring mt-4 text-xs text-paper/30 hover:text-blush"
                            >
                              hapus pesan ini
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </RequirePuzzle>
  );
}
