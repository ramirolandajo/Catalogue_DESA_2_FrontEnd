import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ImageEditModal from "../Components/Abm/ImageEditModal";
import "@testing-library/jest-dom";

describe("ImageEditModal", () => {
  let mockOnSave;
  let mockOnClose;

  beforeEach(() => {
    mockOnSave = vi.fn();
    mockOnClose = vi.fn();
  });

  it("renderiza correctamente con la URL inicial", () => {
    render(
      <ImageEditModal
        initialUrl="https://example.com/img.jpg"
        onSave={mockOnSave}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByPlaceholderText("URL de la imagen")).toHaveValue(
      "https://example.com/img.jpg"
    );
    expect(screen.getByAltText("Preview")).toHaveAttribute(
      "src",
      "https://example.com/img.jpg"
    );
  });

  it("actualiza el valor del input y el preview al escribir una nueva URL", () => {
    render(
      <ImageEditModal
        initialUrl=""
        onSave={mockOnSave}
        onClose={mockOnClose}
      />
    );

    const input = screen.getByPlaceholderText("URL de la imagen");
    fireEvent.change(input, { target: { value: "https://test.com/new.jpg" } });

    expect(input).toHaveValue("https://test.com/new.jpg");
    expect(screen.getByAltText("Preview")).toHaveAttribute(
      "src",
      "https://test.com/new.jpg"
    );
  });

  it("llama a onClose al hacer clic en 'Cancelar'", () => {
    render(
      <ImageEditModal initialUrl="" onSave={mockOnSave} onClose={mockOnClose} />
    );

    fireEvent.click(screen.getByText("Cancelar"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("llama a onSave con la nueva URL y luego onClose al hacer clic en 'Guardar'", () => {
    render(
      <ImageEditModal initialUrl="" onSave={mockOnSave} onClose={mockOnClose} />
    );

    const input = screen.getByPlaceholderText("URL de la imagen");
    fireEvent.change(input, { target: { value: "https://save.com/img.png" } });

    fireEvent.click(screen.getByText("Guardar"));

    expect(mockOnSave).toHaveBeenCalledWith("https://save.com/img.png");
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("no muestra preview si no hay URL", () => {
    render(
      <ImageEditModal initialUrl="" onSave={mockOnSave} onClose={mockOnClose} />
    );

    expect(screen.queryByAltText("Preview")).not.toBeInTheDocument();
  });
});