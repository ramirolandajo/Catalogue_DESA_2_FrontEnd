import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  editProduct,
  deleteProduct,
  createProduct,
  createCategory,
  deleteCategory,
  createBrand,
  deleteBrand,
  reactivateCategory,
  reactivateBrand,
  reactivateProduct,
} from "../Store/abm/abmSlice.js";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Layout/Sidebar.jsx";
import CategoryManagementModal from "../Components/Abm/CategoryManagementModal.jsx";
import BrandManagementModal from "../Components/Abm/BrandManagementModal.jsx";
import Toast from "../Components/Layout/Toast.jsx"


export default function ProductsScreen() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.abm.items);
  const categories = useSelector((state) => state.abm.categories);
  const brands = useSelector((state) => state.abm.brands);

  const [editingProduct, setEditingProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(items);
  }, [items]);

  // Handlers de productos
  const handleSave = (product) => {
    if (editingProduct) {
      dispatch(editProduct(product));
      setEditingProduct(null);
    } else {
      dispatch(createProduct(product));
    }
  };
  const handleDelete = (id) => dispatch(deleteProduct(id));
  const handleActivate = (id) => dispatch(reactivateProduct(id));

  // Filtros
  const handleFilter = useCallback(
    ({ searchText, categoryId, brandId }) => {
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
    },
    [items] // Solo se redefine si cambian los productos
  );

  // Categorías
  const handleAddCategory = (cat) => dispatch(createCategory(cat));
  const handleDeleteCategory = (id) => dispatch(deleteCategory(id));
  const handleReactivateCategory = (id) => dispatch(reactivateCategory(id))

  // Marcas
  const handleAddBrand = (name) => dispatch(createBrand(name));
  const handleDeleteBrand = (id) => dispatch(deleteBrand(id));
  const handleReactivateBrand = (id) => dispatch(reactivateBrand(id))

    console.log("los poroductos son", items);


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        onOpenCategories={() => setShowCategoryModal(true)}
        onOpenBrands={() => setIsBrandModalOpen(true)}
        setEditingProduct={setEditingProduct}
      />

      {/* Contenido dinámico */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet
          context={{
            products: filteredProducts,
            handleSave,
            handleDelete,
            editingProduct,
            setEditingProduct,
            handleFilter,
            handleActivate
          }}
        />
      </div>
      <Toast />

      {/* Modales */}
      {showCategoryModal && (
        <CategoryManagementModal
          categories={categories}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          onClose={() => setShowCategoryModal(false)}
          onActivateCategory={handleReactivateCategory}
        />
      )}
      {isBrandModalOpen && (
        <BrandManagementModal
          brands={brands}
          onAddBrand={handleAddBrand}
          onDeleteBrand={handleDeleteBrand}
          onClose={() => setIsBrandModalOpen(false)}
          onActivateBrand={handleReactivateBrand}
        />
      )}
    </div>
  );
}
