import { render, screen, fireEvent } from "@testing-library/react";
import ProductList from "../Components/Abm/ProductList";

describe("ProductList component", () => {
  const mockProducts = [
    {
      id: 1,
      productCode: "P001",
      name: "Producto A",
      unitPrice: 100,
      stock: 10,
      active: true,
      images: ["https://via.placeholder.com/40"],
    },
    {
      id: 2,
      productCode: "P002",
      name: "Producto B",
      unitPrice: 200,
      stock: 5,
      active: false,
      images: [],
    },
  ];

  it("muestra mensaje cuando no hay productos", () => {
    render(<ProductList products={[]} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/No hay productos cargados/i)).toBeInTheDocument();
  });

  it("renderiza productos en la tabla", () => {
    render(<ProductList products={mockProducts} onEdit={() => {}} onDelete={() => {}} />);

    expect(screen.getByText("Producto A")).toBeInTheDocument();
    expect(screen.getByText("Producto B")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("$200")).toBeInTheDocument();
  });

  it("muestra el preview de imagen si existe", () => {
    render(<ProductList products={mockProducts} onEdit={() => {}} onDelete={() => {}} />);
    const img = screen.getAllByRole("img")[0];
    expect(img).toHaveAttribute("src", "https://via.placeholder.com/40");
  });

  it("llama a onEdit al hacer click en Editar", () => {
    const onEditMock = vi.fn();
    render(<ProductList products={mockProducts} onEdit={onEditMock} onDelete={() => {}} />);
    fireEvent.click(screen.getAllByText(/editar/i)[0]);
    expect(onEditMock).toHaveBeenCalledWith(mockProducts[0]);
  });

  it("llama a onDelete al hacer click en Eliminar", () => {
    const onDeleteMock = vi.fn();
    render(<ProductList products={mockProducts} onEdit={() => {}} onDelete={onDeleteMock} />);
    fireEvent.click(screen.getByText(/eliminar/i));
    expect(onDeleteMock).toHaveBeenCalledWith("P001");
  });
});
