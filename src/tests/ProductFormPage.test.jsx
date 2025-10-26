import { render, screen, fireEvent } from "@testing-library/react";
import ProductFormPage from "../Screens/ProductFormPage";
import ProductForm from "../Components/Abm/ProductForm.jsx";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock del ProductForm
vi.mock("../Components/Abm/ProductForm.jsx", () => ({
  default: ({ onSave, editingProduct, onCancel }) => (
    <div>
      <span>Mocked ProductForm</span>
      <button onClick={() => onSave({ id: 1, name: "Producto Test" })}>Guardar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  ),
}));

// Mock de react-router-dom
const mockHandleSave = vi.fn();
const mockSetEditingProduct = vi.fn();

vi.mock("react-router-dom", () => ({
  useOutletContext: () => ({
    handleSave: mockHandleSave,
    editingProduct: null,
    setEditingProduct: mockSetEditingProduct,
  }),
}));

describe("ProductFormPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería renderizar el título principal", () => {
    render(<ProductFormPage />);
    expect(screen.getByText("Crear / Editar Producto")).toBeInTheDocument();
  });

  it("debería renderizar el ProductForm mockeado", () => {
    render(<ProductFormPage />);
    expect(screen.getByText("Mocked ProductForm")).toBeInTheDocument();
  });

  it("debería llamar a handleSave al hacer click en 'Guardar'", () => {
    render(<ProductFormPage />);
    fireEvent.click(screen.getByText("Guardar"));
    expect(mockHandleSave).toHaveBeenCalledWith({ id: 1, name: "Producto Test" });
  });

  it("debería llamar a setEditingProduct(null) al hacer click en 'Cancelar'", () => {
    render(<ProductFormPage />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(mockSetEditingProduct).toHaveBeenCalledWith(null);
  });
});
