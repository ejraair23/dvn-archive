import Link from "next/link";
import { Accent } from "@/data/gifts";
import { accentClasses } from "@/lib/accent";

export default function GiftCard({
  href,
  emoji,
  title,
  tagline,
  accent,
  ready,
}: {
  href: string;
  emoji: string;
  title: string;
  tagline: string;
  accent: Accent;
  ready: boolean;
}) {
  const c = accentClasses[accent];

  return (
    <Link
      href={href}
      className={`group focus-ring relative flex flex-col justify-between rounded-3xl border border-paper/10 bg-plum/50 p-6 transition-colors duration-300 ${c.ring}`}
    >
      <div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${c.bg}`}
        >
          {emoji}
        </div>
        <h3 className="mt-4 font-display text-lg text-paper">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-paper/55">{tagline}</p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className={`text-sm font-medium ${c.text}`}>buka →</span>
        {!ready && (
          <span className="rounded-full bg-paper/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-paper/35">
            segera
          </span>
        )}
      </div>
    </Link>
  );
}
