import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Registro = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    confirmar: "",
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState(""); // ✅ nuevo mensaje visual
  const navigate = useNavigate();

  const validarCorreo = (correo) => /^\S+@\S+\.\S+$/.test(correo);

  const manejarEnvio = (e) => {
    e.preventDefault();

    // Validaciones
    if (!validarCorreo(formulario.correo)) return setError("Correo inválido");
    if (formulario.contraseña.length < 6) return setError("Contraseña demasiado corta");
    if (formulario.contraseña !== formulario.confirmar)
      return setError("Las contraseñas no coinciden");

    const usuariosExistentes = JSON.parse(localStorage.getItem("users")) || [];
    const correoDuplicado = usuariosExistentes.some((u) => u.correo === formulario.correo);
    if (correoDuplicado) return setError("Este correo ya está registrado");

    // Registro exitoso
    const nuevoUsuario = {
      nombre: formulario.nombre,
      apellido: formulario.apellido,
      correo: formulario.correo,
      contraseña: formulario.contraseña,
    };

    localStorage.setItem("users", JSON.stringify([...usuariosExistentes, nuevoUsuario]));

    setMensaje("✅ Registro exitoso");
    setError("");

    // Redirigir tras mostrar el mensaje
    setTimeout(() => navigate("/login"), 1800);
  };

  return (
    <section
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#6a11cb" }}
    >
      <div className="card p-4 shadow w-100" style={{ maxWidth: "500px", borderRadius: "16px" }}>
        <h2 className="text-center mb-4" style={{ color: "#6a11cb", fontWeight: "bold" }}>
          Crear cuenta
        </h2>

        <form onSubmit={manejarEnvio}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label" style={{ fontWeight: "600" }}>Nombre</label>
              <input
                type="text"
                className="form-control"
                value={formulario.nombre}
                onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label" style={{ fontWeight: "600" }}>Apellido</label>
              <input
                type="text"
                className="form-control"
                value={formulario.apellido}
                onChange={(e) => setFormulario({ ...formulario, apellido: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "600" }}>Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              required
              value={formulario.correo}
              onChange={(e) => setFormulario({ ...formulario, correo: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "600" }}>Contraseña</label>
            <input
              type="password"
              className="form-control"
              required
              value={formulario.contraseña}
              onChange={(e) => setFormulario({ ...formulario, contraseña: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "600" }}>Confirmar contraseña</label>
            <input
              type="password"
              className="form-control"
              required
              value={formulario.confirmar}
              onChange={(e) => setFormulario({ ...formulario, confirmar: e.target.value })}
            />
          </div>

          {/* ✅ mensajes visuales */}
          {error && <div className="alert alert-danger text-center py-1">{error}</div>}
          {mensaje && <div className="alert alert-success text-center py-1">{mensaje}</div>}

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#6a11cb", color: "white", fontWeight: "bold" }}
            >
              Registrarte
            </button>
            <Link
              to="/login"
              className="btn"
              style={{
                border: "2px solid #6a11cb",
                color: "#6a11cb",
                fontWeight: "bold"
              }}
            >
              Ya tengo una cuenta
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Registro;
