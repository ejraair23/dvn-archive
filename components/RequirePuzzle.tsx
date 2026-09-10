"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPuzzleSolved } from "@/lib/progress";

// Membungkus halaman yang butuh puzzle sudah selesai.
// Kalau belum selesai, redirect balik ke /puzzle.
export default function RequirePuzzle({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getPuzzleSolved()) {
      router.replace("/puzzle");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null;
  return <>{children}</>;
}
