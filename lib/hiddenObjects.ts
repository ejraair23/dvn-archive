// Penyimpanan progress "Find All Hidden Objects" di localStorage.

const STORAGE_KEY = "divana:hiddenObjectsFound";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getFoundObjects(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function markObjectFound(id: string) {
  if (!isBrowser()) return;
  const found = getFoundObjects();
  if (!found.includes(id)) {
    found.push(id);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  }
}

export function resetFoundObjects() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}
