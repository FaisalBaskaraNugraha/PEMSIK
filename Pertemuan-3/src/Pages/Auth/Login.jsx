import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Toast Helpers
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers"; 

import Input from "@/Pages/Layouts/Components/Input";
import Label from "@/Pages/Layouts/Components/Label";
import Button from "@/Pages/Layouts/Components/Button";
import Link from "@/Pages/Layouts/Components/Link";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Form from "@/Pages/Layouts/Components/Form";

import { dummyUser } from "@/Data/Dummy";

const Login = () => {
    const navigate = useNavigate();

    // State untuk mengontrol input form
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    // Menghapus state error karena akan diganti dengan toast

    // Mengelola perubahan input (Controlled Component)
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const { email, password } = form;

        if (email === dummyUser.email && password === dummyUser.password) {
            // 1. Tampilkan notifikasi sukses
            toastSuccess("Login berhasil. Selamat datang!");
            
            // 2. Lanjutkan proses login
            localStorage.setItem("user", JSON.stringify(dummyUser));
            
            // Memberi sedikit jeda agar toast terlihat (Opsional, tapi praktik yang baik)
            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 500);
            
        } else {
            // Tampilkan notifikasi error, tidak perlu state lokal
            toastError("Email atau password salah!");
        }
    };

    return (
        <Card className="max-w-md">
            <Heading as="h2">Login</Heading>
            
            {/* Hapus blok error di UI karena sudah diganti dengan Toast */}
            
            <Form onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={form.email} // Kontrol nilai
                        onChange={handleChange} // Update state
                        placeholder="Masukkan email"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={form.password} // Kontrol nilai
                        onChange={handleChange} // Update state
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