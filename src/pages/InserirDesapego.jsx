import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cabecalho from "../components/Cabeçalho";

export default function Desapego() {

    const navigate = useNavigate();

    const [nomeproduto, setNomeProduto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [url, setUrl] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [valor, setValor] = useState('');

    function handleCancelarClick() {
        const shouldCancel = window.confirm("Tem certeza que deseja cancelar? As alterações não serão salvas.");
        
        if (shouldCancel) {
            navigate('/catalogo');
        }
    }

    const formatCurrency = (value) => {
        const number = parseInt(value) || 0;
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(number / 100);
    };

    function enviarInfos(e) {

        const userid = localStorage.getItem("userid");
        const token = localStorage.getItem("token");
        console.log(token);

        e.preventDefault();

        const config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }

        const obj = {
            nomeproduto,
            descricao,
            valor: parseInt(valor),
            url,
            selectedCategory,
            userid
        }

        console.log(obj);

        const promise = axios.post(`${import.meta.env.VITE_API_URL}/inserirProduto`, obj, config);

        promise.then(resposta => {
        
            console.log(resposta.data, "lista");

            navigate('/catalogo');

        });

        promise.catch(erro => {
            
            console.error('Error:', erro);
            alert('Houve um problema!');
            console.log(erro.response.data);
        });

        const promise2 = axios.post(`${import.meta.env.VITE_API_URL}/inserirProdutoCopia`, obj, config);

        promise2.then(resposta => {
        
            console.log(resposta.data, "lista");

            navigate('/catalogo');

        });

        promise2.catch(erro => {
            
            console.error('Error:', erro);
            alert('Houve um problema!');
            console.log(erro.response.data);
        });

    }

    return (
        <SingInContainer>

            <form onSubmit={enviarInfos}>

                <Cabecalho />

                <h3>Insira os Dados do Produto:</h3>

                <Input1 placeholder="Nome do Produto" type="text" id="nomeproduto" value={nomeproduto} onChange={(e) => setNomeProduto(e.target.value)} required />

                <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>

                    <option value="">Selecione uma Categoria</option>
                    <option>Notebooks</option>
                    <option>Smartphones</option>
                    <option>Eletrodomésticos</option>
                    <option>Smarthomes</option>

                </Select>

                <input placeholder="Descrição do Produto" type="text" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                <input
                    placeholder="Valor do Produto"
                    value={formatCurrency(valor)}
                    onChange={(e) => {
                        const inputAmount = e.target.value.replace(/\D/g, '');
                        setValor(inputAmount);
                    }}
                    required
                />
                
                <input placeholder="URL da Foto do Produto" type="text" id="foto" value={url} onChange={(e) => setUrl(e.target.value)} required />

                
                <button type="submit">Adicionar Produto!</button>

            </form>

            <Link to='/catalogo'>
                <h2 onClick={handleCancelarClick}>Cancelar</h2>
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

  h3{
    font-family: 'Roboto', cursive;
    color: #2a7db4;
    font-size: 30px;
    font-weight: 500;
    margin-top: 190px;
  }

  h2{
    font-family: 'Roboto', cursive;
    font-weight: 400;
    font-size: 18px;
    color: gray;
  }

`

const Input1 = styled.input`
  margin-top:40px;
`

const Select = styled.select`
  padding: 15px;
  border: 1px solid #ccc;
  background-color:white;
  border-radius: 5px;
  color: gray;
  font-size: 20px;
  width: calc(100% - 167px);

  option {
    background-color: #f7f7f7; /* Cor de fundo das opções */
    color: #CCCCCC; /* Cor do texto das opções */
    font-size: 14px; /* Tamanho da fonte das opções */
  }
`;