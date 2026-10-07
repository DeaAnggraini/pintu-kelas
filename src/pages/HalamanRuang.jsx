import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useKelas } from "../context/KelasContext";
import Pintu from "../components/Pintu";
import FormKunci from "../components/FormKunci";
import FormPinjam from "../components/FormPinjam";
import { cekAbsen, cekMasuk } from "../utils/validasi";
import { toJam } from "../utils/waktu";

export default function HalamanRuang() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    ruang, jadwal, pinjaman, absen, tanggal, menit,
    statusRuang, catatAbsen, tambahPinjam, setHasil,
  } = useKelas();

  const [anim, setAnim] = useState("");
  const [sibuk, setSibuk] = useState(false);
  const [tab, setTab] = useState("kunci");

  const r = ruang.find((x) => x.id === id);
  if (!r) {
    return (
      <div className="halaman-ruang">
        <p>Ruang tidak ditemukan.</p>
        <Link to="/" className="tombol">Kembali ke lorong</Link>
      </div>
    );
  }

  const status = statusRuang(r.id);
  const { tipe } = status;
  const tabAktif = tipe === "kosong" ? "pinjam" : tab;

  const gagal = () => {
    if (sibuk) return;
    setAnim("getar");
    setTimeout(() => setAnim(""), 500);
  };

  // Pintu membuka dulu, setelah itu data disimpan dan kembali ke lorong
  const sukses = (aksi) => {
    if (sibuk) return;
    setSibuk(true);
    setAnim("terbuka");
    setTimeout(aksi, 1100);
  };

  const handleAbsen = (nim) => {
    const kelas = status.kelas;
    const nama = kelas.mahasiswa[nim];
    const jam = toJam(menit);
    sukses(() => {
      catatAbsen({ kelasId: kelas.id, tanggal, nim, nama, jam });
      setHasil({ jenis: "absen", nama, matkul: kelas.matkul, ruang: r.nama, jam });
      navigate("/");
    });
  };

  const handleMasuk = () => {
    const p = status.pinj;
    sukses(() => {
      setHasil({ jenis: "masuk", nama: p.nama, keperluan: p.keperluan, ruang: r.nama });
      navigate("/");
    });
  };

  const handlePinjam = (data) => {
    sukses(() => {
      const baru = tambahPinjam(data);
      setHasil({ jenis: "pinjam", ...baru, ruang: r.nama });
      navigate("/");
    });
  };

  const ringkas =
    tipe === "berlangsung"
      ? `${status.kelas.matkul} • ${status.kelas.dosen} • ${toJam(status.kelas.mulai)} sampai ${toJam(status.kelas.selesai)}`
      : tipe === "dipinjam"
      ? `Dipinjam ${status.pinj.nama} untuk ${status.pinj.keperluan} • ${toJam(status.pinj.mulai)} sampai ${toJam(status.pinj.selesai)}`
      : "Ruang kosong, siapa saja boleh meminjam";

  const kunciKey = `${tipe}-${status.kelas?.id ?? status.pinj?.id ?? 0}`;

  return (
    <div className="halaman-ruang">
      <Link to="/" className="kembali">← Kembali ke lorong</Link>

      <div className="ruang-grid">
        <div className="ruang-pintu">
          <Pintu ruang={r} status={status} anim={tipe === "kosong" ? `terbuka ${anim}` : anim} besar />        </div>

        <section className={`panel-kunci ${anim === "getar" ? "getar" : ""}`}>
          <div className="panel-kepala">
            <div>
              <h2>{r.nama}</h2>
              <p>{ringkas}</p>
            </div>
          </div>

          {tipe !== "kosong" && (
            <div className="tab">
              <button type="button" className={tabAktif === "kunci" ? "aktif" : ""} onClick={() => setTab("kunci")}>
                {tipe === "berlangsung" ? "🗝️ Absen kelas" : "🗝️ Masuk ruang"}
              </button>
              <button type="button" className={tabAktif === "pinjam" ? "aktif" : ""} onClick={() => setTab("pinjam")}>
                📅 Pinjam di waktu lain
              </button>
            </div>
          )}

          {tabAktif === "kunci" && tipe === "berlangsung" && (
            <FormKunci
              key={kunciKey}
              petunjuk="Masukkan NIM dan PIN kelas dari dosen untuk membuka pintu dan absen."
              tombol="Buka pintu dan absen"
              validasi={(nim, pin) => cekAbsen(nim, pin, status.kelas, tanggal, absen)}
              onGagal={gagal}
              onBerhasil={handleAbsen}
            />
          )}

          {tabAktif === "kunci" && tipe === "dipinjam" && (
            <FormKunci
              key={kunciKey}
              petunjuk="Khusus peminjam. Masukkan NIM dan PIN yang kamu buat saat meminjam."
              tombol="Buka pintu"
              validasi={(nim, pin) => cekMasuk(nim, pin, status.pinj)}
              onGagal={gagal}
              onBerhasil={handleMasuk}
            />
          )}

          {tabAktif === "pinjam" && (
            <FormPinjam
              ruang={r}
              tanggalHariIni={tanggal}
              menit={menit}
              jadwal={jadwal}
              pinjaman={pinjaman}
              onGagal={gagal}
              onBerhasil={handlePinjam}
            />
          )}
        </section>
      </div>
    </div>
  );
}
