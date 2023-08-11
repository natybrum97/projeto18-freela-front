import styled from "styled-components"

export default function FastShopLogo() {
    return (
        
        <PageContainerTopo>

            <LogoFreela>Me<span>Cansei!</span></LogoFreela>

        </PageContainerTopo>

    )
}

const LogoFreela = styled.h1`
    font-family: 'Roboto', cursive;
    font-weight: 800;
    font-size: 70px;
    color: white;
    display:flex;
    justify-content:center;
    span{
        color:turquoise;
    }
`

const PageContainerTopo = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    height: 200px;
    background-image: linear-gradient(to left, #8e44ad, #2a7db4);
    width:100%;
    box-shadow: 0px 4px 4px 0px #00000026;
    position: fixed;
    top: 0;
    left:0;
`