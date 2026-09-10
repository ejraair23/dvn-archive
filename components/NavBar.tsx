import Link from "next/link";

export default function NavBar({
  backHref,
  backLabel = "kembali",
}: {
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10">
      {backHref ? (
        <Link
          href={backHref}
          className="focus-ring text-sm text-paper/70 transition-colors hover:text-paper"
        >
          ← {backLabel}
        </Link>
      ) : (
        <span />
      )}
      <Link
        href="/gifts"
        className="focus-ring text-sm text-paper/50 transition-colors hover:text-paper/80"
      >
        semua hadiah
      </Link>
    </header>
  );
}
