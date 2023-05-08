import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const PrivateRoute = () => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  const auth = { token: token ? true : false };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
