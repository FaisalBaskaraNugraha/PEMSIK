import React from 'react';
import Form from "@/Pages/Layouts/Components/Form";
import Input from "@/Pages/Layouts/Components/Input";
import Label from "@/Pages/Layouts/Components/Label";
import Button from "@/Pages/Layouts/Components/Button";

const ModalMahasiswa = ({
    // Props untuk mengontrol modal
    isOpen,
    isEdit,
    onClose,
    // Props untuk data dan aksi form
    form,
    onChange,
    onSubmit
}) => {
    // Tidak tampil jika isOpen = false
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300">
                
                {/* Header Modal */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-red-600 text-2xl font-light"
                    >
                        &times;
                    </button>
                </div>

                {/* Form Body - Menerima onSubmit dari Parent */}
                <Form onSubmit={onSubmit} className="p-6 space-y-5">
                    <div>
                        <Label htmlFor="nim">NIM</Label>
                        <Input 
                            type="text"
                            name="nim"
                            value={form.nim}
                            onChange={onChange} // Menerima perubahan dari Parent
                            readOnly={isEdit} 
                            placeholder="Masukkan NIM"
                            // Hapus 'required' di sini untuk menonaktifkan validasi native
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="nama">Nama</Label>
                        <Input 
                            type="text"
                            name="nama"
                            value={form.nama}
                            onChange={onChange} // Menerima perubahan dari Parent
                            placeholder="Masukkan Nama Lengkap"
                            // Hapus 'required' di sini untuk menonaktifkan validasi native
                            className="mt-1"
                        />
                    </div>
                    
                    {/* Footer Tombol */}
                    <div className="flex justify-end space-x-3 pt-2">
                        <Button
                            type="button"
                            variant="secondary" 
                            onClick={onClose}
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
    );
};

export default ModalMahasiswa;