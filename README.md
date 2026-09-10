# buat Divana 🎂

Birthday project pribadi buat Divana. Satu website, banyak hadiah di dalamnya.

Dibuat pakai Next.js (App Router) + TypeScript + Tailwind CSS. Tidak pakai database — progress (puzzle & secret file) disimpan di `localStorage` browser.

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

## 2. Struktur project

```
app/                  -> halaman-halaman (routing otomatis dari nama folder)
  page.tsx            -> halaman awal
  puzzle/page.tsx      -> halaman puzzle
  gifts/page.tsx       -> daftar semua hadiah
  gifts/[id]/page.tsx  -> halaman detail satu hadiah
  message/page.tsx     -> birthday message
  future/page.tsx      -> future messages
  secret/page.tsx       -> secret file

components/           -> potongan UI yang dipakai berulang (tombol, card, dll)
data/                 -> SEMUA KONTEN yang mau kamu edit ada di sini
lib/                  -> fungsi bantu kecil (localStorage, format teks)
public/               -> file statis: gambar, wallpaper, skin, sticker, video
```

Kalau mau ubah **konten**, hampir semua yang perlu kamu sentuh ada di folder `data/`. Kamu jarang perlu masuk ke folder `app/` atau `components/`.

---

## 3. Cara ubah jawaban puzzle

Edit file:

```
data/puzzle.ts
```

```ts
export const puzzle = {
  question: "Di mana pertama kali gue sama lu ketemu?",
  answers: ["sekolah", "di sekolah"], // bisa isi beberapa variasi jawaban benar
  hint: "...",
  successMessage: "...",
  wrongMessage: "...",
};
```

- `answers` bisa diisi lebih dari satu, kalau kamu mau terima beberapa variasi jawaban (misalnya dengan/tanpa "di").
- Besar-kecil huruf dan spasi berlebih otomatis diabaikan saat dicek, jadi kamu tidak perlu mikirin itu.

---

## 4. Cara ubah kode Secret File

Kode Secret File **tidak** disimpan di dalam kode sumber (supaya tidak kelihatan kalau ada yang buka file project-nya), tapi lewat **environment variable**.

### Untuk development di komputer sendiri:

1. Copy `.env.example` jadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Buka `.env.local`, ganti nilainya:
   ```
   NEXT_PUBLIC_SECRET_CODE=kode_rahasia_kamu
   ```
3. Restart `npm run dev` supaya perubahan kebaca.

### Untuk production di Vercel:

Buka dashboard project di Vercel → **Settings → Environment Variables** → tambah:

- **Key**: `NEXT_PUBLIC_SECRET_CODE`
- **Value**: kode rahasia kamu

Lalu redeploy.

> Catatan jujur: karena variabel ini diawali `NEXT_PUBLIC_`, secara teknis dia tetap ada di dalam kode yang dikirim ke browser (bisa ditemukan orang yang benar-benar niat buka DevTools). Ini cukup untuk pengalaman "puzzle santai", tapi bukan keamanan sungguhan — sesuai konsep awal project ini.

---

## 5. Cara nambah hadiah baru

Buka file:

```
data/gifts.ts
```

Tambahkan object baru ke array `gifts`, contoh:

```ts
{
  id: "hadiah-baru",              // unik, dipakai di URL
  title: "Nama Hadiahnya",
  tagline: "Satu kalimat pendek soal hadiah ini.",
  emoji: "🎁",
  type: "download",               // "download" | "link" | "gallery" | "text" | "custom"
  href: "/gifts/misc/file-kamu.zip",
  ready: true,                    // false = masih placeholder "segera"
  accent: "amber",                // "amber" | "moss" | "blush" | "mist"
},
```

Card baru otomatis muncul di halaman `/gifts` — kamu tidak perlu ubah bagian UI mana pun.

### Tipe hadiah (`type`) yang tersedia:

| type       | Dipakai untuk                             | Field tambahan     |
|------------|--------------------------------------------|---------------------|
| `download` | Satu file untuk diunduh/dibuka (skin, zip) | `href`              |
| `link`     | Link ke luar (misalnya game)                | `href`              |
| `gallery`  | Beberapa gambar/video sekaligus             | `gallery: [...]`    |
| `text`     | Teks panjang langsung di halaman            | `body`              |
| `custom`   | Sudah punya halaman sendiri (jangan dipakai untuk hadiah baru kecuali kamu juga buat halamannya) | - |
| `bundle`   | Gabungan beberapa bagian berbeda dalam SATU card — cocok kalau judul hadiahnya sengaja dibikin gak nyebut isinya langsung (contoh: gabungan Minecraft Skin + OC Gacha jadi satu card "Dua Versi Lu") | `sections: [...]` |

