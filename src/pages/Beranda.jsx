import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useKelas } from "../context/KelasContext";
import Lorong from "../components/Lorong";
import DaftarPinjam from "../components/DaftarPinjam";

export default function Beranda() {
  const { ruang, pinjaman, tanggal, menit, statusRuang } = useKelas();
  const navigate = useNavigate();
  const [aksi, setAksi] = useState(null); // { id, jenis: "terbuka" | "getar" }
  const timer = useRef(null);

  // batalkan timer kalau halaman ditinggalkan
  useEffect(() => () => clearTimeout(timer.current), []);

  const pilihPintu = (id) => {
    if (aksi) return;
    // ruang kosong tidak terkunci, jadi pintunya terbuka
    // ruang berkelas atau dipinjam terkunci, jadi pintunya bergetar
    const kosong = statusRuang(id).tipe === "kosong";
    setAksi({ id, jenis: kosong ? "terbuka" : "getar" });
    timer.current = setTimeout(() => navigate(`/ruang/${id}`), kosong ? 800 : 450);
  };

  const semua = ruang.map((r) => statusRuang(r.id).tipe);
  const hitung = (t) => semua.filter((s) => s === t).length;

  return (
    <>
      <p className="ringkasan">
        Saat ini {hitung("berlangsung")} kelas berlangsung, {hitung("dipinjam")} ruang dipinjam,
        dan {hitung("kosong")} ruang kosong. Klik pintu untuk absen atau meminjam.
      </p>

      <Lorong ruang={ruang} statusRuang={statusRuang} aksi={aksi} onPilih={pilihPintu} />

      <div className="cta">
        <Link to="/jadwal" className="tombol">🗓️ Lihat semua jadwal</Link>
        <Link to="/pinjam" className="tombol sekunder">📅 Pinjam ruang di hari lain</Link>
      </div>

      <DaftarPinjam pinjaman={pinjaman} ruang={ruang} tanggalHariIni={tanggal} menit={menit} />
    </>
  );
}