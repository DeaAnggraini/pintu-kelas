import { hariDariTanggal, JAM_BUKA, JAM_TUTUP } from "./waktu";

export const bentrok = (a, b) => a.mulai < b.selesai && b.mulai < a.selesai;

// Semua kegiatan (kelas tetap dan peminjaman) di satu ruang pada satu tanggal
export function kegiatanRuang(idRuang, tanggal, jadwal, pinjaman) {
  if (!tanggal) return [];
  const hari = hariDariTanggal(tanggal);
  const kelas = jadwal
    .filter((j) => j.ruang === idRuang && j.hari === hari)
    .map((j) => ({ ...j, jenis: "kelas" }));
  const pinj = pinjaman
    .filter((p) => p.ruang === idRuang && p.tanggal === tanggal)
    .map((p) => ({ ...p, jenis: "pinjam" }));
  return [...kelas, ...pinj].sort((a, b) => a.mulai - b.mulai);
}

export function getStatus(idRuang, tanggal, menit, jadwal, pinjaman) {
  const semua = kegiatanRuang(idRuang, tanggal, jadwal, pinjaman);
  const sekarang = semua.find((k) => menit >= k.mulai && menit < k.selesai);
  const berikutnya = semua.find((k) => k.mulai > menit) || null;

  if (sekarang?.jenis === "kelas") return { tipe: "berlangsung", kelas: sekarang, berikutnya };
  if (sekarang?.jenis === "pinjam") return { tipe: "dipinjam", pinj: sekarang, berikutnya };
  return { tipe: "kosong", berikutnya };
}

// Rentang waktu kosong pada satu ruang di satu tanggal (minimal 30 menit)
export function slotKosong(idRuang, tanggal, jadwal, pinjaman, dari = JAM_BUKA) {
  if (dari >= JAM_TUTUP) return [];
  const semua = kegiatanRuang(idRuang, tanggal, jadwal, pinjaman);
  const slot = [];
  let kursor = dari;

  for (const k of semua) {
    if (k.selesai <= kursor) continue;
    if (k.mulai > kursor) slot.push({ mulai: kursor, selesai: Math.min(k.mulai, JAM_TUTUP) });
    kursor = Math.max(kursor, k.selesai);
    if (kursor >= JAM_TUTUP) break;
  }
  if (kursor < JAM_TUTUP) slot.push({ mulai: kursor, selesai: JAM_TUTUP });

  return slot.filter((s) => s.selesai - s.mulai >= 30);
}
