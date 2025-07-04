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
    <section
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#6a11cb" }}
    >
      <div className="card p-4 shadow w-100" style={{ maxWidth: "400px", borderRadius: "16px" }}>
        <h2 className="text-center mb-4" style={{ color: "#6a11cb", fontWeight: "bold" }}>
          Iniciar sesión
        </h2>

        <form onSubmit={manejarEnvio}>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "600" }}>
              Correo electrónico
            </label>
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
            <label className="form-label" style={{ fontWeight: "600" }}>
              Contraseña
            </label>
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

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#6a11cb", color: "white", fontWeight: "bold" }}
            >
              Ingresar
            </button>

            <Link
              to="/registro"
              className="btn"
              style={{
                border: "2px solid #6a11cb",
                color: "#6a11cb",
                fontWeight: "bold"
              }}
            >
              Registrarse
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
