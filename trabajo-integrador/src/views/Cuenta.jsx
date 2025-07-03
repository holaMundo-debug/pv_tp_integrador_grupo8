import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="container py-4">
      <h2 className="text-primary mb-4">Administrar cuenta</h2>
      <div className="row g-4">
        {/* Notificaciones */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">Notificaciones</h5>
            <label className="form-label">Correo de contacto</label>
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
                onChange={() =>
                  setAceptaNotificaciones(!aceptaNotificaciones)
                }
              />
              <label className="form-check-label">
                Deseo recibir notificaciones por email
              </label>
            </div>
            <button
              className="btn btn-outline-primary w-100"
              onClick={manejarGuardarPreferencias}
            >
              Guardar preferencias
            </button>
          </div>
        </div>

        {/* Cambio de contraseña */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">Cambiar contraseña</h5>
            <form onSubmit={manejarCambioPassword}>
              <label className="form-label">Contraseña actual</label>
              <input
                type="password"
                className="form-control mb-2"
                value={passwordActual}
                onChange={(e) => setPasswordActual(e.target.value)}
              />
              <label className="form-label">Nueva contraseña</label>
              <input
                type="password"
                className="form-control mb-2"
                value={nuevaPassword}
                onChange={(e) => setNuevaPassword(e.target.value)}
              />
              <label className="form-label">Confirmar nueva contraseña</label>
              <input
                type="password"
                className="form-control mb-3"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
              />
              {mensaje && (
                <div className="alert alert-info text-center py-1 mb-3">
                  {mensaje}
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100">
                Actualizar contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuenta;