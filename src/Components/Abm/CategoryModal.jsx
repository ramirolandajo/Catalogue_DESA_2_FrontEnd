import { useState } from "react";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export default function CategoryModal({ categories, selected, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCategory = (category) => {
        const exists = selected.some((c) => c.id === category.id);
        const updated = exists
            ? selected.filter((c) => c.id !== category.id)
            : [...selected, category];
        onChange(updated);
    };

    return (
        <div>
            {/* Botón abrir modal */}
            <Button
                variant="contained"
                onClick={() => setIsOpen(true)}
                sx={{ backgroundColor: '#2563EB', '&:hover': { backgroundColor: '#1D4ED8' } }}
            >
                Seleccionar categorías
            </Button>

            {/* Texto de categorías seleccionadas */}
            {selected.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                    {selected.map((c) => c.name).join(", ")}
                </div>
            )}

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/[0.75] flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Seleccionar Categorías</h3>

                        <ul className="max-h-120 overflow-y-auto space-y-2 p-0">
                            {categories.map((cat) => (
                                <li key={cat.id} className="list-none">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selected.some((c) => c.id === cat.id)}
                                                onChange={() => toggleCategory(cat)}
                                                color="primary"
                                            />
                                        }
                                        label={cat.name}
                                    />
                                </li>
                            ))}
                        </ul>


                        <div className="flex justify-end gap-3 mt-4">
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: 'gray', '&:hover': { backgroundColor: '#555555' } }}
                                onClick={() => setIsOpen(false)}
                            >
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
