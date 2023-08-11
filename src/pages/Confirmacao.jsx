import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Logo from "../components/FreelaLogo";
import verificado from "../assets/verificado.png";

export default function SignUpPage() {

  const navigate = useNavigate();

  return (
    <SingUpContainer>
    
        <Logo />
        <Image src={verificado} alt="Compra realizada com Sucesso!" />
        <Titulo>Compra realizada com Sucesso!</Titulo>
        <button onClick={()=>navigate("/catalogo")}>Voltar para Catálogo de Produtos</button>

    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color:#CCCCCC;

  button{
    width: 330px;
    background-color: #f87b09;
    margin-top: 50px;
  }
`
const Image = styled.img`
  width: 250px;
  height: 250px;
  margin-top:300px;
`;

const Titulo = styled.h1`
  font-weight:700;
  font-size:40px;
  color:black;
  margin-top: 50px;
`
