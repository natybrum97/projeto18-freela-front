import styled from "styled-components";
import { useContext, useEffect } from "react";
import Cabeçalho from "../components/Cabeçalho";
import ListadeProdutos from "../components/ListadeProdutos";
import { LoginContext } from "../contexts/LoginContext";
import FiltroPorCategoria from "../components/FiltroPorCategoria";

export default function Catalogo() {
  const { isLoged } = useContext(LoginContext);

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
