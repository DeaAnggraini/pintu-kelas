import { hariList } from "../data/data";
import { toJam } from "../utils/waktu";

export default function TabelMingguan({ jadwal, ruang, hariIni }) {
  return (
    <div className="minggu">
      {hariList.map((h) => {
        const isi = jadwal.filter((j) => j.hari === h).sort((a, b) => a.mulai - b.mulai);
        return (
          <section key={h} className={`hari-blok ${h === hariIni ? "ini" : ""}`}>
            <h3>
              {h}
              {h === hariIni && <span className="badge">Hari ini</span>}
            </h3>
            <div className="tabel-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Jam</th>
                    <th>Ruang</th>
                    <th>Mata kuliah</th>
                    <th>Dosen</th>
                  </tr>
                </thead>
                <tbody>
                  {isi.map((j) => (
                    <tr key={j.id}>
                      <td>{toJam(j.mulai)} sampai {toJam(j.selesai)}</td>
                      <td>{ruang.find((r) => r.id === j.ruang)?.nama}</td>
                      <td>{j.matkul}</td>
                      <td>{j.dosen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}
