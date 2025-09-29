import { Routes, Route, Navigate } from "react-router-dom";
import ProductsScreen from "./Screens/ProductsScreen.jsx";
import ProductListPage from "./Screens/ProductListPage.jsx";
import ProductFormPage from "./Screens/ProductFormPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductsScreen />}>
        {/* Redirección por defecto */}
        <Route index element={<Navigate to="list" />} />
        <Route path="list" element={<ProductListPage />} />
        <Route path="form" element={<ProductFormPage />} />
      </Route>
    </Routes>
  );
}

export default App;


