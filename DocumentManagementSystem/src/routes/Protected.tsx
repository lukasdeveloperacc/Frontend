import { Navigate, Outlet } from "react-router-dom";
import { token } from "../atoms";
import { useRecoilValue } from "recoil";

const ProtectedRoute = () => {
  const authToken: string = useRecoilValue(token);

  return <>{authToken ? <Outlet /> : <Navigate to="/login" replace />}</>;
};

export default ProtectedRoute;
