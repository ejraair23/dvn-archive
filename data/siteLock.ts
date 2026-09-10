// Tanggal & jam website ini boleh mulai dibuka.
// Sebelum waktu ini, siapa pun yang buka link cuma akan lihat halaman
// "belum waktunya", apapun URL yang mereka buka.
//
// Format: ISO string lengkap dengan jam dan zona waktu.
// Contoh di bawah: 30 September 2026, jam 00:00 WIB (UTC+7).
//
// Ganti sesuai kebutuhan. Kalau mau pakai zona waktu lain, ganti angka
// offset-nya (+07:00 = WIB, +08:00 = WITA, +09:00 = WIT).

export const siteUnlock = {
  unlockAt: "2026-09-30T00:00:00+07:00",
  lockedTitle: "Belum waktunya.",
  lockedMessage: "Sabar dulu. Ini baru bisa dibuka pas hari-H.",
  previewPrompt: "???",
  previewWrongMessage: "kode belum pas.",
};
