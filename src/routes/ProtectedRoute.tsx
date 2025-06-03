import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "../store/storeHooks";
import Preloader from "../components/shared/Preloader/Preloader";
import PrivateLayout from "../layouts/PrivateLayout/PrivateLayout";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, user, isAuthReady } = useAppSelector(
    (state) => state.auth
  );
  const location = useLocation();

  if (!isAuthReady) {
    return <Preloader />;
  }

  if (!isAuthenticated && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
};

export default ProtectedRoute;
