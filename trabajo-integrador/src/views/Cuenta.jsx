import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/NavBar";
import Footer from "./Footer";

const Cuenta = () => {
  const usuario = useSelector((state) => state.user.usuario);
  const [correoNotif, setCorreoNotif] = useState("");
  const [aceptaNotificaciones, setAceptaNotificaciones] = useState(true);
  const [passwordActual, setPasswordActual] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario) setCorreoNotif(usuario.correo);
  }, [usuario]);

  const manejarCambioPassword = (e) => {
    e.preventDefault();
    
    // Validaciones
    if (passwordActual !== usuario.contraseña) {
      return setMensaje("⚠️ Contraseña actual incorrecta.");
    }
    if (nuevaPassword.length < 6) {
      return setMensaje("⚠️ La nueva contraseña es muy corta.");
    }
    if (nuevaPassword !== confirmarPassword) {
      return setMensaje("⚠️ Las contraseñas no coinciden.");
    }

    // Actualiza el usuario en localStorage
    const usuarios = JSON.parse(localStorage.getItem("users")) || [];
    const actualizados = usuarios.map((u) =>
      u.correo === usuario.correo ? { ...u, contraseña: nuevaPassword } : u
    );

    localStorage.setItem("users", JSON.stringify(actualizados));
    localStorage.setItem(
      "sessionUser",
      JSON.stringify({ ...usuario, contraseña: nuevaPassword })
    );
    setMensaje("✅ Contraseña actualizada correctamente.");

    setPasswordActual("");
    setNuevaPassword("");
    setConfirmarPassword("");

    // Redirige al Home después de mostrar el mensaje
    setTimeout(() => navigate("/"), 1500);
  };

  const manejarGuardarPreferencias = () => {
    // Podés guardar en localStorage si necesitás persistir este valor
    setMensaje("✅ Preferencias guardadas.");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
  <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#ffffff" }}>
    <Navbar />

    <div className="container my-5 flex-grow-1 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "900px", borderRadius: "16px" }}>
        <h2 className="text-center mb-4" style={{ color: "#6a11cb", fontWeight: "bold" }}>
          Administrar Cuenta
        </h2>

        <div className="row g-4">
          {/* Notificaciones */}
          <div className="col-md-6">
            <div className="border rounded p-4 shadow-sm">
              <h5 className="fw-bold mb-3">📬 Notificaciones</h5>
              <label className="form-label fw-semibold">Correo de contacto</label>
              <input
                type="email"
                className="form-control mb-2"
                value={correoNotif}
                onChange={(e) => setCorreoNotif(e.target.value)}
              />
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={aceptaNotificaciones}
                  onChange={() => setAceptaNotificaciones(!aceptaNotificaciones)}
                />
                <label className="form-check-label">
                  Deseo recibir notificaciones por email
                </label>
              </div>
              <button
                className="btn w-100 fw-bold"
                style={{ backgroundColor: "#6a11cb", color: "white" }}
                onClick={manejarGuardarPreferencias}
              >
                Guardar preferencias
              </button>
            </div>
          </div>

          {/* Cambio de contraseña */}
          <div className="col-md-6">
            <div className="border rounded p-4 shadow-sm">
              <h5 className="fw-bold mb-3">🔒 Cambiar Contraseña</h5>
              <form onSubmit={manejarCambioPassword}>
                <label className="form-label fw-semibold">Contraseña actual</label>
                <input
                  type="password"
                  className="form-control mb-2"
                  value={passwordActual}
                  onChange={(e) => setPasswordActual(e.target.value)}
                />
                <label className="form-label fw-semibold">Nueva contraseña</label>
                <input
                  type="password"
                  className="form-control mb-2"
                  value={nuevaPassword}
                  onChange={(e) => setNuevaPassword(e.target.value)}
                />
                <label className="form-label fw-semibold">Confirmar nueva contraseña</label>
                <input
                  type="password"
                  className="form-control mb-3"
                  value={confirmarPassword}
                  onChange={(e) => setConfirmarPassword(e.target.value)}
                />
                {mensaje && (
                  <div className="alert alert-info text-center py-2 mb-3">
                    {mensaje}
                  </div>
                )}
                <button
                  type="submit"
                  className="btn w-100 fw-bold"
                  style={{ backgroundColor: "#6a11cb", color: "white" }}
                >
                  Actualizar contraseña
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

};

export default Cuenta;
