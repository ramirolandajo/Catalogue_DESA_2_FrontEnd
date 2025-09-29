import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductFilters from "../Components/Abm/ProductFilters";
import * as reactRedux from "react-redux";
import * as abmSlice from "../../Store/abm/abmSlice";

describe("ProductFilters", () => {
  const mockDispatch = vi.fn();
  const mockOnFilter = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(reactRedux, "useDispatch").mockReturnValue(mockDispatch);
    vi.spyOn(reactRedux, "useSelector").mockImplementation((selectorFn) =>
      selectorFn({
        abm: {
          categories: [
            { id: 1, name: "Cat 1" },
            { id: 2, name: "Cat 2" },
          ],
          brands: [
            { id: 1, name: "Brand 1" },
            { id: 2, name: "Brand 2" },
          ],
        },
      })
    );
  });

  it("renderiza inputs y selects correctamente", () => {
    render(<ProductFilters onFilter={mockOnFilter} />);

    expect(screen.getByPlaceholderText("Buscar producto...")).toBeInTheDocument();
    expect(screen.getByText("Todas las categorías")).toBeInTheDocument();
    expect(screen.getByText("Todas las marcas")).toBeInTheDocument();
    expect(screen.getByText("Cat 1")).toBeInTheDocument();
    expect(screen.getByText("Brand 1")).toBeInTheDocument();
  });

  it("llama a onFilter al cambiar el texto de búsqueda", () => {
    render(<ProductFilters onFilter={mockOnFilter} />);
    const input = screen.getByPlaceholderText("Buscar producto...");

    fireEvent.change(input, { target: { value: "test" } });
    expect(mockOnFilter).toHaveBeenCalledWith({
      searchText: "test",
      categoryId: null,
      brandId: null,
    });
  });

  it("llama a onFilter al cambiar categoría y marca", () => {
    render(<ProductFilters onFilter={mockOnFilter} />);
    const categorySelect = screen.getByText("Todas las categorías").parentElement;
    const brandSelect = screen.getByText("Todas las marcas").parentElement;

    fireEvent.change(categorySelect, { target: { value: "1" } });
    expect(mockOnFilter).toHaveBeenCalledWith({
      searchText: "",
      categoryId: 1,
      brandId: null,
    });

    fireEvent.change(brandSelect, { target: { value: "2" } });
    expect(mockOnFilter).toHaveBeenCalledWith({
      searchText: "",
      categoryId: 1,
      brandId: 2,
    });
  });
});
