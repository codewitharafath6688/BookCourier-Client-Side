import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Forbidden from "../Pages/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isloading } = useRole();
  if (loading || isloading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default AdminRoute;
