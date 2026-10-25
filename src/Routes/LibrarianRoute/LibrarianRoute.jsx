import React from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Loading from "../../Components/Loading/Loading";
import Forbidden from "../../Components/Forbidden/Forbidden";

const LibrarianRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <Loading />;
  }
  if (role !== "librarian") {
    return <Forbidden />;
  }
  return children;
};

export default LibrarianRoute;
