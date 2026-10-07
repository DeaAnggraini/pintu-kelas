import { toJam } from "../utils/waktu";

const BADGE = {
  berlangsung: "Sedang berlangsung",
  dipinjam: "Sedang dipinjam",
  kosong: "Tersedia",
};

// Kalau onKlik ada, pintu menjadi tombol. Kalau tidak, hanya tampilan (halaman ruang).
export default function Pintu({ ruang, status, anim = "", besar = false, onKlik }) {
  const { tipe } = status;
  const kegiatan = status.kelas || status.pinj;

  const judul =
    tipe === "berlangsung"
      ? status.kelas.matkul
      : tipe === "dipinjam"
      ? `${status.pinj.nama} (${status.pinj.keperluan})`
      : "Ruang kosong";

  const info =
    tipe === "kosong"
      ? status.berikutnya
        ? `Kegiatan berikut ${toJam(status.berikutnya.mulai)}`
        : "Tidak ada kegiatan lagi hari ini"
      : `Sampai ${toJam(kegiatan.selesai)}`;

  const Tag = onKlik ? "button" : "div";
  const props = onKlik ? { type: "button", onClick: onKlik } : {};

  return (
    <Tag className={`pintu ${tipe} ${anim} ${besar ? "besar" : ""}`} {...props}>
      <span className="lampu" />
      <span className="kusen">
        <span className="daun">
          <span className="plat">{ruang.id}</span>
          <span className="panel atas" />
          <span className="panel bawah" />
          <span className="gagang" />
          {tipe === "kosong" && <span className="papan">TERSEDIA</span>}
          {tipe !== "kosong" && <span className="lubang" />}
          {tipe !== "kosong" && (
            <span className="gembok">{anim === "terbuka" ? "🔓" : "🔒"}</span>
          )}
          {tipe === "dipinjam" && <span className="rantai" />}
        </span>
      </span>
      <span className="keterangan">
        <strong>{ruang.nama}</strong>
        <span className="badge">{BADGE[tipe]}</span>
        <span className="judul">{judul}</span>
        <span className="info">{info}</span>
      </span>
    </Tag>
  );
}
