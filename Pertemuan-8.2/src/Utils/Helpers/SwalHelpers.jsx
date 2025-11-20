import Swal from "sweetalert2";

/**
 * Menampilkan konfirmasi untuk Logout.
 * @param {function} onConfirm Fungsi yang akan dipanggil jika pengguna mengkonfirmasi logout.
 */
export const confirmLogout = (onConfirm) => {
  Swal.fire({
    title: "Yakin ingin logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, logout",
    cancelButtonText: "Batal",
    customClass: {
        confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
    },
    buttonsStyling: false
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire({
        title: "Logout berhasil", 
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
};

/**
 * Menampilkan konfirmasi untuk Delete (Hapus Data).
 * @param {function} onConfirm Fungsi yang akan dipanggil jika pengguna mengkonfirmasi penghapusan.
 */
export const confirmDelete = (onConfirm) => {
  Swal.fire({
    title: "Yakin ingin menghapus data ini?",
    text: "Tindakan ini tidak dapat dibatalkan.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus",
    cancelButtonText: "Batal",
    customClass: {
        confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
    },
    buttonsStyling: false
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire({
        title: "Dihapus!", 
        text: "Data berhasil dihapus.", 
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
};

/**
 * Menampilkan konfirmasi untuk Update (Perbarui Data).
 * @param {function} onConfirm Fungsi yang akan dipanggil jika pengguna mengkonfirmasi pembaruan.
 */
export const confirmUpdate = (onConfirm) => {
  Swal.fire({
    title: "Yakin ingin memperbarui data ini?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya, perbarui",
    cancelButtonText: "Batal",
    customClass: {
        confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
    },
    buttonsStyling: false
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire({
        title: "Diperbarui!", 
        text: "Data berhasil diperbarui.", 
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
};