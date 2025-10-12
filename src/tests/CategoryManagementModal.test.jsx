import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CategoryManagementModal from "../Components/Abm/CategoryManagementModal";

describe("CategoryManagementModal", () => {
  it("muestra el título de gestión de categorías", () => {
    render(
      <CategoryManagementModal
        categories={[]}
        onAddCategory={() => {}}
        onDeleteCategory={() => {}}
        onClose={() => {}}
      />
    );
    expect(screen.getByText("Gestión de Categorías")).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay categorías", () => {
    render(
      <CategoryManagementModal
        categories={[]}
        onAddCategory={() => {}}
        onDeleteCategory={() => {}}
        onClose={() => {}}
      />
    );
    expect(screen.getByText("No hay categorías cargadas.")).toBeInTheDocument();
  });

  it("llama a onAddCategory cuando se agrega una categoría", () => {
    const mockAdd = vi.fn();
    render(
      <CategoryManagementModal
        categories={[]}
        onAddCategory={mockAdd}
        onDeleteCategory={() => {}}
        onClose={() => {}}
      />
    );

    const input = screen.getByLabelText("Nueva categoría");
    fireEvent.change(input, { target: { value: "Electrónica" } });

    const addButton = screen.getByText("Agregar");
    fireEvent.click(addButton);

    expect(mockAdd).toHaveBeenCalledWith("Electrónica");
  });

  it("llama a onDeleteCategory cuando se hace click en eliminar", () => {
    const mockDelete = vi.fn();
    const categories = [{ id: 1, name: "Hogar", active: true }];
    render(
      <CategoryManagementModal
        categories={categories}
        onAddCategory={() => {}}
        onDeleteCategory={mockDelete}
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
      <CategoryManagementModal
        categories={[]}
        onAddCategory={() => {}}
        onDeleteCategory={() => {}}
        onClose={mockClose}
      />
    );

    const closeButton = screen.getByText("Cerrar");
    fireEvent.click(closeButton);

    expect(mockClose).toHaveBeenCalled();
  });
});
