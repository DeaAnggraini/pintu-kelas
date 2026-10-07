import { useState, useEffect } from "react";

// Mode demo (opsional), contoh alamat: http://localhost:5173/?demo=2026-10-05T09:35
// Waktu berjalan normal mulai dari tanggal dan jam yang ditentukan.
const param = new URLSearchParams(window.location.search).get("demo");
const target = param ? new Date(param).getTime() : NaN;
const OFFSET = Number.isNaN(target) ? 0 : target - Date.now();

export const MODE_DEMO = OFFSET !== 0;

const ambil = () => new Date(Date.now() + OFFSET);

export default function useSekarang() {
  const [now, setNow] = useState(ambil);

  useEffect(() => {
    const id = setInterval(() => setNow(ambil()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}
