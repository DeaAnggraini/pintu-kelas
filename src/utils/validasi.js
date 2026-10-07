import { bentrok, kegiatanRuang } from "./status";
import { toJam, JAM_BUKA, JAM_TUTUP } from "./waktu";

const NIM_VALID = /^\d{7}$/;
const PIN_VALID = /^\d{4}$/;

// Mengembalikan pesan error, atau null kalau lolos
export function cekAbsen(nim, pin, kelas, tanggal, daftarAbsen) {
  if (!NIM_VALID.test(nim)) return "NIM harus 7 angka";
  if (!kelas.mahasiswa[nim]) return "NIM tidak terdaftar di kelas ini";
  if (pin !== kelas.pin) return "PIN salah";
  const sudah = daftarAbsen.some(
    (a) => a.kelasId === kelas.id && a.tanggal === tanggal && a.nim === nim
  );
  if (sudah) return "Kamu sudah absen di kelas ini";
  return null;
}

export function cekMasuk(nim, pin, pinj) {
  if (!NIM_VALID.test(nim)) return "NIM harus 7 angka";
  if (nim !== pinj.nim) return "NIM bukan peminjam ruang ini";
  if (pin !== pinj.pin) return "PIN salah";
  return null;
}

// Cek tanggal dan jam saja (tanpa cek bentrok)
export function cekWaktu(tanggal, mulai, selesai, tanggalHariIni, menitSekarang) {
  if (tanggal < tanggalHariIni) return "Tanggal sudah lewat";
  if (tanggal === tanggalHariIni && mulai < menitSekarang) return "Jam mulai sudah lewat";
  if (mulai >= selesai) return "Jam selesai harus lebih besar dari jam mulai";
  if (mulai < JAM_BUKA || selesai > JAM_TUTUP) return "Jam operasional 06:00 sampai 21:00";
  return null;
}

export function cekPinjam(data, jadwal, pinjaman, tanggalHariIni, menitSekarang) {
  const { nama, nim, keperluan, pin, tanggal, mulai, selesai, ruang } = data;

  if (!nama || !nim || !keperluan || !pin || !tanggal || mulai === null || selesai === null)
    return "Semua kolom wajib diisi";
  if (!NIM_VALID.test(nim)) return "NIM harus 7 angka";
  if (!PIN_VALID.test(pin)) return "PIN harus 4 angka";
  const salahWaktu = cekWaktu(tanggal, mulai, selesai, tanggalHariIni, menitSekarang);
  if (salahWaktu) return salahWaktu;

  const bentur = kegiatanRuang(ruang, tanggal, jadwal, pinjaman).find((k) => bentrok(k, data));
  if (bentur) {
    const label = bentur.jenis === "kelas" ? bentur.matkul : `peminjaman ${bentur.nama}`;
    return `Bentrok dengan ${label} (${toJam(bentur.mulai)} sampai ${toJam(bentur.selesai)})`;
  }
  return null;
}
