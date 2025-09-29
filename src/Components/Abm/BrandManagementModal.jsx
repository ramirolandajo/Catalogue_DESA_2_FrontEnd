import { useState } from "react";
import { Button, TextField } from "@mui/material";

export default function BrandManagementModal({
    brands,
    onAddBrand,
    onDeleteBrand,
    onClose,
}) {
    const [newBrand, setNewBrand] = useState("");

    const handleAdd = () => {
        if (newBrand.trim() !== "") {
            onAddBrand(newBrand.trim());
            setNewBrand("");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/[0.75] flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-120 shadow-lg">
                <h2 className="text-lg font-bold mb-4">Gestión de Marcas</h2>

                <ul className="mb-10 max-h-120 overflow-y-auto p-2 space-y-2">
                    {brands.length === 0 ? (
                        <li className="text-gray-500 text-sm">No hay marcas cargadas.</li>
                    ) : (
                        brands.map((brand) => (
                            <li
                                key={brand.id}
                                className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-lg p-2 shadow-sm transition"
                            >
                                <span
                                    className={`font-medium ${!brand.active ? "italic text-gray-500 line-through" : "text-gray-800"
                                        }`}
                                >
                                    {brand.name}
                                </span>
                                {brand.active && (
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            color: 'darkred',
                                            borderColor: 'darkred',
                                            fontSize: '0.8rem',
                                            '&:hover': { backgroundColor: 'darkred', color: 'white', borderColor: 'darkred' },
                                        }}
                                        onClick={() => onDeleteBrand(brand.id)}
                                    >
                                        Eliminar
                                    </Button>
                                )}
                            </li>
                        ))
                    )}
                </ul>

                {/* Agregar nueva marca */}
                <div className="flex gap-2 mb-4">
                    <TextField
                        label="Nueva marca"
                        value={newBrand}
                        onChange={(e) => setNewBrand(e.target.value)}
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'green',
                            color: 'white',
                            '&:hover': { backgroundColor: 'darkgreen' },
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
                        sx={{ backgroundColor: 'gray', '&:hover': { backgroundColor: '#555555' } }}
                        onClick={onClose}
                    >
                        Cerrar
                    </Button>
                </div>
            </div>
        </div>
    );
}
