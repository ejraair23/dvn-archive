// ============================================================
// DIVANA WRAPPED & AWARDS
// ============================================================
// Ini SATU section gabungan yang isinya beberapa "modul" berbeda,
// semuanya ditampilkan di halaman /wrapped:
//
// - wrappedSlides    : slide-slide Wrapped yang sudah ada (rekap tahun ini)
// - unnecessaryStats : "Completely Unnecessary Statistics™" — angka-angka receh
// - insideJokes      : Inside Joke Statistics — daftar inside joke & keterangannya
// - topMoments       : Top Moments tahun ini
// - achievements     : Achievement System — badge/pencapaian yang "diraih" Divana
// - awards           : Divana Awards — penghargaan superlatif ala tahunan
// - annualReportNote : catatan penutup gaya "annual report"
//
// Semua di bawah masih placeholder — ganti sesuai konten Wrapped yang
// sudah kalian siapkan.

export interface WrappedSlide {
  id: string;
  title: string;
  value: string; // angka/highlight besar di slide
  caption: string;
}

export const wrappedSlides: WrappedSlide[] = [
  {
    id: "slide-1",
    title: "Placeholder Slide 1",
    value: "???",
    caption: "Ganti dengan slide Wrapped yang sudah ada di data/wrapped.ts.",
  },
  {
    id: "slide-2",
    title: "Placeholder Slide 2",
    value: "???",
    caption: "Slide berikutnya, bisa nambah sebanyak apa pun.",
  },
];

export interface StatItem {
  label: string;
  value: string;
}

export const unnecessaryStats: StatItem[] = [
  { label: "Placeholder statistik receh #1", value: "???" },
  { label: "Placeholder statistik receh #2", value: "???" },
  { label: "Placeholder statistik receh #3", value: "???" },
];

export interface InsideJoke {
  title: string;
  description: string;
}

export const insideJokes: InsideJoke[] = [
  {
    title: "Placeholder Inside Joke #1",
    description: "Ganti dengan inside joke beneran & konteksnya.",
  },
  {
    title: "Placeholder Inside Joke #2",
    description: "Bisa nambah sebanyak apa pun, tinggal tambah entri baru.",
  },
];

export interface TopMoment {
  title: string;
  description: string;
}

export const topMoments: TopMoment[] = [
  {
    title: "Placeholder Top Moment #1",
    description: "Momen terbaik tahun ini versi kalian berdua — ganti di sini.",
  },
  {
    title: "Placeholder Top Moment #2",
    description: "Tambah momen lain sesuka hati.",
  },
];

export interface Achievement {
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
}

export const achievements: Achievement[] = [
  {
    title: "Placeholder Achievement #1",
    description: "Deskripsi pencapaiannya di sini.",
    emoji: "🏅",
    unlocked: true,
  },
  {
    title: "Placeholder Achievement #2",
    description: "Achievement lain, bisa ditandai belum \"unlocked\" kalau perlu.",
    emoji: "🔓",
    unlocked: false,
  },
];

export interface AwardItem {
  category: string;
  winner: string;
}

export const awards: AwardItem[] = [
  { category: "Placeholder Award Category #1", winner: "Divana" },
  { category: "Placeholder Award Category #2", winner: "Divana" },
];

export const annualReportNote =
  "Placeholder catatan penutup gaya annual report — ganti dengan ringkasan tahun ini versi kalian.";
