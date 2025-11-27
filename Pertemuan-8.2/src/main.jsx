// File: src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
// Import Toaster untuk global notifications (digunakan oleh ToastHelpers)
import { Toaster } from "react-hot-toast";

import './App.css';

// Import Layouts
import AuthLayout from "@/Pages/Layouts/AuthLayout";
import AdminLayout from "@/Pages/Layouts/AdminLayout";
import ProtectedRoute from "@/Pages/Layouts/Components/ProtectedRoute"; // Komponen untuk melindungi rute

// Import Komponen Halaman
import Login from "@/Pages/Auth/Login";
import Dashboard from "@/Pages/Admin/Dashboard";
import Mahasiswa from "@/Pages/Admin/Mahasiswa/Mahasiswa";
import MahasiswaDetail from "@/Pages/Admin/Mahasiswa/MahasiswaDetail";
import PageNotFound from "@/Pages/PageNotFound";

// Definisi semua rute aplikasi menggunakan createBrowserRouter
const router = createBrowserRouter([
    // --- Rute Public (Auth Layout) ---
    {
        path: "/",
        element: <AuthLayout />, // Layout untuk halaman Login
        children: [
            {
                // Rute default (index) di path "/" akan menampilkan Login
                index: true,
                element: <Login />,
            },
        ],
    },
    // --- Rute Admin (Protected Route) ---
    {
        path: "/admin",
        // Semua rute di bawah ini akan dilindungi (hanya bisa diakses jika sudah login)
        element: (
            <ProtectedRoute>
                <AdminLayout /> // Layout untuk halaman admin (Sidebar, Navbar)
            </ProtectedRoute>
        ),
        children: [
            {
                // Rute default "/admin" akan redirect ke "/admin/dashboard"
                index: true,
                element: <Navigate to="dashboard" />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "mahasiswa",
                children: [
                    {
                        // Rute "/admin/mahasiswa" akan menampilkan list Mahasiswa
                        index: true,
                        element: <Mahasiswa />,
                    },
                    {
                        // Rute Detail Mahasiswa
                        // ✅ PERUBAHAN: Menggunakan parameter dinamis ":id" 
                        // agar MahasiswaDetail.jsx dapat mengambil ID dari URL
                        path: ":id", 
                        element: <MahasiswaDetail />,
                    },
                ],
            },
        ],
    },
    // --- Rute Fallback (404) ---
    {
        // Rute Catch-all (*) menangkap semua URL yang tidak cocok
        path: "*",
        element: <PageNotFound />,
    },
]);

// Merender aplikasi ke DOM
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* Component Toaster untuk menampilkan semua notifikasi global */}
        <Toaster position="top-right" />
        {/* Mengaitkan konfigurasi rute dengan aplikasi */}
        <RouterProvider router={router} />
    </React.StrictMode>
);