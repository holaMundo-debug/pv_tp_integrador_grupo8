import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const Navbar = ({ onSearchChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchChange(inputValue); // Solo busca al presionar Enter o clic en 🔍
  };

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom shadow-sm py-3"
      style={{ backgroundColor: "#4e73df" }}
    >
      <div className="container d-flex align-items-center justify-content-between">
        
       <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <span style={{ fontSize: '2rem' }}>🛍️</span>
          <span className="fw-bold" style={{ fontSize: '1.6rem', color: 'white' }}>Tienda</span>
       </Link>

       <form
          className="d-none d-md-flex flex-grow-1 mx-4"
          style={{ maxWidth: '600px' }}
          onSubmit={handleSearch}
        >
          <div className="input-group shadow-sm" style={{ height: '40px' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="form-control border-0 rounded-start"
              placeholder="Buscar productos..."
              style={{ boxShadow: 'none', height: '100%' }}
            />
            <button
              className="btn btn-light border-0 rounded-end"
              type="submit"
              title="Buscar"
              style={{ height: '100%' }}
            >
              🔍
            </button>
          </div>
        </form>

        <div className="d-flex align-items-center gap-4 fs-4">
          <Link to="/create" title="Agregar nuevo producto" className="text-decoration-none" style={{ color: '#20c997' }}>➕</Link> 
          <Link to="/login" title="Mi cuenta" className="text-decoration-none" style={{ color: '#fd7e14' }}>👤</Link> 
          <Link to="/Favorites" title="Favoritos" className="text-decoration-none" style={{ color: '#dc3545' }}>❤️</Link> 
          <Link to="/cart" title="Carrito" className="text-decoration-none" style={{ color: '#17a2b8' }}>🛒</Link> 
        </div>

      </div>
    </nav>
  );
};

export default Navbar;