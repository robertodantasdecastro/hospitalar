import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Home from "./pages/Home";
import Login from "./pages/login";
import Registrar from "./pages/register";
import Cadastrar from "./pages/registerAberto";
import Residentes from "./pages/residentes";
import Sair from "./pages/Sair";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return <>{!isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/residentes" element={<Residentes />} />
          <Route path="/register" element={<Registrar />} />
          <Route path="/Sair" element={<Sair />} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path="/registerAberto" element={<Cadastrar />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
