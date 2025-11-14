import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../Store/abm/abmSlice";
import { Button, Typography, CircularProgress } from "@mui/material";
import ExcelIcon from "../../assets/excel-icon.png";

export default function CsvUploadButton() {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [loadingFile, setLoadingFile] = useState(false); // 👈 Nuevo estado
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setLoadingFile(true);

    // Simular un "tiempo de carga" mínimo para mostrar el spinner
    setTimeout(() => {
      setFile(selected);
      setLoadingFile(false);
    }, 800); // Puedes ajustarlo
  };

  const handleUpload = () => {
    if (file) {
      dispatch(uploadFile(file));
      setShowModal(false);
      setFile(null);
    } else {
      alert("Por favor selecciona un archivo CSV.");
    }
  };

  return (
    <>
      {/* Botón verde para abrir modal */}
      <Button
        variant="contained"
        sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
        onClick={() => setShowModal(true)}
      >
        Cargar productos por .csv
      </Button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/[0.75] flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Subir archivo CSV</h2>

            {/* Botón para seleccionar archivo */}
            <Button
              variant="outlined"
              onClick={() => fileInputRef.current.click()}
              fullWidth
              sx={{ mb: 2, color: 'green', borderColor: 'darkgreen', backgroundColor: 'rgba(50, 205, 50, 0.1)', '&:hover': { backgroundColor: 'darkgreen', color: 'white' } }}
            >
              {file ? "Cambiar archivo" : "Seleccionar archivo CSV"}
            </Button>

            {/* Input oculto */}
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            {/* Loader mientras se carga el archivo */}
            {loadingFile && (
              <div className="flex justify-center items-center mb-4">
                <CircularProgress size={28} />
                <span className="ml-3 text-gray-700">Cargando archivo...</span>
              </div>
            )}

            {/* Preview del archivo seleccionado */}
            {!loadingFile && file && (
              <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md mb-4">
                <img src={ExcelIcon} alt="Excel" className="w-6 h-6" />
                <span className="text-gray-800 font-medium truncate">{file.name}</span>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="contained"
                sx={{ backgroundColor: 'gray', '&:hover': { backgroundColor: '#555555' } }}
                onClick={() => { setShowModal(false); setFile(null); }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
                onClick={handleUpload}
                disabled={loadingFile} // Evita subir mientras carga
              >
                Subir
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
