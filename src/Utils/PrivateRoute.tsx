import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const PrivateRoute = () => {
  let cookie = new Cookies();
  let token = cookie.get("token");
  let auth = { token: token ? true : false };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
