import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Cadastro from "./pages/Cadastro";
import Carrinho from "./pages/Carrinho";
import Catalogo from "./pages/Catalogo";
import Inserir from "./pages/InserirDesapego";
import Login from "./pages/Login"
import Checkout from "./pages/Checkout";
import { LoginProvider } from "./contexts/LoginContext.jsx";
import { EndereçoProvider } from "./contexts/EndereçoContext.jsx";
import CatalogoPorCategoria from "./pages/CatalogoPorCategoria";
import CatalogoPorUser from "./pages/CatalogoPorUser";
import Item from "./pages/Item";
import Confirmacao from "./pages/Confirmacao";

export default function App() {

  return (

    <PagesContainer>
      <BrowserRouter>
      <EndereçoProvider>
        <LoginProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/inserirProdutos" element={<Inserir />} />
            <Route path="/produtos/categoria/:categoria" element={<CatalogoPorCategoria />} />
            <Route path="/produtos/user" element={<CatalogoPorUser />} />
            <Route path="/item/:id" element={<Item />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmacao" element={<Confirmacao />} />
          </Routes>
        </LoginProvider>
        </EndereçoProvider>
      </BrowserRouter>
    </PagesContainer>
  )
}


const PagesContainer = styled.main`
  width: 100%;
  max-height: 100vh;
`
