// File: src/Utils/Apis/AuthApi.js

import axios from "@/Utils/AxiosInstance"; // Import instance axios yang telah dikonfigurasi

/**
 * Fungsi untuk melakukan login dengan mencari user berdasarkan email.
 * Ini adalah simulasi, di mana password dikirim dalam bentuk teks biasa.
 *
 * @param {string} email - Email pengguna.
 * @param {string} password - Password pengguna.
 * @returns {Promise<Object>} - Mengembalikan objek user jika login berhasil.
 * @throws {Error} - Melemparkan error jika email tidak ditemukan atau password salah.
 */
export const login = async (email, password) => {
    try {
        // 1. Panggil endpoint /user dengan query parameter 'email'.
        // JSON Server (atau API yang mensimulasikannya) akan mencari user yang cocok.
        // Contoh request: GET /user?email=admin@mail.com
        const res = await axios.get("/user", { 
            params: { 
                email: email // Filter data di server berdasarkan email
            } 
        });
        
        // Asumsi respons dari GET adalah array, dan kita mengambil elemen pertama (jika ada)
        const user = res.data[0];

        // 2. Validasi Email: Cek apakah user ditemukan
        if (!user) {
            // Melemparkan error yang akan ditangkap di komponen Login.jsx
            throw new Error("Email tidak ditemukan");
        }

        // 3. Validasi Password: Membandingkan password yang diinput dengan password di data
        // CATATAN: Dalam produksi, ini harus diverifikasi menggunakan hashing (misalnya bcrypt).
        if (user.password !== password) {
            throw new Error("Password salah");
        }

        // 4. Login Berhasil: Mengembalikan objek user yang berhasil login
        return user; 

    } catch (error) {
        // Melemparkan error kembali ke komponen pemanggil untuk menampilkan Toast Error
        throw error; 
    }
};