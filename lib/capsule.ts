// Penyimpanan untuk Future Messages versi Divana sendiri.
// Semua entri disimpan di localStorage browser Divana — tidak terkirim ke mana-mana,
// jadi cuma kelihatan di device/browser yang dia pakai buat nulis.

export interface CapsuleEntry {
  id: string;
  forWhom: string; // opsional, boleh kosong
  openAt: string | null; // "YYYY-MM-DD" atau null kalau tanpa tanggal
  body: string;
  createdAt: string; // ISO timestamp
}

const STORAGE_KEY = "divana:capsuleEntries";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getCapsuleEntries(): CapsuleEntry[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveCapsuleEntry(entry: Omit<CapsuleEntry, "id" | "createdAt">): CapsuleEntry {
  const newEntry: CapsuleEntry = {
    ...entry,
    id: `capsule-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  const existing = getCapsuleEntries();
  const updated = [newEntry, ...existing];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newEntry;
}

export function deleteCapsuleEntry(id: string) {
  const existing = getCapsuleEntries();
  const updated = existing.filter((e) => e.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function isCapsuleUnlocked(entry: CapsuleEntry, now: Date): boolean {
  if (!entry.openAt) return true; // tanpa tanggal = langsung bisa dibaca
  const target = new Date(`${entry.openAt}T00:00:00`);
  return now.getTime() >= target.getTime();
}
