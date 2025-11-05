import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

// Import Helper untuk Notifikasi dan Konfirmasi. Tambahkan confirmUpdate.
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";

// Import komponen kustom umum
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";

// Import Komponen Anak yang Baru Dibuat
import TableMahasiswa from "./TableMahasiswa"; 
import ModalMahasiswa from "./ModalMahasiswa"; 

import { mahasiswaList } from "@/Data/Dummy";

const Mahasiswa = () => {
    // State Utama Data & Navigasi
    const [mahasiswa, setMahasiswa] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const navigate = useNavigate();
    
    // State untuk Modal & Form Handling (LOCAL STATE yang akan di-prop-kan)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false); 
    const [form, setForm] = useState({ nim: "", nama: "" });

    // --- Data Loading Simulation ---
    const fetchMahasiswa = () => {
        setTimeout(() => {
            setMahasiswa(mahasiswaList); 
            setIsLoading(false); 
        }, 500);
    };

    // Panggil fetchMahasiswa saat komponen pertama kali di-mount
    useEffect(() => {
      fetchMahasiswa();
    }, []);

    // --- Form Handling ---
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // --- CRUD Operations (Diangkat ke Parent) ---
    
    const addMahasiswa = (newData) => {
        setMahasiswa([...mahasiswa, newData]);
    };
    
    const updateMahasiswa = (nim, newData) => {
        const updated = mahasiswa.map((mhs) => 
            mhs.nim === nim ? {...mhs, ...newData} : mhs
        );
        setMahasiswa(updated);
    };

    const deleteMahasiswa = (nim) => {
        const filtered = mahasiswa.filter((mhs) => mhs.nim !== nim);
        setMahasiswa(filtered);
    }

    // --- Modal Handlers ---

    const openAddModal = () => {
        setIsModalOpen(true);
        setForm({ nim: "", nama: "" }); 
        setIsEdit(false); 
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!form.nim || !form.nama) {
        toastError("NIM dan Nama wajib diisi");
        return;
      }
      
      if (isEdit) {
        // --- LOGIKA UPDATE MENGGUNAKAN CONFIRMATION ---
        confirmUpdate(() => {
          updateMahasiswa(form.nim, form);
          // Notifikasi sukses akan muncul dari SwalHelpers, tapi kita juga bisa tambahkan toast di sini
          // Namun, karena SwalHelpers sudah menampilkan "Diperbarui!", toast ini dihilangkan.
          // Jika ingin menggunakan toastSuccess("Data berhasil diperbarui");, pastikan SwalHelpers tidak double-notif.
          
          // Tutup modal dan reset form setelah update
          setForm({ nim: "", nama: "" });
          setIsEdit(false);
          setIsModalOpen(false);
        });

      } else {
          // --- LOGIKA CREATE TANPA CONFIRMATION ---
          const exists = mahasiswa.find((m) => m.nim === form.nim);
          if (exists) {
            toastError("NIM sudah terdaftar!");
            return;
          }
          addMahasiswa(form);
          toastSuccess(`Mahasiswa ${form.nama} berhasil ditambahkan.`); // Notifikasi Create
          
          // Tutup modal dan reset form setelah create
          setForm({ nim: "", nama: "" });
          setIsModalOpen(false);
      }
    }
    
    // --- Action Handlers untuk Tombol di Tabel (Callback Props) ---
    
    // Handler Edit: Mengisi form dan membuka modal
    const handleEdit = (mhs) => {
      setForm({ nim: mhs.nim, nama: mhs.nama });
      setIsEdit(true);
      setIsModalOpen(true);
    };
    
    // Handler Hapus: Memanggil SweetAlert2 konfirmasi
    const handleDelete = (nim) => {
        confirmDelete(() => {
            deleteMahasiswa(nim);
            // SwalHelpers sudah menampilkan notifikasi "Dihapus!", tidak perlu toast lagi di sini
        });
    };
    
    // Handler Detail: Menggunakan useNavigate
    const handleDetail = (nim) => {
        navigate(`/admin/mahasiswa/${nim}`);
    }


    // --- Render Component ---
    return (
        <Card>
            {/* Header dan Tombol Tambah */}
            <div className="flex justify-between items-center mb-4">
                <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa (CRUD State)</Heading>
                <Button onClick={openAddModal} disabled={isLoading}>+ Tambah Mahasiswa</Button>
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