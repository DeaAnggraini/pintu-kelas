import { useState, useEffect } from "react";

export default function useLocalStorage(key, awal) {
  const [nilai, setNilai] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : awal;
    } catch {
      return awal;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(nilai));
    } catch {
      /* abaikan kalau penyimpanan penuh atau diblokir */
    }
  }, [key, nilai]);

  return [nilai, setNilai];
}
