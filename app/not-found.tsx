import Ambient from "@/components/Ambient";
import { LinkButton } from "@/components/Button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Ambient />
      <p className="font-display text-2xl text-paper">Halaman ini gak ada.</p>
      <p className="mt-2 text-sm text-paper/50">Mungkin salah link, atau memang belum dibuat.</p>
      <div className="mt-6">
        <LinkButton href="/">balik ke awal</LinkButton>
      </div>
    </main>
  );
}
