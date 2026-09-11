// Helper kecil untuk menyimpan progress user di localStorage,
// supaya puzzle tidak perlu diulang tiap pindah halaman.

const KEYS = {
  puzzleSolved: "divana:puzzleSolved",
  previewUnlocked: "divana:previewUnlocked",
} as const;

function isBrowser() {
  return typeof window !== "undefined";
}

export function getPuzzleSolved(): boolean {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(KEYS.puzzleSolved) === "true";
}

export function setPuzzleSolved() {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEYS.puzzleSolved, "true");
}

export function getPreviewUnlocked(): boolean {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(KEYS.previewUnlocked) === "true";
}

export function setPreviewUnlocked() {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEYS.previewUnlocked, "true");
}

// Dipakai kalau kamu (pembuat website) mau reset progress saat testing.
// Hidden objects & capsule (future messages) punya storage sendiri
// (lihat lib/hiddenObjects.ts dan lib/capsule.ts) — dihapus terpisah di sana.
export function resetAllProgress() {
  if (!isBrowser()) return;
  Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
}
