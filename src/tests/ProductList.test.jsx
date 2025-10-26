import { render, screen, fireEvent } from "@testing-library/react";
import ProductList from "../Components/Abm/ProductList";
import { describe, it, expect, vi } from "vitest";

// Mock de MUI para evitar errores en el entorno de test
vi.mock("@mui/material", () => ({
  Button: ({ children, onClick }) => <button onClick={onClick}>{children}</button>,
}));
vi.mock("@mui/icons-material/Edit", () => ({ default: () => <span>EditIcon</span> }));
vi.mock("@mui/icons-material/Delete", () => ({ default: () => <span>DeleteIcon</span> }));
vi.mock("@mui/icons-material/PowerSettingsNew", () => ({ default: () => <span>PowerIcon</span> }));

describe("ProductList Component", () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnActivate = vi.fn();

  const sampleProducts = [
    {
      id: 1,
      productCode: "P001",
      name: "Teclado Mecánico",
      unitPrice: 120,
      stock: 15,
      active: true,
      images: ["https://example.com/keyboard.jpg"],
    },
    {
      id: 2,
      productCode: "P002",
      name: "Mouse Inalámbrico",
      unitPrice: 60,
      stock: 0,
      active: false,
      images: [],
    },
  ];

  it("debería renderizar el título correctamente", () => {
    render(
      <ProductList
        products={sampleProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onActivate={mockOnActivate}
      />
    );

    expect(screen.getByText("Listado de Productos")).toBeInTheDocument();
  });

  it("debería mostrar un mensaje si no hay productos", () => {
    render(
      <ProductList
        products={[]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onActivate={mockOnActivate}
      />
    );

    expect(screen.getByText("No hay productos cargados.")).toBeInTheDocument();
  });

  it("debería renderizar el nombre, precio y stock de cada producto", () => {
    render(
      <ProductList
        products={sampleProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onActivate={mockOnActivate}
      />
    );

    expect(screen.getByText("Teclado Mecánico")).toBeInTheDocument();
    expect(screen.getByText("$120")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();

    expect(screen.getByText("Mouse Inalámbrico")).toBeInTheDocument();
    expect(screen.getByText("$60")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("debería mostrar la imagen del producto activo", () => {
    render(
      <ProductList
        products={sampleProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onActivate={mockOnActivate}
      />
    );

    const img = screen.getByAltText("Teclado Mecánico");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/keyboard.jpg");
  });

  it("debería mostrar 'Sin imagen' si el producto no tiene imágenes", () => {
    render(
      <ProductList
        products={sampleProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onActivate={mockOnActivate}
      />
    );

    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
  });

  it("debería llamar a onEdit al hacer click en 'Editar'", () => {
    render(
      <ProductList
        products={sampleProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onActivate={mockOnActivate}
      />
    );

    fireEvent.click(screen.getAllByText("Editar")[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(sampleProducts[0]);
  });

  it("debería llamar a onDelete al hacer click en 'Desactivar' si el producto está activo", () => {
    render(
      <ProductList
        products={sampleProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onActivate={mockOnActivate}
      />
    );

    fireEvent.click(screen.getByText("Desactivar"));
    expect(mockOnDelete).toHaveBeenCalledWith("P001");
  });

  it("debería llamar a onActivate al hacer click en 'Activar' si el producto está inactivo", () => {
    render(
      <ProductList
        products={sampleProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onActivate={mockOnActivate}
      />
    );

    fireEvent.click(screen.getByText("Activar"));
    expect(mockOnActivate).toHaveBeenCalledWith("P002");
  });
});
