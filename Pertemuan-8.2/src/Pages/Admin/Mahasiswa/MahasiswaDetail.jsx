import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Hook untuk mengambil parameter dari URL

// Import Helper untuk Notifikasi
import { toastError } from "@/Utils/Helpers/ToastHelpers";
// --- API Imports ---
import { getDetailMahasiswa } from "@/Utils/Apis/MahasiswaApi"; // API untuk mengambil data detail
// --- END API Imports ---

import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";

const MahasiswaDetail = () => {
  // 1. Mengambil parameter 'id' dari URL.
  // Nama 'id' harus sesuai dengan yang dikonfigurasi di file routing (main.jsx: path: ":id")
  const { id } = useParams();

  // State untuk menyimpan data mahasiswa yang diambil dan status loading
  const [mahasiswa, setMahasiswa] = useState(null); // Nilai awal null, bukan array
  const [isLoading, setIsLoading] = useState(true);

  // --- Fungsi Pemuatan Data Detail ---
  const fetchMahasiswaDetail = async () => {
    setIsLoading(true);
    try {
      // 2. Panggil API untuk mendapatkan detail, meneruskan ID yang diambil dari URL
      const res = await getDetailMahasiswa(id);
      setMahasiswa(res.data); // Update state mahasiswa dengan data detail
    } catch (error) {
      // Menampilkan error jika API gagal atau data tidak ditemukan
      toastError(`Gagal memuat data detail Mahasiswa dengan ID ${id}.`);
      console.error("Error fetching detail: ", error);
      setMahasiswa(null); // Set ke null untuk memicu tampilan "Data tidak ditemukan"
    } finally {
      setIsLoading(false);
    }
  };

  // Efek Samping: Dipanggil saat komponen di-mount atau ketika 'id' di URL berubah
  useEffect(() => {
    fetchMahasiswaDetail();
  }, [id]); // Dependensi [id]: Memastikan fetch data ulang jika ID berubah di URL

  // --- Render Conditional: Loading State ---
  if (isLoading) {
    return (
      <Card>
        <p className="text-xl text-center text-blue-600 font-semibold p-4">
          Memuat detail Mahasiswa...
        </p>
      </Card>
    );
  }

  // --- Render Conditional: Data Not Found ---
  // Tampil jika loading selesai TAPI data mahasiswa null (misalnya, API merespons 404)
  if (!mahasiswa) {
    return (
      <Card>
        <p className="text-xl text-center text-red-600 font-semibold p-4">
          Data mahasiswa dengan ID **{id}** tidak ditemukan.
        </p>
      </Card>
    );
  }

  // --- Render Utama: Menampilkan Detail Data ---
  return (
    <Card>
      <Heading as="h2" className="mb-4 text-left">
        Detail Mahasiswa
      </Heading>
      {/* Menampilkan Nama dan NIM */}
      <h2 className="text-xl font-bold mb-1 text-gray-800">
        Nama: {mahasiswa.nama}
      </h2>
      
      {/* Tabel detail atribut mahasiswa */}
      <table className="table-auto text-sm w-full border-collapse">
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="py-3 px-4 font-semibold w-1/3 text-gray-700">ID</td>
            <td className="py-3 px-4 w-2/3 text-gray-900 font-mono">
              {mahasiswa.id}
            </td>
          </tr>
          {/* Baris untuk NIM */}
          <tr className="border-b border-gray-200">
            <td className="py-3 px-4 font-semibold w-1/3 text-gray-700">NIM</td>
            <td className="py-3 px-4 w-2/3 text-gray-900 font-mono">
              {mahasiswa.nim}
            </td>
          </tr>
          {/* Baris untuk Nama */}
          <tr className="border-b border-gray-200">
            <td className="py-3 px-4 font-semibold w-1/3 text-gray-700">Nama</td>
            <td className="py-3 px-4 w-2/3 text-gray-900 font-medium">
              {mahasiswa.nama}
            </td>
          </tr>
          {/* Baris untuk Program Studi (jika ada) */}
          <tr className="border-b border-gray-200">
            <td className="py-3 px-4 font-semibold w-1/3 text-gray-700">
              Program Studi
            </td>
            <td className="py-3 px-4 w-2/3 text-gray-900 font-medium">
              {mahasiswa.prodi || "N/A"}
            </td>
          </tr>
        </tbody>
      </table>

      <p className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded">
        Menampilkan detail mahasiswa dengan ID: **{id}**
      </p>
    </Card>
  );
};

export default MahasiswaDetail;