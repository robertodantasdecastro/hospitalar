import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { onLogout, USRlogado } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { FaUserPlus, FaUsers, FaUnlock, FaSliders } from "react-icons/fa6";

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
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-category">Main</li>
        <li className="nav-item">
          <a className="nav-link" href="index.html">
            <span className="icon-bg">
              <i className="mdi mdi-cube menu-icon"></i>
            </span>
            <span className="menu-title">Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#ui-basic"
            aria-expanded="false"
            aria-controls="ui-basic"
          >
            <span className="icon-bg">
              <i className="mdi mdi-crosshairs-gps menu-icon"></i>
            </span>
            <span className="menu-title">UI Elements</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <a className="nav-link" href="pages/ui-features/buttons.html">
                  Buttons
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/ui-features/dropdowns.html">
                  Dropdowns
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="pages/ui-features/typography.html"
                >
                  Typography
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="pages/icons/mdi.html">
            <span className="icon-bg">
              <i className="mdi mdi-contacts menu-icon"></i>
            </span>
            <span className="menu-title">Icons</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="pages/forms/basic_elements.html">
            <span className="icon-bg">
              <i className="mdi mdi-format-list-bulleted menu-icon"></i>
            </span>
            <span className="menu-title">Forms</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="pages/charts/chartjs.html">
            <span className="icon-bg">
              <i className="mdi mdi-chart-bar menu-icon"></i>
            </span>
            <span className="menu-title">Charts</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="pages/tables/basic-table.html">
            <span className="icon-bg">
              <i className="mdi mdi-table-large menu-icon"></i>
            </span>
            <span className="menu-title">Tables</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#auth"
            aria-expanded="false"
            aria-controls="auth"
          >
            <span className="icon-bg">
              <i className="mdi mdi-lock menu-icon"></i>
            </span>
            <span className="menu-title">User Pages</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="auth">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <a className="nav-link" href="pages/samples/blank-page.html">
                  {" "}
                  Blank Page
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/samples/login.html">
                  {" "}
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/samples/register.html">
                  {" "}
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/samples/error-404.html">
                  {" "}
                  404
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/samples/error-500.html">
                  {" "}
                  500
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item documentation-link">
          <a
            className="nav-link"
            href="http://www.bootstrapdash.com/demo/connect-plus-free/jquery/documentation/documentation.html"
            target="_blank"
          >
            <span className="icon-bg">
              <i className="mdi mdi-file-document-box menu-icon"></i>
            </span>
            <span className="menu-title">Documentation</span>
          </a>
        </li>
        <li className="nav-item sidebar-user-actions">
          <div className="user-details">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="d-flex align-items-center">
                  <div className="sidebar-profile-img">
                    <img src="assets/images/faces/face28.png" alt="image" />
                  </div>
                  <div className="sidebar-profile-text">
                    <p className="mb-1">Henry Klein</p>
                  </div>
                </div>
              </div>
              <div className="badge badge-danger">3</div>
            </div>
          </div>
        </li>
        <li className="nav-item sidebar-user-actions">
          <div className="sidebar-user-menu">
            <a href="#" className="nav-link">
              <i className="mdi mdi-settings menu-icon"></i>
              <span className="menu-title">Settings</span>
            </a>
          </div>
        </li>
        <li className="nav-item sidebar-user-actions">
          <div className="sidebar-user-menu">
            <a href="#" className="nav-link">
              <i className="mdi mdi-speedometer menu-icon"></i>
              <span className="menu-title">Take Tour</span>
            </a>
          </div>
        </li>
        <li className="nav-item sidebar-user-actions">
          <div className="sidebar-user-menu">
            <a href="#" className="nav-link">
              <i className="mdi mdi-logout menu-icon"></i>
              <span className="menu-title">Log Out</span>
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
