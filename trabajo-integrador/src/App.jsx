import { Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import FavoritesPage from "./views/FavoritesPage"; 
import CreateProduct from "./views/CreateProduct";
import ProductDetail from "./views/ProductDetail";
import EditProduct from "./views/EditProduct";
import Registro from './views/Registro';
import Login from './views/Login';
import Cuenta from './views/Cuenta';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Routes>

      {/* Rutas públicas */}
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<FavoritesPage />} /> 
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/editar/:id" element={<EditProduct />} />
        <Route path="/cuenta" element={<Cuenta />} />

      </Route>
      
    </Routes>
  );
};

export default App;
