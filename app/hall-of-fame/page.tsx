import Ambient from "@/components/Ambient";
import NavBar from "@/components/NavBar";
import RequirePuzzle from "@/components/RequirePuzzle";
import { hallOfFame } from "@/data/hallOfFame";

export default function HallOfFamePage() {
  return (
    <RequirePuzzle>
      <main className="relative min-h-screen">
        <Ambient />
        <NavBar backHref="/gifts" backLabel="semua hadiah" />

        <div className="relative z-10 px-6 pb-24 pt-6 sm:px-10">
          <div className="mx-auto max-w-md">
            <p className="animate-rise font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
              🏛️ hall of fame
            </p>
            <h1
              className="animate-rise mt-3 font-display text-3xl text-paper"
              style={{ animationDelay: "0.05s" }}
            >
              Divana Hall of Fame
            </h1>
            <p
              className="animate-rise mt-3 text-sm leading-relaxed text-paper/55"
              style={{ animationDelay: "0.1s" }}
            >
              Beberapa penghargaan yang emang pantas lu dapetin.
            </p>

            <div className="mt-8 space-y-3">
              {hallOfFame.map((entry, i) => (
                <div
                  key={entry.id}
                  className="animate-rise flex items-start gap-4 rounded-2xl border border-paper/10 bg-plum/50 p-5"
                  style={{ animationDelay: `${0.15 + i * 0.05}s` }}
                >
                  <span className="text-2xl">{entry.emoji}</span>
                  <div>
                    <p className="font-display text-base text-paper">{entry.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-paper/55">{entry.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </RequirePuzzle>
  );
}
