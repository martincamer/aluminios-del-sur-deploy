import { Navigate } from "react-router-dom";
// import useAuth from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  // const { user } = useAuth();

  if (!localStorage.key("email")) {
    return <Navigate to={"/"} />;
  }

  return children;
};
