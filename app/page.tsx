import Ambient from "@/components/Ambient";
import { LinkButton } from "@/components/Button";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Ambient />
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
        <p className="animate-rise font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
          30 September
        </p>

        <h1
          className="animate-rise mt-4 max-w-lg font-display text-4xl italic leading-tight text-paper sm:text-5xl"
          style={{ animationDelay: "0.1s" }}
        >
          Happy Birthday,
          <br />
          Divana.
        </h1>

        <p
          className="animate-rise mt-6 max-w-sm text-balance text-base leading-relaxed text-paper/70"
          style={{ animationDelay: "0.2s" }}
        >
          Ada beberapa hal yang gue siapin buat lu. Semuanya ada di sini,
          dalam satu tempat.
        </p>

        <p
          className="animate-rise mt-2 max-w-sm text-balance text-base leading-relaxed text-paper/70"
          style={{ animationDelay: "0.28s" }}
        >
          Tapi sebelum itu... ada satu hal kecil yang harus lu jawab dulu.
        </p>

        <div className="animate-rise mt-10" style={{ animationDelay: "0.4s" }}>
          <LinkButton href="/puzzle">mulai</LinkButton>
        </div>
      </div>

      <footer className="relative z-10 pb-6 text-center font-mono text-[11px] text-paper/25">
        dibuat khusus, bukan template.
      </footer>
    </main>
  );
}
