import Ambient from "@/components/Ambient";
import NavBar from "@/components/NavBar";
import GiftCard from "@/components/GiftCard";
import RequirePuzzle from "@/components/RequirePuzzle";
import { gifts, customEntries } from "@/data/gifts";

export default function GiftsPage() {
  return (
    <RequirePuzzle>
      <main className="relative min-h-screen">
        <Ambient />
        <NavBar backHref="/" backLabel="halaman awal" />

        <div className="relative z-10 px-6 pb-20 pt-4 sm:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="animate-rise font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
              semuanya buat lu
            </p>
            <h1 className="animate-rise mt-3 font-display text-3xl text-paper sm:text-4xl" style={{ animationDelay: "0.05s" }}>
              Pilih salah satu.
            </h1>
            <p className="animate-rise mt-3 max-w-md text-sm leading-relaxed text-paper/55" style={{ animationDelay: "0.1s" }}>
              Gak ada urutan yang bener. Buka apa aja duluan, sesuka lu.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {customEntries.map((entry, i) => (
                <div
                  key={entry.id}
                  className="animate-rise"
                  style={{ animationDelay: `${0.12 + i * 0.04}s` }}
                >
                  <GiftCard
                    href={entry.href}
                    emoji={entry.emoji}
                    title={entry.title}
                    tagline={entry.tagline}
                    accent={entry.accent}
                    ready={true}
                  />
                </div>
              ))}

              {gifts.map((gift, i) => {
                const href = gift.type === "custom" ? `/${gift.id}` : `/gifts/${gift.id}`;
                return (
                  <div
                    key={gift.id}
                    className="animate-rise"
                    style={{ animationDelay: `${0.12 + (i + customEntries.length) * 0.04}s` }}
                  >
                    <GiftCard
                      href={gift.id === "secret-file" ? "/secret" : href}
                      emoji={gift.emoji}
                      title={gift.title}
                      tagline={gift.tagline}
                      accent={gift.accent}
                      ready={gift.ready}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </RequirePuzzle>
  );
}
