// Isi Divana Hall of Fame di sini. Tiap entri jadi satu "penghargaan"
// yang ditampilkan di halaman /hall-of-fame.
//
// title    : nama penghargaannya (boleh receh, boleh serius)
// subtitle : deskripsi singkat kenapa dia dapet ini
// emoji    : ikon kecil buat entri ini

export interface HallOfFameEntry {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
}

export const hallOfFame: HallOfFameEntry[] = [
  {
    id: "placeholder-1",
    title: "Placeholder Award #1",
    subtitle: "Ganti dengan penghargaan beneran buat Divana di data/hallOfFame.ts.",
    emoji: "🏆",
  },
  {
    id: "placeholder-2",
    title: "Placeholder Award #2",
    subtitle: "Bisa serius, bisa receh — bebas sesuai gaya kalian berdua.",
    emoji: "🥇",
  },
  {
    id: "placeholder-3",
    title: "Placeholder Award #3",
    subtitle: "Tambah/kurangi entri sesuka hati, tinggal edit array di atas.",
    emoji: "🎖️",
  },
];
