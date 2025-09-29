import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BrandManagementModal from "../Components/Abm/BrandManagementModal";

describe("BrandManagementModal", () => {
  it("muestra el título de gestión de marcas", () => {
    render(
      <BrandManagementModal
        brands={[]}
        onAddBrand={() => {}}
        onDeleteBrand={() => {}}
        onClose={() => {}}
      />
    );
    expect(screen.getByText("Gestión de Marcas")).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay marcas", () => {
    render(
      <BrandManagementModal
        brands={[]}
        onAddBrand={() => {}}
        onDeleteBrand={() => {}}
        onClose={() => {}}
      />
    );
    expect(screen.getByText("No hay marcas cargadas.")).toBeInTheDocument();
  });

  it("llama a onAddBrand cuando se agrega una marca", () => {
    const mockAdd = vi.fn();
    render(
      <BrandManagementModal
        brands={[]}
        onAddBrand={mockAdd}
        onDeleteBrand={() => {}}
        onClose={() => {}}
      />
    );

    const input = screen.getByLabelText("Nueva marca");
    fireEvent.change(input, { target: { value: "Nike" } });

    const addButton = screen.getByText("Agregar");
    fireEvent.click(addButton);

    expect(mockAdd).toHaveBeenCalledWith("Nike");
  });

  it("llama a onDeleteBrand cuando se hace click en eliminar", () => {
    const mockDelete = vi.fn();
    const brands = [{ id: 1, name: "Adidas", active: true }];
    render(
      <BrandManagementModal
        brands={brands}
        onAddBrand={() => {}}
        onDeleteBrand={mockDelete}
        onClose={() => {}}
      />
    );

    const deleteButton = screen.getByText("Eliminar");
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it("llama a onClose cuando se hace click en cerrar", () => {
    const mockClose = vi.fn();
    render(
      <BrandManagementModal
        brands={[]}
        onAddBrand={() => {}}
        onDeleteBrand={() => {}}
        onClose={mockClose}
      />
    );

    const closeButton = screen.getByText("Cerrar");
    fireEvent.click(closeButton);

    expect(mockClose).toHaveBeenCalled();
  });
});