import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import BrandManagementModal from "../Components/Abm/BrandManagementModal";
import "@testing-library/jest-dom";

describe("BrandManagementModal", () => {
  let mockAddBrand;
  let mockDeleteBrand;
  let mockActivateBrand;
  let mockClose;

  beforeEach(() => {
    mockAddBrand = vi.fn();
    mockDeleteBrand = vi.fn();
    mockActivateBrand = vi.fn();
    mockClose = vi.fn();
  });

  const mockBrands = [
    { id: 1, brandCode: "ABC", name: "Marca A", active: true },
    { id: 2, brandCode: "XYZ", name: "Marca X", active: false },
  ];

  it("se renderiza correctamente con las marcas dadas", () => {
    render(
      <BrandManagementModal
        brands={mockBrands}
        onAddBrand={mockAddBrand}
        onDeleteBrand={mockDeleteBrand}
        onActivateBrand={mockActivateBrand}
        onClose={mockClose}
      />
    );

    expect(screen.getByText("Gestión de Marcas")).toBeInTheDocument();
    expect(screen.getByText("ABC: Marca A")).toBeInTheDocument();
    expect(screen.getByText("XYZ: Marca X")).toBeInTheDocument();
  });

  it("muestra mensaje si no hay marcas cargadas", () => {
    render(
      <BrandManagementModal
        brands={[]}
        onAddBrand={mockAddBrand}
        onDeleteBrand={mockDeleteBrand}
        onActivateBrand={mockActivateBrand}
        onClose={mockClose}
      />
    );

    expect(screen.getByText("No hay marcas cargadas.")).toBeInTheDocument();
  });

  it("llama a onAddBrand con los datos correctos al agregar una marca válida", () => {
    render(
      <BrandManagementModal
        brands={mockBrands}
        onAddBrand={mockAddBrand}
        onDeleteBrand={mockDeleteBrand}
        onActivateBrand={mockActivateBrand}
        onClose={mockClose}
      />
    );

    fireEvent.change(screen.getByLabelText("Código"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText("Nombre de marca"), {
      target: { value: "Nueva Marca" },
    });

    fireEvent.click(screen.getByText("Agregar"));

    expect(mockAddBrand).toHaveBeenCalledWith({
      brandCode: "123",
      name: "Nueva Marca",
      active: true,
    });
  });

  it("muestra alerta si se intenta agregar una marca sin completar campos", () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(
      <BrandManagementModal
        brands={mockBrands}
        onAddBrand={mockAddBrand}
        onDeleteBrand={mockDeleteBrand}
        onActivateBrand={mockActivateBrand}
        onClose={mockClose}
      />
    );

    fireEvent.click(screen.getByText("Agregar"));
    expect(alertSpy).toHaveBeenCalledWith(
      "Por favor, completa tanto el código como el nombre de la marca."
    );
    alertSpy.mockRestore();
  });

  it("llama a onDeleteBrand cuando el usuario confirma la desactivación", async () => {
    const confirmSpy = vi
      .spyOn(window, "confirm")
      .mockImplementation(() => true);

    render(
      <BrandManagementModal
        brands={mockBrands}
        onAddBrand={mockAddBrand}
        onDeleteBrand={mockDeleteBrand}
        onActivateBrand={mockActivateBrand}
        onClose={mockClose}
      />
    );

    fireEvent.click(screen.getByText("Desactivar"));
    expect(confirmSpy).toHaveBeenCalled();
    expect(mockDeleteBrand).toHaveBeenCalledWith(1);

    confirmSpy.mockRestore();
  });

  it("llama a onActivateBrand cuando el usuario confirma la activación", async () => {
    const confirmSpy = vi
      .spyOn(window, "confirm")
      .mockImplementation(() => true);

    render(
      <BrandManagementModal
        brands={mockBrands}
        onAddBrand={mockAddBrand}
        onDeleteBrand={mockDeleteBrand}
        onActivateBrand={mockActivateBrand}
        onClose={mockClose}
      />
    );

    fireEvent.click(screen.getByText("Activar"));
    expect(confirmSpy).toHaveBeenCalled();
    expect(mockActivateBrand).toHaveBeenCalledWith(2);

    confirmSpy.mockRestore();
  });

  it("llama a onClose al hacer clic en el botón 'Cerrar'", () => {
    render(
      <BrandManagementModal
        brands={mockBrands}
        onAddBrand={mockAddBrand}
        onDeleteBrand={mockDeleteBrand}
        onActivateBrand={mockActivateBrand}
        onClose={mockClose}
      />
    );

    fireEvent.click(screen.getByText("Cerrar"));
    expect(mockClose).toHaveBeenCalled();
  });
});
