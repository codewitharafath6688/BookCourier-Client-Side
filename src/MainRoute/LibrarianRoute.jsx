import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Forbidden from "../Pages/Forbidden";

const LibrarianRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole(); // Fixed: was `isloading` (typo), now `isLoading`
  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (role !== "librarian") {
    return <Forbidden />;
  }
  return children;
};

export default LibrarianRoute;
