import { useState } from "react";
import { Button, Typography } from "@mui/material";

export default function ImageEditModal({ initialUrl, onSave, onClose }) {
    const [newUrl, setNewUrl] = useState(initialUrl || "");

    const handleSave = () => {
        onSave(newUrl);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/[0.75] flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-[400px]">
                <h2 className="text-lg font-semibold mb-4">Editar Imagen</h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="URL de la imagen"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        className="border rounded-lg p-2 w-full"
                        required
                    />

                    {/* Preview de la imagen */}
                    {newUrl && (
                        <div className="flex justify-center mb-4 ">
                            <img
                                src={newUrl}
                                alt="Preview"
                                className="w-48 h-48 object-cover rounded-md border border-gray-400 bg-gray-200"
                            />
                        </div>
                    )}

                    <div className="flex justify-end gap-3">
                        <Button
                            variant="contained"
                            onClick={onClose}
                            sx={{ backgroundColor: 'gray', '&:hover': { backgroundColor: '#555555' } }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
                            onClick={handleSave}
                        >
                            Guardar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
