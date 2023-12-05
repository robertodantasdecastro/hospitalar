import Layout from "../components/Layout";
//import { useSelector } from "react-redux";
import { onLogout } from "../api/auth";

const Sair = () => {
  
  return (
    <Layout>
      <div className="container-fluid mt-2">
        <h3 className="TextoSombraP">Sair</h3>
      </div>   
    </Layout>    
  );
};

//await onLogout();
//const isAuth = false;
export default Sair;
