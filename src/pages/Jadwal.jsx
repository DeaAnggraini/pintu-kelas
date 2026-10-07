import { useState } from "react";
import { useKelas } from "../context/KelasContext";
import PilihHari from "../components/PilihHari";
import TimelineJadwal from "../components/TimelineJadwal";
import TabelMingguan from "../components/TabelMingguan";
import { hariDariTanggal, formatTanggal } from "../utils/waktu";

export default function Jadwal() {
  const { ruang, jadwal, pinjaman, tanggal: hariIni, menit } = useKelas();
  const [tanggal, setTanggal] = useState(hariIni);
  const [tampil, setTampil] = useState("hari");

  const adaKelas = jadwal.some((j) => j.hari === hariDariTanggal(tanggal));

  return (
    <section>
      <h2 className="judul-halaman">Semua jadwal</h2>

      <div className="tab">
        <button type="button" className={tampil === "hari" ? "aktif" : ""} onClick={() => setTampil("hari")}>
          Per hari
        </button>
        <button type="button" className={tampil === "minggu" ? "aktif" : ""} onClick={() => setTampil("minggu")}>
          Seminggu penuh
        </button>
      </div>

      {tampil === "hari" ? (
        <>
          <PilihHari tanggal={tanggal} setTanggal={setTanggal} tanggalHariIni={hariIni} />
          <p className="ringkasan">{formatTanggal(tanggal)}</p>
          {!adaKelas && <p className="kosong-teks">Tidak ada kelas tetap pada hari ini. Hanya peminjaman yang tampil.</p>}
          <TimelineJadwal
            tanggal={tanggal}
            ruang={ruang}
            jadwal={jadwal}
            pinjaman={pinjaman}
            tanggalHariIni={hariIni}
            menit={menit}
          />
          <div className="legenda">
            <span><i style={{ background: "#8a5427" }} />Kelas tetap</span>
            <span><i style={{ background: "#7d3535" }} />Dipinjam</span>
            <span><i style={{ background: "var(--merah)" }} />Waktu sekarang</span>
          </div>
        </>
      ) : (
        <TabelMingguan jadwal={jadwal} ruang={ruang} hariIni={hariDariTanggal(hariIni)} />
      )}
    </section>
  );
}
