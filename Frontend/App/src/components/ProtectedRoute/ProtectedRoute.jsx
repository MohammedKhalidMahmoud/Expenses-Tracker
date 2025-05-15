import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { tokenContext } from "../../context/token";
export default function ProtectedRoute({ children}) {
    const {token} = useContext(tokenContext);
  if (!token) {
    // User not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User authenticated, render the child route
  return children;
}