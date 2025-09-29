// CategoryModal.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CategoryModal from "../Components/Abm/CategoryModal";

describe("CategoryModal", () => {
  const categories = [
    { id: 1, name: "Electrónica" },
    { id: 2, name: "Ropa" },
  ];

  it("abre el modal al hacer click en el botón", () => {
    render(<CategoryModal categories={categories} selected={[]} onChange={() => {}} />);

    // Modal NO debería estar visible al inicio
    expect(screen.queryByText("Seleccionar Categorías")).not.toBeInTheDocument();

    // Click en botón
    fireEvent.click(screen.getByRole("button", { name: /Seleccionar categorías/i }));

    // Modal debería aparecer
    expect(screen.getByText("Seleccionar Categorías")).toBeInTheDocument();
  });

  it("marca y desmarca categorías llamando a onChange", () => {
    const handleChange = vi.fn();
    render(<CategoryModal categories={categories} selected={[]} onChange={handleChange} />);

    fireEvent.click(screen.getByRole("button", { name: /Seleccionar categorías/i }));

    // Click en checkbox de Electrónica
    fireEvent.click(screen.getByLabelText("Electrónica"));
    expect(handleChange).toHaveBeenCalledWith([{ id: 1, name: "Electrónica" }]);

    // Click otra vez para desmarcar
    fireEvent.click(screen.getByLabelText("Electrónica"));
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("cierra el modal al hacer click en Cerrar", () => {
    render(<CategoryModal categories={categories} selected={[]} onChange={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: /Seleccionar categorías/i }));

    fireEvent.click(screen.getByRole("button", { name: /Cerrar/i }));

    // Modal ya no debería estar
    expect(screen.queryByText("Seleccionar Categorías")).not.toBeInTheDocument();
  });
});
