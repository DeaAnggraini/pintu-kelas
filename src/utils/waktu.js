const NAMA_HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const NAMA_BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

const dua = (n) => String(n).padStart(2, "0");

// "08:30" menjadi 510
export const toMenit = (jam) => {
  const [h, m] = jam.split(":").map(Number);
  return h * 60 + m;
};

// 510 menjadi "08:30"
export const toJam = (menit) => `${dua(Math.floor(menit / 60))}:${dua(menit % 60)}`;

// Tanggal lokal komputer dalam format YYYY-MM-DD (bukan UTC)
export const tanggalLokal = (d) => `${d.getFullYear()}-${dua(d.getMonth() + 1)}-${dua(d.getDate())}`;

export const menitDari = (d) => d.getHours() * 60 + d.getMinutes();

export const hariDariTanggal = (tanggal) => {
  const [y, m, d] = tanggal.split("-").map(Number);
  return NAMA_HARI[new Date(y, m - 1, d).getDay()];
};

export const formatTanggal = (tanggal) => {
  const [y, m, d] = tanggal.split("-").map(Number);
  return `${hariDariTanggal(tanggal)}, ${d} ${NAMA_BULAN[m - 1]} ${y}`;
};

// Daftar tanggal berurutan mulai hari ini, untuk pilihan hari
export const daftarTanggal = (now, jumlah) =>
  Array.from({ length: jumlah }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    return {
      tanggal: tanggalLokal(d),
      hari: NAMA_HARI[d.getDay()],
      tgl: d.getDate(),
      bulan: NAMA_BULAN[d.getMonth()],
    };
  });

// Jam operasional ruang (06:00 sampai 21:00)
export const JAM_BUKA = 360;
export const JAM_TUTUP = 1260;

// Tambah n hari pada tanggal YYYY-MM-DD
export const tambahHari = (tanggal, n) => {
  const [y, m, d] = tanggal.split("-").map(Number);
  return tanggalLokal(new Date(y, m - 1, d + n));
};

// "2026-10-05" menjadi "5 Okt"
export const formatSingkat = (tanggal) => {
  const [, m, d] = tanggal.split("-").map(Number);
  return `${d} ${NAMA_BULAN[m - 1]}`;
};
