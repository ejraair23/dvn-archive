# buat Divana 🎂

Birthday project pribadi buat Divana. Satu website, banyak hadiah di dalamnya.

Dibuat pakai Next.js (App Router) + TypeScript + Tailwind CSS. Tidak pakai database — progress (puzzle, hidden objects, future messages) disimpan di `localStorage` browser.

---

## 1. Menjalankan di komputer sendiri

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Untuk build production (sama seperti yang dipakai Vercel saat deploy):

```bash
npm run build
npm start
```

---

## 2. Struktur project & alur website

```
app/
  page.tsx                  -> halaman awal
  puzzle/page.tsx            -> puzzle pembuka
  gifts/page.tsx             -> TOC of Being Divana (daftar isi utama)
  gifts/[id]/page.tsx        -> halaman detail satu pack (All Packs)
  hall-of-fame/page.tsx       -> Divana Hall of Fame
  wrapped/page.tsx            -> Divana Wrapped & Awards (gabungan)
  birthday/page.tsx           -> Birthday & Future Messages (gabungan, satu halaman panjang)
  hidden-objects/page.tsx     -> Find All Hidden Objects + easter egg

components/  -> potongan UI yang dipakai berulang (tombol, card, dll)
data/        -> SEMUA KONTEN yang mau kamu edit ada di sini
lib/         -> fungsi bantu kecil (localStorage, format teks)
public/      -> file statis: gambar, skin, sticker, dll
```

Alur halaman: **halaman awal → puzzle → TOC (`/gifts`)**, dari TOC Divana bisa masuk ke salah satu dari 4 section besar atau salah satu pack di "All Packs".

### Struktur konten (TOC of Being Divana)

```
TOC of Being Divana (/gifts)
├── Hall of Fame                    -> /hall-of-fame
│
├── Divana Wrapped & Awards         -> /wrapped
│   ├── Divana Wrapped (slides)
│   ├── Top Moments
│   ├── Achievement System
│   ├── Divana Awards
│   ├── Inside Joke Statistics
│   ├── Completely Unnecessary Statistics™
│   └── Annual Report
│
├── Birthday & Future Messages      -> /birthday (satu halaman, scroll)
│   ├── Birthday Message
│   ├── Birthday Wishes / doa
│   ├── Things That Died This Year (komedi, bukan serius)
│   └── A Message From the Future (Divana nulis sendiri)
│
├── All Packs                       -> card-card di /gifts, detail di /gifts/[id]
│   ├── Meme + WA Sticker Pack
│   ├── Early Access Pass
│   ├── Poster + Certificate Pack
│   ├── Profile Picture Pack
│   ├── Minecraft Skin
│   └── Fake Error Page Pack
│
├── More Gifts Coming Soon          -> bukan link, cuma penutup di /gifts
│
└── Find All Hidden Objects         -> /hidden-objects
    └── 🔒 easter egg rahasia (reveal setelah semua objek ketemu)
```

Kalau mau ubah **konten**, hampir semua yang perlu kamu sentuh ada di folder `data/`. Kamu jarang perlu masuk ke folder `app/` atau `components/`.

---

## 3. Cara ubah jawaban puzzle

Edit file `data/puzzle.ts`:

```ts
export const puzzle = {
  question: "...",
  answers: ["jawaban1", "variasi jawaban lain"], // bisa isi beberapa variasi jawaban benar
  hint: "...",
  successMessage: "...",
  wrongMessage: "...",
};
```

- `answers` bisa diisi lebih dari satu kalau kamu mau terima beberapa variasi jawaban.
- Besar-kecil huruf dan spasi berlebih otomatis diabaikan saat dicek.

---

## 4. Hall of Fame

Edit `data/hallOfFame.ts` — array `hallOfFame`. Tiap entri = satu penghargaan (`title`, `subtitle`, `emoji`). Tambah/kurangi entri sesuka hati, halamannya otomatis menyesuaikan.

---

## 5. Divana Wrapped & Awards

Semua data untuk section gabungan ini ada di **satu file**: `data/wrapped.ts`. Filenya dipecah jadi beberapa array/konstanta, masing-masing untuk satu "modul" di halaman `/wrapped`:

| Export             | Untuk bagian apa                          |
|---------------------|--------------------------------------------|
| `wrappedSlides`     | Slide-slide Wrapped utama (rekap tahun ini) |
| `topMoments`        | Top Moments                                 |
| `achievements`      | Achievement System (badge, punya `unlocked: boolean`) |
| `awards`            | Divana Awards (kategori + pemenang)         |
| `insideJokes`       | Inside Joke Statistics                      |
| `unnecessaryStats`  | Completely Unnecessary Statistics™          |
| `annualReportNote`  | Catatan penutup gaya annual report          |

Semuanya masih **placeholder** — ganti isinya sesuai konten Wrapped yang sudah kamu siapkan. Tidak perlu bikin Wrapped baru di tempat lain; semua data Wrapped memang seharusnya tetap di file ini.