### Contoh `bundle` (gabungan beberapa isi dalam satu card):

```ts
{
  id: "dua-versi-lu",
  title: "Dua Versi Lu",           // judul sengaja samar, gak nyebut isinya
  tagline: "Dua cara beda buat gambarin lu, dibikin khusus.",
  emoji: "🎭",
  type: "bundle",
  sections: [
    { label: "Versi pertama", type: "download", href: "/gifts/skins/divana-skin.png", ready: true },
    { label: "Versi kedua", type: "gallery", gallery: ["/gifts/oc-gacha/gambar1.png"], ready: true },
  ],
  ready: true, // ready keseluruhan card; masing-masing section juga punya ready sendiri
  accent: "blush",
},
```

Tiap `section` punya `ready` masing-masing, jadi kamu bisa bikin satu bagian sudah siap sementara bagian lain masih placeholder.

---

## 6. Future Messages — ini bukan config, tapi fitur buat Divana

Beda dari bagian lain, **Future Messages bukan sesuatu yang kamu isi lewat kode**. Ini halaman interaktif di mana Divana sendiri yang nulis pesannya:

- Dia bisa tulis pesan bebas
- Boleh isi "buat siapa" (opsional)
- Boleh kasih tanggal baru boleh dibuka (opsional — kalau kosong, langsung bisa dibaca lagi kapan saja)
- Pesan tersimpan otomatis di `localStorage` browser dia
- Dia bisa buka/baca lagi atau hapus pesan yang udah ditulis

Kamu (pembuat website) tidak perlu — dan tidak bisa — menaruh pesan pre-set di sini. Semua kontennya murni dari Divana, dan cuma tersimpan di browser/device yang dia pakai buat nulis (kalau dia ganti browser atau clear data, pesannya hilang — ini konsekuensi dari tanpa database, konsisten dengan versi pertama project ini).

Kalau suatu saat mau upgrade jadi sungguhan bisa diakses lintas device, itu butuh backend/database — di luar cakupan versi pertama ini.

---

## 7. Cara ganti link game (Nobody Tell Her)

Buka `data/gifts.ts`, cari entri dengan `id: "nobody-tell-her"`, ganti `href`:

```ts
{
  id: "nobody-tell-her",
  ...
  href: "https://link-game-kamu-yang-sebenarnya.com",
  ready: true, // ganti jadi true kalau linknya sudah siap
},
```

---

## 8. Cara masukin file/asset (wallpaper, skin, sticker, video, dll)

Semua file statis ditaruh di folder `public/gifts/...`, sudah dibagi per kategori:

```
public/gifts/skins/         -> Minecraft skin
public/gifts/oc-gacha/      -> gambar OC gacha
public/gifts/wrapped/       -> gambar/slide Divana Wrapped
public/gifts/videos/        -> video
public/gifts/wallpapers/    -> wallpaper
public/gifts/stickers/      -> file .zip sticker pack WhatsApp
public/gifts/misc/          -> apa aja yang tidak masuk kategori lain
```

Langkah-langkahnya:

1. Taruh file kamu di folder yang sesuai. Contoh: `public/gifts/wallpapers/pantai.png`.
2. Di `data/gifts.ts`, arahkan `href` atau `gallery` ke path itu — **selalu mulai dengan `/`**, tanpa kata `public`:
   ```ts
   href: "/gifts/wallpapers/pantai.png"
   ```
3. Ganti `ready: false` jadi `ready: true` supaya label "segera" hilang dan tombolnya aktif.

Kalau file belum ada, biarkan saja `ready: false` — halamannya akan menampilkan pesan placeholder yang santai, bukan error.

---

## 9. Cara ubah Birthday Message

Buka `data/birthdayMessage.ts`, edit langsung teksnya.

- `paragraphs` — pesan utama, tiap item jadi satu paragraf.
- `wishes` — bagian doa/harapan ulang tahun, ditampilkan terpisah dan lebih menonjol di bawah pesan utama. Tiap item jadi satu baris harapan. **Isi ini dengan sesuatu yang spesifik buat Divana**, bukan kalimat generik kayak "semoga panjang umur" — bagian ini sengaja dipisah supaya kerasa lebih personal, bukan cuma pelengkap.

