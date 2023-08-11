import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";
import Cabeçalho from "../components/Cabeçalho";
import ListadeProdutos from "../components/ListadeProdutos";
import { LoginContext } from "../contexts/LoginContext";
import FiltroPorCategoria from "../components/FiltroPorCategoria";

export default function Catalogo() {

  const { isLoged, logout } = useContext(LoginContext);

  useEffect(() => {
    isLoged();
  })

  return (
    <ContainerGrandeProdutos>

      <Cabeçalho />

      <FiltroPorCategoria />

      <ListadeProdutos />

    </ContainerGrandeProdutos>
  )
}


const ContainerGrandeProdutos = styled.div`
  height:auto;
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:#ebe8e8 !important;
  justify-content:center;
`
