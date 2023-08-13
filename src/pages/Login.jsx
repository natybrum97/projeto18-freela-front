import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FreelaLogo from "../components/FreelaLogo";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function enviarInfos(e) {
    e.preventDefault();

    const obj = {
      email: email,
      password: senha
    }

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/signin`, obj);

    promise.then(resposta => {
      localStorage.setItem("token", resposta.data.token);
      localStorage.setItem("user", resposta.data.nome);
      localStorage.setItem("userid", resposta.data.id);
      navigate("/catalogo");

    });

    promise.catch(erro => {

      alert('Usuário e/ou senha inválidos!');
      console.log(erro.response.data);
    });

  }

  return (
    <SingInContainer>

      <form onSubmit={enviarInfos}>

        <FreelaLogo />

        <Input1 placeholder="E-mail" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder="Senha" type="password" autoComplete="new-password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit">Entrar</button>

      </form>

      <Link to='/cadastro'>
        <h2>Primeira vez? Cadastre-se!</h2>
      </Link>

    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color:#ebe8e8 !important;

  button{
    width: calc(100% - 167px);
    background-image: linear-gradient(to left, #8e44ad, #2a7db4);
  }

  h2{
    font-family: 'Roboto', cursive;
    font-weight: 400;
    font-size: 18px;
    color: gray;
  }

`

const Input1 = styled.input`
  margin-top:250px;
`
