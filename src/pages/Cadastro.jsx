import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useState } from "react";
import axios from "axios";
import FreelaLogo from "../components/FreelaLogo"
import { EndereçoContext } from "../contexts/EndereçoContext";
import { useContext } from "react";

export default function SignUpPage() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const { telefone, setTelefone, cep, setCep, rua, setRua, numeroCasa, setNumeroCasa, state, setState, cidade, setCidade, bairro, setBairro, cpf, setCPF } = useContext(EndereçoContext);

  function formatCPF(value) {
    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/\D/g, "");

    // Aplica a máscara de CPF (###.###.###-##)
    let formattedValue = numericValue.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );

    return formattedValue;
  }

  function handleCPFChange(e) {
    const value = e.target.value;
    const formattedValue = formatCPF(value);
    setCPF(formattedValue);
  }


  const brazilianStates = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
    "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
    "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
  ];


  function enviarInfos(e) {
    e.preventDefault();

    const obj = {
      name: name,
      email: email,
      telefone: telefone,
      cep: cep,
      rua: rua,
      numeroCasa: numeroCasa,
      state: state,
      cidade: cidade,
      bairro: bairro,
      cpf: cpf,
      password: senha,
      confirmPassword: confirmar
    }

    if (senha === confirmar) {

      const promise = axios.post(`${import.meta.env.VITE_API_URL}/signup`, obj);

      promise.then(resposta => {

        alert('Você foi cadastrado com sucesso!')
        console.log(resposta.data);
        navigate("/");

      });

      promise.catch(erro => {

        console.log(erro.response.data);
        alert(erro.response.data.message || erro.response.data);

      });
    } else {
      alert("As senhas disponibilizadas não são iguais!")
    }


  }

  return (
    <SingUpContainer>
      <form onSubmit={enviarInfos}>

        <FreelaLogo />

        <Input2 placeholder="Nome" type="text" id="nome" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="E-mail" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder="Telefone" type="tel" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        <input placeholder="CEP" type="text" id="cep" value={cep} onChange={(e) => setCep(e.target.value)} minLength="8" maxLength="8" required />
        <input placeholder="Rua" type="text" id="rua" value={rua} onChange={(e) => setRua(e.target.value)} required />
        <input placeholder="Por favor, insira o número da sua casa" type="text" id="numerocasa" value={numeroCasa} onChange={(e) => setNumeroCasa(e.target.value)} required />

        <ContainerMenor>
          <Input3 placeholder="Cidade" type="text" id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
          <Select
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          >
            <option value="" disabled>Selecione um estado</option>
            {brazilianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Select>

        </ContainerMenor>

        <input placeholder="Bairro" type="text" id="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
        <input type="text" value={cpf} onChange={handleCPFChange} placeholder="000.000.000-00" minLength="14" maxLength="14" required />
        <input placeholder="Senha" type="password" autoComplete="new-password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} minLength="3" required />
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" id="confirmar" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} minLength="3" required />
        <button type="submit">Cadastrar</button>

      </form>

      <Link to='/'>
        <h2>Já tem uma conta? Entre agora!</h2>
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100%;
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
    margin-bottom:100px;
  }
`

const Input2 = styled.input`
  margin-top:250px;
`

const Input3 = styled.input`
  width:50%;
`
const ContainerMenor = styled.div`
  width: calc(100% - 167px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Select = styled.select`
  width: 50%;
  padding: 15px;
  border: 1px solid #ccc;
  background-color:white;
  border-radius: 5px;
  color: gray;
  font-size: 20px;

  option {
    background-color: #f7f7f7; /* Cor de fundo das opções */
    color: #CCCCCC; /* Cor do texto das opções */
    font-size: 14px; /* Tamanho da fonte das opções */
  }
`;
