import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { onLogout, USRlogado } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import {
  FaUserPlus,
  FaUsers,
  FaUnlock,
  FaSliders,
} from "react-icons/fa6";



const Navbar = () => {

  const dispatch = useDispatch();

  const [ResUsrLocgado, setUsrLogado] = useState([]);
  const VerUsrLogado = async () => {
    try {
      const usr = await USRlogado();
      setUsrLogado(usr.data.nome);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    VerUsrLogado();
  }, []);


  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };

  
  const { isAuth } = useSelector((state) => state.auth);
  return (
    
    <nav className="py-0 navbar navbar-expand-sm fixed navbar-dark">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <img src="imgs/humanizaHP.png" alt="" />
        </NavLink>
        {isAuth ? (
        <div className="text-white">
          Bem Vindo {ResUsrLocgado}
        </div>
       
           ) : (
            <div></div>
            )}
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          {isAuth ? (
            <div className="navbar-nav ms-auto">
              <NavLink to="/dashboard" className="nav-item nav-link ms-2">
                <FaSliders className="mb-1" />
                <span className="ms-1"> Dashboard</span>
              </NavLink>
              <NavLink to="/residentes" className="nav-item nav-link ms-2">
                <FaUsers className="mb-1" />
                <span className="ms-1"> Residentes</span>
              </NavLink>
              <NavLink to="/register" className="nav-item nav-link ms-2">
                <FaUserPlus className="mb-1" />
                <span className="ms-1"> Novo Usuário</span>
              </NavLink>
              <div className="input-group input-group-sm mb-0 ms-2">
                <button
                  onClick={() => logout()}
                  className="btn btn-primary TextoSombra mb-1"
                >
                  Sair
                </button>
              </div>
            </div>
          ) : (
            <div className="navbar-nav ms-auto">
              <NavLink to="/login" className="nav-item nav-link mt-0">
                <FaUnlock className="mb-0" />{" "}
                <span className="mb-0">Login</span>
              </NavLink>

              <NavLink to="/registerAberto" className="nav-item nav-link mt-0">
                <FaUserPlus className="mb-0" />
                <span className="mb-0"> Novo Usuário</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
