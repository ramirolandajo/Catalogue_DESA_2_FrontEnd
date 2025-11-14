import { createSlice } from "@reduxjs/toolkit";
import { createProduct, editProduct, createBrand, createCategory, uploadFile } from "../abm/abmSlice";

const toastSlice = createSlice({
    name: "toast",
    initialState: {
        type: null,     // 'success' | 'error'
        message: "",    // mensaje del toast
    },
    reducers: {
        setToast: (state, action) => {
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
        clearToast: (state) => {
            state.type = null;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ Creación de producto
            .addCase(createProduct.fulfilled, (state, action) => {
                state.type = "success";
                state.message = "Producto creado exitosamente.";
                ("Estado modificado!")
                
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.type = "error";
                state.message = "Error al crear el producto.";
            })

            // ✅ Edición de producto
            .addCase(editProduct.fulfilled, (state, action) => {
                state.type = "success";
                state.message = "Producto actualizado exitosamente.";
                ("Estado modificado!")
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.type = "error";
                state.message = "Error al actualizar el producto.";
            })

            // ✅ Creación de categoría
            .addCase(createCategory.fulfilled, (state, action) => {
                state.type = "success";
                state.message = "Categoría creada exitosamente.";
                ("Estado modificado!")
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.type = "error";
                state.message = "Error al crear la categoría.";
            })

            // ✅ Creación de marca
            .addCase(createBrand.fulfilled, (state, action) => {
                state.type = "success";
                state.message = "Marca creada exitosamente.";
                ("Estado modificado!")
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.type = "error";
                state.message = "Error al crear la marca.";
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.type = "success";
                state.message = "Productos cargados exitosamente."
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.type = "error";
                state.message = "Error al cargar productos."
            })
    },
});

export const { setToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
