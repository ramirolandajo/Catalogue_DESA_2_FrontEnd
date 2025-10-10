import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";

export default function BrandManagementModal({
  brands,
  onAddBrand,
  onDeleteBrand,
  onActivateBrand,
  onClose,
}) {
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandId, setNewBrandId] = useState("");
  const [visible, setVisible] = useState(false);

  // Animación de aparición
  useEffect(() => {
    setVisible(true);
  }, []);

  const handleAdd = () => {
    if (newBrandName.trim() !== "" && newBrandId.trim() !== "") {
      onAddBrand({
        brandCode: newBrandId.trim(),
        name: newBrandName.trim(),
        active: true,
      });
      setNewBrandId("");
      setNewBrandName("");
    } else {
      alert("Por favor, completa tanto el código como el nombre de la marca.");
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro que deseas eliminar la marca?"
    );
    if (confirmed) {
      onDeleteBrand(id);
    }
  };

  const handleActivate = (id) => {
    const confirmed = window.confirm("¿Deseas activar esta marca?");
    if (confirmed) {
      onActivateBrand(id);
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
        <h2 className="text-lg font-bold mb-4">Gestión de Marcas</h2>

        <ul className="mb-10 max-h-120 overflow-y-auto p-2 space-y-2">
          {brands.length === 0 ? (
            <li className="text-gray-500 text-sm">No hay marcas cargadas.</li>
          ) : (
            brands.map((brand) => (
              <li
                key={brand.id}
                className={`flex justify-between items-center rounded-lg p-2 shadow-sm transition
                  ${brand.active ? "bg-gray-50 hover:bg-gray-100" : "bg-gray-100"}
                `}
              >
                <span
                  className={`font-medium ${brand.active
                      ? "text-gray-800"
                      : "text-gray-500 italic line-through"
                    }`}
                >
                  {brand.brandCode}: {brand.name}
                </span>

                {brand.active ? (
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
                    onClick={() => handleDelete(brand.id)}
                  >
                    Eliminar
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
                    onClick={() => handleActivate(brand.id)}
                  >
                    Activar
                  </Button>
                )}
              </li>
            ))
          )}
        </ul>

        {/* Agregar nueva marca */}
        <div className="flex gap-2 mb-4">
          <TextField
            label="Código"
            value={newBrandId}
            onChange={(e) => setNewBrandId(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: "35%" }}
          />
          <TextField
            label="Nombre de marca"
            value={newBrandName}
            onChange={(e) => setNewBrandName(e.target.value)}
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
