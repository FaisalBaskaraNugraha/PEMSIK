import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

// Import komponen kustom umum
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
// Hapus import Form, Input, Label karena sudah dipindahkan ke ModalMahasiswa

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
            console.log("Data mahasiswa berhasil dimuat.");
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
        console.log(`Mahasiswa ${newData.nama} berhasil ditambahkan.`);
    };
    
    const updateMahasiswa = (nim, newData) => {
        const updated = mahasiswa.map((mhs) => 
            mhs.nim === nim ? {...mhs, ...newData} : mhs
        );
        setMahasiswa(updated);
        console.log(`Mahasiswa NIM ${nim} berhasil diupdate menjadi ${newData.nama}.`);
    };

    const deleteMahasiswa = (nim) => {
        const filtered = mahasiswa.filter((mhs) => mhs.nim !== nim);
        setMahasiswa(filtered);
        console.log(`Mahasiswa NIM ${nim} berhasil dihapus.`);
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
        console.error("NIM dan Nama wajib diisi"); 
        return;
      }
      
      if (isEdit) {
          updateMahasiswa(form.nim, form);
      } else {
          const exists = mahasiswa.find((m) => m.nim === form.nim);
          if (exists) {
            console.error("NIM sudah terdaftar!");
            return;
          }
          addMahasiswa(form);
      }

      setForm({ nim: "", nama: "" });
      setIsEdit(false);
      setIsModalOpen(false);
    }
    
    // --- Action Handlers untuk Tombol di Tabel (Callback Props) ---
    
    // Handler Edit: Mengisi form dan membuka modal
    const handleEdit = (mhs) => {
      setForm({ nim: mhs.nim, nama: mhs.nama });
      setIsEdit(true);
      setIsModalOpen(true);
    };
    
    // Handler Hapus: Memanggil fungsi deleteMahasiswa
    const handleDelete = (nim) => {
        if (window.confirm("Yakin ingin hapus data ini?")) {
            deleteMahasiswa(nim);
        }
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
                  data={mahasiswa} // Data turun (One-Way Data Flow)
                  onEdit={handleEdit} // Callback naik (Aksi pengguna di tabel dikirim ke parent)
                  onDelete={handleDelete} // Callback naik
                  onDetail={handleDetail} // Callback naik
                />
            )}

            {/* Integrasi ModalMahasiswa: Mengirim state dan form handlers */}
            <ModalMahasiswa
              isOpen={isModalOpen}
              isEdit={isEdit}
              form={form} // Data form (value) turun
              onChange={handleChange} // Fungsi perubahan (event) naik
              onClose={() => setIsModalOpen(false)} // Fungsi tutup modal naik
              onSubmit={handleSubmit} // Fungsi submit form naik
            />
        </Card>
    );
};

export default Mahasiswa;
