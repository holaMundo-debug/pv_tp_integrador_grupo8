import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const usuario = useSelector((state) => state.user.usuario);
  return usuario ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;