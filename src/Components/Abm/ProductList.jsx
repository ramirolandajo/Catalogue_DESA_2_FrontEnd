import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"; // ícono de "activar"

export default function ProductList({ products, onEdit, onDelete, onActivate }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Listado de Productos</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 rounded-xl shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border-r border-gray-300 rounded-tl-xl">ID</th>
              <th className="p-3 border-r border-gray-300">Preview</th>
              <th className="p-3 border-r border-gray-300">Nombre</th>
              <th className="p-3 border-r border-gray-300">Precio</th>
              <th className="p-3 border-r border-gray-300">Stock</th>
              <th className="p-3 rounded-tr-xl">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No hay productos cargados.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr
                  key={p.id}
                  className={`hover:bg-gray-50 transition-colors duration-150 ${
                    !p.active ? "text-gray-400 italic" : ""
                  }`}
                >
                  <td className="p-3 border-r border-gray-300">{p.productCode}</td>
                  <td className="p-3 border-r border-gray-300">
                    {p.images && p.images.length > 0 ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className={`w-14 h-14 object-cover rounded-lg shadow-sm ${
                          !p.active ? "opacity-50" : ""
                        }`}
                      />
                    ) : (
                      <span className="text-gray-400 italic">Sin imagen</span>
                    )}
                  </td>
                  <td className="p-3 border-r border-gray-300">{p.name}</td>
                  <td className="p-3 border-r border-gray-300">${p.unitPrice}</td>
                  <td className="p-3 border-r border-gray-300">{p.stock}</td>
                  <td className="p-3">
                    <div className="flex gap-2 items-center">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#2563EB",
                          fontStyle: "normal",
                          "&:hover": { backgroundColor: "#1D4ED8" },
                        }}
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => onEdit(p)}
                      >
                        Editar
                      </Button>

                      {p.active ? (
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => onDelete(p.productCode)}
                        >
                          Eliminar
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#429B46",
                            fontStyle: "normal",
                            "&:hover": { backgroundColor: "#1A8828" },
                          }}
                          size="small"
                          startIcon={<PowerSettingsNewIcon />}
                          onClick={() => onActivate(p.productCode)}
                        >
                          Activar
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
