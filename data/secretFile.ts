// Isi Secret File setelah kode berhasil dimasukkan.
// Kode-nya sendiri diatur lewat environment variable NEXT_PUBLIC_SECRET_CODE
// (lihat file .env.example), bukan di file ini — supaya tidak kelihatan di kode sumber.

export const secretFile = {
  title: "Secret File",
  unlockedIntro: "Oke, kode lu bener. Ini isinya:",
  body: [
    "Ini bagian yang paling gue sembunyiin — ganti isi ini dengan apa pun yang mau lu kasih tau ke Divana secara khusus.",
    "Bisa cerita, bisa link ke sesuatu, bisa apa aja. Edit di data/secretFile.ts.",
  ],
  wrongMessage: "Kodenya belum pas. Coba inget-inget lagi, atau tanya langsung ke gue.",
};
