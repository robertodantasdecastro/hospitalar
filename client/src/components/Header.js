/* eslint-disable jsx-a11y/alt-text */
import React from "react";
//import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { USRlogado } from "../api/auth";



const Header = () => {
  return (
    <>
      <header className="header-top-strip py-1">
        <Navbar />
      </header>
      <header className="header-upper py-0 CaixaSombra">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-4">
              <img
                className="img-fluid imgCenter TextoSombra"
                src="imgs/Logo_Humaniza.png"
              />
            </div>
            <div className="col-8">
              <p className="text-end text-lg-center text-top text-white mb-0">
                <p className="text-black TextoSombraP">
                  <h3>Grupo Humaniza</h3>{" "}
                  <h6>Tratando pessoas com dignidade!</h6>
                </p>
                <p className="text-black TextoSombraP">
                  <a
                    className="text-black TextoSombraP"
                    href="mailto:contatos@grupohumaniza.com.br"
                  >
                    contatos@grupohumaniza.com.br
                  </a>{" "}
                  -{" "}
                  <a
                    className="text-black TextoSombraP"
                    href="tel:+55 83991977275"
                  >
                    (83)98718-6931
                  </a>{" "}
                  /{" "}
                  <a
                    className="text-black TextoSombraP"
                    href="tel:+55 8321486479"
                  >
                    (83)2148-6479
                  </a>
                  <div className="TextoSombraP" style={{ color: "green", margin: "10px 10px" }}>{USRlogado}</div>
                </p>
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
