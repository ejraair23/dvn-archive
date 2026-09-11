// ============================================================
// STRUKTUR HADIAH
// ============================================================
// Website ini dibagi jadi beberapa SECTION besar (lihat "sections" di bawah),
// dan satu SECTION isinya "All Packs" — kumpulan hadiah kecil yang bisa
// diunduh/dibuka satu-satu (lihat "packs" di bawah).
//
// SECTIONS (custom, masing-masing punya halaman sendiri):
// - Hall of Fame              -> /hall-of-fame
// - Divana Wrapped & Awards   -> /wrapped
// - Birthday & Future Messages -> /birthday
// - Find All Hidden Objects   -> /hidden-objects
//
// "More Gifts Coming Soon" BUKAN section yang bisa dibuka — dia cuma
// penutup/placeholder di halaman daftar hadiah, lihat app/gifts/page.tsx.
//
// PACKS (array generik, tambah pack baru = tambah satu object baru,
// tidak perlu ubah bagian UI mana pun):
// - id            : unik, dipakai di URL (/gifts/[id]) — pakai huruf kecil & strip
// - title         : judul yang tampil di card
// - tagline       : satu kalimat pendek di card
// - emoji         : emoji kecil buat ikon card (boleh ganti jadi apa aja)
// - type          : "download" | "link" | "gallery" | "text"
//                    - "download" -> tampilkan tombol buka/unduh file dari /public
//                    - "link"     -> tampilkan tombol yang buka URL eksternal (contoh: game)
//                    - "gallery"  -> tampilkan beberapa gambar dari folder di /public
//                    - "text"     -> tampilkan isi pesan panjang langsung di halaman
// - href          : path file di /public (untuk "download"/"gallery") atau URL (untuk "link")
// - gallery       : array path gambar, khusus type "gallery"
// - body          : isi teks panjang, khusus type "text"
// - ready         : true kalau konten sudah kamu masukkan, false kalau masih placeholder
// - accent        : salah satu dari "amber" | "moss" | "blush" | "mist" (warna aksen card)
// ============================================================

export type GiftType = "download" | "link" | "gallery" | "text";
export type Accent = "amber" | "moss" | "blush" | "mist";

export interface Gift {
  id: string;
  title: string;
  tagline: string;
  emoji: string;
  type: GiftType;
  href?: string;
  gallery?: string[];
  body?: string;
  ready: boolean;
  accent: Accent;
}

// ============================================================
// ALL PACKS
// ============================================================
// Tambahkan pack baru di sini kapan pun — card baru otomatis muncul
// di halaman /gifts, tidak perlu ubah komponen apa pun.

export const packs: Gift[] = [
  {
    id: "meme-sticker-pack",
    title: "Meme + WA Sticker Pack",
    tagline: "Kumpulan meme & sticker WhatsApp, tinggal import.",
    emoji: "🎨",
    type: "download",
    href: "/gifts/stickers/sticker-pack.zip",
    ready: false,
    accent: "blush",
  },
  {
    id: "early-access-pass",
    title: "Early Access Pass",
    tagline: "Tiket buat lu buka satu hadiah lebih awal dari yang lain.",
    emoji: "🎟️",
    type: "text",
    body: "Placeholder — isi detail Early Access Pass di sini nanti (hadiah mana yang bisa dibuka lebih awal & caranya).",
    ready: false,
    accent: "amber",
  },
  {
    id: "poster-certificate-pack",
    title: "Poster + Certificate Pack",
    tagline: "Poster dan sertifikat kecil yang gue bikin khusus.",
    emoji: "🖼️",
    type: "gallery",
    gallery: ["/gifts/misc/poster-placeholder-1.png"],
    ready: false,
    accent: "moss",
  },
  {
    id: "profile-picture-pack",
    title: "Profile Picture Pack",
    tagline: "Set foto profil buat medsos atau WhatsApp lu.",
    emoji: "📱",
    type: "gallery",
    gallery: ["/gifts/misc/pfp-placeholder-1.png"],
    ready: false,
    accent: "mist",
  },
  {
    id: "minecraft-skin",
    title: "Minecraft Skin",
    tagline: "Skin custom yang gue bikin, khusus buat lu.",
    emoji: "⛏️",
    type: "download",
    href: "/gifts/skins/divana-skin.png",
    ready: false,
    accent: "moss",
  },
  {
    id: "fake-error-page-pack",
    title: "Fake Error Page Pack",
    tagline: "Halaman error palsu yang sengaja dibikin receh.",
    emoji: "🖥️",
    type: "gallery",
    gallery: ["/gifts/misc/fake-error-placeholder-1.png"],
    ready: false,
    accent: "amber",
  },
];

// ============================================================
// SECTIONS
// ============================================================
// Section besar yang masing-masing punya halaman sendiri. Urutan di sini
// ikut menentukan urutan tampil di /gifts.

export interface SectionEntry {
  id: string;
  title: string;
  tagline: string;
  emoji: string;
  href: string;
  accent: Accent;
}

export const sections: SectionEntry[] = [
  {
    id: "hall-of-fame",
    title: "Hall of Fame",
    tagline: "Sebuah ruang penghargaan, khusus buat lu.",
    emoji: "🏛️",
    href: "/hall-of-fame",
    accent: "amber",
  },
  {
    id: "wrapped-awards",
    title: "Divana Wrapped & Awards",
    tagline: "Rekap tahun ini — statistik, awards, dan hal-hal receh lainnya.",
    emoji: "📊",
    href: "/wrapped",
    accent: "moss",
  },
  {
    id: "birthday-future",
    title: "Birthday & Future Messages",
    tagline: "Pesan buat hari ini, dan ruang buat pesan yang belum saatnya dibaca.",
    emoji: "💌",
    href: "/birthday",
    accent: "blush",
  },
  {
    id: "find-hidden-objects",
    title: "Find All Hidden Objects",
    tagline: "Ada beberapa hal yang sengaja gue sembunyiin di seluruh website ini.",
    emoji: "🔍",
    href: "/hidden-objects",
    accent: "mist",
  },
];