---

## 6. Birthday Message & Birthday Wishes

Edit `data/birthdayMessage.ts`:

- `paragraphs` — pesan utama, tiap item jadi satu paragraf.
- `wishes` — bagian doa/harapan ulang tahun, ditampilkan terpisah dan lebih menonjol. **Isi dengan sesuatu yang spesifik buat Divana**, bukan kalimat generik.

Keduanya tampil di halaman `/birthday`, di bagian paling atas.

---

## 7. Things That Died This Year

Edit `data/thingsThatDied.ts` — array `thingsThatDied`. Tiap entri (`name`, `causeOfDeath`, `years`) jadi satu "nisan" kecil di halaman `/birthday`. Ini bagian komedi/receh, bukan pesan serius — tulis dengan nada santai.

---

## 8. A Message From the Future — ini bukan config, tapi fitur buat Divana

Beda dari bagian lain, **bagian ini bukan sesuatu yang kamu isi lewat kode**. Ini fitur interaktif di halaman `/birthday` (paling bawah) di mana Divana sendiri yang nulis pesannya:

- Dia bisa tulis pesan bebas
- Boleh isi "buat siapa" (opsional)
- Boleh kasih tanggal baru boleh dibuka (opsional)
- Pesan tersimpan otomatis di `localStorage` browser dia
- Dia bisa buka/baca lagi atau hapus pesan yang sudah ditulis

Kamu (pembuat website) tidak perlu — dan tidak bisa — menaruh pesan pre-set di sini. Kalau Divana ganti browser atau clear data, pesannya hilang — konsekuensi wajar dari project tanpa database.

---

## 9. Find All Hidden Objects & easter egg rahasia

Edit `data/hiddenObjects.ts`:

```ts
export const hiddenObjects = [
  { id: "object-1", label: "deskripsi singkat", emoji: "🍃" },
  // tambah/kurangi objek sesuka hati
];

export const reiraEjraaSecret = {
  title: "Reira/Ejraa Secret",
  body: "isi rahasianya di sini",
};
```

- Implementasi saat ini: satu halaman (`/hidden-objects`) berisi kartu-kartu "❔" yang diklik satu-satu sampai semua ketemu.
- **`reiraEjraaSecret` baru ditampilkan di UI setelah SEMUA hidden object ditemukan** — sebelum itu, isinya tidak dirender ke halaman mana pun.
- Catatan jujur soal batasan teknis: karena ini website statis tanpa backend, isi `reiraEjraaSecret` tetap ada di dalam file JavaScript yang dikirim ke browser (bisa saja ditemukan orang yang benar-benar niat buka DevTools/view-source), meski tidak ditampilkan di layar sebelum syaratnya terpenuhi. Ini sama seperti batasan Secret Code lain di project ini — cukup untuk pengalaman easter egg, bukan keamanan sungguhan.
- Kalau kamu punya ide lokasi persembunyian yang lebih spesifik (misal disebar ke beberapa halaman berbeda, bukan satu halaman khusus), kabari saja — implementasi ini bisa disesuaikan lagi tanpa mengubah struktur data di atas.

---

## 10. All Packs — cara nambah/ubah pack

Edit `data/gifts.ts`, array `packs`:

```ts
{
  id: "pack-baru",                // unik, dipakai di URL
  title: "Nama Pack",
  tagline: "Satu kalimat pendek.",
  emoji: "🎁",
  type: "download",               // "download" | "link" | "gallery" | "text"
  href: "/gifts/misc/file-kamu.zip",
  ready: true,                    // false = masih placeholder "segera"
  accent: "amber",                // "amber" | "moss" | "blush" | "mist"
},
```

Card baru otomatis muncul di bagian "All Packs" pada halaman `/gifts`.

### Tipe pack (`type`) yang tersedia:

| type       | Dipakai untuk                              | Field tambahan   |
|------------|----------------------------------------------|-------------------|
| `download` | Satu file untuk diunduh/dibuka (skin, zip)   | `href`            |
| `link`     | Link ke luar                                  | `href`            |
| `gallery`  | Beberapa gambar sekaligus                     | `gallery: [...]`  |
| `text`     | Teks panjang langsung di halaman              | `body`            |

> Catatan: OC Gacha sudah dibatalkan dan tidak lagi ada di project ini. Minecraft Skin sekarang berdiri sendiri sebagai satu pack biasa di "All Packs".

---

## 11. Cara masukin file/asset

Semua file statis ditaruh di folder `public/gifts/...`:

```
public/gifts/skins/       -> Minecraft skin
public/gifts/stickers/    -> file .zip sticker pack WhatsApp
public/gifts/misc/        -> poster, PFP pack, fake error page, dan lainnya
public/gifts/wallpapers/  -> disediakan untuk pemakaian di masa depan (tidak ada pack aktif yang memakainya sekarang)
public/gifts/videos/      -> disediakan untuk pemakaian di masa depan
public/gifts/wrapped/     -> disediakan kalau Wrapped nanti mau pakai gambar/slide visual
public/audio/             -> disediakan untuk pemakaian di masa depan
```

