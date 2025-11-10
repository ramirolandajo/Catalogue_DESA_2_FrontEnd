import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CategoryManagementModal from "../Components/Abm/CategoryManagementModal";
import "@testing-library/jest-dom";

describe("CategoryManagementModal", () => {
  let mockAddCategory;
  let mockDeleteCategory;
  let mockActivateCategory;
  let mockClose;

  beforeEach(() => {
    mockAddCategory = vi.fn();
    mockDeleteCategory = vi.fn();
    mockActivateCategory = vi.fn();
    mockClose = vi.fn();
  });

  const mockCategories = [
    { id: 1, categoryCode: "CAT01", name: "Categoría A", active: true },
    { id: 2, categoryCode: "CAT02", name: "Categoría B", active: false },
  ];

  it("se renderiza correctamente con las categorías dadas", () => {
    render(
      <CategoryManagementModal
        categories={mockCategories}
        onAddCategory={mockAddCategory}
        onDeleteCategory={mockDeleteCategory}
        onActivateCategory={mockActivateCategory}
        onClose={mockClose}
      />
    );

    expect(screen.getByText("Gestión de Categorías")).toBeInTheDocument();
    expect(screen.getByText("CAT01: Categoría A")).toBeInTheDocument();
    expect(screen.getByText("CAT02: Categoría B")).toBeInTheDocument();
  });

  it("muestra mensaje si no hay categorías cargadas", () => {
    render(
      <CategoryManagementModal
        categories={[]}
        onAddCategory={mockAddCategory}
        onDeleteCategory={mockDeleteCategory}
        onActivateCategory={mockActivateCategory}
        onClose={mockClose}
      />
    );

    expect(
      screen.getByText("No hay categorías cargadas.")
    ).toBeInTheDocument();
  });

  it("llama a onAddCategory con los datos correctos al agregar una categoría válida", () => {
    render(
      <CategoryManagementModal
        categories={mockCategories}
        onAddCategory={mockAddCategory}
        onDeleteCategory={mockDeleteCategory}
        onActivateCategory={mockActivateCategory}
        onClose={mockClose}
      />
    );

    fireEvent.change(screen.getByLabelText("Código"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText("Nombre de categoría"), {
      target: { value: "Nueva Categoría" },
    });

    fireEvent.click(screen.getByText("Agregar"));

    expect(mockAddCategory).toHaveBeenCalledWith({
      categoryCode: "123",
      name: "Nueva Categoría",
      active: true,
    });
  });

  it("muestra alerta si se intenta agregar sin completar los campos", () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => { });
    render(
      <CategoryManagementModal
        categories={mockCategories}
        onAddCategory={mockAddCategory}
        onDeleteCategory={mockDeleteCategory}
        onActivateCategory={mockActivateCategory}
        onClose={mockClose}
      />
    );

    fireEvent.click(screen.getByText("Agregar"));
    expect(alertSpy).toHaveBeenCalledWith(
      "Por favor, completa tanto el ID como el nombre de la categoría."
    );
    alertSpy.mockRestore();
  });

  it("llama a onDeleteCategory cuando el usuario confirma la desactivación", () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

    render(
      <CategoryManagementModal
        categories={mockCategories}
        onAddCategory={mockAddCategory}
        onDeleteCategory={mockDeleteCategory}
        onActivateCategory={mockActivateCategory}
        onClose={mockClose}
      />
    );

    fireEvent.click(screen.getByText("Desactivar"));
    expect(confirmSpy).toHaveBeenCalled();
    // ⬇️ Cambiamos el 1 por el código de la categoría
    expect(mockDeleteCategory).toHaveBeenCalledWith("CAT01");

    confirmSpy.mockRestore();
  });

  it("llama a onActivateCategory cuando el usuario confirma la activación", () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

    render(
      <CategoryManagementModal
        categories={mockCategories}
        onAddCategory={mockAddCategory}
        onDeleteCategory={mockDeleteCategory}
        onActivateCategory={mockActivateCategory}
        onClose={mockClose}
      />
    );

    fireEvent.click(screen.getByText("Activar"));
    expect(confirmSpy).toHaveBeenCalled();
    // ⬇️ Cambiamos el 2 por el código correspondiente
    expect(mockActivateCategory).toHaveBeenCalledWith("CAT02");

    confirmSpy.mockRestore();
  });


  it("llama a onClose al hacer clic en el botón 'Cerrar'", () => {
    render(
      <CategoryManagementModal
        categories={mockCategories}
        onAddCategory={mockAddCategory}
        onDeleteCategory={mockDeleteCategory}
        onActivateCategory={mockActivateCategory}
        onClose={mockClose}
      />
    );

    fireEvent.click(screen.getByText("Cerrar"));
    expect(mockClose).toHaveBeenCalled();
  });
});
