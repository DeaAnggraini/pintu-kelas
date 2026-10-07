import { kegiatanRuang } from "../utils/status";
import { toJam, JAM_BUKA, JAM_TUTUP } from "../utils/waktu";

const SKALA = 0.8; // piksel per menit

export default function TimelineJadwal({ tanggal, ruang, jadwal, pinjaman, tanggalHariIni, menit }) {
  const jamLabel = [];
  for (let m = JAM_BUKA; m <= JAM_TUTUP; m += 60) jamLabel.push(m);

  const tampilSekarang = tanggal === tanggalHariIni && menit >= JAM_BUKA && menit <= JAM_TUTUP;

  return (
    <div className="tl-scroll">
      <div
        className="timeline"
        style={{
          "--kolom": String(ruang.length),
          "--tinggi": `${(JAM_TUTUP - JAM_BUKA) * SKALA}px`,
          "--jam": `${60 * SKALA}px`,
        }}
      >
        <div className="tl-kepala">
          <span />
          {ruang.map((r) => (
            <span key={r.id}>{r.nama}</span>
          ))}
        </div>

        <div className="tl-badan">
          <div className="tl-sumbu">
            {jamLabel.map((m) => (
              <span key={m} style={{ top: (m - JAM_BUKA) * SKALA }}>{toJam(m)}</span>
            ))}
          </div>

          {ruang.map((r) => (
            <div className="tl-kolom" key={r.id}>
              {kegiatanRuang(r.id, tanggal, jadwal, pinjaman).map((k) => (
                <div
                  key={`${k.jenis}-${k.id}`}
                  className={`tl-blok ${k.jenis}`}
                  style={{
                    top: (k.mulai - JAM_BUKA) * SKALA,
                    height: (k.selesai - k.mulai) * SKALA - 2,
                  }}
                >
                  {k.jenis === "kelas" ? (
                    <>
                      <strong>{k.matkul}</strong>
                      <span>{toJam(k.mulai)} sampai {toJam(k.selesai)}</span>
                      <span>{k.dosen}</span>
                    </>
                  ) : (
                    <>
                      <strong>Dipinjam {k.nama}</strong>
                      <span>{toJam(k.mulai)} sampai {toJam(k.selesai)}</span>
                      <span>{k.keperluan}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}

          {tampilSekarang && (
            <div className="tl-sekarang" style={{ top: (menit - JAM_BUKA) * SKALA }} />
          )}
        </div>
      </div>
    </div>
  );
}
