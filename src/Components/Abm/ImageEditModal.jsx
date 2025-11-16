import { useState, useRef } from "react";
import { Button, CircularProgress } from "@mui/material";

export default function ImageEditModal({ onSave, onClose }) {
    const [file, setFile] = useState(null);
    const [loadingFile, setLoadingFile] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    const inputRef = useRef(null);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        if (selected.type === "image/webp") {
            alert("No se permiten imágenes en formato .WEBP");
            return;
        }

        setLoadingFile(true);

        // Simulamos un tiempo mínimo para mostrar loading
        setTimeout(() => {
            setFile(selected);
            setPreviewUrl(URL.createObjectURL(selected)); // Preview real
            setLoadingFile(false);
        }, 500);
    };

    const handleSave = () => {
        if (!file) {
            alert("Selecciona una imagen antes de guardar.");
            return;
        }
        console.log(file)
        onSave(file, previewUrl);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/[0.75] flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Editar Imagen</h2>

                {/* Botón para seleccionar archivo */}
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                        mb: 2,
                        color: '#1E40AF',
                        borderColor: '#1E40AF',
                        backgroundColor: 'rgba(30, 64, 175, 0.12)',
                        '&:hover': {
                            backgroundColor: '#1E40AF',
                            color: 'white'
                        }
                    }}
                    onClick={() => inputRef.current.click()}
                >
                    {file ? "Cambiar imagen" : "Seleccionar imagen"}
                </Button>

                {/* input oculto */}
                <input
                    type="file"
                    accept="image/*" // luego filtramos manualmente webp
                    ref={inputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />

                {/* Loader */}
                {loadingFile && (
                    <div className="flex justify-center items-center mb-4">
                        <CircularProgress size={28} />
                        <span className="ml-3 text-gray-700">Cargando imagen...</span>
                    </div>
                )}

                {/* Preview */}
                {!loadingFile && previewUrl && (
                    <div className="flex justify-center mb-4">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-w-[180px] max-h-[180px] object-cover rounded-md border border-gray-400 bg-gray-200"
                        />
                    </div>
                )}

                <div className="flex justify-end gap-3 mt-4">
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: 'gray', '&:hover': { backgroundColor: '#555555' } }}
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
                        onClick={handleSave}
                        disabled={loadingFile}
                    >
                        Guardar
                    </Button>
                </div>
            </div>
        </div>
    );
}
