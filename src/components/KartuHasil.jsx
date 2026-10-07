import { toJam, formatTanggal } from "../utils/waktu";

export default function KartuHasil({ hasil, onTutup }) {
  return (
    <div className="overlay" onClick={onTutup}>
      <div className="kartu" onClick={(e) => e.stopPropagation()}>
        <div className="ikon">{hasil.jenis === "pinjam" ? "📅" : "🔓"}</div>

        {hasil.jenis === "absen" && (
          <>
            <h3>Hadir</h3>
            <p className="nama">{hasil.nama}</p>
            <p>{hasil.matkul}</p>
            <p>{hasil.ruang} • masuk pukul {hasil.jam}</p>
          </>
        )}

        {hasil.jenis === "masuk" && (
          <>
            <h3>Pintu terbuka</h3>
            <p className="nama">Selamat datang, {hasil.nama}</p>
            <p>{hasil.ruang} • {hasil.keperluan}</p>
          </>
        )}

        {hasil.jenis === "pinjam" && (
          <>
            <h3>Peminjaman berhasil</h3>
            <p className="nama">{hasil.ruang}</p>
            <p>{formatTanggal(hasil.tanggal)}</p>
            <p>{toJam(hasil.mulai)} sampai {toJam(hasil.selesai)} • {hasil.keperluan}</p>
            <p className="catatan">Ingat PIN yang kamu buat. PIN dipakai untuk membuka pintu saat jam peminjamanmu.</p>
          </>
        )}

        <button type="button" className="tombol" onClick={onTutup}>Tutup</button>
      </div>
    </div>
  );
}
