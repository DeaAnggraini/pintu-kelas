import { Routes, Route, NavLink, Link } from "react-router-dom";
import { KelasProvider, useKelas } from "./context/KelasContext";
import JamDigital from "./components/JamDigital";
import KartuHasil from "./components/KartuHasil";
import Beranda from "./pages/Beranda";
import Jadwal from "./pages/Jadwal";
import PinjamRuang from "./pages/PinjamRuang";
import HalamanRuang from "./pages/HalamanRuang";

function TidakAda() {
  return (
    <div className="halaman-ruang">
      <p>Halaman tidak ditemukan.</p>
      <Link to="/" className="tombol">Kembali ke lorong</Link>
    </div>
  );
}

function Layout() {
  const { now, demo, hasil, setHasil, resetData } = useKelas();

  return (
    <div className="app">
      <header className="kepala">
        <div>
          <h1>Pintu Kelas</h1>
          <p>Absen dengan NIM dan PIN, atau pinjam ruang yang kosong.</p>
        </div>
        <JamDigital now={now} demo={demo} />
      </header>

      <nav className="nav">
        <NavLink to="/" end>🚪 Lorong</NavLink>
        <NavLink to="/jadwal">🗓️ Semua jadwal</NavLink>
        <NavLink to="/pinjam">📅 Pinjam ruang</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/jadwal" element={<Jadwal />} />
        <Route path="/pinjam" element={<PinjamRuang />} />
        <Route path="/ruang/:id" element={<HalamanRuang />} />
        <Route path="*" element={<TidakAda />} />
      </Routes>

      <footer className="kaki">
        <button type="button" onClick={resetData}>Reset data</button>
      </footer>

      {hasil && <KartuHasil hasil={hasil} onTutup={() => setHasil(null)} />}
    </div>
  );
}

export default function App() {
  return (
    <KelasProvider>
      <Layout />
    </KelasProvider>
  );
}
