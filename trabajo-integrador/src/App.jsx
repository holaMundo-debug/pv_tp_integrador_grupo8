import { Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import FavoritesPage from "./views/FavoritesPage"; 
import CreateProduct from "./views/CreateProduct";
import ProductDetail from "./views/ProductDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<FavoritesPage />} /> 
      <Route path="/create" element={<CreateProduct />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
};

export default App;
