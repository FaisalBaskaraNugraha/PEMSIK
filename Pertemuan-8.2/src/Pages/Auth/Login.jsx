import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 1. Import fungsi login dari AuthApi
import { login } from "@/Utils/Apis/AuthApi";
// 2. Import Toast Helpers
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers"; 

// 3. Import Komponen UI
import Input from "@/Pages/Layouts/Components/Input";
import Label from "@/Pages/Layouts/Components/Label";
import Button from "@/Pages/Layouts/Components/Button";
import Link from "@/Pages/Layouts/Components/Link";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Form from "@/Pages/Layouts/Components/Form";

// Hapus import { dummyUser } dari "@/Data/Dummy"; karena tidak digunakan lagi

const Login = () => {
    const navigate = useNavigate();

    // State untuk mengontrol input form
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    // Mengelola perubahan input (Controlled Component)
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // --- Flow: Form Submission (API Login) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { email, password } = form;

        // Cek validasi dasar (jika diperlukan)
        if (!email || !password) {
            toastError("Email dan Password wajib diisi.");
            return;
        }

        try {
            // Panggil fungsi API login. Fungsi ini akan melempar error jika gagal.
            const user = await login(email, password); 
            
            // LOGIKA LOGIN BERHASIL:
            
            // 1. Simpan objek user ke Local Storage (untuk menjaga state login)
            localStorage.setItem("user", JSON.stringify(user));
            
            // 2. Tampilkan notifikasi sukses (menggunakan data user jika perlu)
            toastSuccess(`Login berhasil. Selamat datang, ${user.name}!`);
            
            // 3. Navigasi ke halaman dashboard
            // Tidak perlu setTimeout karena API call sudah memakan waktu
            navigate("/admin/dashboard");

        } catch (err) {
            // LOGIKA LOGIN GAGAL:
            // Tangkap error yang dilempar oleh fungsi login (misal: "Email tidak ditemukan" atau "Password salah")
            console.error("Login Gagal:", err);
            // Tampilkan pesan error kepada pengguna
            toastError(err.message || "Terjadi kesalahan saat menghubungi server."); 
        }
    };

    // --- Render Komponen UI ---
    return (
        <Card className="max-w-md">
            <Heading as="h2">Login</Heading>
            
            <Form onSubmit={handleSubmit}>
                {/* Field Email */}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Masukkan email"
                        required
                    />
                </div>
                {/* Field Password */}
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Masukkan password"
                        required
                    />
                </div>
                <div className="flex justify-between items-center">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-600">Ingat saya</span>
                    </label>
                    <Link href="#" className="text-sm">
                        Lupa password?
                    </Link>
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </Form>
            <p className="text-sm text-center text-gray-600 mt-4">
                Belum punya akun? <Link href="#">Daftar</Link>
            </p>
        </Card>
    );
};

export default Login;