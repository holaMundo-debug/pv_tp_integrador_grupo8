
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
  const navigate = useNavigate();

  const validarCorreo = (correo) => /^\S+@\S+\.\S+$/.test(correo);

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!validarCorreo(formulario.correo)) return setError("Correo inválido");
    if (formulario.contraseña.length < 6) return setError("Contraseña demasiado corta");
    if (formulario.contraseña !== formulario.confirmar)
      return setError("Las contraseñas no coinciden");

    const usuariosExistentes = JSON.parse(localStorage.getItem("users")) || [];
    const correoDuplicado = usuariosExistentes.some((u) => u.correo === formulario.correo);
    if (correoDuplicado) return setError("Este correo ya está registrado");

    const nuevoUsuario = {
      nombre: formulario.nombre,
      apellido: formulario.apellido,
      correo: formulario.correo,
      contraseña: formulario.contraseña,
    };

    localStorage.setItem("users", JSON.stringify([...usuariosExistentes, nuevoUsuario]));
    alert("✅ Registro exitoso");
    navigate("/login");
  };

  return (
    <section className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center text-primary mb-4">Crear cuenta</h2>

        <form onSubmit={manejarEnvio}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={formulario.nombre}
                onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                value={formulario.apellido}
                onChange={(e) => setFormulario({ ...formulario, apellido: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              required
              value={formulario.correo}
              onChange={(e) => setFormulario({ ...formulario, correo: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              required
              value={formulario.contraseña}
              onChange={(e) => setFormulario({ ...formulario, contraseña: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar contraseña</label>
            <input
              type="password"
              className="form-control"
              required
              value={formulario.confirmar}
              onChange={(e) => setFormulario({ ...formulario, confirmar: e.target.value })}
            />
          </div>

          {error && <div className="alert alert-danger text-center py-1">{error}</div>}

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">Registrarte</button>
            <Link to="/login" className="btn btn-outline-primary">Ya tengo una cuenta</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Registro;