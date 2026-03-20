import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorage() {
            try {
                // 1. Buscamos o token salvo no celular
                const storageUser = await AsyncStorage.getItem(`@FinToken`);

                if (storageUser) {
                    // 2. Colocamos o token no cabeçalho padão ANTES de fazer a requisição
                    // CORREÇÃO: Usar a variável storageUser em vez de token
                    api.defaults.headers.common['Authorization'] = `Bearer ${storageUser}`;

                    // 3. Fazemos a requisição para pegar os dados do usuário logado
                    const response = await api.get('/pessoal');
                    
                    // 4. Salvamos o usuário no estado para liberar o AppRoutes
                    setUser(response.data);
                }
            } catch (error) {
                // Se der erro (ex: token expirado ou sem internet), limpamos tudo
                console.log("Erro ao carregar usuário salvo:", error);
                setUser(null);
                await AsyncStorage.removeItem(`@FinToken`); // Limpa o token inválido
            } finally {
                // Independentemente de dar certo ou errado, tiramos a tela de loading
                setLoading(false);
            }
        }

        loadStorage();
    }, []);

    async function logar(email, senha) {
        try {
            console.log("Tentando logar com:", { email, senha });
            
            const response = await api.post('/secao', {
                email: email,
                senha: senha,
            });

            console.log("Resposta do Login:", response.data);

            const { cpf, nome, foto, token } = response.data;
            
            // Salva no AsyncStorage
            await AsyncStorage.setItem(`@FinToken`, token);

            // Injeta o token no header do axios para as próximas requisições
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Atualiza o estado
            setUser({
                cpf, nome, email, foto, token,
            });

        } catch (err) {
            console.error("URL que falhou:", err.config?.url);
            console.error("URL Base do Axios:", err.config?.baseURL);
            console.error("Status do Erro:", err.response?.status);
            console.error("Dados do Erro:", err.response?.data);
            throw err; // Repassa o erro para poder tratar na tela de Login (ex: mostrar Alert)
        }
    }

    async function register(nome, email, cpf, telefone, confirmasenha, senha) {
        try {
            console.log("Tentando registrar...");
            
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
            throw err;
        }
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, register, logar, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;