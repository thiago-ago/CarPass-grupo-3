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

    // ... resto do seu AuthProvider (loadStorage, logar, register) ...

    async function getVeiculos() {
        try {
            const response = await api.get('/veiculos/todos');
            return response.data; // Retorna a lista de veículos
        } catch (error) {
            console.error("Erro ao buscar veículos:", error);
            throw error;
        }
    }

    // CORREÇÃO: Usando FormData para a imagem ser enviada corretamente ao servidor
    async function SalvarVeículo(placa, brand, model, year, color, selectedImage, description) {
    try {
        // 1. Pegamos o CPF do usuário logado
        const usuario_cpf = user?.cpf;

        const data = new FormData();
        data.append('placa', placa);
        data.append('marca', brand);
        data.append('modelo', model);
        data.append('ano_fabricacao', year);
        data.append('cor', color);
        data.append('descricao', description);
        
        // 2. Enviamos o CPF, assumindo que seu backend precisa saber de quem é o carro
        if (usuario_cpf) {
             data.append('usuario_cpf', usuario_cpf);
        }

        // 3. Tratamento seguro da imagem
        if (selectedImage) {
            const filename = selectedImage.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image/jpeg`; // Fallback seguro para jpeg
            
            // É importante garantir que o objeto de imagem seja passado exatamente assim:
            data.append('imagem', {
                uri: selectedImage,
                name: filename,
                type: type,
            });
        }

        console.log("Enviando FormData:", data); // Verifique no console se tudo está correto

        const response = await api.post('/veiculos', data, {
            headers: { 
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json', // Boa prática adicionar o Accept
            },
        });
        
        console.log("Veículo salvo com sucesso:", response.data);
        return response.data;
        
    } catch (error) {
        console.error("Erro ao salvar veículo:", error.response?.data || error.message);
        throw error; 
    }
}


    async function DeletarVeiculo(placa) {
    try {
        const usuario_cpf = user?.cpf;

        console.log("Enviando via Params -> Placa:", placa, "CPF:", usuario_cpf);

        // USANDO PARAMS EM VEZ DE DATA
        const response = await api.delete('/veiculos/remove', {
            params: { 
                placa: placa, 
                usuario_cpf: usuario_cpf 
            }
        });

        return response.data;
    } catch (error) {
        console.error("Erro ao deletar:", error.response?.data || error.message);
        throw error;
    }
}

    
async function getVeiculoPorPlaca(placa) {
    try {
        const response = await api.get('/veiculos/placa', {
            params: { placa: placa }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar detalhes do veículo:", error);
        return null;
    }
}

async function getServicos() {
    try {
        const response = await api.get('/servicos/todos');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar serviços:", error.response?.data || error.message);
        throw error;
    }
}

  async function SalvarServico(dadosServico, veiculo_placa) {
        try {
            const usuario_cpf = user?.cpf;

            console.log("--- TENTANDO SALVAR SERVIÇO ---");
            console.log("veiculo_placa recebida na função:", veiculo_placa);
            console.log("CPF:", usuario_cpf);

            if (!veiculo_placa) {
                throw new Error("A placa não foi detectada no App antes do envio.");
            }

            const response = await api.post(
                '/servicos',
                {
                    descricao: dadosServico.descricao,
                    preco: dadosServico.preco,
                    km: dadosServico.km,
                    oficina: dadosServico.oficina,
                    data_realizacao: dadosServico.data_realizacao,
                    usuario_cpf: usuario_cpf
                },
                {
                    params: { veiculo_placa: veiculo_placa }
                }
            );

            console.log("Serviço salvo com sucesso!");
            return response.data;
        } catch (error) {
            console.error("Erro detalhado da API:", error.response?.data || error.message);
            console.error("Status:", error.response?.status);
            console.error("Resposta completa:", error.response);
            throw error;
        }
    }

async function EditarUsuario(dados) {
        try {
            const response = await api.put('/usuarios', dados);
            setUser(response.data);
            return response.data;
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
            throw error;
        }
    }

    async function getPessoal() {
        try {
            const response = await api.get('/pessoal');
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar dados pessoais:", error);
            throw error;
        }
    }

    async function logout() {
        try {
            setUser(null);
            await AsyncStorage.removeItem(`@FinToken`);
            delete api.defaults.headers.common['Authorization'];
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    }

    async function EditarUsuario(dados) {
        try {
            const response = await api.put('/usuarios/edit', dados);
            setUser(response.data);
            return response.data;
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
            throw error;
        }
    }

    async function EditarVeiculo(placa, dadosAtualizados, novaImagem = null) {
    try {
        const usuario_cpf = user?.cpf;

        const data = new FormData();
        // REMOVIDO: data.append('placa', placa); -> Agora vai nos 'params' do Axios
        
        data.append('marca', dadosAtualizados.marca);
        data.append('modelo', dadosAtualizados.modelo);
        data.append('ano_fabricacao', dadosAtualizados.ano_fabricacao);
        data.append('cor', dadosAtualizados.cor);
        data.append('descricao', dadosAtualizados.descricao);
        
        // Enviamos o CPF
        if (usuario_cpf) {
             data.append('usuario_cpf', usuario_cpf);
        }

        // Tratamento seguro da imagem
        if (novaImagem) {
            const filename = novaImagem.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image/jpeg`;
            
            data.append('imagem', {
                uri: novaImagem,
                name: filename,
                type: type,
            });
        }

        console.log("Editando Placa (via parâmetro):", placa);
        console.log("Enviando FormData (corpo):", data);

        // CORREÇÃO: Passando os dados no corpo (data) e a placa nos parâmetros (params)
        const response = await api.put('/veiculos/edicao', data, {
            params: { 
                placa: placa // <-- PLACA COMO PARÂMETRO DE REQUISIÇÃO
            },
            headers: { 
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
        });
        
        console.log("Veículo editado com sucesso:", response.data);
        return response.data;
        
    } catch (error) {
        console.error("Erro ao editar veículo:", error.response?.data || error.message);
        throw error; 
    }
}

async function EditarServico(id, veiculo_placa, dadosServico) {
    try {
        const usuario_cpf = user?.cpf;

        console.log("--- TENTANDO EDITAR SERVIÇO ---");
        console.log("ID do Serviço (via parâmetro):", id);
        console.log("Placa (via parâmetro):", veiculo_placa);
        console.log("Novos dados:", dadosServico);

        // Trava de segurança para não enviar requisição quebrada
        if (!id || !veiculo_placa) {
            throw new Error("ID do serviço ou placa do veículo estão faltando.");
        }

        // 1. Montamos o corpo da requisição (os dados que vão ser alterados)
        const corpoRequisicao = {
            descricao: dadosServico.descricao,
            preco: dadosServico.preco,
            km: dadosServico.km,
            oficina: dadosServico.oficina,
            data_realizacao: dadosServico.data_realizacao,
            usuario_cpf: usuario_cpf // Caso o backend valide se você é o dono
        };

        // 2. Fazemos o PUT passando o corpo e os parâmetros de rota
        const response = await api.put('/servicos/edicao', corpoRequisicao, {
            params: { 
                id: id, 
                veiculo_placa: veiculo_placa,
                usuario_cpf: usuario_cpf
            }
        });

        console.log("SUCESSO: Serviço editado!", response.data);
        return response.data;

    } catch (error) {
        console.error("Erro ao editar serviço:", error.response?.data || error.message);
        throw error;
    }
}

    return (
        
        <AuthContext.Provider value={{ signed: !!user, user, register, logar, loading, SalvarVeículo, getVeiculos, DeletarVeiculo, getVeiculoPorPlaca, getServicos, SalvarServico, getPessoal, logout, EditarUsuario, EditarVeiculo, EditarServico }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

   