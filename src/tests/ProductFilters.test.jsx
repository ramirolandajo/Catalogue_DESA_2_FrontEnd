import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProductFilters from "../Components/Abm/ProductFilters";
import "@testing-library/jest-dom";

// Mock completo del módulo react-redux
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

// Mock de los thunks
vi.mock("../../Store/abm/abmSlice", () => ({
  getBrands: vi.fn(),
  getCategories: vi.fn(),
}));

import { useDispatch, useSelector } from "react-redux";
import { getBrands, getCategories } from "../Store/abm/abmSlice";

describe("ProductFilters", () => {
  const mockDispatch = vi.fn();
  const mockOnFilter = vi.fn();

  const mockCategories = [
    { id: 1, name: "Electrónica" },
    { id: 2, name: "Hogar" },
  ];

  const mockBrands = [
    { id: 10, name: "Marca A" },
    { id: 20, name: "Marca B" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((selector) => {
      // devolvemos el estado como lo espera el componente
      return selector({
        abm: {
          categories: mockCategories,
          brands: mockBrands,
        },
      });
    });
  });

  it("renderiza correctamente los inputs y selects", () => {
    render(<ProductFilters onFilter={mockOnFilter} />);

    // Inputs base
    expect(screen.getByPlaceholderText("Buscar producto...")).toBeInTheDocument();
    expect(screen.getByText("Todas las categorías")).toBeInTheDocument();
    expect(screen.getByText("Todas las marcas")).toBeInTheDocument();

    // Opciones renderizadas
    expect(screen.getByText("Electrónica")).toBeInTheDocument();
    expect(screen.getByText("Hogar")).toBeInTheDocument();
    expect(screen.getByText("Marca A")).toBeInTheDocument();
    expect(screen.getByText("Marca B")).toBeInTheDocument();
  });

  it("llama a onFilter al cambiar el texto de búsqueda", () => {
    render(<ProductFilters onFilter={mockOnFilter} />);

    const searchInput = screen.getByPlaceholderText("Buscar producto...");
    fireEvent.change(searchInput, { target: { value: "Laptop" } });

    expect(mockOnFilter).toHaveBeenCalledWith({
      searchText: "Laptop",
      categoryId: null,
      brandId: null,
    });
  });

  it("llama a onFilter al cambiar la categoría", () => {
    render(<ProductFilters onFilter={mockOnFilter} />);

    const selectCategory = screen.getByDisplayValue("Todas las categorías");
    fireEvent.change(selectCategory, { target: { value: "2" } });

    expect(mockOnFilter).toHaveBeenCalledWith({
      searchText: "",
      categoryId: 2,
      brandId: null,
    });
  });

  it("llama a onFilter al cambiar la marca", () => {
    render(<ProductFilters onFilter={mockOnFilter} />);

    const selectBrand = screen.getByDisplayValue("Todas las marcas");
    fireEvent.change(selectBrand, { target: { value: "10" } });

    expect(mockOnFilter).toHaveBeenCalledWith({
      searchText: "",
      categoryId: null,
      brandId: 10,
    });
  });

  it("despacha getCategories y getBrands al montar", () => {
    render(<ProductFilters onFilter={mockOnFilter} />);
    expect(mockDispatch).toHaveBeenCalledWith(getCategories());
    expect(mockDispatch).toHaveBeenCalledWith(getBrands());
  });
});
