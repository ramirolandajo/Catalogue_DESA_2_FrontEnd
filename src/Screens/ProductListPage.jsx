import { useOutletContext, useNavigate } from "react-router-dom";
import ProductFilters from "../Components/Abm/ProductFilters.jsx";
import ProductList from "../Components/Abm/ProductList.jsx";

export default function ProductListPage() {
  const { products, handleFilter, handleDelete, setEditingProduct, handleActivate } = useOutletContext();
  const navigate = useNavigate();

  const handleEdit = (product) => {
    setEditingProduct(product); // Guardás el producto en el contexto
    navigate("/form");          // Te redirige al formulario
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Listado de Productos</h1>
      <ProductFilters onFilter={handleFilter} />
      <ProductList 
        products={products} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        onActivate={handleActivate}
      />
    </div>
  );
}
