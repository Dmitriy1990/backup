import { routes } from "constantes/routes";
import React, { FC, ReactNode } from "react";
import { Navigate, Route } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const PrivateRoute: FC<Props> = ({ children }) => {
  let auth = localStorage.getItem("auth");

  return auth ? children : <Navigate to={routes.auth} />;
};
