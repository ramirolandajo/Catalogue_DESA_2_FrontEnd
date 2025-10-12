import { describe, it, vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageEditModal from "../Components/Abm/ImageEditModal";

describe("ImageEditModal", () => {
  it("llama a onSave y onClose al hacer click en Guardar", () => {
    const onSave = vi.fn();
    const onClose = vi.fn();

    render(<ImageEditModal initialUrl="" onSave={onSave} onClose={onClose} />);

    fireEvent.click(screen.getByText("Guardar"));

    expect(onSave).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("llama a onClose al hacer click en Cancelar", () => {
    const onClose = vi.fn();

    render(<ImageEditModal initialUrl="" onSave={vi.fn()} onClose={onClose} />);

    fireEvent.click(screen.getByText("Cancelar"));

    expect(onClose).toHaveBeenCalled();
  });
});
