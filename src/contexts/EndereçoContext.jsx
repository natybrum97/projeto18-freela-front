import { createContext, useState } from "react";

export const EndereçoContext = createContext();

export function EndereçoProvider({ children }) {

    const [nomeCompleto, setnomeCompleto] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numeroCasa, setNumeroCasa] = useState("");
    const [state, setState] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [cpf, setCPF] = useState("");

    return (
        <EndereçoContext.Provider value={{nomeCompleto, setnomeCompleto, telefone, setTelefone, cep, setCep, rua, setRua, numeroCasa, setNumeroCasa, state, setState, cidade, setCidade, bairro, setBairro, cpf, setCPF}}>
            {children}
        </EndereçoContext.Provider>
    )
}

