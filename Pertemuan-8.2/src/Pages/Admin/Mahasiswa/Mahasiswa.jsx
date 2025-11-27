import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import Helper untuk Notifikasi dan Konfirmasi.
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";

// --- API Imports ---
import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "@/Utils/Apis/MahasiswaApi";
// --- END API Imports ---

// Import komponen kustom umum
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";

// Import Komponen Anak yang Baru Dibuat
import TableMahasiswa from "./TableMahasiswa";
import ModalMahasiswa from "./ModalMahasiswa";
// Hapus import { mahasiswaList } from "@/Data/Dummy";

const Mahasiswa = () => {
  // State Utama Data & Navigasi
  const [mahasiswa, setMahasiswa] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // State untuk Modal & Form Handling (Disesuaikan untuk API)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // Tambahkan 'id' untuk operasi API Update/Delete
  const [form, setForm] = useState({ id: null, nim: "", nama: "" });

  // --- Data Loading (Integrasi API) ---
  const fetchMahasiswa = async () => {
    setIsLoading(true);
    try {
      const res = await getAllMahasiswa();
      setMahasiswa(res.data);
      toastSuccess("Data Mahasiswa berhasil dimuat.");
    } catch (error) {
      toastError("Gagal memuat data Mahasiswa.");
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Panggil fetchMahasiswa saat komponen pertama kali di-mount
  useEffect(() => {
    fetchMahasiswa();
  }, []);

  // --- Form Handling ---
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- Modal Handlers ---
  const openAddModal = () => {
    setIsModalOpen(true);
    // Reset form, termasuk id
    setForm({ id: null, nim: "", nama: "" });
    setIsEdit(false);
  };

  // --- CRUD Operations (Integrasi API) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nim || !form.nama) {
      toastError("NIM dan Nama wajib diisi");
      return;
    }

    if (isEdit) {
      // --- LOGIKA UPDATE MENGGUNAKAN CONFIRMATION dan API ---
      confirmUpdate(async () => {
        try {
          // Mengirim id dan data form ke API
          await updateMahasiswa(form.id, { nim: form.nim, nama: form.nama });
          // Muat ulang data setelah sukses
          fetchMahasiswa();
          toastSuccess("Data berhasil diperbarui (via API).");
        } catch (error) {
          toastError("Gagal memperbarui data!");
          console.error("Error updating data: ", error);
        } finally {
          // Tutup modal dan reset form setelah operasi
          setForm({ id: null, nim: "", nama: "" });
          setIsEdit(false);
          setIsModalOpen(false);
        }
      });
    } else {
      // --- LOGIKA CREATE TANPA CONFIRMATION dan Menggunakan API ---
      // Cek duplikasi di front-end bisa dihilangkan jika API sudah menangani
      try {
        // Hanya kirim nim dan nama ke API
        await storeMahasiswa({ nim: form.nim, nama: form.nama });
        // Muat ulang data setelah sukses
        fetchMahasiswa();
        toastSuccess(`Mahasiswa ${form.nama} berhasil ditambahkan (via API).`);
      } catch (error) {
        toastError("Gagal menambahkan data. NIM mungkin sudah terdaftar.");
        console.error("Error storing data: ", error);
      } finally {
        // Tutup modal dan reset form setelah operasi
        setForm({ id: null, nim: "", nama: "" });
        setIsModalOpen(false);
      }
    }
  };

  // --- Action Handlers untuk Tombol di Tabel (Callback Props) ---
  // Handler Edit: Mengisi form dan membuka modal
  // Menggunakan id untuk keperluan update API (disesuaikan dengan blok penggunaan Anda)
  const handleEdit = (mhs) => {
    setForm({
      id: mhs.id, // Ambil ID untuk digunakan saat update
      nim: mhs.nim,
      nama: mhs.nama,
    });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  // Handler Hapus: Memanggil SweetAlert2 konfirmasi
  // Asumsi API delete menggunakan ID Mahasiswa (disesuaikan dengan blok penggunaan Anda)
  const handleDelete = (id) => {
    confirmDelete(async () => {
      try {
        await deleteMahasiswa(id); // Panggil API delete
        fetchMahasiswa(); // Muat ulang data
        toastSuccess("Data berhasil dihapus (via API).");
      } catch (error) {
        toastError("Gagal menghapus data!");
        console.error("Error deleting data: ", error);
      }
    });
  };

  // Handler Detail: Menggunakan useNavigate
  // Menggunakan ID sebagai parameter navigasi (disesuaikan dengan blok penggunaan Anda)
  const handleDetail = (id) => {
    navigate(`/admin/mahasiswa/${id}`);
  };

  // --- Render Component ---
  return (
    <Card>
      {/* Header dan Tombol Tambah */}
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2" className="mb-0 text-left">
          Daftar Mahasiswa (CRUD API)
        </Heading>
        <Button onClick={openAddModal} disabled={isLoading}>
          + Tambah Mahasiswa
        </Button>
      </div>
      {/* Status Loading */}
      {isLoading ? (
        <div className="text-center py-8 text-lg text-blue-500 font-semibold">
          Memuat data...
        </div>
      ) : (
        /* Integrasi TableMahasiswa: Mengirim data dan callback */
        <TableMahasiswa
          data={mahasiswa}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDetail={handleDetail}
        />
      )}
      {/* Integrasi ModalMahasiswa: Mengirim state dan form handlers */}
      <ModalMahasiswa
        isOpen={isModalOpen}
        isEdit={isEdit}
        form={form}
        onChange={handleChange}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};

export default Mahasiswa;