import { RootState } from "configStore";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  // Kiểm tra xem user đã đăng nhập hay chưa
  const { admin } = useSelector((state: RootState) => state.auth);

  if (!admin) {
    // Chưa đăng nhập
    return <Navigate to="/login" />;
  }

  // Đã đăng nhập
  return children;
};

export default ProtectedRoute;
