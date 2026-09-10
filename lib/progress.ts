// Helper kecil untuk menyimpan progress user di localStorage,
// supaya puzzle & secret file tidak perlu diulang tiap pindah halaman.

const KEYS = {
  puzzleSolved: "divana:puzzleSolved",
  secretUnlocked: "divana:secretUnlocked",
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

export function getSecretUnlocked(): boolean {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(KEYS.secretUnlocked) === "true";
}

export function setSecretUnlocked() {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEYS.secretUnlocked, "true");
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
export function resetAllProgress() {
  if (!isBrowser()) return;
  Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
}
