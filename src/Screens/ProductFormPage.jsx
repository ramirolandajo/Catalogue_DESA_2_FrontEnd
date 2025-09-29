import { useOutletContext } from "react-router-dom";
import ProductForm from "../Components/Abm/ProductForm.jsx";

export default function ProductFormPage() {
  const { handleSave, editingProduct, setEditingProduct } = useOutletContext();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Crear / Editar Producto</h1>
      <ProductForm
        onSave={handleSave}
        editingProduct={editingProduct}
        onCancel={() => setEditingProduct(null)}
      />
    </div>
  );
}
