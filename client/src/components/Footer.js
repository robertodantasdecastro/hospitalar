import React from "react";
//import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="main container-fluid footer">
      <div className="py-1">
        <div className="header-upper-links d-flex align-items-center justify-content-between text-end text-lg-center text-top text-white mb-0">
          <div>
            <img src="imgs/humanizaHP.png" alt="" />
          </div>
          <div>
            <img src="imgs/raiosDeSolP.png" alt="" />
          </div>
          <div>
            <img src="imgs/RebecaIasminP.png" alt="" />
          </div>
        </div>
      </div>
      <div className="text-white textoRodape">
        Associação Humaniza - Saúde mental e humanização de mãos dadas! 
      </div>
    </footer>
  );
};

export default Footer;
