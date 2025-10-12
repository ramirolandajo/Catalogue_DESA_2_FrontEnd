import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";

export default function CategoryManagementModal({
  categories,
  onAddCategory,
  onDeleteCategory,
  onActivateCategory,
  onClose,
}) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleAdd = () => {
    if (newCategoryName.trim() !== "" && newCategoryId.trim() !== "") {
      onAddCategory({
        categoryCode: newCategoryId.trim(),
        name: newCategoryName.trim(),
        active: true
      });
      setNewCategoryId("");
      setNewCategoryName("");
    } else {
      alert("Por favor, completa tanto el ID como el nombre de la categoría.");
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro que deseas desactivar la categoría?"
    );
    if (confirmed) {
      onDeleteCategory(id);
    }
  };

  const handleActivate = (id) => {
    const confirmed = window.confirm(
      "¿Deseas activar esta categoría?"
    );
    if (confirmed) {
      onActivateCategory(id);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/[0.75] flex justify-center items-center z-50 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className={`bg-white rounded-xl p-6 w-120 shadow-lg transform transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
      >
        <h2 className="text-lg font-bold mb-4">Gestión de Categorías</h2>

        <ul className="mb-10 max-h-120 overflow-y-auto p-2 space-y-2">
          {categories.length === 0 ? (
            <li className="text-gray-500 text-sm">No hay categorías cargadas.</li>
          ) : (
            categories.map((cat) => (
              <li
                key={cat.id}
                className={`flex justify-between items-center rounded-lg p-2 shadow-sm transition
                  ${cat.active ? "bg-gray-50 hover:bg-gray-100" : "bg-gray-100"}
                `}
              >
                <span
                  className={`font-medium ${cat.active
                      ? "text-gray-800"
                      : "text-gray-500 italic line-through"
                    }`}
                >
                  {cat.categoryCode}: {cat.name}
                </span>

                {cat.active ? (
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
                    Desactivar
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    sx={{
                      color: "green",
                      borderColor: "green",
                      fontSize: "0.8rem",
                      "&:hover": {
                        backgroundColor: "green",
                        color: "white",
                        borderColor: "green",
                      },
                    }}
                    onClick={() => handleActivate(cat.id)}
                  >
                    Activar
                  </Button>
                )}
              </li>
            ))
          )}
        </ul>

        {/* Agregar nueva categoría */}
        <div className="flex gap-2 mb-4">
          <TextField
            label="Código"
            value={newCategoryId}
            onChange={(e) => setNewCategoryId(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: "35%" }}
          />
          <TextField
            label="Nombre de categoría"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: "65%" }}
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
            sx={{
              backgroundColor: "gray",
              "&:hover": { backgroundColor: "#555555" },
            }}
            onClick={onClose}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
