// CsvUploadButton.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CsvUploadButton from "../Components/Abm/CsvUploadButton";
import { uploadFile } from "../../Store/abm/abmSlice";

vi.mock("../../Store/abm/abmSlice", () => ({
  uploadFile: vi.fn((file) => ({ type: "UPLOAD_FILE", payload: file })),
}));

const mockStore = configureStore([]);

describe("CsvUploadButton", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = vi.fn();
  });

  const renderWithProvider = (ui) =>
    render(<Provider store={store}>{ui}</Provider>);

  it("abre el modal al hacer click en el botón", () => {
    renderWithProvider(<CsvUploadButton />);

    expect(screen.queryByText("Subir archivo CSV")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Cargar productos por .csv/i }));

    expect(screen.getByText("Subir archivo CSV")).toBeInTheDocument();
  });

  it("permite seleccionar un archivo CSV y lo muestra en preview", () => {
    renderWithProvider(<CsvUploadButton />);

    fireEvent.click(screen.getByRole("button", { name: /Cargar productos por .csv/i }));

    const file = new File(["contenido"], "productos.csv", { type: "text/csv" });
    const input = screen.getByLabelText(/Seleccionar archivo CSV/i).parentNode.querySelector("input");

    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText("productos.csv")).toBeInTheDocument();
  });

  it("dispara uploadFile y cierra el modal al subir archivo", () => {
    renderWithProvider(<CsvUploadButton />);

    fireEvent.click(screen.getByRole("button", { name: /Cargar productos por .csv/i }));

    const file = new File(["contenido"], "productos.csv", { type: "text/csv" });
    const input = screen.getByLabelText(/Seleccionar archivo CSV/i).parentNode.querySelector("input");
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByRole("button", { name: /Subir/i }));

    expect(store.dispatch).toHaveBeenCalledWith(uploadFile(file));
    expect(screen.queryByText("Subir archivo CSV")).not.toBeInTheDocument();
  });

  it("cierra modal y resetea archivo al cancelar", () => {
    renderWithProvider(<CsvUploadButton />);

    fireEvent.click(screen.getByRole("button", { name: /Cargar productos por .csv/i }));

    const file = new File(["contenido"], "productos.csv", { type: "text/csv" });
    const input = screen.getByLabelText(/Seleccionar archivo CSV/i).parentNode.querySelector("input");
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByRole("button", { name: /Cancelar/i }));

    expect(screen.queryByText("productos.csv")).not.toBeInTheDocument();
    expect(screen.queryByText("Subir archivo CSV")).not.toBeInTheDocument();
  });
});
