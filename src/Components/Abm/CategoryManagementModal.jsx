import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";

export default function CategoryManagementModal({
  categories,
  onAddCategory,
  onDeleteCategory,
  onClose,
}) {
  const [newCategory, setNewCategory] = useState("");
  const [visible, setVisible] = useState(false);

  // Activar animación al montar
  useEffect(() => {
    setVisible(true);
  }, []);

  const handleAdd = () => {
    if (newCategory.trim() !== "") {
      onAddCategory(newCategory.trim());
      setNewCategory("");
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro que desea eliminar la categoría?"
    );
    if (confirmed) {
      onDeleteCategory(id);
    }
  };

  // Filtrar solo categorías activas
  const activeCategories = categories.filter((cat) => cat.active);

  return (
    <div
      className="fixed inset-0 bg-black/[0.75] flex justify-center items-center z-50 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className={`bg-white rounded-xl p-6 w-120 shadow-lg transform transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h2 className="text-lg font-bold mb-4">Gestión de Categorías</h2>

        <ul className="mb-10 max-h-120 overflow-y-auto p-2 space-y-2">
          {activeCategories.length === 0 ? (
            <li className="text-gray-500 text-sm">No hay categorías cargadas.</li>
          ) : (
            activeCategories.map((cat) => (
              <li
                key={cat.id}
                className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-lg p-2 shadow-sm transition"
              >
                <span className="font-medium text-gray-800">{cat.name}</span>
                <Button
                  variant="outlined"
                  sx={{
                    color: "darkred",
                    borderColor: "darkred",
                    fontSize: "0.8rem",
                    "&:hover": {
                      backgroundColor: "darkred",
                      color: "white",
                      borderColor: "darkred",
                    },
                  }}
                  onClick={() => handleDelete(cat.id)}
                >
                  Eliminar
                </Button>
              </li>
            ))
          )}
        </ul>

        {/* Agregar nueva categoría */}
        <div className="flex gap-2 mb-4">
          <TextField
            label="Nueva categoría"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "green",
              color: "white",
              "&:hover": { backgroundColor: "darkgreen" },
            }}
            onClick={handleAdd}
          >
            Agregar
          </Button>
        </div>

        {/* Cerrar */}
        <div className="flex justify-end">
          <Button
            variant="contained"
            sx={{ backgroundColor: "gray", "&:hover": { backgroundColor: "#555555" } }}
            onClick={onClose}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
