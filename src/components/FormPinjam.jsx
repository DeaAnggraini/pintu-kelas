import { useState } from "react";
import { cekPinjam } from "../utils/validasi";
import { kegiatanRuang } from "../utils/status";
import { toMenit, toJam, formatTanggal } from "../utils/waktu";

const KEPERLUAN = ["Kelas pengganti", "Belajar kelompok", "Rapat organisasi", "Latihan presentasi"];

// tanggalTetap  : kalau diisi, tanggal tidak bisa diubah di form
// jamAwal       : { mulai: "10:00", selesai: "12:00" } sebagai isian awal
export default function FormPinjam({
  ruang, tanggalHariIni, menit, jadwal, pinjaman,
  tanggalTetap, jamAwal, onGagal, onBerhasil,
}) {
  const [form, setForm] = useState({
    nama: "", nim: "", keperluan: "", pin: "",
    tanggal: tanggalTetap ?? tanggalHariIni,
    mulai: jamAwal?.mulai ?? "",
    selesai: jamAwal?.selesai ?? "",
  });
  const [error, setError] = useState("");

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const terpakai = kegiatanRuang(ruang.id, form.tanggal, jadwal, pinjaman);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      nama: form.nama.trim(),
      nim: form.nim.trim(),
      ruang: ruang.id,
      mulai: form.mulai ? toMenit(form.mulai) : null,
      selesai: form.selesai ? toMenit(form.selesai) : null,
    };
    const pesan = cekPinjam(data, jadwal, pinjaman, tanggalHariIni, menit);
    if (pesan) {
      setError(pesan);
      onGagal();
      return;
    }
    setError("");
    onBerhasil(data);
  };

  return (
    <form className="form" onSubmit={submit}>
      {tanggalTetap && <div className="penuh tanggal-tetap">📅 {formatTanggal(tanggalTetap)}</div>}

      <label>
        Nama
        <input name="nama" value={form.nama} onChange={ubah} placeholder="Nama lengkap" />
      </label>
      <label>
        NIM
        <input name="nim" value={form.nim} onChange={ubah} inputMode="numeric" maxLength={7} placeholder="7 angka" />
      </label>
      <label>
        Keperluan
        <select name="keperluan" value={form.keperluan} onChange={ubah}>
          <option value="">Pilih keperluan</option>
          {KEPERLUAN.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
      </label>
      {!tanggalTetap && (
        <label>
          Tanggal
          <input type="date" name="tanggal" min={tanggalHariIni} value={form.tanggal} onChange={ubah} />
        </label>
      )}
      <label>
        Jam mulai
        <input type="time" name="mulai" min="06:00" max="21:00" value={form.mulai} onChange={ubah} />
      </label>
      <label>
        Jam selesai
        <input type="time" name="selesai" min="06:00" max="21:00" value={form.selesai} onChange={ubah} />
      </label>
      <label>
        PIN kunci (buat sendiri)
        <input type="password" name="pin" value={form.pin} onChange={ubah} inputMode="numeric" maxLength={4} placeholder="4 angka" />
      </label>

      {form.tanggal && (
        <div className="penuh terpakai">
          <small>Jam terpakai di {ruang.nama}, {formatTanggal(form.tanggal)}</small>
          <div className="chips">
            {terpakai.length === 0 && <span className="chip bebas">Kosong seharian</span>}
            {terpakai.map((k) => (
              <span key={`${k.jenis}-${k.id}`} className={`chip ${k.jenis}`}>
                {toJam(k.mulai)} sampai {toJam(k.selesai)} {k.jenis === "kelas" ? k.matkul : "dipinjam"}
              </span>
            ))}
          </div>
        </div>
      )}

      {error && <div className="penuh papan-error">⚠️ {error}</div>}
      <button type="submit" className="tombol penuh">
        🗝️ Pinjam Ruang
      </button>
    </form>
  );
}
