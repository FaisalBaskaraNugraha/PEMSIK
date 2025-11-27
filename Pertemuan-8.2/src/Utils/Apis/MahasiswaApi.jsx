// File: src/Utils/Apis/MahasiswaApi.js

import axios from "@/Utils/AxiosInstance"; // Import instance axios yang telah dikonfigurasi

// Ambil semua mahasiswa
/**
 * Mengambil daftar semua data mahasiswa dari endpoint /mahasiswa.
 * Menggunakan metode GET.
 * @returns {Promise<Array>} Respons data mahasiswa.
 */
export const getAllMahasiswa = () => axios.get("/mahasiswa");

// Ambil detail 1 mahasiswa
/**
 * Mengambil detail satu mahasiswa berdasarkan ID-nya.
 * Menggunakan metode GET.
 * @param {number|string} id - ID mahasiswa yang dicari.
 * @returns {Promise<Object>} Respons data detail mahasiswa.
 */
export const getDetailMahasiswa = (id) => axios.get(`/mahasiswa/${id}`);

// Tambah mahasiswa
/**
 * Menyimpan (menambahkan) data mahasiswa baru.
 * Menggunakan metode POST. JSON Server akan otomatis memberikan ID baru.
 * @param {Object} data - Objek data mahasiswa ({nim, nama, dll.}).
 * @returns {Promise<Object>} Respons data mahasiswa yang baru dibuat.
 */
export const storeMahasiswa = (data) => axios.post("/mahasiswa", data);

// Update mahasiswa
/**
 * Memperbarui data mahasiswa yang sudah ada berdasarkan ID.
 * Menggunakan metode PUT untuk mengganti seluruh resource.
 * @param {number|string} id - ID mahasiswa yang akan diupdate.
 * @param {Object} data - Objek data mahasiswa yang diperbarui ({nim, nama, dll.}).
 * @returns {Promise<Object>} Respons data mahasiswa yang telah diperbarui.
 */
export const updateMahasiswa = (id, data) => axios.put(`/mahasiswa/${id}`, data);

// Hapus mahasiswa
/**
 * Menghapus data mahasiswa berdasarkan ID.
 * Menggunakan metode DELETE.
 * @param {number|string} id - ID mahasiswa yang akan dihapus.
 * @returns {Promise} Respons kosong jika penghapusan berhasil.
 */
export const deleteMahasiswa = (id) => axios.delete(`/mahasiswa/${id}`);