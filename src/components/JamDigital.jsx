import { formatTanggal, tanggalLokal } from "../utils/waktu";

const dua = (n) => String(n).padStart(2, "0");

export default function JamDigital({ now, demo }) {
  const jam = `${dua(now.getHours())}:${dua(now.getMinutes())}:${dua(now.getSeconds())}`;
  return (
    <div className="jam">
      <div className="angka">{jam}</div>
      <div className="tgl">{formatTanggal(tanggalLokal(now))}</div>
      {demo && <span className="demo">MODE DEMO</span>}
    </div>
  );
}
