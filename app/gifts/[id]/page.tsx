import { notFound } from "next/navigation";
import Ambient from "@/components/Ambient";
import NavBar from "@/components/NavBar";
import RequirePuzzle from "@/components/RequirePuzzle";
import { LinkButton } from "@/components/Button";
import { gifts } from "@/data/gifts";
import { accentClasses } from "@/lib/accent";

export function generateStaticParams() {
  return gifts.filter((g) => g.type !== "custom").map((g) => ({ id: g.id }));
}

export default function GiftDetailPage({ params }: { params: { id: string } }) {
  const gift = gifts.find((g) => g.id === params.id);
  if (!gift || gift.type === "custom") notFound();

  const c = accentClasses[gift.accent];

  return (
    <RequirePuzzle>
      <main className="relative min-h-screen">
        <Ambient />
        <NavBar backHref="/gifts" backLabel="semua hadiah" />

        <div className="relative z-10 flex flex-col items-center px-6 pb-20 pt-6 text-center sm:px-10">
          <div className="w-full max-w-md">
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-3xl text-3xl ${c.bg}`}
            >
              {gift.emoji}
            </div>
            <h1 className="mt-5 font-display text-2xl text-paper sm:text-3xl">{gift.title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-paper/60">{gift.tagline}</p>

            <div className="mt-8">
              {gift.type === "bundle" && gift.sections ? (
                <div className="space-y-6 text-left">
                  {gift.sections.map((section, i) => (
                    <div key={i} className="rounded-2xl border border-paper/10 bg-plum/40 p-5">
                      <p className="font-mono text-xs uppercase tracking-[0.15em] text-paper/35">
                        {section.label}
                      </p>
                      <div className="mt-4">
                        {!section.ready ? (
                          <PlaceholderNotice />
                        ) : section.type === "download" && section.href ? (
                          <LinkButton href={section.href} external>
                            buka / unduh
                          </LinkButton>
                        ) : section.type === "gallery" && section.gallery ? (
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {section.gallery.map((src) => (
                              <div
                                key={src}
                                className="aspect-square rounded-2xl border border-paper/10 bg-plum/50 bg-cover bg-center"
                                style={{ backgroundImage: `url(${src})` }}
                              />
                            ))}
                          </div>
                        ) : section.type === "text" && section.body ? (
                          <p className="text-sm leading-relaxed text-paper/70 whitespace-pre-line">
                            {section.body}
                          </p>
                        ) : (
                          <PlaceholderNotice />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : !gift.ready ? (
                <PlaceholderNotice />
              ) : gift.type === "link" && gift.href ? (
                <LinkButton href={gift.href} external>
                  main game
                </LinkButton>
              ) : gift.type === "download" && gift.href ? (
                <LinkButton href={gift.href} external>
                  buka / unduh
                </LinkButton>
              ) : gift.type === "gallery" && gift.gallery ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {gift.gallery.map((src) => (
                    <div
                      key={src}
                      className="aspect-square rounded-2xl border border-paper/10 bg-plum/50 bg-cover bg-center"
                      style={{ backgroundImage: `url(${src})` }}
                    />
                  ))}
                </div>
              ) : gift.type === "text" && gift.body ? (
                <p className="text-left text-sm leading-relaxed text-paper/70 whitespace-pre-line">
                  {gift.body}
                </p>
              ) : (
                <PlaceholderNotice />
              )}
            </div>
          </div>
        </div>
      </main>
    </RequirePuzzle>
  );
}

function PlaceholderNotice() {
  return (
    <div className="rounded-2xl border border-dashed border-paper/15 bg-plum/30 px-5 py-6 text-sm text-paper/45">
      Belum ditaruh di sini. Nanti gue lengkapin — cek lagi lain kali ya.
    </div>
  );
}
