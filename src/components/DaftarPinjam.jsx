import { toJam, formatTanggal } from "../utils/waktu";

export default function DaftarPinjam({ pinjaman, ruang, tanggalHariIni, menit }) {
  const akan = pinjaman
    .filter((p) => p.tanggal > tanggalHariIni || (p.tanggal === tanggalHariIni && p.selesai > menit))
    .sort((a, b) => a.tanggal.localeCompare(b.tanggal) || a.mulai - b.mulai);

  return (
    <section className="daftar">
      <h3>Peminjaman mendatang</h3>
      {akan.length === 0 ? (
        <p className="kosong-teks">Belum ada peminjaman.</p>
      ) : (
        <ul>
          {akan.map((p) => (
            <li key={p.id}>
              <strong>{ruang.find((r) => r.id === p.ruang)?.nama}</strong>
              <span>{formatTanggal(p.tanggal)}</span>
              <span>{toJam(p.mulai)} sampai {toJam(p.selesai)}</span>
              <span>{p.nama} • {p.keperluan}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
