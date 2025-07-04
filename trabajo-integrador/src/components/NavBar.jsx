import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Store/userSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const Navbar = ({ onSearchChange }) => {
  const [inputValue, setInputValue] = useState("");
  const usuario = useSelector((state) => state.user.usuario);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchChange(inputValue);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("sessionUser");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom shadow-sm py-3"
      style={{ backgroundColor: "#6a11cb" }}
    >
      <div className="container d-flex align-items-center justify-content-between">

        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <span style={{ fontSize: '2rem' }}>🛍️</span>
          <span className="fw-bold" style={{ fontSize: '1.6rem', color: 'white' }}>Tienda</span>
        </Link>

        {/* Buscador */}
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

        {/* Acciones */}
        <div className="d-flex align-items-center gap-4 fs-5">

          {/* Usuario */}
          {usuario ? (
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                className="text-dark rounded-pill d-flex align-items-center gap-2"
              >
                👤 <span className="fw-semibold">{usuario.nombre || usuario.correo}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Item disabled>📧 {usuario.correo}</Dropdown.Item>
                <Dropdown.Item as={Link} to="/cuenta">⚙️ Administrar cuenta</Dropdown.Item>
                <Dropdown.Item onClick={cerrarSesion}>🚪 Cerrar sesión</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link
              to="/login"
              title="Iniciar sesión"
              className="text-decoration-none"
              style={{ color: "white" }}
            >
              👤
            </Link>
          )}

          {/* Favoritos */}
          <Link
            to="/Favorites"
            title="Favoritos"
            className="text-decoration-none"
            style={{ color: "white" }}
          >
            ❤️
          </Link>

          {/* Agregar producto */}
          <Link
            to="/create"
            title="Agregar producto"
            className="text-decoration-none"
            style={{ color: "white" }}
          >
            ➕
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
