import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  editProduct,
  deleteProduct,
  createProduct,
  createCategory,
  deleteCategory,
  createBrand,
  deleteBrand
} from "../Store/abm/abmSlice.js";
import ProductForm from "../Components/Abm/ProductForm.jsx";
import ProductList from "../Components/Abm/ProductList.jsx";
import ProductFilters from "../Components/Abm/ProductFilters.jsx";
import CategoryManagementModal from "../Components/Abm/CategoryManagementModal.jsx";
import BrandManagementModal from "../Components/Abm/BrandManagementModal.jsx";
import { Button } from "@mui/material";

export default function ProductsScreen() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.abm.items);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const categories = useSelector((state) => state.abm.categories);
  const brands = useSelector((state) => state.abm.brands)
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Actualizamos filteredProducts cada vez que cambian los items
  useEffect(() => {
    setFilteredProducts(items);
  }, [items]);

  const handleSave = (product) => {
    if (editingProduct) {
      dispatch(editProduct(product));
      setEditingProduct(null);
    } else {
      dispatch(createProduct(product));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  }

  // Función que recibe filtros desde ProductFilters
  const handleFilter = ({ searchText, categoryId, brandId }) => {
    let filtered = items;

    if (searchText) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (categoryId) {
      filtered = filtered.filter((p) =>
        p.categories.some((cat) => cat.id === categoryId)
      );
    }

    if (brandId) {
      filtered = filtered.filter((p) => p.brand.id === brandId);
    }

    setFilteredProducts(filtered);
  };

  const handleAddCategory = (name) => {
    dispatch(createCategory(name))
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id))
  };

  const handleAddBrand = (newBrandName) => {
    console.log("Agregar marca:", newBrandName);
    dispatch(createBrand(newBrandName));
  };

  const handleDeleteBrand = (brandId) => {
    console.log("Eliminar marca:", brandId);
    dispatch(deleteBrand(brandId))
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestión de Productos</h1>

      <ProductForm
        onSave={handleSave}
        editingProduct={editingProduct}
        onCancel={() => setEditingProduct(null)}
      />
      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => setShowCategoryModal(true)}
          variant="contained"
          sx={{
            backgroundColor: '#2563EB', // azul similar a bg-blue-600
            '&:hover': { backgroundColor: '#1D4ED8' }, // azul más oscuro para hover
            color: 'white',
          }}
        >
          Gestionar Categorías
        </Button>

        <Button
          onClick={() => setIsBrandModalOpen(true)}
          variant="contained"
          sx={{
            backgroundColor: '#7C3AED', // morado similar a bg-purple-600
            '&:hover': { backgroundColor: '#6D28D9' }, // morado más oscuro para hover
            color: 'white',
          }}
        >
          Gestionar Marcas
        </Button>

      </div>


      {/* Pasamos la función handleFilter */}
      <ProductFilters onFilter={handleFilter} />

      <ProductList
        products={filteredProducts}
        onEdit={setEditingProduct}
        onDelete={handleDelete}
      />


      {showCategoryModal && (
        <CategoryManagementModal
          categories={categories}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          onClose={() => setShowCategoryModal(false)}
        />
      )}

      {isBrandModalOpen && (
        <BrandManagementModal
          brands={brands}
          onAddBrand={handleAddBrand}
          onDeleteBrand={handleDeleteBrand}
          onClose={() => setIsBrandModalOpen(false)}
        />
      )}

    </div>
  );
}

