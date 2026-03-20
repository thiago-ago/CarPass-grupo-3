import React, { createContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

   async function logar(email, senha) {
    try {
        console.log("Tentando logar com:", { email, senha });
        
        // Mantemos /secao, já que a baseURL tem /v1
        const response = await api.post('/secao', {
            email: email,
            senha: senha,
        });

        console.log("Resposta do Login:", response.data);

        const { cpf, nome, foto, token } = response.data;
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUser({
            cpf, nome, email, foto, token,
        });

    } catch (err) {
        // Isso vai nos mostrar a URL exata que tentou acessar e deu erro
        console.error("URL que falhou:", err.config?.url);
        console.error("URL Base do Axios:", err.config?.baseURL);
        console.error("Status do Erro:", err.response?.status);
        console.error("Dados do Erro:", err.response?.data);
    }
}

async function register(nome, email, cpf, telefone, confirmasenha, senha) {
    try {
        console.log("Tentando registrar...");
        
        // Pode ser que a rota de usuarios não use o /v1. Vamos ver no erro se falhar.
        const response = await api.post('/usuarios', {
            cpf: cpf,
            nome: nome, 
            email: email,
            telefone: telefone, 
            senha: senha, 
            confirmaSenha: confirmasenha,
        });

        console.log("Resposta do Registro:", response.data);

        if (response.data) {
            setUser(response.data.user);
        }
    } catch (err) {
        console.error("URL que falhou:", err.config?.url);
        console.error("URL Base do Axios:", err.config?.baseURL);
        console.error("Status do Erro:", err.response?.status);
        console.error("Dados do Erro:", err.response?.data);
    }
}
    return (
        <AuthContext.Provider value={{ signed: !!user, user, register, logar }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;