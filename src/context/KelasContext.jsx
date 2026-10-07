import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useSekarang, { MODE_DEMO } from "../hooks/useSekarang";
import { ruang, jadwal } from "../data/data";
import { getStatus } from "../utils/status";
import { tanggalLokal, menitDari } from "../utils/waktu";

const KelasContext = createContext(null);

export function KelasProvider({ children }) {
  const now = useSekarang();
  const tanggal = tanggalLokal(now);
  const menit = menitDari(now);

  const [pinjaman, setPinjaman] = useLocalStorage("pinjaman", []);
  const [absen, setAbsen] = useLocalStorage("absen", []);
  const [hasil, setHasil] = useState(null);

  const statusRuang = (id) => getStatus(id, tanggal, menit, jadwal, pinjaman);

  const catatAbsen = (data) => setAbsen((a) => [...a, data]);

  const tambahPinjam = (data) => {
    const baru = { ...data, id: Date.now() };
    setPinjaman((p) => [...p, baru]);
    return baru;
  };

  const resetData = () => {
    if (window.confirm("Hapus semua data peminjaman dan absen?")) {
      setPinjaman([]);
      setAbsen([]);
    }
  };

  const value = {
    now, tanggal, menit, demo: MODE_DEMO,
    ruang, jadwal, pinjaman, absen,
    statusRuang, catatAbsen, tambahPinjam, resetData,
    hasil, setHasil,
  };

  return <KelasContext.Provider value={value}>{children}</KelasContext.Provider>;
}

export function useKelas() {
  const ctx = useContext(KelasContext);
  if (!ctx) throw new Error("useKelas harus dipakai di dalam KelasProvider");
  return ctx;
}
