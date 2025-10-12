import { Link, useNavigate, useLocation, useOutletContext } from "react-router-dom";

export default function Sidebar({ onOpenCategories, onOpenBrands, setEditingProduct }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleCreateProduct = () => {
        setEditingProduct(null);
        navigate("/form");
    };

    // función auxiliar para marcar la sección activa
    const isActive = (path) => location.pathname === path;

    return (
        <div className="w-64 bg-white text-gray-800 flex flex-col p-4 space-y-2 shadow-lg">
            <h2 className="text-xl font-bold mb-6">Productos</h2>

            <Link
                to="/list"
                className={`px-4 py-2 rounded-md cursor-pointer ${
                    isActive("/list") ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
                }`}
            >
                📦 Listado de productos
            </Link>

            <div
                onClick={handleCreateProduct}
                className={`px-4 py-2 rounded-md cursor-pointer ${
                    isActive("/form") ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
                }`}
            >
                ✏️ Crear producto
            </div>

            <div
                onClick={onOpenCategories}
                className="px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200"
            >
                🏷 Gestionar Categorías
            </div>

            <div
                onClick={onOpenBrands}
                className="px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200"
            >
                🏭 Gestionar Marcas
            </div>
        </div>
    );
}
