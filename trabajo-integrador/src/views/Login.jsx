import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Store/userSlice";

const Login = () => {
  const [formulario, setFormulario] = useState({ correo: "", contraseña: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const manejarEnvio = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("users")) || [];
    const usuarioValido = usuarios.find(
      (u) =>
        u.correo.toLowerCase() === formulario.correo.toLowerCase().trim() &&
        u.contraseña === formulario.contraseña
    );

    if (!usuarioValido) {
      setError("Credenciales inválidas");
    } else {
      localStorage.setItem("sessionUser", JSON.stringify(usuarioValido));
      dispatch(login(usuarioValido)); // <--- esto permite que PrivateRoute funcione
      navigate("/");
    }
  };

  return (
    <section className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center text-primary mb-4">Iniciar sesión</h2>

        <form onSubmit={manejarEnvio}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={formulario.correo}
              onChange={(e) =>
                setFormulario({ ...formulario, correo: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={formulario.contraseña}
              onChange={(e) =>
                setFormulario({ ...formulario, contraseña: e.target.value })
              }
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger py-1 text-center">{error}</div>
          )}

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Ingresar
            </button>
            <Link to="/registro" className="btn btn-outline-primary">
              Registrarse
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;