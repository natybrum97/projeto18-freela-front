import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cabeçalho from "../components/Cabeçalho";
import { LoginContext } from "../contexts/LoginContext";

export default function Item() {

  const navigate = useNavigate();

  const { isLoged, carrinho, setCarrinho, produto, setProduto } = useContext(LoginContext);

  const { id } = useParams();

  function addCart() {

    const obj = {
      categoria: carrinho[0].categoria_do_produto,
      description: carrinho[0].descricao_do_produto,
      nome: carrinho[0].nome_do_produto,
      url: carrinho[0].foto_do_produto,
      valor: carrinho[0].valor_do_produto
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
      console.log(resposta.data);
      navigate("/catalogo");

    });

    promise.catch(erro => {

      console.log(erro.response.data);
      alert(erro.response.data.message || erro.response.data);

    });
  }

  useEffect(() => {
    isLoged();

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    }

    const promise = axios.get(`${import.meta.env.VITE_API_URL}/catalogo/${id}`,config);
    promise.then((resposta) => {
      setProduto(resposta.data);
      setCarrinho(resposta.data);
      console.log(resposta.data, "aqui!")

    })

    promise.catch((erro) => console.log(erro.response.data))

  }, [])

  return (
    <SCItemPag>
      <Cabeçalho />

      {produto?.map((produto) => (
        <SCItemContainer key={produto.id_do_produto}>

          <img src={produto.foto_do_produto} />

          <SCItemMenu>

            <SCNomeItem>{produto.nome_do_produto}</SCNomeItem>

            <SCDescItem>{produto.descricao_do_produto}</SCDescItem>

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

    </SCItemPag>
  )
}

const SCItemPag = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  padding-top: 145px;
  width: 100%;
  height:100%;
`
const SCItemContainer = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:top;
  width:90%;
  height:90%;
  background-color:rgba(90, 90, 90, 0.103);
  box-sizing:border-box;
  padding:15px;
  border-radius:15px;
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
const SCDescItem = styled.p`
  font-size:30px;
  color:rgb(75, 75, 75);
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
const SCFinalizarButton = styled.button`
  background-color:#f87b09;
  width:45%;
`