import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CategoryModal from "../Components/Abm/CategoryModal";
import "@testing-library/jest-dom";

describe("CategoryModal", () => {
  let mockOnChange;

  const mockCategories = [
    { id: 1, name: "Electrónica" },
    { id: 2, name: "Hogar" },
    { id: 3, name: "Deportes" },
  ];

  beforeEach(() => {
    mockOnChange = vi.fn();
  });

  it("renderiza el botón principal correctamente", () => {
    render(
      <CategoryModal categories={mockCategories} selected={[]} onChange={mockOnChange} />
    );

    expect(screen.getByText("Seleccionar categorías")).toBeInTheDocument();
  });

  it("abre el modal al hacer clic en 'Seleccionar categorías'", () => {
    render(
      <CategoryModal categories={mockCategories} selected={[]} onChange={mockOnChange} />
    );

    fireEvent.click(screen.getByText("Seleccionar categorías"));

    expect(screen.getByText("Seleccionar Categorías")).toBeInTheDocument();
    expect(screen.getByText("Electrónica")).toBeInTheDocument();
    expect(screen.getByText("Hogar")).toBeInTheDocument();
  });

  it("muestra las categorías seleccionadas en el texto resumen", () => {
    const selected = [{ id: 1, name: "Electrónica" }, { id: 3, name: "Deportes" }];

    render(
      <CategoryModal
        categories={mockCategories}
        selected={selected}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText("Electrónica, Deportes")).toBeInTheDocument();
  });

  it("llama a onChange al seleccionar una categoría nueva", () => {
    render(
      <CategoryModal categories={mockCategories} selected={[]} onChange={mockOnChange} />
    );

    fireEvent.click(screen.getByText("Seleccionar categorías"));
    fireEvent.click(screen.getByLabelText("Electrónica"));

    expect(mockOnChange).toHaveBeenCalledWith([{ id: 1, name: "Electrónica" }]);
  });

  it("llama a onChange al deseleccionar una categoría ya seleccionada", () => {
    const selected = [{ id: 2, name: "Hogar" }];

    render(
      <CategoryModal
        categories={mockCategories}
        selected={selected}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByText("Seleccionar categorías"));
    fireEvent.click(screen.getByLabelText("Hogar"));

    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it("cierra el modal al hacer clic en 'Cerrar'", () => {
    render(
      <CategoryModal categories={mockCategories} selected={[]} onChange={mockOnChange} />
    );

    fireEvent.click(screen.getByText("Seleccionar categorías"));
    const closeButton = screen.getByText("Cerrar");
    fireEvent.click(closeButton);

    expect(screen.queryByText("Seleccionar Categorías")).not.toBeInTheDocument();
  });
});
