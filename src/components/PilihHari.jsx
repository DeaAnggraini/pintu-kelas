import { tambahHari, hariDariTanggal, formatSingkat } from "../utils/waktu";

// Deretan tombol 7 hari ke depan, ditambah pilihan tanggal lain
export default function PilihHari({ tanggal, setTanggal, tanggalHariIni, jumlah = 7 }) {
  const daftar = Array.from({ length: jumlah }, (_, i) => tambahHari(tanggalHariIni, i));

  return (
    <div className="pilih-hari">
      <div className="chips-hari">
        {daftar.map((t, i) => (
          <button
            key={t}
            type="button"
            className={`hari ${t === tanggal ? "aktif" : ""}`}
            onClick={() => setTanggal(t)}
          >
            <small>{i === 0 ? "Hari ini" : hariDariTanggal(t)}</small>
            <strong>{formatSingkat(t)}</strong>
          </button>
        ))}
      </div>
      <label className="tanggal-lain">
        Tanggal lain
        <input
          type="date"
          min={tanggalHariIni}
          value={tanggal}
          onChange={(e) => e.target.value && setTanggal(e.target.value)}
        />
      </label>
    </div>
  );
}
