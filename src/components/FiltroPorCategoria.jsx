import styled from "styled-components";
import { LoginContext } from "../contexts/LoginContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FiltroPorCategoria() {

    const navigate = useNavigate();

    const { isLoged, setListadeProdutosPorCategoria, setProduto, setListadeProdutosDoUser } = useContext(LoginContext);

    const [showOptions, setShowOptions] = useState(false);

    const handleIconMouseEnter = () => {
        setShowOptions(true);
    };

    const handleIconMouseLeave = () => {
        setShowOptions(false);
    };

    useEffect(() => {
        isLoged();
    })

    function categoriaProdutos(categoria) {

        const token = localStorage.getItem("token");

        const config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }

        const promise = axios.get(`${import.meta.env.VITE_API_URL}/produtos/categoria/${categoria}`, config);

        promise.then((resposta) => {

            setListadeProdutosPorCategoria(resposta.data);
            console.log(resposta.data, "listaAtual");
            setProduto([]);
            navigate(`/produtos/categoria/${categoria}`);

        })

        promise.catch((erro) => {

            console.log(erro.response.data);

        })


    }

    function usuarioProdutos() {

        const token = localStorage.getItem("token");

        const config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }

        const promise = axios.get(`${import.meta.env.VITE_API_URL}/catalogoUser`, config);

        promise.then((resposta) => {

            setListadeProdutosDoUser(resposta.data);

            console.log(resposta.data, "listaUser");

            navigate("/produtos/user");

        })

        promise.catch((erro) => {

            console.log(erro.response.data);

        })


    }

    return (
        <PageContainerTopo onMouseLeave={handleIconMouseLeave}>
            <ButtonRetornar onClick={() => navigate("/catalogo")}>Todos os Produtos</ButtonRetornar>
            <ButtonCategorias onMouseEnter={handleIconMouseEnter}>Categorias</ButtonCategorias>
            <ButtonDesapegar onClick={() => navigate("/inserirProdutos")}>Deseja desapegar? Clique Aqui!</ButtonDesapegar>
            <ButtonDesapegar onClick={() => usuarioProdutos()}>Meus desapegos</ButtonDesapegar>
            {showOptions && (
                <OptionsContainer>
                    <ButtonDesktop onClick={() => categoriaProdutos("Notebooks")}>Notebooks</ButtonDesktop>
                    <ButtonSmartPhone onClick={() => categoriaProdutos("Smartphones")}>Smartphones</ButtonSmartPhone>
                    <ButtonEletrodomestico onClick={() => categoriaProdutos("Eletrodomésticos")}>Eletrodomésticos</ButtonEletrodomestico>
                    <ButtonSmarthome onClick={() => categoriaProdutos("Smarthomes")}>Smarthomes</ButtonSmarthome>
                </OptionsContainer>
            )}
        </PageContainerTopo>

    )
}

const PageContainerTopo = styled.div`
    display: flex;
    justify-content:space-around;
    align-items: center;
    height: 70px;
    background-color: white;
    width:100%;
    box-shadow: 0px 4px 4px 0px #00000026;
    position: fixed;
    top: 120px;
    left:0;
`

const ButtonCategorias = styled.h1`
    width:25%;
    height:40px;
    color: #2a7db4;
    font-size: 25px;
    font-weight: 500;
    background-color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor: pointer;
    
`

const ButtonDesapegar = styled.h1`
    width:25%;
    height:40px;
    color: #2a7db4;
    font-size: 25px;
    font-weight: 500;
    background-color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor: pointer;
    
`
const OptionsContainer = styled.h1`
    width: 14%;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
    height: auto;
    background-color: white;
    box-shadow: 0px 4px 4px 0px #00000026;
    position: fixed;
    top: 190px;
    left:30.5%;
    cursor: pointer;
    
`

const ButtonRetornar = styled.button`
    width:25%;
    height:40px;
    color: #2a7db4;
    font-size: 25px;
    font-weight: 500;
    background-color:white;
    display:flex;
    justify-content:center;
    align-items:center;
`

const ButtonDesktop = styled.button`
    width:190px;
    height:40px;
    color: #2a7db4;
    font-size: 25px;
    font-weight: 500;
    background-color:white;
    display:flex;
    justify-content:center;
    align-items:center;
`
const ButtonSmartPhone = styled.button`
    width:205px;
    height:40px;
    color: #2a7db4;
    background-color:white;
    font-size: 25px;
    font-weight: 500;
    display:flex;
    justify-content:center;
    align-items:center;
    
`
const ButtonEletrodomestico = styled.button`
    width:255px;
    height:40px;
    background-color:white;
    color: #2a7db4;
    font-size: 25px;
    font-weight: 500;
    display:flex;
    justify-content:center;
    align-items:center;
`
const ButtonSmarthome = styled.button`
    width:190px;
    height:40px;
    color: #2a7db4;
    font-size: 25px;
    font-weight: 500;
    background-color:white;
    display:flex;
    justify-content:center;
    align-items:center;
`