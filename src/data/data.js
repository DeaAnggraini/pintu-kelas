// Waktu disimpan dalam menit sejak 00.00
// 480 = 08.00 | 540 = 09.00 | 600 = 10.00 | 660 = 11.00 | 720 = 12.00
// 780 = 13.00 | 900 = 15.00 | 1020 = 17.00

export const ruang = [
  { id: "R101", nama: "Ruang 101" },
  { id: "R102", nama: "Ruang 102" },
  { id: "R103", nama: "Ruang 103" },
  { id: "R104", nama: "Ruang 104" },
];

export const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

// Daftar mahasiswa dummy (NIM 7 angka)
const mhs = {
  "2023001": "Andi",
  "2023002": "Budi",
  "2023003": "Citra",
  "2023004": "Dina",
  "2023005": "Eko",
  "2023006": "Fitri",
  "2023007": "Gilang",
  "2023008": "Hana",
  "2023009": "Indra",
  "2023010": "Jihan",
  "2023011": "Kevin",
  "2023012": "Lia",
  "2023013": "Mira",
  "2023014": "Naufal",
  "2023015": "Putri",
};

// Ambil beberapa mahasiswa berdasarkan NIM menjadi objek { nim: nama }
const ambil = (...nim) => Object.fromEntries(nim.map((n) => [n, mhs[n]]));

export const jadwal = [
  // ===== SENIN =====
  {
    id: 1, ruang: "R101", hari: "Senin", mulai: 480, selesai: 600,
    matkul: "Pengembangan Web Modern", dosen: "Dosen A", pin: "4821",
    mahasiswa: ambil("2023001", "2023002", "2023003", "2023004", "2023005"),
  },
  {
    id: 2, ruang: "R102", hari: "Senin", mulai: 540, selesai: 660,
    matkul: "Basis Data", dosen: "Dosen B", pin: "7305",
    mahasiswa: ambil("2023006", "2023007", "2023008", "2023009", "2023010"),
  },
  {
    id: 3, ruang: "R103", hari: "Senin", mulai: 780, selesai: 900,
    matkul: "Jaringan Komputer", dosen: "Dosen C", pin: "1936",
    mahasiswa: ambil("2023001", "2023003", "2023005", "2023011", "2023012"),
  },
  {
    id: 4, ruang: "R104", hari: "Senin", mulai: 600, selesai: 720,
    matkul: "Struktur Data", dosen: "Dosen D", pin: "5518",
    mahasiswa: ambil("2023002", "2023004", "2023013", "2023014", "2023015"),
  },

  // ===== SELASA =====
  {
    id: 5, ruang: "R101", hari: "Selasa", mulai: 480, selesai: 630,
    matkul: "Pemrograman Berorientasi Objek", dosen: "Dosen E", pin: "2647",
    mahasiswa: ambil("2023001", "2023002", "2023006", "2023007", "2023008"),
  },
  {
    id: 6, ruang: "R102", hari: "Selasa", mulai: 780, selesai: 900,
    matkul: "Pemodelan dan Simulasi", dosen: "Dosen F", pin: "8190",
    mahasiswa: ambil("2023003", "2023004", "2023009", "2023010", "2023011"),
  },
  {
    id: 7, ruang: "R103", hari: "Selasa", mulai: 540, selesai: 660,
    matkul: "Sistem Operasi", dosen: "Dosen G", pin: "3372",
    mahasiswa: ambil("2023005", "2023012", "2023013", "2023014", "2023015"),
  },
  {
    id: 8, ruang: "R104", hari: "Selasa", mulai: 900, selesai: 1020,
    matkul: "Interaksi Manusia dan Komputer", dosen: "Dosen H", pin: "6043",
    mahasiswa: ambil("2023001", "2023006", "2023008", "2023010", "2023015"),
  },

  // ===== RABU =====
  {
    id: 9, ruang: "R101", hari: "Rabu", mulai: 600, selesai: 720,
    matkul: "Metode Penelitian", dosen: "Dosen I", pin: "9154",
    mahasiswa: ambil("2023002", "2023003", "2023007", "2023011", "2023013"),
  },
  {
    id: 10, ruang: "R102", hari: "Rabu", mulai: 480, selesai: 600,
    matkul: "Kecerdasan Buatan", dosen: "Dosen J", pin: "3081",
    mahasiswa: ambil("2023004", "2023005", "2023009", "2023012", "2023014"),
  },
  {
    id: 11, ruang: "R103", hari: "Rabu", mulai: 780, selesai: 930,
    matkul: "Internet of Things", dosen: "Dosen K", pin: "7726",
    mahasiswa: ambil("2023001", "2023006", "2023010", "2023013", "2023015"),
  },
  {
    id: 12, ruang: "R104", hari: "Rabu", mulai: 540, selesai: 660,
    matkul: "Rekayasa Perangkat Lunak", dosen: "Dosen L", pin: "4469",
    mahasiswa: ambil("2023002", "2023007", "2023008", "2023011", "2023014"),
  },

  // ===== KAMIS =====
  {
    id: 13, ruang: "R101", hari: "Kamis", mulai: 780, selesai: 900,
    matkul: "Pengembangan Web Modern (Praktik)", dosen: "Dosen A", pin: "1258",
    mahasiswa: ambil("2023001", "2023002", "2023003", "2023004", "2023005"),
  },
  {
    id: 14, ruang: "R102", hari: "Kamis", mulai: 600, selesai: 720,
    matkul: "Analisis Algoritma", dosen: "Dosen M", pin: "5937",
    mahasiswa: ambil("2023006", "2023009", "2023012", "2023014", "2023015"),
  },
  {
    id: 15, ruang: "R103", hari: "Kamis", mulai: 480, selesai: 600,
    matkul: "Basis Data (Praktik)", dosen: "Dosen B", pin: "8402",
    mahasiswa: ambil("2023006", "2023007", "2023008", "2023009", "2023010"),
  },
  {
    id: 16, ruang: "R104", hari: "Kamis", mulai: 900, selesai: 1020,
    matkul: "Pemrograman Mobile", dosen: "Dosen N", pin: "2815",
    mahasiswa: ambil("2023003", "2023011", "2023012", "2023013", "2023005"),
  },

  // ===== JUMAT =====
  {
    id: 17, ruang: "R101", hari: "Jumat", mulai: 480, selesai: 570,
    matkul: "Etika Profesi", dosen: "Dosen O", pin: "6671",
    mahasiswa: ambil("2023001", "2023004", "2023008", "2023011", "2023014"),
  },
  {
    id: 18, ruang: "R102", hari: "Jumat", mulai: 780, selesai: 900,
    matkul: "Data Mining", dosen: "Dosen P", pin: "3944",
    mahasiswa: ambil("2023002", "2023005", "2023007", "2023010", "2023013"),
  },
  {
    id: 19, ruang: "R103", hari: "Jumat", mulai: 600, selesai: 720,
    matkul: "Jaringan Komputer (Praktik)", dosen: "Dosen C", pin: "7083",
    mahasiswa: ambil("2023001", "2023003", "2023005", "2023011", "2023012"),
  },
  {
    id: 20, ruang: "R104", hari: "Jumat", mulai: 480, selesai: 600,
    matkul: "Statistika", dosen: "Dosen Q", pin: "1590",
    mahasiswa: ambil("2023006", "2023009", "2023010", "2023014", "2023015"),
  },
];
