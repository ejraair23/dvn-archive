// ============================================================
// FIND ALL HIDDEN OBJECTS
// ============================================================
// Daftar objek tersembunyi yang harus ditemukan Divana di halaman
// /hidden-objects. Implementasi awal ini pakai bentuk "klik untuk cari"
// dalam satu halaman — silakan sesuaikan lagi kalau kalian punya ide
// lokasi persembunyian yang lebih spesifik (misal disebar ke halaman lain).
//
// PENTING soal "Reira/Ejraa Secret":
// - Ini BUKAN salah satu objek yang didaftar di sini secara eksplisit.
// - Secret baru muncul (lihat app/hidden-objects/page.tsx) setelah SEMUA
//   objek di bawah berhasil ditemukan.
// - Isi "reiraEjraaSecret" di bawah TIDAK ditampilkan di mana pun sebelum
//   syarat itu terpenuhi — jangan pindahkan isinya ke tempat lain yang
//   bisa diakses lebih awal.

export interface HiddenObject {
  id: string;
  label: string; // deskripsi singkat yang membantu tapi tidak terlalu gamblang
  emoji: string;
}

export const hiddenObjects: HiddenObject[] = [
  { id: "object-1", label: "Sesuatu yang bersembunyi di pojok.", emoji: "🍃" },
  { id: "object-2", label: "Sesuatu yang keliatan biasa aja.", emoji: "🕯️" },
  { id: "object-3", label: "Sesuatu yang sebenernya agak ketara.", emoji: "🪞" },
  { id: "object-4", label: "Sesuatu yang gampang kelewat.", emoji: "🧵" },
];

export const reiraEjraaSecret = {
  title: "Reira/Ejraa Secret",
  body: "Placeholder isi secret ini — ganti di data/hiddenObjects.ts. Konten ini cuma boleh kelihatan setelah semua hidden object ketemu.",
};
