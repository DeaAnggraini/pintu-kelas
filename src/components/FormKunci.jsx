import { useState } from "react";

// Form umum berbentuk lubang kunci (NIM + PIN)
export default function FormKunci({ petunjuk, tombol, validasi, onGagal, onBerhasil }) {
  const [nim, setNim] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const pesan = validasi(nim.trim(), pin);
    if (pesan) {
      setError(pesan);
      onGagal();
      return;
    }
    setError("");
    onBerhasil(nim.trim());
  };

  return (
    <form className="form" onSubmit={submit}>
      <p className="penuh petunjuk">{petunjuk}</p>
      <label>
        NIM
        <input
          value={nim}
          onChange={(e) => setNim(e.target.value)}
          inputMode="numeric"
          maxLength={7}
          placeholder="Contoh 2023001"
        />
      </label>
      <label>
        PIN
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          inputMode="numeric"
          maxLength={4}
          placeholder="4 angka"
        />
      </label>
      {error && <div className="penuh papan-error">⚠️ {error}</div>}
      <button type="submit" className="tombol penuh">
        🗝️ {tombol}
      </button>
    </form>
  );
}
