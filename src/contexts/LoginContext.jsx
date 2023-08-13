import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginContext = createContext();

export function LoginProvider({ children }) {

    const navigate = useNavigate();

    const [listadeProdutos, setListadeProdutos] = useState([]);
    const [listadeProdutosPorCategoria, setListadeProdutosPorCategoria] = useState([]);
    const [listadeProdutosDoUser, setListadeProdutosDoUser] = useState([]);
    const [token, setToken] = useState("");
    const [carrinho, setCarrinho] = useState([]);
    const [produto, setProduto] = useState([]);
    const [getCarrinho, setGetCarrinho] = useState([]);
    const [valorCarrinho, setValorCarrinho] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalCalculo, setTotalCalculo] = useState(0);
    const [getCopia, setGetCopia] = useState([]);
    const [apagarIds, setApagarIds] = useState([]);


const isLoged = () => {
    let token = localStorage.getItem("token");

    if(token){
        axios.defaults.headers.common['Authorization'] = token;
        setToken(token);
    } else {
        navigate("/");
    }
}

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    axios.defaults.headers.common['Authorization'] = "";
    navigate("/");
}

    return (
        <LoginContext.Provider value={{apagarIds, setApagarIds, getCopia, setGetCopia, totalCalculo, setTotalCalculo,listadeProdutosDoUser, setListadeProdutosDoUser, total, setTotal, valorCarrinho, setValorCarrinho ,getCarrinho, setGetCarrinho, produto, setProduto, carrinho, setCarrinho, isLoged, logout, listadeProdutos, setListadeProdutos,token, setToken, listadeProdutosPorCategoria, setListadeProdutosPorCategoria}}>
            {children}
        </LoginContext.Provider>
    )
}

