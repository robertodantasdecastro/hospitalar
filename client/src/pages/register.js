import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { IMaskInput } from "react-imask";

//import { Formik, Form, Field, ErrorMessage } from "formik";
//import * as yup from "yup";


import { Button, Modal, Dropdown, Row } from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa6";
import {
  onRegistratios,
  Acesso,
  Cargos,
  UF,
  cidades,
  CEP,
  bairros,
  logradouro,
  decobrirCEPsemBairro,
  decobrirCEP,
} from "../api/auth";


const Register = () => {
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
  //console.log(listaAcessos);

  const [listaUF, setUF] = useState([]);
  const getUF = async () => {
    try {
      const resposta = await UF();
      setUF(resposta.data.UF);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getUF();
  }, []);
  // console.log(listaUF);


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

  const [values, setValues] = useState({
    usuario: "",
    nomecompleto: "",
    CPF: "",
    identidade: "",
    senha: "",
    ativo: true,
    nascimento: "",

    email: "",
    celular: "",
    telfixo: "",

    CEP: "",
    UF: "",
    cidade: "",
    bairro: "",
    logradouro: "",
    numero: "",
    complemento: "",
    referencia: "",
    cargo: "",
    tipoacesso: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(true);

  const [modalAlerta, setShowAlerta] = useState(false);

  const fecharModalAlerta = () => setShowAlerta(false);
  const abrirModalAlerta = () => {
    setShowAlerta(true);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const LogradouroClick = (preencheLogradouro) => {
    setValues({ ...values, logradouro: preencheLogradouro });
  };
 
  const onSubmit = async (e) => {
    e.preventDefault();
    // const response = await onRegistratios(values)
    try {
      abrirModalAlerta();
      const response = await onRegistratios(values);
      console.log(response);
      liparEndereco();
      setError("");
      setSuccess(response.data.message);
      setValues({
        usuario: "",
        nomecompleto: "",
        CPF: "",
        identidade: "",
        senha: "",
        ativo: true,
        nascimento: "",

        email: "",
        celular: "",
        telfixo: "",

        CEP: "",
        UF: "",
        cidade: "",
        bairro: "",
        logradouro: "",
        numero: "",
        complemento: "",
        referencia: "",
        cargo: "",
        tipoacesso: "",
      });
    } catch (error) {
      abrirModalAlerta();
      console.log(error.response);
      setError(error.response.data.errors[0].msg);
      // setError(error.response.request.response)
    }
  };

  console.log(values);

  const [listaCidades, setCidades] = useState([]);
  const getCidades = async () => {
    let selUf = {
      uf: values.UF,
    };
    try {
      const resposta = await cidades(selUf);
      setCidades(resposta.data.Cidades);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getCidades();
  }, [values.UF]);

  const [listabairro, cod_cid] = useState([]);
  const getBairro = async () => {
    let digIBGE = {
      id_cid: values.cidade,
    };
    try {
      const resposta = await bairros(digIBGE);
      cod_cid(resposta.data.Bairros);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getBairro();
  }, [values.cidade]);

  const qtdBairro = listabairro.length;

  console.log("QTD BAIRROS ==>");
  console.log(qtdBairro);

  const [show, setShow] = useState(false);
  const fecharModalCEP = () => setShow(false);
  const consultaModalCEP = () => {
    setShow(false);
    getEndereco();
  };
  const ModalCEP = () => {
    preencherCampoCEP("");
    setShow(true);
  };
  
  function liparEndereco(json) {
    setValues({
      ...values,
      CEP: "",
      UF: "",
      cidade: "",
      bairro: "",
      logradouro: "",
      numero: "",
      complemento: "",
      referencia: "",
    });

    document.querySelector("input[name=CEP]").value = "";
    values.CEP = document.querySelector("input[name=CEP]").value;

    document.querySelector("select[name=UF]").value = "";
    values.UF = document.querySelector("select[name=UF]").value;

    document.querySelector("select[name=cidade]").value = "";
    values.cidade = document.querySelector("select[name=cidade]").value;

    document.querySelector("select[name=bairro]").value = "";
    values.bairro = document.querySelector("select[name=bairro]").value;

    document.querySelector("input[name=logradouro]").value = "";
    values.logradouro = document.querySelector("input[name=logradouro]").value;
  }

  function limparCEP(json) {
    setValues({
      ...values,
      CEP: "",
      UF: "",
      cidade: "",
      bairro: "",
      logradouro: "",
      numero: "",
      complemento: "",
      referencia: "",
    });
    document.querySelector("input[name=CEP]").value = false;
    values.CEP = document.querySelector("input[name=CEP]").value;

    document.querySelector("select[name=UF]").value = false;
    values.UF = document.querySelector("select[name=UF]").value;

    document.querySelector("select[name=cidade]").value = false;
    values.cidade = document.querySelector("select[name=cidade]").value;

    document.querySelector("select[name=bairro]").value = false;
    values.bairro = document.querySelector("select[name=bairro]").value;

    document.querySelector("input[name=logradouro]").value = false;
    values.logradouro = document.querySelector("input[name=logradouro]").value;
  };

  const [pegaEndereco, infCEP] = useState([]);

  const getEndereco = async () => {
    let digCEP = {
      cep: values.CEP,
    };

    // console.log("CEP Limpo: " + digCEP);
    try {
      const resposta = await CEP(digCEP);

      infCEP(resposta.data.enderecoCEP);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getEndereco();
  }, [values.UF]);

  // console.log(pegaEndereco);

  const [listalogradouro, saidaEndereco] = useState([]);
  const getLogradouro = async () => {
    let digCidade = {
      id_cid: values.cidade,
      bairro: values.bairro,
    };

    try {
      const resposta = await logradouro(digCidade);
      values.CEP = values.CEPFotmat;
      saidaEndereco(resposta.data.Logradouro);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getLogradouro();
  }, [values.cidade && values.bairro]);

  const [saidaCEP, entradaDados] = useState([]);

  const DescCEPsBairro = async () => {
    let dadosCEP = {
      uf: values.UF,
      id_cid: values.cidade,
      bairro: values.bairro,
    };

    try {
      let resposta = await decobrirCEPsemBairro(dadosCEP);
      entradaDados(resposta.data.CEP);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    DescCEPsBairro();
  }, [values.UF, values.cidade, values.bairro]);

  const DescCEP = async () => {
    let dadosCEP = {
      uf: values.UF,
      id_cid: values.cidade,
      bairro: values.bairro,
      logradouro: values.logradouro,
    };

    try {
      let resposta = await decobrirCEP(dadosCEP);
      entradaDados(resposta.data.CEP);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    DescCEP();
  }, [values.cidade && values.bairro && values.logradouro]);

  function preencherCampoCEP(json) {
    const CEPado = json;
    document.querySelector("input[name=CEP]").value = CEPado;
    values.CEP = document.querySelector("input[name=CEP]").value;
  }

  const EncontraCEP = saidaCEP && saidaCEP.map((CEP) => CEP.cep);

  useEffect(() => {
    console.log(
      "CEP encontrado: " + EncontraCEP + (" Tam: " + EncontraCEP.length)
    );
  }, [values.UF && values.cidade && values.bairro && EncontraCEP.length]);

  if (EncontraCEP.length > 0) {
    //  console.log(" --> CEP encontrado: " + EncontraCEP + (" Tam: " + EncontraCEP.length));
    preencherCampoCEP(EncontraCEP);
  }

  function preencherEndercoCEP(json) {
    let CEP = json.map((cep) => cep.cep);
    CEP = CEP.toString().replace("-", "").replace(/-/, "").replace(".", "");
    console.log("CEP: " + CEP);
    document.querySelector("input[name=CEP]").value = CEP;
    values.CEP = document.querySelector("input[name=CEP]").value;

    let ESTADO = json.map((uf) => uf.uf);
    console.log("ESTADO: " + ESTADO);
    document.querySelector("select[name=UF]").value = ESTADO;
    values.UF = document.querySelector("select[name=UF]").value;

    let CIDADE = json.map(
      (descricao_cidade) => descricao_cidade.descricao_cidade
    );
    let ID_CIDADE = json.map((id_cidade) => id_cidade.id_cidade);
    ID_CIDADE = ID_CIDADE.toString()
      .replace("-", "")
      .replace(/-/, "")
      .replace(".", "");
    console.log("CIDADE: " + CIDADE + " ID: " + ID_CIDADE);
    document.querySelector("select[name=cidade]").value = ID_CIDADE;
    values.cidade = document.querySelector("select[name=cidade]").value;

    let BAIRRO = json.map(
      (descricao_bairro) => descricao_bairro.descricao_bairro
    );

    document.querySelector("select[name=cidade]").value = ID_CIDADE;
    values.cidade = document.querySelector("select[name=cidade]").value;

    if (qtdBairro > 4) {
      if (BAIRRO.length > 0) {
        console.log("BAIRRO: " + BAIRRO);
        document.querySelector("select[name=bairro]").value = BAIRRO;
        values.bairro = document.querySelector("select[name=bairro]").value;
      }

      let LOGRADOURO = json.map((descricao) => descricao.descricao);
      if (LOGRADOURO.length >= 0 && LOGRADOURO !== "" && LOGRADOURO) {
        console.log("LOGRADOURO: " + LOGRADOURO);
        document.querySelector("input[name=logradouro]").value = LOGRADOURO;
        values.logradouro = document.querySelector(
          "input[name=logradouro]"
        ).value;
        // values.logradouro = LOGRADOURO
      } else {
        values.logradouro = document.querySelector(
          "input[name=logradouro]"
        ).onChange = (e) => onChange(e);
      }
    }
  }

  
  

  if (pegaEndereco.length > 0) {
    console.log("string Edereco: ");
    console.log(pegaEndereco);
    console.log("string Edereco CEP: ");
    preencherEndercoCEP(pegaEndereco);
  }

  const CPFMask = "000.000.000-00";
  const CelMask = "(00) 00000-0000";
  const FixoMask = "(00) 0000-0000";
  const CEPMask = "00.000-000";
  const NascimentoMask = "00/00/0000";
  const EmailMask = /^\S*@?\S*$/;

  return (
    <Layout>
      <div className="container-fluid justify-content-md-center">
        <form onSubmit={(e) => onSubmit(e)}>
          <br />

          <h4 className="TextoSombraP">
            <FaUserPlus className="mb-0" /> Cadastrar Usuário
          </h4>
          <hr />

          <Row>
          <h6 className="TextoSombraP">Dados pessoais:</h6>

          <div className="input-group justify-content-center">
            <div className="col-10 input-group-sm me-3 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Nome Completo:{" "}
              </span>
              <input
                onChange={(e) => onChange(e)}
                type="text"
                id="nomecompleto"
                name="nomecompleto"
                className="form-control"
                value={values.nomecompleto}
                placeholder="Nome Completo"
                required
              />
            </div>

            <div className="col-5 input-group-sm me-2 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                CPF:{" "}
              </span>
              <IMaskInput
                onChange={(e) => onChange(e)}
                type="text"
                id="CPF"
                name="CPF"
                className="form-control"
                pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}"
                mask={CPFMask}
                value={values.CPF}
                placeholder="000.000.000-00"
                required
              />
            </div>

            <div className="col-5 input-group-sm me-2 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Identidade:{" "}
              </span>
              <input
                onChange={(e) => onChange(e)}
                type="text"
                id="identidade"
                name="identidade"
                className="form-control"
                value={values.identidade}
                placeholder="12344567  Emissor/UF"
                required
              />
            </div>
            
            <div className="col-5 input-group-sm me-2 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Danta de nascimento:{" "}
              </span>
              <IMaskInput
                onChange={(e) => onChange(e)}
                type="text"
                id="nascimento"
                name="nascimento"
                className="form-control"
                mask={NascimentoMask}
                value={values.nascimento}
                placeholder="Danta de nascimento"
                required
              />
            </div>

            <div className="col-5 input-group-sm me-2 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                e-mail:{" "}
              </span>
              <IMaskInput
                onChange={(e) => onChange(e)}
                type="email"
                id="email"
                name="email"
                className="form-control"
                mask={EmailMask}
                value={values.email}
                placeholder="email@servidor.com.br"
                required
              />
            </div>

            <div className="col-5 input-group-sm me-2 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Celular:{" "}
              </span>
              <IMaskInput
                onChange={(e) => onChange(e)}
                type="text"
                id="celular"
                name="celular"
                mask={CelMask}
                className="form-control"
                value={values.celular}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="col-5 input-group-sm me-2 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Fone Fixo:{" "}
              </span>
              <IMaskInput
                onChange={(e) => onChange(e)}
                type="text"
                id="telfixo"
                name="telfixo"
                mask={FixoMask}
                className="form-control"
                value={values.telfixo}
                placeholder="(00) 0000-0000"
              />
            </div>

          </div>
          </Row>

          <hr />
          <Row>
          <h6 className="TextoSombraP">Endereço:</h6>
          <div className="input-group justify-content-center">
            <div className="col-3 input-group-sm me-2 mb-2 CaixaSombra">
              <span
                className="input-group-text input-group-text-leitura"
                id="inputGroup-sizing-sm"
              >
                CEP:{" "}
              </span>

              <div className="input-group-sm input-group">
                <IMaskInput
                  onChange={(e) => onChange(e)}
                  type="text"
                  id="CEP"
                  name="CEP"
                  className="form-control-leitura form-control"
                  mask={CEPMask}
                  value={values.CEP}
                  placeholder="CEP"
                  readonly="readonly"
                />

                <Button
                  variant="success"
                  className="TextoSombra"
                  onClick={ModalCEP}
                >
                  Inf. CEP
                </Button>
              </div>
            </div>

            <Modal show={show} onHide={fecharModalCEP}>
              <Modal.Header closeButton className="input-group-text">
                <Modal.Title>Informe o CEP</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="input-group input-group-sm mb-2 CaixaSombra">
                  <span
                    className="input-group-text input-group-text-leitura"
                    id="inputGroup-sizing-sm"
                  >
                    CEP:{" "}
                  </span>
                  <IMaskInput
                    onChange={(e) => onChange(e)}
                    type="text"
                    id="CEP"
                    name="CEP"
                    className="form-control-leitura form-control"
                    mask={CEPMask}
                    value={values.CEP}
                    placeholder="CEP"
                    required
                  />

                  <Button
                    variant="success"
                    className="TextoSombra"
                    onClick={limparCEP}
                  >
                    Limpar
                  </Button>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="input-group input-group-sm mb-2 TextoSombra">
                  <Button
                    variant="danger"
                    onClick={fecharModalCEP}
                    className="TextoSombra"
                  >
                    Sair
                  </Button>
                  <Button
                    variant="success"
                    onClick={consultaModalCEP}
                    className="TextoSombra"
                  >
                    Consultar Endereço
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>

            <div className="col-3 input-group-sm me-2 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                UF:{" "}
              </span>
              <select
                onChange={(e) => onChange(e)}
                type="select"
                id="UF"
                className="form-select"
                name="UF"
                value={values.UF}
                required
              >
                <option value="" selected>
                  Escolha um Estado
                </option>
                {listaUF &&
                  listaUF.map((UF) => (
                    <option value={UF.sigla}>{UF.nome}</option>
                  ))}
              </select>
            </div>

            <div className="col-4 input-group-sm me-2 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Cidade:{" "}
              </span>
              <select
                onChange={(e) => onChange(e)}
                type="select"
                id="cidade"
                className="form-select"
                name="cidade"
                value={values.cidade}
                required
              >
                <option value="" selected>
                  Escolha uma Cidade
                </option>
                {listaCidades &&
                  listaCidades.map((Cidades) => (
                    <option value={Cidades.id_cidade}>
                      {Cidades.descricao_cidade}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-3 input-group-sm me-2 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Bairro:{" "}
              </span>
              <select
                onChange={(e) => onChange(e)}
                type="select"
                id="bairro"
                className="form-select"
                name="bairro"
                value={values.bairro}
                required
              >
                <option value="" selected>
                  Escolha um Bairro
                </option>

                {listabairro &&
                  listabairro.map((Bairros) => (
                    <option value={Bairros.descricao_bairro}>
                      {Bairros.descricao_bairro}
                    </option>
                  ))}

                <option value="Rural">Rural</option>
              </select>
            </div>

            <div className="col-6 input-group-sm me-2 mb-0 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Logradouro:{" "}
              </span>
              <input
                onChange={(e) => onChange(e)}
                type="text"
                id="logradouro"
                name="logradouro"
                className="form-control"
                value={values.logradouro}
                placeholder="Logradouro"
                required
              />
              <Dropdown
                className=" mb-0 TextoSombraP dropdown-row"
                data-bs-theme="dark"
              >
                {listalogradouro &&
                  listalogradouro
                    .filter((Logradouro) => {
                      const preencheLogradouro =
                        values.logradouro?.toLowerCase();
                      const logradouroEndereco =
                        Logradouro.descricao_sem_numero?.toLowerCase();
                      return (
                        preencheLogradouro &&
                        logradouroEndereco.startsWith(preencheLogradouro) &&
                        logradouroEndereco !== preencheLogradouro
                      );
                    })
                    .slice(0, 10)
                    .map((Logradouro) => (
                      <div
                        onClick={() => {
                          LogradouroClick(Logradouro.descricao_sem_numero);
                        }}
                        className="dropdown-row"
                        value={Logradouro.descricao_sem_numero}
                        onChange={(e) => {
                          LogradouroClick(Logradouro.descricao_sem_numero);
                        }}
                      >
                        {Logradouro.descricao_sem_numero}
                      </div>
                    ))}
              </Dropdown>
            </div>

            <div className="col-1 input-group-sm me-2 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Nº.:{" "}
              </span>
              <input
                onChange={(e) => onChange(e)}
                type="text"
                id="numero"
                name="numero"
                className="form-control"
                value={values.numero}
                placeholder="Nº."
                required
              />
            </div>

            <div className="col-5 input-group-sm me-2 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Comlemento:{" "}
              </span>
              <input
                onChange={(e) => onChange(e)}
                type="text"
                id="complemento"
                name="complemento"
                className="form-control"
                value={values.complemento}
                placeholder="Complemento"
              />
            </div>

            <div className="col-5 input-group-sm me-2 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Referencias:{" "}
              </span>
              <input
                onChange={(e) => onChange(e)}
                type="text"
                id="referencia"
                name="referencia"
                className="form-control"
                value={values.referencia}
                placeholder="Referências"
              />
            </div>
          </div>
          </Row>
          <hr />
          <Row>
          <h6 className="TextoSombraP">Informações da conta:</h6>
          <div className="input-group justify-content-center">
            <div className="col-5 input-group-sm me-2 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Tipo de acesso:{" "}
              </span>
              <select
                onChange={(e) => onChange(e)}
                type="select"
                id="tipoacesso"
                className="form-select"
                name="tipoacesso"
                value={values.tipoacesso}
                required
              >
                <option value="" selected>
                  Escolha o tipo de acesso
                </option>
                {listaAcessos &&
                  listaAcessos.map((acesso) => (
                    <option value={acesso.id}>{acesso.descricao}</option>
                  ))}
              </select>
            </div>

            <div className="col-5 input-group-sm me-2 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Cargo:{" "}
              </span>
              <select
                onChange={(e) => onChange(e)}
                type="select"
                id="cargo"
                className="form-select"
                name="cargo"
                value={values.cargo}
                required
              >
                <option value="" selected>
                  Escolha um cargo
                </option>
                {listaCargos &&
                  listaCargos.map((cargos) => (
                    <option value={cargos.id}>{cargos.descricao}</option>
                  ))}
              </select>
            </div>

            <div className="col-5 input-group-sm me-2 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Nome do Usuário:{" "}
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

            <div className="col-5 input-group-sm me-2 mb-2 CaixaSombra">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Senha:{" "}
              </span>
              <input
                onChange={(e) => onChange(e)}
                type="password"
                id="senha"
                name="senha"
                className="form-control"
                value={values.senha}
                placeholder="Senha"
                required
              />
            </div>
          </div>
          </Row>
          <Modal show={modalAlerta} onHide={fecharModalAlerta}>
            <Modal.Header closeButton className="input-group-text">
              <Modal.Title>Cadastro de usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <div
                className="TextoSombraP"
                style={{ color: "red", margin: "10px 10px" }}
              >
                {error}
              </div>

              <div
                className="TextoSombraP"
                style={{ color: "green", margin: "10px 10px" }}
              >
                {success}
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
            <Button type="submit" variant="primary" className="TextoSombra">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
