// File: src/Utils/AxiosInstance.js

import axios from "axios"; // 1. Mengimpor pustaka (library) Axios

// 2. Membuat sebuah instance (salinan yang dikonfigurasi) dari Axios.
// Instance ini akan digunakan di seluruh fungsi API (AuthApi, MahasiswaApi, dll.)
const AxiosInstance = axios.create({
  
  // 3. baseURL: Menetapkan URL dasar untuk semua permintaan.
  // Setiap permintaan (misalnya axios.get("/user")) akan otomatis ditambahkan 
  // ke alamat ini (menjadi http://localhost:3001/user).
  baseURL: "http://localhost:3001", // Alamat base API (JSON Server)
  
  // 4. headers: Menetapkan header HTTP default yang akan dikirim pada setiap permintaan.
  headers: {
    // Menunjukkan bahwa data yang dikirim dalam body permintaan adalah dalam format JSON.
    "Content-Type": "application/json", 
  },
});

// 5. Mengekspor instance Axios yang sudah dikonfigurasi 
// sehingga dapat diimpor dan digunakan oleh file API lainnya.
export default AxiosInstance;