import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ onSearchChange }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm py-3">
      <div className="container d-flex align-items-center justify-content-between">
        
       <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
  <span style={{ fontSize: '2rem' }}>🛍️</span>
  <span className="fw-bold" style={{ fontSize: '1.6rem' }}>Tienda</span>
</Link>


        
        <form
          className="d-none d-md-flex flex-grow-1 mx-4"
          style={{ maxWidth: '550px' }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="form-control form-control-sm rounded-start"
            placeholder="Buscar productos..."
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button className="btn btn-outline-secondary btn-sm rounded-end" type="submit">
            🔍
          </button>
        </form>

        
        <div className="d-flex align-items-center gap-4 fs-5">
          <Link to="/login" title="Mi cuenta" className="text-decoration-none text-dark">👤</Link>
          <Link to="/Favorites" title="Favoritos" className="text-decoration-none text-dark">🤍</Link>
          <Link to="/cart" title="Carrito" className="text-decoration-none text-dark">🛒</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;