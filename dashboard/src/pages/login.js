import React, { useState } from "react";
import { onLogin } from "../api/auth";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";
import { Button, Modal } from "react-bootstrap";

const Login = () => {
  const [values, setValues] = useState({
    usuario: "",
    senha: "",
  });

  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [modalAlerta, setShowAlerta] = useState(false);

  const fecharModalAlerta = () => setShowAlerta(false);
  const abrirModalAlerta = () => {
    setShowAlerta(true);
  };

  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await onLogin(values);
      dispatch(authenticateUser());

      localStorage.setItem("isAuth", "true");
    } catch (error) {
      abrirModalAlerta();
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
    }
  };

  console.log(values);

  return (
    <Layout>

      <div className="main-panel">
        <div className="content-wrapper">
          <div className="d-xl-flex justify-content-between align-items-start">
            
            <form onSubmit={(e) => onSubmit(e)} className="container-fluid mt-2">
       <h2 className="text-dark font-weight-bold mb-2">
              {" "}
              Login de Usuário
            </h2>
            
        <div className="input-group input-group-sm mb-2 CaixaSombra">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Usuário:{" "}
          </span>
          <input
            onChange={(e) => onChange(e)}
            type="text"
            id="usuario"
            name="usuario"
            className="form-control"
            value={values.usuario}
            placeholder="Usuário"
            required
          />
        </div>

        <div className="input-group input-group-sm mb-2 CaixaSombra">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Senha:{" "}
          </span>
          <input
            onChange={(e) => onChange(e)}
            type="password"
            value={values.senha}
            className="form-control"
            id="senha"
            name="senha"
            placeholder="Senha"
            required
          />
        </div>

        <Modal show={modalAlerta} onHide={fecharModalAlerta}>
          <Modal.Header closeButton className="input-group-text">
            <Modal.Title>Login de usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className="TextoSombraP"
              style={{ color: "red", margin: "10px 10px" }}
            >
              {error}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="input-group input-group-sm mb-2">
              <Button
                type="submit"
                variant="primary"
                className="TextoSombra"
                onClick={fecharModalAlerta}
              >
                OK
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        <div className="input-group input-group-sm mb-2">
          <button type="submit" className="btn btn-primary TextoSombra">
            Entrar
          </button>
        </div>
            </form>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Login;