---

## 10. Deploy ke Vercel

1. Push project ini ke GitHub (repo boleh private).
2. Buka [vercel.com](https://vercel.com), klik **Add New → Project**, pilih repo tadi.
3. Framework preset otomatis kedeteksi sebagai **Next.js** — tidak perlu diubah apa-apa.
4. Sebelum klik Deploy, buka bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SECRET_CODE` = kode rahasia Secret File kamu
5. Klik **Deploy**. Tunggu sampai selesai, lalu Vercel kasih link `https://nama-project.vercel.app`.
6. Link itu yang dikirim ke Divana.

Kalau nanti mau update konten (nambah hadiah, ganti pesan, dll), cukup edit file di `data/`, commit, push — Vercel otomatis build ulang dan update live.

---

## 11. Lock seluruh website sampai tanggal tertentu

Website ini dikunci total sampai tanggal yang kamu tentukan — apa pun URL yang dibuka sebelum waktunya, yang muncul cuma halaman "belum waktunya" dengan hitung mundur. Setelah waktunya lewat, website otomatis kebuka sendiri tanpa perlu refresh manual.

Atur di file:

```
data/siteLock.ts
```

```ts
export const siteUnlock = {
  unlockAt: "2026-09-30T00:00:00+07:00", // format ISO lengkap dengan zona waktu
  lockedTitle: "Belum waktunya.",
  lockedMessage: "Sabar dulu. Ini baru bisa dibuka pas hari-H.",
};
```

- `unlockAt` — tanggal & jam website mulai bisa diakses. Zona waktu penting: `+07:00` = WIB, `+08:00` = WITA, `+09:00` = WIT. Kalau Divana buka dari zona waktu lain, waktu unlock tetap mengacu ke waktu absolut ini (bukan waktu lokal dia).
- Pengecekan dilakukan di device/browser pembaca (client-side), konsisten dengan project ini yang tidak pakai server/database terpisah.
- Halaman lock tidak bisa dilewati dengan langsung mengetik URL lain (misal `/gifts`) — semua route ketutup selama belum waktunya.

Kalau mau matiin lock sepenuhnya (misalnya pas kamu develop/testing), gampang: ganti `unlockAt` ke tanggal yang sudah lewat, atau minta bantuan tambahin toggle `enabled` kalau butuh sering gonta-ganti.

### Bypass lock buat kamu sendiri (preview)

Supaya kamu bisa buka & cek website ini sebelum tanggal unlock — tanpa harus nunggu kayak Divana — ada kode preview terpisah.

Di halaman lock, ada teks kecil dan samar bertuliskan **"punya kode preview?"** di bagian bawah (sengaja dibuat gak mencolok biar Divana gak penasaran/coba-coba klik). Klik itu, muncul kolom kode.

Atur kodenya lewat environment variable, sama seperti Secret File:

```
NEXT_PUBLIC_PREVIEW_CODE=kode_preview_kamu
```

- Development: isi di `.env.local` (copy dari `.env.example`).
- Production di Vercel: tambahkan lewat **Settings → Environment Variables**.

Setelah kode benar dimasukkan sekali, browser kamu otomatis "ingat" (tersimpan di localStorage) — jadi kamu gak perlu masukin kode itu lagi tiap buka website dari device/browser yang sama. Device/browser lain (termasuk punya Divana) tetap ke-lock normal sampai tanggal unlock.

> Catatan yang sama seperti Secret File berlaku di sini: karena variabelnya `NEXT_PUBLIC_`, secara teknis kode ini tetap ada di kode yang dikirim ke browser. Cukup untuk mencegah Divana kebuka gak sengaja, tapi bukan keamanan yang benar-benar kuat.

---

## 12. Reset progress (buat testing)

Karena progress puzzle & secret file disimpan di `localStorage`, kalau kamu mau tes ulang dari awal:

- Buka DevTools browser → tab **Application** (Chrome) atau **Storage** (Firefox) → **Local Storage** → hapus key yang diawali `divana:`.
- Atau paling gampang: buka website di mode Incognito/Private setiap mau tes ulang.

---

Semoga Divana suka. 🎉
