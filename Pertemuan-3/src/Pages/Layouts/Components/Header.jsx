import Button from "@/Pages/Layouts/Components/Button";
import { confirmLogout } from "@/Utils/Helpers/SwalHelpers"; // Import helper konfirmasi

const Header = () => {
  
  // Toggle untuk menampilkan/menyembunyikan menu profil
  const toggleProfileMenu = () => {
    const menu = document.getElementById("profileMenu");
    if (menu) menu.classList.toggle("hidden");
  };

  // Handler untuk proses Logout
  const handleLogout = () => {
    confirmLogout(() => {
      // 1. Hapus data pengguna dari penyimpanan lokal
      localStorage.removeItem("user");
      // 2. Arahkan pengguna ke halaman utama (Login)
      location.href = "/"; 
    });
  };

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">Mahasiswa</h1>
        <div className="relative">
          <Button
            onClick={toggleProfileMenu}
            // Menggunakan styling ikon placeholder atau avatar
            className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 focus:outline-none flex items-center justify-center text-white font-bold"
          >
            A
          </Button>
          <div
            id="profileMenu"
            className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 hidden z-10"
          >
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-150">Profile</a>
            
            {/* Tombol Logout yang memanggil SweetAlert2 */}
            <button 
              onClick={handleLogout} 
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition duration-150 border-t border-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;