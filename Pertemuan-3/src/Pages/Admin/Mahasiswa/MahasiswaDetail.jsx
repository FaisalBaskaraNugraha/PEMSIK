import React from "react";
import { useParams } from "react-router-dom";

import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";

import { mahasiswaList } from "@/Data/Dummy"; 

const MahasiswaDetail = () => {
  const { nim } = useParams(); 

  const mahasiswa = mahasiswaList.find((m) => m.nim === nim);

  if (!mahasiswa) {
    return (
      <Card>
        <p className="text-xl text-center text-red-600 font-semibold p-4">
          Data mahasiswa dengan NIM {nim} tidak ditemukan.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <Heading as="h2" className="mb-4 text-left">Detail Mahasiswa</Heading>
      
      <h2 className="text-xl font-bold mb-1 text-gray-800">Nama: {mahasiswa.nama}</h2>
      <p className="text-lg text-gray-600 mb-6">Program Studi: {mahasiswa.prodi || 'Tidak Ada Data'}</p>

      <table className="table-auto text-sm w-full border-collapse">
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="py-3 px-4 font-semibold w-1/3 text-gray-700">NIM</td>
            <td className="py-3 px-4 w-2/3 text-gray-900 font-mono">{mahasiswa.nim}</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-3 px-4 font-semibold w-1/3 text-gray-700">Nama</td>
            <td className="py-3 px-4 w-2/3 text-gray-900 font-medium">{mahasiswa.nama}</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-3 px-4 font-semibold w-1/3 text-gray-700">Program Studi</td>
            <td className="py-3 px-4 w-2/3 text-gray-900 font-medium">{mahasiswa.prodi || 'N/A'}</td>
          </tr>
        </tbody>
      </table>
      
      
      <p className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded">
        Menampilkan detail mahasiswa dengan NIM: **{nim}**
      </p>
    </Card>
  );
};

export default MahasiswaDetail;