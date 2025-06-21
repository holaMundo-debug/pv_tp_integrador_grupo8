import { Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import FavoritesPage from "./views/FavoritesPage"; 
import CreateProduct from "./views/CreateProduct";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<FavoritesPage />} /> 
      <Route path="/create" element={<CreateProduct />} />

    </Routes>
  );
};

export default App;
