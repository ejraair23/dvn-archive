import Ambient from "@/components/Ambient";
import NavBar from "@/components/NavBar";
import RequirePuzzle from "@/components/RequirePuzzle";
import { birthdayMessage } from "@/data/birthdayMessage";

export default function MessagePage() {
  return (
    <RequirePuzzle>
      <main className="relative min-h-screen">
        <Ambient />
        <NavBar backHref="/gifts" backLabel="semua hadiah" />

        <div className="relative z-10 flex flex-col items-center px-6 pb-24 pt-6 sm:px-10">
          <div className="w-full max-w-md">
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

            <div
              className="animate-rise mt-10 rounded-2xl border border-paper/10 bg-plum/40 p-6 text-left"
              style={{ animationDelay: `${0.2 + birthdayMessage.paragraphs.length * 0.08}s` }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber/70">
                doa & harapan
              </p>
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
          </div>
        </div>
      </main>
    </RequirePuzzle>
  );
}
