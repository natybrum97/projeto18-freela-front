import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cabeçalho from "../components/Cabeçalho";
import { LoginContext } from "../contexts/LoginContext";

export default function Item() {

  const navigate = useNavigate();

  const { isLoged, getCarrinho, setGetCarrinho, carrinho, setCarrinho, produto, setProduto } = useContext(LoginContext);

  const { id } = useParams();

  useEffect(() => {
    isLoged();

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    }

    const promise = axios.get(`${import.meta.env.VITE_API_URL}/catalogo/${id}`, config);
    promise.then((resposta) => {
      setProduto(resposta.data);
      setCarrinho(resposta.data);

    })

    promise.catch((erro) => console.log(erro.response.data))

    axios.get(`${import.meta.env.VITE_API_URL}/carrinho`, config)

    .then((response) => {
      setGetCarrinho(response.data);
    })

    .catch((error) => {

      console.error(error);

    });


  }, [])

  function addCart() {

    console.log(getCarrinho, "getCarrinho");

    const existingProductIndex = getCarrinho.findIndex(item => item.idProduto === produto[0].id_do_produto);

    console.log(existingProductIndex, "existingProductIndex");

    if (existingProductIndex !== -1) {
      alert('Este produto já está no seu carrinho.');
      return;
    }

    console.log(carrinho);

    const obj = {
      categoria: carrinho[0].categoria_do_produto,
      description: carrinho[0].descricao_do_produto,
      nome: carrinho[0].nome_do_produto,
      url: carrinho[0].foto_do_produto,
      valor: carrinho[0].valor_do_produto,
      idProduto: carrinho[0].id_do_produto
    }

    console.log(obj, "obj");

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    }

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/carrinho`, obj, config);

    promise.then(resposta => {

      alert('Esse produto foi adicionado em seu carrinho com sucesso!')
      navigate("/catalogo");

    });

    promise.catch(erro => {

      console.log(erro.response.data);
      alert(erro.response.data.message || erro.response.data);

    });
  }

 

  return (
    <SCItemPag>
      <Cabeçalho />

      {produto?.map((produto) => (
        <SCItemContainer key={produto.id_do_produto}>

          <img src={produto.foto_do_produto} />

          <SCItemMenu>

            <SCNomeItem>{produto.nome_do_produto}</SCNomeItem>

            <SCDescItem>{produto.descricao_do_produto}</SCDescItem>

            <SCDescItem><span>Categoria do Produto: </span>{produto.categoria_do_produto}</SCDescItem>

            <SCValorQuantContainer>

              <SCValorItem>{(parseFloat(produto.valor_do_produto.replace(/\./g, '').replace(',', '.')) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</SCValorItem>

            </SCValorQuantContainer>

            <SCFinalizarContainer>

              <SCFinalizarButton onClick={() => addCart()}>Adicionar ao carrinho</SCFinalizarButton>

              <SCFinalizarButton onClick={() => {
                navigate("/catalogo")
              }}>Voltar</SCFinalizarButton>

            </SCFinalizarContainer>

          </SCItemMenu>

        </SCItemContainer>
      )
      )}

      {produto?.map((produto) => (
        <SCItemContainer1 key={produto.id_do_produto}>

          <SCNomeItem1>Informações do Vendedor</SCNomeItem1>

          <SCFinalizarContainer1>

            <div>
              <SCDescItem1><span>Nome do Vendedor: </span>{produto.nome_do_vendedor}</SCDescItem1>

              <SCDescItem><span>Email: </span>{produto.email_do_vendedor}</SCDescItem>

            </div>

            <div>
              <SCDescItem1><span>Telefone do Vendedor: </span>{produto.telefone_do_vendedor}</SCDescItem1>

              <SCDescItem><span>Cidade do Vendedor: </span>{produto.cidade_do_vendedor} - {produto.estado_do_vendedor}</SCDescItem>

            </div>

          </SCFinalizarContainer1>

        </SCItemContainer1>
      )
      )}

    </SCItemPag>
  )
}

const SCItemPag = styled.div`
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding-top: 145px;
  width: 100%;
  height:100%;
`
const SCItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
  width: 90%;
  height: auto; /* Alteramos a altura para automática */
  background-color: rgba(90, 90, 90, 0.103);
  box-sizing: border-box;
  padding: 15px;
  border-radius: 15px;
  img {
    width: 45%;
    height: 100%; /* A imagem ocupará a altura total do contêiner */
    object-fit: contain; /* Ajuste para manter a proporção e evitar deformações */
    border-radius: 15px;
  }
`;


const SCItemContainer1 = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;
  width:90%;
  height:90%;
  background-color:rgba(90, 90, 90, 0.103);
  box-sizing:border-box;
  padding:15px;
  border-radius:15px;
  margin-top: 20px;
  margin-bottom: 50px;
  img{
    width:45%;
    border-radius:15px;
  }
`
const SCItemMenu = styled.div`
  width:45%;
  height:100%;
  padding: 10px;
  display:flex;
  flex-direction:column;
  gap:50px;
`
const SCNomeItem = styled.p`
  font-weight:700;
  font-size:40px;
  color:black;
`
const SCNomeItem1 = styled.p`
  font-weight:700;
  font-size:40px;
  color:black;
  margin-bottom: 30px;
`
const SCDescItem = styled.p`
  font-size:30px;
  color:rgb(75, 75, 75);
  span{
    font-weight:600;
  }
`
const SCDescItem1 = styled.p`
  font-size:30px;
  margin-bottom: 20px;
  color:rgb(75, 75, 75);
  span{
    font-weight:600;
  }
`
const SCValorItem = styled.p`
  font-size:35px;
  font-weight:400;
  color:gray;
`
const SCValorQuantContainer = styled.div`
  width:auto;
  height:100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding-right:100px;
`
const SCFinalizarContainer = styled.div`
  width:100%;
  height:100%;
  display:flex;
  justify-content:space-around;
  align-items:center;
  padding-right:100px;
`
const SCFinalizarContainer1 = styled.div`
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  gap: 100px;
  align-items:center;
  padding-right:100px;
`
const SCFinalizarButton = styled.button`
  background-color:#f87b09;
  width:45%;
`