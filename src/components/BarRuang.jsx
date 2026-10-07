import { toJam, JAM_BUKA, JAM_TUTUP } from "../utils/waktu";

const TOTAL = JAM_TUTUP - JAM_BUKA;

// Batang kecil yang menunjukkan jam terpakai (cokelat atau merah) dan jam kosong (hijau)
export default function BarRuang({ kegiatan }) {
  return (
    <div>
      <div className="bar">
        {kegiatan.map((k) => (
          <span
            key={`${k.jenis}-${k.id}`}
            className={`seg ${k.jenis}`}
            title={`${k.jenis === "kelas" ? k.matkul : "Dipinjam " + k.nama} ${toJam(k.mulai)} sampai ${toJam(k.selesai)}`}
            style={{
              left: `${((k.mulai - JAM_BUKA) / TOTAL) * 100}%`,
              width: `${((k.selesai - k.mulai) / TOTAL) * 100}%`,
            }}
          />
        ))}
      </div>
      <div className="bar-skala">
        {["06", "09", "12", "15", "18", "21"].map((j) => (
          <span key={j}>{j}</span>
        ))}
      </div>
    </div>
  );
}
