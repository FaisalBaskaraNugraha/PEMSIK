import React from 'react';
import Button from "@/Pages/Layouts/Components/Button";

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
                {/* Iterasi data yang diterima dari props */}
                {data.map((mhs, index) => (
                    <tr 
                        // Jika data dari API memiliki 'id', gunakan id sebagai key yang lebih stabil
                        key={mhs.id || mhs.nim} 
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                        <td className="py-2 px-4">{mhs.nim}</td>
                        <td className="py-2 px-4">{mhs.nama}</td>
                        <td className="py-2 px-4 text-center space-x-2">
                            <Button 
                                size="sm" 
                                // ✅ PERUBAHAN: Panggil onDetail dengan ID
                                onClick={() => onDetail(mhs.id)}
                            >
                                Detail
                            </Button>
                            <Button 
                                size="sm" 
                                variant="warning" 
                                // Tetap panggil onEdit dengan objek mahasiswa lengkap (termasuk ID)
                                onClick={() => onEdit(mhs)}
                            >
                                Edit
                            </Button>
                            <Button 
                                size="sm" 
                                variant="danger" 
                                // ✅ PERUBAHAN: Panggil onDelete dengan ID
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