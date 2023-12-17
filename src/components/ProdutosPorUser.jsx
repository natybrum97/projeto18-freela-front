import styled from "styled-components";
import { useContext, useEffect } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useState, useCallback } from "react";
import axios from "axios";

export default function ProdutosPorUser() {
  const [checkboxStates, setCheckboxStates] = useState({});
  const { listadeProdutosDoUser, isLoged } = useContext(LoginContext);

  useEffect(() => {
    isLoged();
    fetchCheckboxStatesFromServer();
  }, []);

  const fetchCheckboxStatesFromServer = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/check`, config);
      setCheckboxStates(response.data);
    } catch (error) {
      console.error("Erro ao carregar os estados dos checkboxes:", error);
    }
  };

  const handleCheckboxChange = useCallback(async (id) => {
    const updatedCheckboxStates = {
      ...checkboxStates,
      [id]: !checkboxStates[id],
    };
    setCheckboxStates(updatedCheckboxStates);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: "Bearer " + token
        }
      }
      const markedProducts = { productId: id, isChecked: updatedCheckboxStates[id] };
      await axios.post(`${import.meta.env.VITE_API_URL}/check`, markedProducts, config);
    } catch (error) {
      console.error("Erro ao salvar o estado do checkbox:", error);
    }
  }, [checkboxStates]);

  const verifyProductExistence = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };

      await axios.delete(`${import.meta.env.VITE_API_URL}/deletaproduto/${id}`, config);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ListagemdeProdutos>
      {listadeProdutosDoUser.map((produto, index) => (
        <ListItemContainer key={produto.id}>
          {checkboxStates[produto.id] === true ? (
            <ProductName>Vendido!</ProductName>
          ) : (
            <div>
              <ProductName>Não está disponível?</ProductName>
              <input
                type="checkbox"
                checked={checkboxStates[produto.id] || false}
                onChange={() => {
                  handleCheckboxChange(produto.id);
                  verifyProductExistence(produto.id);
                }}
              />
            </div>
          )}
          <ProductImage src={produto.url} alt="SmartPhone" />
          <ProductName>{produto.nomeproduto}</ProductName>
          <ProductValor>
            {(parseFloat(produto.valor.replace(/\./g, "").replace(",", ".")) / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </ProductValor>
        </ListItemContainer>
      ))}
    </ListagemdeProdutos>
  )
}

const ListagemdeProdutos = styled.div`
  height:auto;
  width:calc(100% - 250px);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  color: #000000;
  background-color: #CCCCCC;
  margin-top: 190px;
`

const ListItemContainer = styled.li`
  height:350px;
  width:347px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:space-around;
  color: #000000;
  background-color: white;
  box-shadow: 0px 4px 4px 0px #00000026;
  margin: 15px;
  padding: 10px;

  div{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`

const ProductImage = styled.img`
  width: 300px;
  height: 230px;
  margin-top:5px;
  margin-bottom:5px;
`;

const ProductName = styled.h1`
    font-family: 'Roboto', cursive;
    font-weight: 600;
    font-size: 20px;
    color: black;
    margin-bottom:5px;
    width: 300px;
    text-align: left;

`
const ProductValor = styled.h1`
    font-family: 'Roboto', cursive;
    font-weight: 400;
    font-size: 20px;
    color: black;
    width: 300px;
    text-align: left;
`