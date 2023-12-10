import React, { Fragment, useState, useEffect } from "react";
import {
  VerUsuarios,
  onLogout,
  USRlogado,
  id_usr_logado,
  Acesso,
} from "../api/auth";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
//import { authenticateUser } from "../redux/slices/authSlice";
import { unauthenticateUser } from "../redux/slices/authSlice";




const Dashboard = () => {

  const [ResUsrLocgado, setUsrLogado] = useState([]);
  const VerUsrLogado = async () => {
    try {
      const usr = await USRlogado();
      setUsrLogado(usr.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    VerUsrLogado();
  }, []);

  const [listaAcessos, setAcesso] = useState([]);
  const getAcesso = async () => {
    try {
      const resposta = await Acesso();
      setAcesso(resposta.data.acesso);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAcesso();
  }, []);

  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);

  //USRlogado();

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };

  const protectedInfo = async () => {
    try {
      const USRS = await VerUsuarios();
      
      setProtectedData(USRS.data.usuarios);
     
      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    protectedInfo();
  }, []);

  //console.log(Logago.Nuser);

  return loading ? (
    <Layout>
      <h1>Carregando...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        
        <h7>Usuário logado: <b>{ResUsrLocgado.id+ " - " +ResUsrLocgado.nome}</b></h7>

       
        <Fragment>
          {" "}
          <h5>Usuários do sistema:</h5>
          <table className="table mt5 text-center">
            <thead>
              <tr>
                <th>id</th>
                <th>Usuário</th>
                <th>Nome Completo</th>
                <th>Cargo</th>
                <th>Tipo de aceosso</th>
              </tr>
            </thead>
            <tbody>
              {protectedData &&
                protectedData.map((usuarios) => (
                  <tr key={usuarios.id}>
                    <td>{usuarios.id}</td>
                    <td>{usuarios.usuario}</td>
                    <td>{usuarios.nomecompleto}</td>
                    <td>{usuarios.cargo}</td>
                    <td>{usuarios.acesso}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Fragment>

        <div
          className="TextoSombraP"
          style={{ color: "green", margin: "10px 10px" }}
        ></div>
        <button onClick={() => logout()} className="btn btn-primary">
          Logout
        </button>
      </Layout>
    </div>
  );
};

export default Dashboard;
