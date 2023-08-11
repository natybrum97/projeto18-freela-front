import styled from "styled-components";
import { useContext, useEffect } from "react";
import Cabeçalho from "../components/Cabeçalho";
import { LoginContext } from "../contexts/LoginContext";
import FiltroPorCategoria from "../components/FiltroPorCategoria";
import ProdutosPorUser from "../components/ProdutosPorUser";

export default function CatalogoPorUser() {

  const { isLoged } = useContext(LoginContext);

  useEffect(() => {
    isLoged();
  })

  return (
    <ContainerGrandeProdutos>

      <Cabeçalho />

      <FiltroPorCategoria />

      <ProdutosPorUser />

    </ContainerGrandeProdutos>
  )
}


const ContainerGrandeProdutos = styled.div`
  height:auto;
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #CCCCCC;
`