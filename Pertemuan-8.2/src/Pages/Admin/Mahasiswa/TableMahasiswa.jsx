import React from 'react';
import Button from "@/Pages/Layouts/Components/Button";

// Komponen TableMahasiswa menerima data (array mahasiswa) dan 3 fungsi callback.
const TableMahasiswa = ({ data = [], onEdit, onDelete, onDetail }) => {
    return (
        <table className="w-full text-sm text-gray-700">
            <thead className="bg-blue-600 text-white">
                <tr>
                    <th className="py-2 px-4 text-left">NIM</th>
                    <th className="py-2 px-4 text-left">Nama</th>
                    <th className="py-2 px-4 text-center">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {/* Flow: Iterasi setiap objek mahasiswa dalam array 'data' */}
                {data.map((mhs, index) => (
                    <tr 
                        // Kunci (key) baris harus unik. Gunakan 'mhs.id' karena ini adalah Primary Key dari API.
                        key={mhs.id} 
                        // Memberikan warna latar belakang bergantian untuk keterbacaan
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                        <td className="py-2 px-4">{mhs.nim}</td>
                        <td className="py-2 px-4">{mhs.nama}</td>
                        <td className="py-2 px-4 text-center space-x-2">
                            
                            {/* Tombol Detail: Memanggil onDetail dengan 'id' untuk navigasi */}
                            <Button 
                                size="sm" 
                                onClick={() => onDetail(mhs.id)}
                            >
                                Detail
                            </Button>
                            
                            {/* Tombol Edit: Memanggil onEdit dengan SELURUH OBJEK 'mhs' 
                                agar komponen induk dapat mengisi form (termasuk ID) */}
                            <Button 
                                size="sm" 
                                variant="warning" 
                                onClick={() => onEdit(mhs)}
                            >
                                Edit
                            </Button>
                            
                            {/* Tombol Hapus: Memanggil onDelete dengan 'id' 
                                untuk eksekusi API penghapusan */}
                            <Button 
                                size="sm" 
                                variant="danger" 
                                onClick={() => onDelete(mhs.id)}
                            >
                                Hapus
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableMahasiswa;