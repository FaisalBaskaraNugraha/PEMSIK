import React, { useState, useEffect } from "react";
// 1. Import hook untuk mengambil parameter URL (id)
import { useParams } from "react-router-dom"; 

// 2. Import fungsi API dan helper
import { getMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

// 3. Import komponen UI (sesuaikan dengan kebutuhan layout Anda)
import Card from "@/Pages/Layouts/Components/Card"; 
import Heading from "@/Pages/Layouts/Components/Heading"; 
import Button from "@/Pages/Layouts/Components/Button"; // Contoh jika ada tombol Kembali/Edit

const MahasiswaDetail = () => {
    // --- State Management & Hooks ---
    
    // Mendapatkan nilai 'id' dari parameter URL (misal: /mahasiswa/123)
    const { id } = useParams(); 
    
    // State untuk menyimpan data detail mahasiswa
    const [mahasiswa, setMahasiswa] = useState(null); 
    // State untuk mengontrol status loading data
    const [loading, setLoading] = useState(true);

    // --- Data Flow: READ Detail Operation ---

    // Fungsi asinkron untuk mengambil data detail mahasiswa berdasarkan ID
    const fetchMahasiswa = async () => {
        setLoading(true); // Mulai proses loading
        try {
            // Panggil fungsi API dengan ID yang didapat dari useParams
            const res = await getMahasiswa(id); 
            // Asumsi API mengembalikan { data: { mahasiswa } }
            setMahasiswa(res.data); 
        } catch (err) {
            // Tangani error, misal jika ID tidak ditemukan (404)
            console.error("Error fetching mahasiswa detail:", err);
            toastError("Gagal mengambil data mahasiswa.");
        } finally {
            setLoading(false); // Selesai loading, terlepas dari sukses/gagal
        }
    };
    
    // Life Cycle: Panggil fetchMahasiswa saat komponen dimuat atau 'id' berubah
    useEffect(() => {
        // Cek apakah 'id' ada sebelum melakukan fetch (pencegahan awal)
        if (id) {
            fetchMahasiswa();
        } else {
            setLoading(false);
            toastError("ID mahasiswa tidak ditemukan di URL.");
        }
    }, [id]); // Dependensi pada 'id' memastikan fetch dipicu jika parameter URL berubah

    // --- Conditional Rendering ---
    
    // Tampilkan pesan loading saat data masih diambil
    if (loading) {
        return <p className="text-center py-10 text-lg">Memuat data...</p>;
    }

    // Tampilkan pesan jika data tidak ditemukan (misal API mengembalikan null/kosong)
    if (!mahasiswa) {
        return (
            <div className="text-center py-10">
                <p className="text-xl text-red-500">Data mahasiswa tidak ditemukan</p>
                <Button onClick={() => window.history.back()} className="mt-4">Kembali</Button>
            </div>
        );
    }

    // --- Render Komponen UI Detail ---
    return (
        <Card>
            <Heading as="h2">Detail Mahasiswa: {mahasiswa.nama}</Heading>
            <hr className="my-4"/>
            
            {/* Tampilkan data yang sudah dimuat */}
            <div className="space-y-3 text-gray-700">
                <p><strong>ID:</strong> {mahasiswa.id}</p>
                <p><strong>NIM:</strong> {mahasiswa.nim}</p>
                <p><strong>Nama:</strong> {mahasiswa.nama}</p>
                {/* Tambahkan field detail lainnya di sini */}
                <p><strong>Email:</strong> {mahasiswa.email || '-'}</p>
                <p><strong>Tanggal Lahir:</strong> {mahasiswa.tanggal_lahir || '-'}</p>
            </div>

            <div className="mt-6 flex space-x-2">
                <Button variant="secondary" onClick={() => window.history.back()}>
                    Kembali
                </Button>
                {/* Anda bisa tambahkan tombol edit jika diperlukan */}
                {/* <Button variant="warning" onClick={() => navigate(`/admin/mahasiswa/edit/${mahasiswa.id}`)}>
                    Edit Data
                </Button> */}
            </div>
        </Card>
    );
};

export default MahasiswaDetail;