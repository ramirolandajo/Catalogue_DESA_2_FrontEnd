import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../Store/abm/abmSlice";
import { Button, Typography } from "@mui/material";
import ExcelIcon from "../../assets/excel-icon.png"
export default function CsvUploadButton() {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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

            {/* Preview del archivo seleccionado */}
            {file && (
              <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md mb-4">
                <img
                  src={ExcelIcon} // reemplaza con la ruta de tu ícono Excel
                  alt="Excel"
                  className="w-6 h-6"
                />
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
