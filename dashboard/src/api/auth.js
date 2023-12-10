import axios from "axios";
//const { SERVER_URL } = require("../../../server/src/constants");

axios.defaults.withCredentials = true;

export async function onRegistratios(registrationData) {
  return await axios.post(
    "http://localhost:8000/api/addUser",
    registrationData
  );
}

export async function onLogin(loginData) {
  return await axios.post("http://localhost:8000/api/login", loginData);
}

export async function cidades(uf) {
  return await axios.post("http://localhost:8000/api/cidades", uf);
}

export async function CEP(cep) {
  return await axios.post("http://localhost:8000/api/CEP", cep);
}

export async function bairros(id_cid) {
  return await axios.post("http://localhost:8000/api/bairros", id_cid);
}

export async function logradouro(bairro) {
  return await axios.post("http://localhost:8000/api/logradouro", bairro);
}

export async function decobrirCEPsemBairro(CEPsemBairro) {
  return await axios.post(
    "http://localhost:8000/api/decobrirCEPsemBairro",
    CEPsemBairro
  );
}

export async function decobrirCEP(dadosDescCep) {
  return await axios.post(
    "http://localhost:8000/api/decobrircep",
    dadosDescCep
  );
}

export async function onLogout() {
  return await axios.get("http://localhost:8000/api/logout");
}


export async function VerUsuarios() {
  return await axios.get("http://localhost:8000/api/VerUsuarios");
}

export async function tipoEndereco() {
  return await axios.get("http://localhost:8000/api/tipoEndereco");
}

export async function Cargos() {
  return await axios.get("http://localhost:8000/api/VerCargos");
}

export async function UF() {
  return await axios.get("http://localhost:8000/api/UF");
}

export async function Acesso() {
  return await axios.get("http://localhost:8000/api/acesso");
}

export async function TipoAcesso() {
  return await axios.get("http://localhost:8000/api/tipoAcesso");
}

export async function USRlogado() {
  return await axios.get("http://localhost:8000/api/USRlogado");
}

export async function id_usr_logado() {
  return await axios.get("http://localhost:8000/api/id_usr_logado");
}

