import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Logo from "../components/FreelaLogo";
import { LoginContext } from "../contexts/LoginContext";
import { EndereçoContext } from "../contexts/EndereçoContext";

export default function Checkout() {
  const navigate = useNavigate()
  const { totalCalculo, total, setTotal, getCarrinho, setGetCarrinho, isLoged, setValorCarrinho } = useContext(LoginContext)
  const { setnomeCompleto, setTelefone, setCep, setRua, setNumeroCasa, setState, setCidade, setBairro, setCPF } = useContext(EndereçoContext);
  const {nomeCompleto,telefone, cep, rua, numeroCasa, state, cidade, bairro, cpf} = useContext(EndereçoContext)
  const [payMethod, setPayMethod] = useState("Boleto")
  const [parcelas, setParcelas] = useState("1")
  const [totalNumerico, setTotalNumerico] = useState(0)
  const [numeroCartao, setNumeroCartao] = useState("")
  const [numParcelas, setNumParcelas] = useState(1);
  const [cvv, setCVV] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [nomeCartao, setNomeCartao] = useState("");


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

  useEffect(() => {
    isLoged();
    axios.get(`${import.meta.env.VITE_API_URL}/carrinho`)
      .then((response) => {
        setGetCarrinho(response.data)
        let totalCompra = 0;

        response.data.forEach(produto => {
          totalCompra += parseFloat(produto.valor * produto.quantidade);
        });
        setTotalNumerico(totalCompra)
        const saldoFinal = Math.abs(totalCompra).toFixed(2).replace(".", ",");
        setTotal(saldoFinal);
      })
      .catch((error) => {
        console.error(error);
      });


  }, []);

  function setBoleto() {
    setPayMethod("Boleto");
    setParcelas("1");
  }

  function finalizarCompra() {
    const confirmacao = window.confirm("Tem certeza de que deseja finalizar a compra?");
    if (!confirmacao) return
    const userid = localStorage.getItem("userid");
    let postObj = {
      carrinho: getCarrinho,
      userid,
      valor: totalNumerico,
      parcelas,
      tipo: payMethod,
      nomeCompleto,
      telefone,
      cep,
      rua,
      numeroCasa,
      state,
      cidade,
      bairro,
      cpf:cpf.replaceAll(".","").replace("-","")
    }
    if (payMethod !== "Boleto") postObj = { ...postObj, ccnumber: numeroCartao, cvv, expirationDate, nomeCartao}
    console.log(postObj)

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/compra`, postObj);
    promise.then(resposta => {
      axios.delete(`${import.meta.env.VITE_API_URL}/carrinho`)
        .then((response) => {
          setValorCarrinho(0);
          navigate("/confirmacao");
        })
        .catch((error) => {
          console.error(error);
          alert("Houve um problema com seu pagamento, tente novamente!");
        });

      setnomeCompleto("");
      setTelefone("");
      setCep("");
      setRua("");
      setNumeroCasa("");
      setState("");
      setCidade("");
      setBairro("");
      setCPF("");

    });

    promise.catch(erro => {
      console.log(erro);
      alert(erro.response.data)
    });
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
        <SCFinalizarButon onClick={finalizarCompra} disabled={payMethod==="Cartão de Crédito" &&(parcelas === "" || numeroCartao === "" || cvv==="" || expirationDate==="" || nomeCartao==="")}>Finalizar compra</SCFinalizarButon>
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
const SCPagamentoInnerBox2 = styled.div`
  margin-top: 80px;
  box-shadow: 0px 4px 4px 0px #00000026;
  width:100%;
  height: 100%;
  display:flex;
  flex-direction:column;
  align-items:flex-end;
  justify-content:flex-start;
`
const SCHeaderSpan2 = styled.span`
  font-size:26px;
  font-weight:600;
  color:rgb(61, 61, 61);
  margin-bottom:25px;
  margin-right:50px;
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
const SCValorSpan = styled.span`
font-size:40px;
font-weight:700;
color:#f87b09;
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