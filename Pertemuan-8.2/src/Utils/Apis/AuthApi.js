import axios from "@/Utils/AxiosInstance"; // Asumsi AxiosInstance sudah dikonfigurasi

/**
 * Fungsi untuk melakukan proses login.
 * Mengambil data user berdasarkan email, kemudian memverifikasi password.
 * @param {string} email - Email yang dimasukkan pengguna.
 * @param {string} password - Password yang dimasukkan pengguna.
 * @returns {Promise<object>} Objek user jika login berhasil.
 * @throws {Error} Jika email tidak ditemukan atau password salah.
 */
export const login = async ( email, password ) => {
    // 1. Panggil API GET /user dengan filter email (JSON Server)
    // JSON Server secara otomatis memfilter array 'user' untuk menemukan objek dengan 'email' yang sesuai.
    const res = await axios.get("/user", { params: { email } });
    
    // Hasil dari JSON Server berupa array, ambil elemen pertama (user yang ditemukan)
    const user = res.data[0]; 

    // 2. Verifikasi Keberadaan Email
    if (!user) {
        // Jika array kosong (res.data.length === 0), berarti email tidak ada.
        throw new Error("Email tidak ditemukan");
    }
    
    // 3. Verifikasi Password (Dilakukan secara client-side karena ini adalah setup JSON Server sederhana)
    if (user.password !== password) {
        throw new Error("Password salah");
    }

    // 4. Login Berhasil: Kembalikan objek user
    return user;
};