import Layout from "../components/Layout";
import React, { Fragment, useState, useEffect } from "react";
import { Acesso, Cargos } from "../api/auth";


const Home = () => {
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

  console.log(listaAcessos);

  const [listaCargos, setCargos] = useState([]);
  const getCargos = async () => {
    try {
      const resposta = await Cargos();
      setCargos(resposta.data.cargos);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCargos();
  }, []);

  console.log(listaCargos);

  return (
    <Layout>
      <div className="container-fluid mt-2">
        <h3 className="TextoSombraP">Home</h3>
      </div>
      <div>
        <Fragment>
          {" "}
          <h1>Acesso</h1>
          <table className="table mt5 text-center">
            <thead>
              <tr>
                <th>id</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {listaAcessos &&
                listaAcessos.map((acesso) => (
                  <tr key={acesso.id}>
                    <td>{acesso.id}</td>
                    <td>{acesso.descricao}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Fragment>
      </div>

      <div>
        <Fragment>
          {" "}
          <h1>Cargos</h1>
          <table className="table mt5 text-center">
            <thead>
              <tr>
                <th>id</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {listaCargos &&
                listaCargos.map((cargos) => (
                  <tr key={cargos.id}>
                    <td>{cargos.id}</td>
                    <td>{cargos.descricao}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Fragment>
      </div>
      
    </Layout>
  );
};

export default Home;
