// "Things That Died This Year" — bagian komedi/arsip kecil, BUKAN pesan serius.
// Isi dengan hal-hal receh yang "berakhir" tahun ini (kebiasaan, meme, fase,
// barang, dsb). Tiap entri tampil sebagai satu baris "nisan" kecil.

export interface DiedEntry {
  name: string;
  causeOfDeath: string;
  years: string; // contoh: "2023–2026"
}

export const thingsThatDied: DiedEntry[] = [
  {
    name: "Placeholder Hal #1",
    causeOfDeath: "Ganti dengan sebab kematian receh versi kalian.",
    years: "2025–2026",
  },
  {
    name: "Placeholder Hal #2",
    causeOfDeath: "Bisa apa aja — kebiasaan, fase, meme, dll.",
    years: "2026",
  },
];
