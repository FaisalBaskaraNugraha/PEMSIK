// File: src/Pages/Auth/Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook untuk navigasi setelah login

// Import Toast Helpers untuk notifikasi pop-up
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers"; 

// Import fungsi login dari API yang sudah dibuat
import { login } from "@/Utils/Apis/AuthApi";

// Import komponen UI kustom
import Input from "@/Pages/Layouts/Components/Input";
import Label from "@/Pages/Layouts/Components/Label";
import Button from "@/Pages/Layouts/Components/Button";
import Link from "@/Pages/Layouts/Components/Link";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Form from "@/Pages/Layouts/Components/Form";

const Login = () => {
    const navigate = useNavigate(); // Inisialisasi navigasi

    // State untuk mengontrol input form (Controlled Component)
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    // State untuk mengelola status loading/submitting tombol (untuk UX)
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mengelola perubahan input (memperbarui state 'form')
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handler ketika formulir disubmit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Mencegah reload halaman default browser
        
        const { email, password } = form;

        // Validasi input dasar di sisi klien
        if (!email || !password) {
            toastError("Email dan Password wajib diisi.");
            return;
        }

        setIsSubmitting(true); // Aktifkan loading/disable tombol

        try {
            // Panggil fungsi login dari AuthApi.js
            const user = await login(email, password);
            
            // Simpan data user yang berhasil (dari API) ke Local Storage
            localStorage.setItem("user", JSON.stringify(user));
            
            // Tampilkan notifikasi sukses
            toastSuccess("Login berhasil. Selamat datang!");
            
            // Arahkan user ke halaman dashboard setelah jeda singkat
            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 500);

        } catch (err) {
            // Jika login gagal (email tidak ditemukan/password salah), tampilkan error dari API
            toastError(err.message || "Terjadi kesalahan saat login.");
        } finally {
            setIsSubmitting(false); // Nonaktifkan loading/enable tombol kembali
        }
    };

    return (
        <Card className="max-w-md">
            <Heading as="h2">Login</Heading>
            
            <Form onSubmit={handleSubmit}>
                {/* Bagian Input Email */}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={form.email} 
                        onChange={handleChange} // Memanggil handler perubahan input
                        placeholder="Masukkan email"
                        required
                    />
                </div>
                {/* Bagian Input Password */}
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={form.password} 
                        onChange={handleChange} // Memanggil handler perubahan input
                        placeholder="Masukkan password"
                        required
                    />
                </div>
                {/* ... Opsi dan Link Lain ... */}
                <div className="flex justify-between items-center">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-600">Ingat saya</span>
                    </label>
                    <Link href="#" className="text-sm">
                        Lupa password?
                    </Link>
                </div>
                {/* Tombol Submit */}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Memproses..." : "Login"} {/* Teks dinamis sesuai status */}
                </Button>
            </Form>
            {/* ... Teks pendaftaran ... */}
            <p className="text-sm text-center text-gray-600 mt-4">
                Belum punya akun? <Link href="#">Daftar</Link>
            </p>
        </Card>
    );
};

export default Login;