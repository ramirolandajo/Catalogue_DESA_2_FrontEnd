import axios from "axios";

//const API_URL = `${import.meta.env.VITE_API_BASE_URL}/products`;
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Crear instancia de Axios con autenticación básica
const api = axios.create({
  baseURL: API_URL,
  //baseURL: "/api"
});

// Funciones usando la instancia
export const fetchProducts = () => api.get('/products/getAll');
export const fetchProductByCode = (code) => api.get(`/products/getProductByCode/${code}`);
export const createProduct = (product, images) => {
  const formData = new FormData();

  // 1. Agregar el JSON con el producto
  formData.append(
    "productDTO",
    new Blob([JSON.stringify(product)], { type: "application/json" })
  );

  console.log("Estas son las imagenes", images);

  // Asegurarse que images sea un array (si viene undefined -> [])
  const imgs = Array.isArray(images) ? images : [];

  // 2. Agregar todas las imágenes (si las hay)
  imgs.forEach((img) => {
    // img debe ser un File (o Blob). Si es undefined o null lo omitimos.
    if (img) {
      formData.append("images", img);
    }
  });

  // NO establecer manualmente Content-Type. Axios lo configura y añade boundary.
  return api.post("/products/create", formData);
};

// productsApi.js
export const updateProduct = (product, images) => {
  const formData = new FormData();

  // 1. Agregar el JSON con el producto
  formData.append(
    "productDTO",
    new Blob([JSON.stringify(product)], { type: "application/json" })
  );

  console.log("Estas son las imagenes", images);

  // Asegurarse que images sea un array (si viene undefined -> [])
  const imgs = Array.isArray(images) ? images : [];

  // 2. Agregar todas las imágenes (si las hay)
  imgs.forEach((img) => {
    // img debe ser un File (o Blob). Si es undefined o null lo omitimos.
    if (img) {
      formData.append("images", img);
    }
  });

  // NO establecer manualmente Content-Type. Axios lo configura y añade boundary.
  return api.patch("/products/update", formData);
};

export const updateStock = (code, stock) => api.patch(`/products/updateStock/${code}`, { newStock: stock });
export const updateUnitPrice = (code, unitPrice) => api.patch(`/products/updateUnitPrice/${code}`, { newPrice: unitPrice });
export const updateDiscount = (code, discount) => api.patch(`/products/updateDiscount/${code}`, { newDiscount: discount });
export const deleteProduct = (code) => api.delete(`/products/delete/${code}`);
export const reactivateProduct = (code) => api.patch(`/products/activate/${code}`)

export const uploadBatch = (fileCSV) => {
  const formData = new FormData();
  formData.append('file', fileCSV);
  return api.post('/products/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const fetchCategories = () => api.get('/category/getAll');
export const createCategory = (category) => api.post('/category/create', category);
export const deleteCategory = (id) => api.delete(`/category/delete/${id}`);
export const reactivateCategory = (id) => api.patch(`/category/activateByCode/${id}`)

export const fetchBrands = () => api.get('/brand/getAll');
export const createBrand = (brand) => api.post('/brand/create', brand);
export const deleteBrand = (id) => api.delete(`/brand/delete/${id}`);
export const reactivateBrand = (id) => api.patch(`/brand/activateByCode/${id}`)