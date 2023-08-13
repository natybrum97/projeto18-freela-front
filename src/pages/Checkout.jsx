import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Logo from "../components/FreelaLogo";
import { LoginContext } from "../contexts/LoginContext";

export default function Checkout() {
  const navigate = useNavigate()
  const { totalCalculo, getCarrinho, setGetCarrinho, isLoged, setValorCarrinho } = useContext(LoginContext);
  const [payMethod, setPayMethod] = useState("Boleto");
  const [parcelas, setParcelas] = useState("1");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [numParcelas, setNumParcelas] = useState(1);
  const [cvv, setCVV] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [nomeCartao, setNomeCartao] = useState("");

  useEffect(() => {
    isLoged();

    const token = localStorage.getItem("token");

    const config = {
      headers: {
          Authorization: "Bearer " + token
      }
  }

    axios.get(`${import.meta.env.VITE_API_URL}/carrinho`, config)

      .then((response) => {

        const carrinhodecompras = response.data;
        setGetCarrinho(response.data)
        console.log(response.data, "get aqui please");

      })

      .catch((error) => {

        console.error(error);

      });
  }, []);

  function apagarProdutosAoComprar() {
    const token = localStorage.getItem("token"); // Supondo que você tenha o token salvo no localStorage
    const idsParaExcluir = getCarrinho.map((produto) => produto.idProduto);
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { ids: idsParaExcluir }
    };
  
    // Fazendo a requisição para o servidor usando o Axios com a configuração do cabeçalho
    axios.delete(`${import.meta.env.VITE_API_URL}/excluir`,config)
    .then((response) => {
      console.log('Resultado da exclusão:', response.data);
      setValorCarrinho(0);
      navigate("/confirmacao");
    })
    .catch((error) => {
      console.error('Erro na requisição:', error);
    });
  }

  function atualizaCheckDeAcordoComIds() {
    const token = localStorage.getItem("token"); // Supondo que você tenha o token salvo no localStorage
    const idsParaExcluir = getCarrinho.map((produto) => produto.idProduto);

    console.log(getCarrinho, "get");
    console.log(idsParaExcluir, "ids");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    axios.put(`${import.meta.env.VITE_API_URL}/check`, { ids: idsParaExcluir }, config)
        .then(response => {
            console.log('Atualização bem-sucedida:', response.data);
            navigate("/confirmacao");
        })
        .catch(error => {
            console.error('Erro ao atualizar:', error);
        });
}

  


  const handleNumParcelasChange = (e) => {
    setNumParcelas(parseInt(e.target.value, 10));
  };

  const calcularParcelas = (parcela) => {
    if (parcela === 1) {
      return (Math.abs(totalCalculo) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    } else {
      const valorParcela = parseInt(totalCalculo) / parcela;
      return (Math.abs(valorParcela) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
  };

  const formatCVV = (cvv) => {
    // Remove espaços em branco e caracteres não numéricos
    const cleanedCVV = cvv.replace(/\D/g, '');

    // Limita o CVV a três dígitos
    const formattedCVV = cleanedCVV.slice(0, 3);

    return formattedCVV;
  };

  const formatExpirationDate = (expirationDate) => {
    // Remove espaços em branco e caracteres não numéricos
    const cleanedDate = expirationDate.replace(/\D/g, '');

    // Separa os dígitos em mês e ano
    const month = cleanedDate.slice(0, 2);
    const year = cleanedDate.slice(2, 4);

    // Formata a data no formato MM/AA
    const formattedDate = `${month}/${year}`;
    console.log(formattedDate)
    return formattedDate;
  };

  const handleExpirationDateChange = (e) => {
    setExpirationDate(formatExpirationDate(e.target.value));
  };

  function setBoleto() {
    setPayMethod("Boleto");
    setParcelas("1");
  }

  function finalizarCompra() {
    const confirmacao = window.confirm("Tem certeza de que deseja finalizar a compra?");

    if (!confirmacao) return

    const userid = localStorage.getItem("userid");

    let postObj;
   
    if (payMethod === "Boleto") {

       postObj = {
        carrinho: JSON.stringify(getCarrinho),
        userid,
        valor: totalCalculo,
        parcelas: 1,
        tipo: payMethod
      }
    } else {
      postObj = {
        carrinho: JSON.stringify(getCarrinho),
        userid,
        valor: totalCalculo,
        parcelas,
        tipo: payMethod
      }
    }
    console.log(postObj)

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/compra`, postObj);
    promise.then(resposta => {
      navigate("/confirmacao");
    });

    promise.catch(erro => {
      console.log(erro);
      alert(erro.response.data)
    });
  }

  function handleFinalizarTudo() {
    apagarProdutosAoComprar();
    finalizarCompra();
    atualizaCheckDeAcordoComIds();
  }

  return (
    <SCcheckoutPage>

      <Logo />

      <SCPagamentoInnerBox3>
        <SCHeaderSpan> Forma de pagamento</SCHeaderSpan>
        <SCButtonContainer>
          <SCPgmntButon disabled={payMethod === "Boleto"} selected={payMethod === "Boleto"} onClick={setBoleto}>Boleto</SCPgmntButon>
          <SCPgmntButon disabled={payMethod === "Cartão de Crédito"} selected={payMethod === "Cartão de Crédito"} onClick={() => setPayMethod("Cartão de Crédito")}>Cartão de Crédito</SCPgmntButon>
        </SCButtonContainer>
      </SCPagamentoInnerBox3>

      {payMethod === "Boleto" ?
        <SCBaixarBoletoSpan onClick={() => alert("Iniciando o download, em caso de problemas clique novamente no link")}>Clique aqui para baixar seu Boleto</SCBaixarBoletoSpan>
        :
        <SCPagamentoContainer>
          
          <SCPagamentoInnerBox4>
            <SCHeaderSpan3> Parcele em até 12x sem juros!</SCHeaderSpan3>
            <input required placeholder="Nome no Cartão" type="text" id="nomecartao" value={nomeCartao} onChange={(e) => setNomeCartao(e.target.value)} />
            <input required placeholder="Número do cartão" value={numeroCartao} onChange={(e) => setNumeroCartao(e.target.value)}></input>
            <select id="opcaoParcelamento" value={numParcelas} onChange={handleNumParcelasChange}>
              {[...Array(12).keys()].map((parcela) => (
                <option key={parcela + 1} value={parcela + 1}>
                  {parcela + 1}x R${calcularParcelas(parcela + 1).replace(".", ",")}
                </option>
              ))}
            </select>
            <input required placeholder="CVV" type="text" value={formatCVV(cvv)} onChange={(e) => setCVV(e.target.value)} maxLength="3" />
            <input required
        type="text"
        id="expirationDate"
        value={expirationDate}
        onChange={handleExpirationDateChange}
        maxLength="5"
        placeholder="MM/AA"
      />
          </SCPagamentoInnerBox4>
        </SCPagamentoContainer>
      }
      <SCButtonContainer>
        <SCFinalizarButon onClick={handleFinalizarTudo} disabled={payMethod==="Cartão de Crédito" &&(parcelas === "" || numeroCartao === "" || cvv==="" || expirationDate==="" || nomeCartao==="")}>Finalizar compra</SCFinalizarButon>
        <SCFinalizarButon onClick={()=>navigate("/catalogo")} >Cancelar</SCFinalizarButon>
      </SCButtonContainer>
    </SCcheckoutPage>
  )
}

const SCcheckoutPage = styled.div`
  padding-top:135px;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
  height:100%;
  width:100%;
`
const SCPagamentoContainer = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  height:100%;
  width:85%;
`
const SCPagamentoInnerBox4 = styled.div`
  width:100%;
  height: 100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-start;

  select{
    font-size: 20px;
        width: calc(100% - 167px);
        border-radius: 5px;
        outline: none;
        border: 1px solid #ccc;
        padding: 15px;
        margin: 1px;
        color:gray;
  }
`
const SCPagamentoInnerBox3 = styled.div`
  margin-top: 50px;
  width:100%;
  height: 100%;
  margin-top:100px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-start;
  box-shadow: 0px 4px 4px 0px #00000026;
`
const SCHeaderSpan = styled.span`
  font-size:40px;
  font-weight:700;
  color:rgb(61, 61, 61);
  margin-bottom:25px;
`
const SCHeaderSpan3 = styled.span`
  font-size:40px;
  font-weight:700;
  color:rgb(61, 61, 61);
  margin-bottom:25px;
  margin-top:70px;
`
const SCButtonContainer = styled.div`
  display:flex;
  justify-content:space-evenly;
  align-items:center;
  width:100%;
  margin-bottom:50px;
`
const SCPgmntButon = styled.button`
  display:flex;
  align-items:center;
  justify-content:center;
  width:250px;
  height:auto;
  font-size:25px;
  background-image: linear-gradient(to left, #8e44ad, #2a7db4);
  opacity:${(props) => props.selected ? "0.6" : "1"};
`

const SCBaixarBoletoSpan = styled.span`
  font-size:50px;
  font-weight:700;
  color:lightgray;
  margin-top:50px;
`
const SCFinalizarButon = styled.button`
  display:flex;
  align-items:center;
  justify-content:center;
  width:250px;
  height:auto;
  font-size:25px;
  background-image: linear-gradient(to left, #8e44ad, #2a7db4);
  opacity:${(props) => props.disabled ? "0.6" : "1"};
  cursor:${(props) => props.disabled ? "not-allowed" : "pointer"};
  margin-top:50px;
  `