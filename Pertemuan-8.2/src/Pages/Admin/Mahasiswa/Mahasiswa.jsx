import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

// 1. Import Helpers
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";

// 2. Import Komponen Layout dan UI
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";

// 3. Import Komponen Anak
import TableMahasiswa from "./TableMahasiswa"; 
import ModalMahasiswa from "./ModalMahasiswa"; 

// 4. Import Fungsi API untuk Interaksi Backend (CRUD)
import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "@/Utils/Apis/MahasiswaApi";

const Mahasiswa = () => {
    // --- State Management ---
    const [mahasiswa, setMahasiswa] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const navigate = useNavigate(); // Untuk navigasi ke halaman detail
    
    // State Modal & Form (Local State)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false); 
    // Struktur form harus mencakup 'id' untuk operasi Update/Delete API
    const [form, setForm] = useState({ id: null, nim: "", nama: "" }); 

    // --- Data Flow: READ Operation ---
    // Fungsi untuk mengambil data mahasiswa dari API
    const fetchMahasiswa = async () => {
        setIsLoading(true);
        try {
            const res = await getAllMahasiswa(); // Panggil API GET
            setMahasiswa(res.data); // Simpan hasil ke state
            toastSuccess("Data mahasiswa berhasil dimuat.");
        } catch (error) {
            console.error("Gagal memuat data mahasiswa:", error);
            toastError("Gagal memuat data mahasiswa dari server.");
        } finally {
            setIsLoading(false);
        }
    };

    // Life Cycle: Panggil fetchMahasiswa sekali saat komponen dimuat
    useEffect(() => {
      fetchMahasiswa();
    }, []);

    // --- Form Handlers ---
    // Mengupdate nilai state 'form' saat input berubah
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Flow untuk membuka modal Tambah Data (Create)
    const openAddModal = () => {
        setIsModalOpen(true);
        setForm({ id: null, nim: "", nama: "" }); // Reset form
        setIsEdit(false); 
    }
    
    // Flow untuk membuka modal Edit Data (Update)
    const openEditModal = (mhs) => {
      // Isi form dengan data mahasiswa yang akan diedit (termasuk ID)
      setForm({ id: mhs.id, nim: mhs.nim, nama: mhs.nama }); 
      setIsEdit(true);
      setIsModalOpen(true);
    };

    // Flow untuk menghapus data (DELETE Operation)
    const handleDelete = (id) => { 
        confirmDelete(async () => { // Tampilkan konfirmasi SweetAlert
            try {
                await deleteMahasiswa(id); // Panggil API DELETE
                toastSuccess("Data berhasil dihapus!");
                fetchMahasiswa(); // Refresh data di tabel
            } catch (error) {
                const message = error.response?.data?.message || "Gagal menghapus data.";
                toastError(message);
                console.error("Gagal menghapus data:", error);
            }
        });
    };
    
    // Flow untuk navigasi ke halaman Detail
    const handleDetail = (id) => {
        navigate(`/admin/mahasiswa/${id}`); // Navigasi menggunakan ID
    }

    // --- Form Submission (CREATE & UPDATE Operations) ---
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!form.nim || !form.nama) {
        toastError("NIM dan Nama wajib diisi");
        return;
      }
      
      try {
        if (isEdit) {
          // LOGIKA UPDATE: Tampilkan konfirmasi sebelum panggil API
          confirmUpdate(async () => {
            await updateMahasiswa(form.id, form); // Panggil API UPDATE
            toastSuccess("Data berhasil diperbarui.");
            fetchMahasiswa(); // Refresh data
            setIsModalOpen(false);
            // Reset state
            setIsEdit(false); 
            setForm({ id: null, nim: "", nama: "" });
          });

        } else {
            // LOGIKA CREATE: Langsung panggil API
            await storeMahasiswa(form); // Panggil API POST/STORE
            toastSuccess(`Mahasiswa ${form.nama} berhasil ditambahkan.`); 
            fetchMahasiswa(); // Refresh data
            setIsModalOpen(false);
            setForm({ id: null, nim: "", nama: "" }); // Reset form
        }
      } catch (error) {
          // Tangani error dari API/Backend
          const message = error.response?.data?.message || "Terjadi kesalahan saat menyimpan data.";
          toastError(message);
          console.error("Gagal menyimpan data:", error);
      }
    }
    
    // --- Render Komponen UI ---
    return (
        <Card>
            {/* Header dan Tombol Tambah */}
            <div className="flex justify-between items-center mb-4">
                <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa (CRUD API)</Heading>
                <Button onClick={openAddModal} disabled={isLoading}>+ Tambah Mahasiswa</Button>
            </div>

            {/* Tampilkan Loading atau Tabel */}
            {isLoading ? (
                <div className="text-center py-8 text-lg text-blue-500 font-semibold">
                    Memuat data...
                </div>
            ) : (
                /* TableMahasiswa menerima data dan handlers aksi */
                <TableMahasiswa
                    data={mahasiswa}
                    onEdit={openEditModal} // Meneruskan objek mahasiswa
                    onDelete={handleDelete} // Meneruskan ID mahasiswa
                    onDetail={(mhs) => handleDetail(mhs.id)} // Meneruskan ID mahasiswa
                />
            )}

            {/* ModalMahasiswa menerima state, form, dan form handlers */}
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