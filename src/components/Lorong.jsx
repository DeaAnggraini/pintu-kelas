import Pintu from "./Pintu";

export default function Lorong({ ruang, statusRuang, aksi, onPilih }) {
  return (
    <div className="lorong">
      {ruang.map((r) => (
        <Pintu
          key={r.id}
          ruang={r}
          status={statusRuang(r.id)}
          anim={aksi?.id === r.id ? aksi.jenis : ""}
          onKlik={() => onPilih(r.id)}
        />
      ))}
    </div>
  );
}