Langkah-langkahnya:

1. Taruh file kamu di folder yang sesuai. Contoh: `public/gifts/misc/poster-1.png`.
2. Di `data/gifts.ts` (atau file data lain yang relevan), arahkan `href`/`gallery` ke path itu — **selalu mulai dengan `/`**, tanpa kata `public`.
3. Ganti `ready: false` jadi `ready: true` supaya label "segera" hilang.

Kalau file belum ada, biarkan `ready: false` — halamannya menampilkan pesan placeholder yang santai, bukan error.

---

## 12. Lock seluruh website sampai tanggal tertentu

Website dikunci total sampai tanggal yang kamu tentukan — apa pun URL yang dibuka sebelum waktunya, yang muncul cuma halaman "belum waktunya" dengan hitung mundur.

Atur di `data/siteLock.ts`:

```ts
export const siteUnlock = {
  unlockAt: "2026-09-30T00:00:00+07:00", // format ISO lengkap dengan zona waktu
  lockedTitle: "Belum waktunya.",
  lockedMessage: "Sabar dulu. Ini baru bisa dibuka pas hari-H.",
  previewPrompt: "???",
  previewWrongMessage: "kode belum pas.",
};
```

- Zona waktu penting: `+07:00` = WIB, `+08:00` = WITA, `+09:00` = WIT.
- Pengecekan dilakukan di device/browser pembaca (client-side).
- Semua route ketutup selama belum waktunya, termasuk kalau URL diketik langsung.

### Bypass lock buat kamu sendiri (preview)

Di halaman lock ada teks kecil samar (`previewPrompt`, default `"???"`) — klik itu, muncul kolom kode preview.

Atur kodenya lewat environment variable:

```
NEXT_PUBLIC_PREVIEW_CODE=kode_preview_kamu
```

- Development: isi di `.env.local` (copy dari `.env.example`).
- Production di Vercel: **Settings → Environment Variables**.

Setelah kode benar dimasukkan sekali, browser kamu otomatis "ingat" (localStorage). Device/browser lain tetap ke-lock normal.

---

## 13. Deploy ke Vercel

1. Push project ini ke GitHub (repo boleh private).
2. Buka [vercel.com](https://vercel.com), klik **Add New → Project**, pilih repo tadi.
3. Framework preset otomatis kedeteksi sebagai **Next.js**.
4. Sebelum klik Deploy, buka **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_PREVIEW_CODE` = kode preview kamu sendiri
5. Klik **Deploy**. Setelah selesai, kamu dapat link `https://nama-project.vercel.app`.

Kalau nanti mau update konten, cukup edit file di `data/`, commit, push — Vercel otomatis build ulang.

---

## 14. Reset progress (buat testing)

Karena progress (puzzle, hidden objects, future messages) disimpan di `localStorage`:

- Buka DevTools browser → tab **Application** (Chrome) atau **Storage** (Firefox) → **Local Storage** → hapus key yang diawali `divana:`.
- Atau paling gampang: buka website di mode Incognito/Private setiap mau tes ulang.

---

## 15. Catatan untuk pengembangan lanjutan

Bagian-bagian berikut sengaja dibuat sebagai **kerangka/placeholder** karena konten aslinya belum tersedia saat project ini dikerjakan. Tidak ada isi yang dikarang-karang — semuanya ditandai jelas di data filenya masing-masing:

- **Divana Wrapped & Awards** (`data/wrapped.ts`) — semua slide, achievement, awards, inside joke, statistik, dan catatan annual report masih placeholder generik. Ganti dengan data Wrapped asli begitu tersedia.
- **Hall of Fame** (`data/hallOfFame.ts`) — 3 entri placeholder, ganti dengan penghargaan asli.
- **Things That Died This Year** (`data/thingsThatDied.ts`) — 2 entri placeholder.
- **Find All Hidden Objects** (`data/hiddenObjects.ts`) — 4 objek placeholder dengan lokasi generik (satu halaman, klik kartu). Isi `reiraEjraaSecret.body` juga masih placeholder. Kalau ada ide implementasi yang lebih spesifik (misal disebar di beberapa halaman berbeda di seluruh situs), ini butuh diskusi lanjutan sebelum diimplementasikan, karena akan mengubah cara objek disimpan/dideteksi.
- **All Packs**: Early Access Pass masih berupa teks placeholder (belum ada mekanisme "akses lebih awal" yang sebenarnya diimplementasikan — kalau kamu mau ini benar-benar berfungsi membuka satu pack lebih awal, itu perlu logic tambahan yang belum ada di versi ini). Poster + Certificate Pack, Profile Picture Pack, dan Fake Error Page Pack masih menunggu file asset asli di `public/gifts/misc/`.

---

Semoga Divana suka. 🎉
