import Ambient from "@/components/Ambient";
import NavBar from "@/components/NavBar";
import RequirePuzzle from "@/components/RequirePuzzle";
import {
  wrappedSlides,
  unnecessaryStats,
  insideJokes,
  topMoments,
  achievements,
  awards,
  annualReportNote,
} from "@/data/wrapped";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber/70">{children}</p>
  );
}

export default function WrappedPage() {
  return (
    <RequirePuzzle>
      <main className="relative min-h-screen">
        <Ambient />
        <NavBar backHref="/gifts" backLabel="semua hadiah" />

        <div className="relative z-10 px-6 pb-24 pt-6 sm:px-10">
          <div className="mx-auto max-w-md">
            <p className="animate-rise font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
              📊 wrapped & awards
            </p>
            <h1
              className="animate-rise mt-3 font-display text-3xl text-paper"
              style={{ animationDelay: "0.05s" }}
            >
              Divana Wrapped.
            </h1>
            <p
              className="animate-rise mt-3 text-sm leading-relaxed text-paper/55"
              style={{ animationDelay: "0.1s" }}
            >
              Rekap tahun ini — dari yang lumayan penting sampai yang gak penting-penting amat.
            </p>

            {/* Wrapped slides */}
            <section className="mt-10 space-y-4">
              {wrappedSlides.map((slide, i) => (
                <div
                  key={slide.id}
                  className="animate-rise rounded-2xl border border-paper/10 bg-plum/50 p-6 text-center"
                  style={{ animationDelay: `${0.15 + i * 0.06}s` }}
                >
                  <p className="font-display text-4xl text-amber">{slide.value}</p>
                  <p className="mt-2 font-display text-lg text-paper">{slide.title}</p>
                  <p className="mt-1 text-sm text-paper/55">{slide.caption}</p>
                </div>
              ))}
            </section>

            {/* Top Moments */}
            <section className="mt-10">
              <SectionLabel>top moments</SectionLabel>
              <div className="mt-4 space-y-3">
                {topMoments.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-paper/10 bg-plum/40 p-4"
                  >
                    <p className="font-display text-base text-paper">{m.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-paper/55">{m.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements */}
            <section className="mt-10">
              <SectionLabel>achievement system</SectionLabel>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {achievements.map((a, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl border p-4 ${
                      a.unlocked
                        ? "border-amber/30 bg-amber/5"
                        : "border-paper/10 bg-plum/30 opacity-60"
                    }`}
                  >
                    <span className="text-xl">{a.emoji}</span>
                    <p className="mt-2 font-display text-sm text-paper">{a.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-paper/50">{a.description}</p>
                    {!a.unlocked && (
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-paper/35">
                        belum unlocked
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Awards */}
            <section className="mt-10">
              <SectionLabel>divana awards</SectionLabel>
              <div className="mt-4 space-y-2">
                {awards.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-paper/10 bg-plum/40 px-4 py-3"
                  >
                    <span className="text-sm text-paper/70">{a.category}</span>
                    <span className="font-display text-sm text-amber">{a.winner}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Inside Joke Statistics */}
            <section className="mt-10">
              <SectionLabel>inside joke statistics</SectionLabel>
              <div className="mt-4 space-y-3">
                {insideJokes.map((j, i) => (
                  <div key={i} className="rounded-2xl border border-paper/10 bg-plum/40 p-4">
                    <p className="font-display text-sm text-paper">{j.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-paper/55">{j.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Completely Unnecessary Statistics */}
            <section className="mt-10">
              <SectionLabel>completely unnecessary statistics™</SectionLabel>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {unnecessaryStats.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-paper/10 bg-plum/40 p-4 text-center"
                  >
                    <p className="font-display text-2xl text-paper">{s.value}</p>
                    <p className="mt-1 text-xs text-paper/50">{s.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Annual report note */}
            <section className="mt-10 rounded-2xl border border-dashed border-paper/15 bg-plum/20 p-5">
              <SectionLabel>annual report</SectionLabel>
              <p className="mt-3 text-sm leading-relaxed text-paper/60">{annualReportNote}</p>
            </section>
          </div>
        </div>
      </main>
    </RequirePuzzle>
  );
}
