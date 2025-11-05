import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    // State untuk pesan error di UI
    const [error, setError] = useState("");

    // Mengelola perubahan input (Controlled Component)
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Reset error message
        setError(""); 
        const { email, password } = form;

        if (email === dummyUser.email && password === dummyUser.password) {
            localStorage.setItem("user", JSON.stringify(dummyUser));
            navigate("/admin/dashboard");
        } else {
            // Mengganti alert() dengan state error untuk ditampilkan di UI
            setError("Email atau password salah!");
        }
    };

    return (
        <Card className="max-w-md">
            <Heading as="h2">Login</Heading>
            
            {/* Tampilkan pesan error jika state error terisi */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 shadow-sm">
                    {error}
                </div>
            )}
            
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