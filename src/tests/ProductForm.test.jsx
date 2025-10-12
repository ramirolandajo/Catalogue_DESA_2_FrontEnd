import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductForm from "../Components/Abm/ProductForm";
import * as reactRedux from "react-redux";
import * as abmSlice from "../../Store/abm/abmSlice";

describe("ProductForm", () => {
  const mockDispatch = vi.fn();
  const mockOnSave = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(reactRedux, "useDispatch").mockReturnValue(mockDispatch);
    vi.spyOn(reactRedux, "useSelector").mockImplementation((selectorFn) =>
      selectorFn({
        abm: {
          categories: [{ id: 1, name: "Cat 1" }],
          brands: [{ id: 1, name: "Brand 1" }],
        },
      })
    );
  });

  it("renderiza los campos básicos del formulario", () => {
    render(<ProductForm onSave={mockOnSave} onCancel={mockOnCancel} />);
    
    expect(screen.getByLabelText("Código de producto")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Precio Normal")).toBeInTheDocument();
    expect(screen.getByLabelText("Descuento (%)")).toBeInTheDocument();
    expect(screen.getByLabelText("Stock")).toBeInTheDocument();
  });

  it("llama a onSave al enviar el formulario", () => {
    render(<ProductForm onSave={mockOnSave} onCancel={mockOnCancel} />);

    fireEvent.change(screen.getByLabelText("Código de producto"), { target: { value: "123" } });
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Test Product" } });
    fireEvent.change(screen.getByLabelText("Precio Normal"), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText("Descuento (%)"), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText("Stock"), { target: { value: "50" } });

    fireEvent.click(screen.getByText("Guardar"));

    expect(mockOnSave).toHaveBeenCalled();
  });

  it("llama a onCancel al presionar el botón Cancelar", () => {
    render(<ProductForm onSave={mockOnSave} onCancel={mockOnCancel} editingProduct={{ productCode: 1 }} />);

    const cancelButton = screen.getByText("Cancelar");
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
