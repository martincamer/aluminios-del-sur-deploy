import { Navigate } from "react-router-dom";

export const RederictTo = ({ children }) => {
  if (localStorage.key("email")) {
    return <Navigate to={"/home"} />;
  }

  return children;
};
