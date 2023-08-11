import styled from "styled-components";
import imageCarrinho from "../assets/carrinho-de-compras.png";
import imageLogout from "../assets/logout.png"
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function Cabeçalho() {

  const navigate = useNavigate();

  const { isLoged, valorCarrinho, setValorCarrinho, logout, setGetCarrinho } = useContext(LoginContext);

  useEffect(() => {
    isLoged();
  })

  function irParaCarrinho() {

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    }

    axios.get(`${import.meta.env.VITE_API_URL}/carrinho`, config)

      .then((response) => {

        console.log(response.data, "essa é a resposta certa");
        setGetCarrinho(response.data);
        navigate("/carrinho");

      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    }

    axios.get(`${import.meta.env.VITE_API_URL}/carrinho`, config)

      .then((response) => {
        const carrinhodecompras = response.data;
        console.log(carrinhodecompras.length, "opaaaaaa");
        setValorCarrinho(carrinhodecompras.length);

      })

      .catch((error) => {

        console.error(error);

      });

  }, []);



  return (
    <PageContainerTopo>

      <MessageUser>Bem-vindo(a) {localStorage.getItem("user")}! </MessageUser>

      <Logo onClick={() => navigate("/catalogo")}>Me<span>Cansei!</span></Logo>

      <ContainerCarrinho>

        <CarrinhoeContagem>

          <CarrinhoImage src={imageCarrinho} onClick={() => irParaCarrinho()} alt="Carrinho de Compras" />
          <QuantidadeCarrinho>{valorCarrinho}</QuantidadeCarrinho>

        </CarrinhoeContagem>

        <LogoutImage src={imageLogout} alt="Logout" onClick={() => logout()} />

      </ContainerCarrinho>


    </PageContainerTopo>

  )
}

const PageContainerTopo = styled.div`
    display: flex;
    justify-content:space-between;
    align-items: center;
    height: 120px;
    background-image: linear-gradient(to left, #8e44ad, #2a7db4);
    width:100%;
    box-shadow: 0px 4px 4px 0px #00000026;
    position: fixed;
    top: 0;
    left:0;
`
const Logo = styled.h1`
    font-family: 'Roboto', cursive;
    font-weight: 800;
    font-size: 40px;
    color: white;

    span{
        color:turquoise;
    }
`

const MessageUser = styled.h1`
    font-family: 'Roboto', cursive;
    font-weight: 400;
    font-size: 23px;
    color: white;
    margin-left:60px;
`
const CarrinhoImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right:5px;
  cursor: pointer;
`;
const LogoutImage = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const QuantidadeCarrinho = styled.div`
  font-family: 'Roboto', cursive;
  font-weight: 400;
  font-size: 16px;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerCarrinho = styled.div`
    display: flex;
    justify-content:space-around;
    align-items: center;
    margin-right:60px;
`
const CarrinhoeContagem = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    width: 200px;
`
