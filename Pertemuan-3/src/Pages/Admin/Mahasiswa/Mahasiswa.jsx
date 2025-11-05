import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

// Import komponen kustom
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import Form from "@/Pages/Layouts/Components/Form"; 
import Input from "@/Pages/Layouts/Components/Input"; 
import Label from "@/Pages/Layouts/Components/Label"; 

import { mahasiswaList } from "@/Data/Dummy";

const Mahasiswa = () => {
    // State Utama Data & Navigasi
    // Diubah menjadi array kosong untuk simulasi loading dari API
    const [mahasiswa, setMahasiswa] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); // State untuk status loading
    const navigate = useNavigate();
    
    // State untuk Modal & Form Handling
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false); 
    const [form, setForm] = useState({ nim: "", nama: "" });

    // --- Data Loading Simulation ---
    const fetchMahasiswa = () => {
        // Simulasi penundaan (delay) 500ms untuk pengambilan data dari API
        setTimeout(() => {
            setMahasiswa(mahasiswaList); // Isi data dari dummy
            setIsLoading(false); // Selesai loading
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

    // --- CRUD Operations ---
    
    // 1. Create (Tambah Mahasiswa)
    const addMahasiswa = (newData) => {
        setMahasiswa([...mahasiswa, newData]);
        console.log(`Mahasiswa ${newData.nama} berhasil ditambahkan.`);
    };
    
    // 3. Update (Edit Mahasiswa)
    const updateMahasiswa = (nim, newData) => {
        const updated = mahasiswa.map((mhs) => 
            mhs.nim === nim ? {...mhs, ...newData} : mhs
        );
        setMahasiswa(updated);
        // LOG terbaru mencantumkan perubahan nama
        console.log(`Mahasiswa NIM ${nim} berhasil diupdate menjadi ${newData.nama}.`);
    };

    // 4. Delete (Hapus Mahasiswa)
    const deleteMahasiswa = (nim) => {
        const filtered = mahasiswa.filter((mhs) => mhs.nim !== nim);
        setMahasiswa(filtered);
        console.log(`Mahasiswa NIM ${nim} berhasil dihapus.`);
    }

    // --- Modal Handlers ---

    // Modal Tampilkan/Sembunyikan untuk Tambah
    const openAddModal = () => {
        setIsModalOpen(true);
        setForm({ nim: "", nama: "" }); // Reset form
        setIsEdit(false); // Mode Tambah
    }
    
    // Validasi dan Submit Form
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Validasi: NIM dan Nama harus diisi
      if (!form.nim || !form.nama) {
        console.error("NIM dan Nama wajib diisi"); 
        return;
      }
      
      // Logika Submit berdasarkan mode:
      if (isEdit) {
          // Mode Edit: Panggil updateMahasiswa dengan form lengkap
          updateMahasiswa(form.nim, form);
      } else {
          // Mode Tambah: Cek duplikasi NIM
          const exists = mahasiswa.find((m) => m.nim === form.nim);
          if (exists) {
            console.error("NIM sudah terdaftar!");
            return;
          }
          // Tambah data baru
          addMahasiswa(form);
      }

      // Bersihkan dan tutup
      setForm({ nim: "", nama: "" });
      setIsEdit(false);
      setIsModalOpen(false);
    }
    
    // --- Action Handlers untuk Tombol di Tabel ---
    
    // Handler untuk tombol 'Edit'
    const handleEdit = (mhs) => {
      // 1. Mengisi form dengan data yang akan diedit
      setForm({ nim: mhs.nim, nama: mhs.nama });
      // 2. Mengatur mode Edit
      setIsEdit(true);
      // 3. Membuka modal
      setIsModalOpen(true);
    };
    
    // Handler untuk tombol 'Hapus'
    const handleDelete = (nim) => {
        if (window.confirm("Yakin ingin hapus data ini?")) {
            deleteMahasiswa(nim);
        }
    };

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
                /* Tabel Daftar Mahasiswa (Read) */
                <table className="w-full text-sm text-gray-700">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-2 px-4 text-left">NIM</th>
                            <th className="py-2 px-4 text-left">Nama</th>
                            <th className="py-2 px-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mahasiswa.map((mhs, index) => (
                            <tr
                                key={mhs.nim}
                                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                            >
                                <td className="py-2 px-4">{mhs.nim}</td>
                                <td className="py-2 px-4">{mhs.nama}</td>
                                <td className="py-2 px-4 text-center space-x-2">
                                    <Button
                                        size="sm"
                                        onClick={() => navigate(`/admin/mahasiswa/${mhs.nim}`)}
                                    >
                                        Detail
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="warning"
                                        onClick={() => handleEdit(mhs)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => handleDelete(mhs.nim)}
                                    >
                                        Hapus
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* --- Form Modal (Tambah/Edit) --- */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300">
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">
                      {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-600 hover:text-red-600 text-2xl font-light"
                    >
                      &times;
                    </button>
                  </div>

                  <Form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                      <Label htmlFor="nim">NIM</Label>
                      <Input 
                        type="text"
                        name="nim"
                        value={form.nim}
                        onChange={handleChange}
                        readOnly={isEdit} 
                        placeholder="Masukkan NIM"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nama">Nama</Label>
                      <Input 
                        type="text"
                        name="nama"
                        value={form.nama}
                        onChange={handleChange}
                        placeholder="Masukkan Nama Lengkap"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                      <Button
                        type="button"
                        variant="secondary" 
                        onClick={() => setIsModalOpen(false)}
                      >
                        Batal
                      </Button>
                      <Button
                        type="submit"
                      >
                        Simpan
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            )}
        </Card>
    );
};

export default Mahasiswa;
