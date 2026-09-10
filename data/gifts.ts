// ============================================================
// DAFTAR HADIAH
// ============================================================
// Tambah hadiah baru = tinggal tambah satu object baru di array
// "gifts" di bawah. Tidak perlu ubah bagian UI mana pun.
//
// Field:
// - id            : unik, dipakai di URL (/gifts/[id]) — pakai huruf kecil & strip
// - title         : judul yang tampil di card
// - tagline       : satu kalimat pendek di card
// - emoji         : emoji kecil buat ikon card (boleh ganti jadi apa aja)
// - type          : "download" | "link" | "gallery" | "text" | "custom" | "bundle"
//                    - "download" -> tampilkan tombol buka/unduh file dari /public
//                    - "link"     -> tampilkan tombol yang buka URL eksternal (contoh: game)
//                    - "gallery"  -> tampilkan beberapa gambar dari folder di /public
//                    - "text"     -> tampilkan isi pesan panjang langsung di halaman
//                    - "custom"   -> untuk halaman spesial (birthday message & future messages
//                                    sudah punya halaman sendiri, tidak lewat sistem ini)
//                    - "bundle"   -> gabungan beberapa bagian berbeda dalam SATU card, pakai
//                                    field "sections" (lihat interface GiftSection di bawah).
//                                    Cocok kalau kamu mau satu hadiah menyimpan lebih dari satu
//                                    isi tanpa judulnya menyebut isinya langsung.
// - href          : path file di /public (untuk "download"/"gallery") atau URL (untuk "link")
// - gallery       : array path gambar, khusus type "gallery"
// - body          : isi teks panjang, khusus type "text"
// - ready         : true kalau konten sudah kamu masukkan, false kalau masih placeholder
// - accent        : salah satu dari "amber" | "moss" | "blush" | "mist" (warna aksen card)
// ============================================================

export type GiftType = "download" | "link" | "gallery" | "text" | "custom" | "bundle";
export type Accent = "amber" | "moss" | "blush" | "mist";

// Dipakai untuk hadiah yang isinya gabungan dari beberapa bagian berbeda
// (contoh: satu file download + satu galeri), tapi ditampilkan sebagai SATU
// card supaya isinya tidak ketebak dari judul/daftar hadiah.
export interface GiftSection {
  label: string; // judul kecil di dalam halaman, boleh tetap samar
  type: "download" | "gallery" | "text";
  href?: string; // untuk "download"
  gallery?: string[]; // untuk "gallery"
  body?: string; // untuk "text"
  ready: boolean;
}

export interface Gift {
  id: string;
  title: string;
  tagline: string;
  emoji: string;
  type: GiftType;
  href?: string;
  gallery?: string[];
  body?: string;
  sections?: GiftSection[]; // dipakai kalau type === "bundle"
  ready: boolean;
  accent: Accent;
}

export const gifts: Gift[] = [
  // Gabungan Minecraft Skin + OC Gacha, sengaja dikasih judul yang gak
  // langsung nyebutin isinya biar gak spoiler dari daftar hadiah.
  // Ganti "title" dan "tagline" di bawah kalau mau nama lain yang lebih
  // sesuai sama inside joke kalian — yang penting jangan sebut dua nama
  // hadiahnya langsung.
    {
        id: "dua-bentuk",
          title: "Dua Bentuk",
            tagline: "Dua interpretasi kecil yang gue bikin khusus buat lu.",
              emoji: "🎭",
                type: "bundle",
                  sections: [
                      {
                            label: "Yang pertama",
                                  type: "download",
                                        href: "/gifts/skins/divana-skin.png",
                                              ready: false,
                                                  },
                                                      {
                                                            label: "Yang kedua",
                                                                  type: "text",
                                                                        text: "Isi teks lu di sini.",
                                                                              ready: false,
                                                                                  },
                                                                                    ],
                                                                                      ready: false,
                                                                                        accent: "blush",
                                                                                        },

  {
    id: "divana-wrapped",
    title: "Divana Wrapped",
    tagline: "Rekap tahun ini, versi lu. Kayak Spotify Wrapped tapi personal.",
    emoji: "📊",
    type: "gallery",
    gallery: ["/gifts/wrapped/placeholder-1.png"],
    ready: false,
    accent: "amber",
  },
  {
    id: "nobody-tell-her",
    title: "Nobody Tell Her",
    tagline: "Sebuah game kecil. Main aja, gak usah dijelasin.",
    emoji: "🕹️",
    type: "link",
    href: "https://www.roblox.com/share?code=59fca2d33bc870499caef0100b047e88&type=ExperienceDetails&stamp=1789042573268",
    ready: false,
    accent: "amber",
  },
  {
    id: "wallpaper-pack",
    title: "Wallpaper Pack",
    tagline: "Kumpulan wallpaper buat HP atau laptop lu.",
    emoji: "🖼️",
    type: "gallery",
    gallery: ["/gifts/wallpapers/placeholder-1.png"],
    ready: false,
    accent: "moss",
  },
  {
    id: "sticker-pack",
    title: "WhatsApp Sticker Pack",
    tagline: "Sticker meme pack, tinggal import ke WhatsApp.",
    emoji: "🩵",
    type: "download",
    href: "/gifts/stickers/sticker-pack.zip",
    ready: false,
    accent: "blush",
  },
  {
    id: "secret-file",
    title: "Secret File",
    tagline: "Ini yang paling gue rahasiain. Butuh kode buat buka.",
    emoji: "🔒",
    type: "custom",
    ready: true,
    accent: "mist",
  },
];

// Hadiah "custom" yang punya halaman sendiri (di luar sistem card generik):
// - Birthday Message -> /message
// - Future Messages   -> /future
// - Secret File       -> /secret
// Ketiganya tetap muncul sebagai card di halaman hadiah lewat daftar berikut,
// supaya urutannya bisa kamu atur juga.

export interface CustomEntry {
  id: string;
  title: string;
  tagline: string;
  emoji: string;
  href: string;
  accent: Accent;
}

export const customEntries: CustomEntry[] = [
  {
    id: "birthday-message",
    title: "Birthday Message",
    tagline: "Pesan buat hari ini. Baca kalau udah siap baper dikit.",
    emoji: "💌",
    href: "/message",
    accent: "blush",
  },
  {
    id: "future-messages",
    title: "Future Messages",
    tagline: "Tulis pesan buat dibaca nanti — sesuka lu.",
    emoji: "⏳",
    href: "/future",
    accent: "amber",
  },
];
