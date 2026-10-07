import { useState, useRef, useEffect } from "react";
import { useKelas } from "../context/KelasContext";
import PilihHari from "../components/PilihHari";
import BarRuang from "../components/BarRuang";
import FormPinjam from "../components/FormPinjam";
import { kegiatanRuang, slotKosong } from "../utils/status";
import { toJam, formatTanggal, JAM_BUKA } from "../utils/waktu";

export default function PinjamRuang() {
  const { ruang, jadwal, pinjaman, tanggal: hariIni, menit, tambahPinjam, setHasil } = useKelas();
  const [tanggal, setTanggal] = useState(hariIni);
  const [pilih, setPilih] = useState(null); // { ruang, mulai, selesai }
  const [getar, setGetar] = useState(false);
  const formRef = useRef(null);

  // kalau memilih hari ini, jam yang sudah lewat tidak ditawarkan
  const dari = tanggal === hariIni ? Math.max(JAM_BUKA, Math.ceil(menit / 5) * 5) : JAM_BUKA;

  useEffect(() => {
    if (pilih) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pilih]);

  const ganti = (t) => {
    setTanggal(t);
    setPilih(null);
  };

  const gagal = () => {
    setGetar(true);
    setTimeout(() => setGetar(false), 500);
  };

  const ruangPilih = pilih ? ruang.find((r) => r.id === pilih.ruang) : null;

  return (
    <section>
      <h2 className="judul-halaman">Pinjam ruang</h2>
      <p className="ringkasan">Pilih hari, lihat ruang yang kosong, lalu pilih waktunya.</p>

      <PilihHari tanggal={tanggal} setTanggal={ganti} tanggalHariIni={hariIni} />
      <p className="ringkasan">{formatTanggal(tanggal)}</p>

      <div className="grid-ruang">
        {ruang.map((r) => {
          const keg = kegiatanRuang(r.id, tanggal, jadwal, pinjaman);
          const slot = slotKosong(r.id, tanggal, jadwal, pinjaman, dari);
          const penuh = slot.length === 0;
          const label = penuh ? "Tidak ada slot kosong" : keg.length === 0 ? "Tidak ada kegiatan" : "Sebagian terpakai";
          const warna = penuh ? "merah" : keg.length === 0 ? "hijau" : "kuning";

          return (
            <article key={r.id} className={`kartu-ruang ${penuh ? "penuh" : ""}`}>
              <header>
                <h3>{r.nama}</h3>
                <span className={`badge ${warna}`}>{label}</span>
              </header>
              <BarRuang kegiatan={keg} />
              {penuh ? (
                <small className="kosong-teks">Semua jam sudah terpakai atau sudah lewat.</small>
              ) : (
                <div>
                  <small className="kosong-teks">Pilih waktu kosong</small>
                  <div className="slot-list">
                    {slot.map((s) => {
                      const aktif = pilih && pilih.ruang === r.id && pilih.mulai === s.mulai && pilih.selesai === s.selesai;
                      return (
                        <button
                          key={s.mulai}
                          type="button"
                          className={`chip slot ${aktif ? "aktif" : ""}`}
                          onClick={() => setPilih({ ruang: r.id, mulai: s.mulai, selesai: s.selesai })}
                        >
                          {toJam(s.mulai)} sampai {toJam(s.selesai)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {pilih && (
        <section ref={formRef} className={`panel-kunci ${getar ? "getar" : ""}`}>
          <div className="panel-kepala">
            <div>
              <h2>Pinjam {ruangPilih.nama}</h2>
              <p>Atur jam di bawah sesuai kebutuhan. Jam tidak boleh bentrok dengan kegiatan lain.</p>
            </div>
            <button type="button" className="tombol sekunder" onClick={() => setPilih(null)}>
              Batal
            </button>
          </div>
          <FormPinjam
            key={`${pilih.ruang}-${tanggal}-${pilih.mulai}-${pilih.selesai}`}
            ruang={ruangPilih}
            tanggalHariIni={hariIni}
            menit={menit}
            jadwal={jadwal}
            pinjaman={pinjaman}
            tanggalTetap={tanggal}
            jamAwal={{ mulai: toJam(pilih.mulai), selesai: toJam(pilih.selesai) }}
            onGagal={gagal}
            onBerhasil={(data) => {
              const baru = tambahPinjam(data);
              setHasil({ jenis: "pinjam", ...baru, ruang: ruangPilih.nama });
              setPilih(null);
            }}
          />
        </section>
      )}
    </section>
  );
}
