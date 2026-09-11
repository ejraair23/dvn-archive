import Ambient from "@/components/Ambient";
import NavBar from "@/components/NavBar";
import GiftCard from "@/components/GiftCard";
import RequirePuzzle from "@/components/RequirePuzzle";
import { packs, sections } from "@/data/gifts";

export default function GiftsPage() {
  return (
    <RequirePuzzle>
      <main className="relative min-h-screen">
        <Ambient />
        <NavBar backHref="/" backLabel="halaman awal" />

        <div className="relative z-10 px-6 pb-20 pt-4 sm:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="animate-rise font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
              TOC of Being Divana
            </p>
            <h1
              className="animate-rise mt-3 font-display text-3xl text-paper sm:text-4xl"
              style={{ animationDelay: "0.05s" }}
            >
              Pilih salah satu.
            </h1>
            <p
              className="animate-rise mt-3 max-w-md text-sm leading-relaxed text-paper/55"
              style={{ animationDelay: "0.1s" }}
            >
              Gak ada urutan yang bener. Buka apa aja duluan, sesuka lu.
            </p>

            {/* Section-section besar */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {sections.map((section, i) => (
                <div
                  key={section.id}
                  className="animate-rise"
                  style={{ animationDelay: `${0.12 + i * 0.04}s` }}
                >
                  <GiftCard
                    href={section.href}
                    emoji={section.emoji}
                    title={section.title}
                    tagline={section.tagline}
                    accent={section.accent}
                    ready={true}
                  />
                </div>
              ))}
            </div>

            {/* All Packs */}
            <div className="mt-14">
              <p className="animate-rise font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
                all packs
              </p>
              <h2 className="animate-rise mt-2 font-display text-2xl text-paper">
                Hadiah satu-satu.
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {packs.map((pack, i) => (
                  <div
                    key={pack.id}
                    className="animate-rise"
                    style={{ animationDelay: `${0.1 + i * 0.04}s` }}
                  >
                    <GiftCard
                      href={`/gifts/${pack.id}`}
                      emoji={pack.emoji}
                      title={pack.title}
                      tagline={pack.tagline}
                      accent={pack.accent}
                      ready={pack.ready}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* More Gifts Coming Soon — bukan link, bukan gift, cuma penutup */}
            <div className="animate-rise mt-14 rounded-2xl border border-dashed border-paper/15 bg-plum/20 px-6 py-8 text-center">
              <p className="text-sm text-paper/40">More gifts coming soon.</p>
            </div>
          </div>
        </div>
      </main>
    </RequirePuzzle>
  );
}
