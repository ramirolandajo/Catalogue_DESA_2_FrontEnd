import { render, screen, fireEvent } from "@testing-library/react";
import ProductListPage from "../Screens/ProductListPage";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock de react-router-dom
const mockNavigate = vi.fn();
const mockHandleFilter = vi.fn();
const mockHandleDelete = vi.fn();
const mockSetEditingProduct = vi.fn();
const mockHandleActivate = vi.fn();

vi.mock("react-router-dom", () => ({
  useOutletContext: () => ({
    products: [
      { id: 1, productCode: "P001", name: "Producto 1", unitPrice: 100, stock: 5, active: true, images: [] },
      { id: 2, productCode: "P002", name: "Producto 2", unitPrice: 200, stock: 0, active: false, images: [] },
    ],
    handleFilter: mockHandleFilter,
    handleDelete: mockHandleDelete,
    setEditingProduct: mockSetEditingProduct,
    handleActivate: mockHandleActivate,
  }),
  useNavigate: () => mockNavigate,
}));

// Mocks de los componentes hijos
vi.mock("../Components/Abm/ProductFilters.jsx", () => ({
  default: ({ onFilter }) => (
    <button onClick={() => onFilter("test")}>Mock Filter</button>
  ),
}));

vi.mock("../Components/Abm/ProductList.jsx", () => ({
  default: ({ products, onEdit, onDelete, onActivate }) => (
    <div>
      {products.map((p) => (
        <div key={p.id}>
          <span>{p.name}</span>
          <button onClick={() => onEdit(p)}>Editar</button>
          {p.active ? (
            <button onClick={() => onDelete(p.productCode)}>Desactivar</button>
          ) : (
            <button onClick={() => onActivate(p.productCode)}>Activar</button>
          )}
        </div>
      ))}
    </div>
  ),
}));


describe("ProductListPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería renderizar el título principal", () => {
    render(<ProductListPage />);
    expect(screen.getByText("Listado de Productos")).toBeInTheDocument();
  });

  it("debería mostrar los productos mockeados", () => {
    render(<ProductListPage />);
    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("Producto 2")).toBeInTheDocument();
  });

  it("debería llamar a handleEdit y navigate al hacer click en 'Editar'", () => {
    render(<ProductListPage />);
    fireEvent.click(screen.getAllByText("Editar")[0]);
    expect(mockSetEditingProduct).toHaveBeenCalledWith({
      id: 1,
      productCode: "P001",
      name: "Producto 1",
      unitPrice: 100,
      stock: 5,
      active: true,
      images: [],
    });
    expect(mockNavigate).toHaveBeenCalledWith("/form");
  });

  it("debería llamar a handleDelete al hacer click en 'Desactivar'", () => {
    render(<ProductListPage />);
    fireEvent.click(screen.getAllByText("Desactivar")[0]);
    expect(mockHandleDelete).toHaveBeenCalledWith("P001");
  });

  it("debería llamar a handleActivate al hacer click en 'Activar'", () => {
    render(<ProductListPage />);
    fireEvent.click(screen.getAllByText("Activar")[0]);
    expect(mockHandleActivate).toHaveBeenCalledWith("P002");
  });

  it("debería llamar a handleFilter desde ProductFilters", () => {
    render(<ProductListPage />);
    fireEvent.click(screen.getByText("Mock Filter"));
    expect(mockHandleFilter).toHaveBeenCalledWith("test");
  });
});
