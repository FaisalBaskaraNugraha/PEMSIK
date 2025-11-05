import { toast } from "react-hot-toast";

/**
 * Menampilkan notifikasi sukses.
 * @param {string} message Pesan yang akan ditampilkan.
 */
export const toastSuccess = (message) => toast.success(message);

/**
 * Menampilkan notifikasi error.
 * @param {string} message Pesan yang akan ditampilkan.
 */
export const toastError = (message) => toast.error(message);

/**
 * Menampilkan notifikasi informasi (default).
 * @param {string} message Pesan yang akan ditampilkan.
 */
export const toastInfo = (message) => toast(message);