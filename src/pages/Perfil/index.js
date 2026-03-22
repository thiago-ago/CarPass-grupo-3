import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from "../../context/auth";

export default function Perfil() {
     const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold
    });

    const navigation = useNavigation();
    const { getPessoal, logout, EditarUsuario } = useContext(AuthContext);
    const [dadosPessoais, setDadosPessoais] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [editNome, setEditNome] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editTelefone, setEditTelefone] = useState('');
    const [editSenha, setEditSenha] = useState('');
    const [editConfirmaSenha, setEditConfirmaSenha] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function carregarDados() {
            try {
                const dados = await getPessoal();
                setDadosPessoais(dados);
                // Preenche os campos de edição
                setEditNome(dados?.nome || '');
                setEditEmail(dados?.email || '');
                setEditTelefone(dados?.telefone || '');
            } catch (error) {
                console.error('Erro ao carregar dados pessoais:', error);
            }
        }
        carregarDados();
    }, []);

    const abrirModalEdicao = () => {
        setModalVisible(true);
    };

    const salvarEdicao = async () => {
        if (!editNome || !editEmail) {
            Alert.alert('Erro', 'Nome e email são obrigatórios.');
            return;
        }

        if (editSenha && editSenha !== editConfirmaSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        try {
            setLoading(true);
            const dadosAtualizados = {
                nome: editNome,
                email: editEmail,
                telefone: editTelefone,
                ...(editSenha && { senha: editSenha, confirmaSenha: editConfirmaSenha })
            };

            const resultado = await EditarUsuario(dadosAtualizados);
            
            // Atualiza os dados locais
            setDadosPessoais(prev => ({ ...prev, ...resultado }));
            
            Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
            setModalVisible(false);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar os dados.');
            console.error('Erro ao editar usuário:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['#666666', '#000000']}
                style={stlyes.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >


            <View style={stlyes.AreaImgPerfil}>
                <Image
                    source={dadosPessoais?.foto ? { uri: dadosPessoais.foto } : require('../../../assets/Ellipse 1.png')}
                    style={{resizeMode: 'contain', alignSelf: 'center'}}
                />
            </View>

            <View style={stlyes.AreaUser}>
                <Text style={stlyes.NomeUser}>{dadosPessoais?.nome || 'Nome de usuário'}</Text>
                <TouchableOpacity style={{marginBottom: 5}} onPress={abrirModalEdicao}> 
                    <Ionicons name="create-outline" size={25} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={stlyes.AreaInfo}>
    
                <View style={{flexDirection: 'row', alignSelf: 'center', gap: 10}}>
                    <Ionicons name="call-outline" size={20} color="#fff" />
                    <Text style={stlyes.Info}>{dadosPessoais?.telefone || '(00) 99999-9999'}</Text>
                </View>

                <TouchableOpacity onPress={() => console.log('clicou')}>
                    <Ionicons name="chevron-forward-outline" size={20} color="#fff" />
                </TouchableOpacity>

            </View>

            <View style={{width:'90%', height: 0.5, backgroundColor: '#fff', margin: 10}}></View>

            <View style={stlyes.AreaInfo}>
    
                <View style={{flexDirection: 'row', alignSelf: 'center', gap: 10}}>
                    <Ionicons name="mail-outline" size={20} color="#fff" />
                    <Text style={stlyes.Info}>{dadosPessoais?.email || 'email@gmail.com'}</Text>
                </View>

                <TouchableOpacity onPress={() => console.log('clicou')}>
                    <Ionicons name="chevron-forward-outline" size={20} color="#fff" />
                </TouchableOpacity>

            </View>

            <View style={{width:'90%', height: 0.5, backgroundColor: '#fff', margin: 10}}></View>

            <View style={stlyes.AreaInfo}>
    
                <View style={{flexDirection: 'row', alignSelf: 'center', gap: 10}}>
                    <Ionicons name="id-card-outline" size={20} color="#fff" />
                    <Text style={stlyes.Info}>{dadosPessoais?.cpf || '888.888.888-8'}</Text>
                </View>

                <TouchableOpacity onPress={() => console.log('clicou')}>
                    <Ionicons name="chevron-forward-outline" size={20} color="#fff" />
                </TouchableOpacity>

            </View>

            <View style={{width:'90%', height: 0.5, backgroundColor: '#fff', margin: 10}}></View>

            <View style={stlyes.AreaInfo}>
    
                <View style={{flexDirection: 'row', alignSelf: 'center', gap: 10}}>
                    <Ionicons name="lock-closed-outline" size={20} color="#fff" />
                    <Text style={stlyes.Info}>Senha</Text>
                </View>

                <TouchableOpacity onPress={() => console.log('clicou')}>
                    <Ionicons name="chevron-forward-outline" size={20} color="#fff" />
                </TouchableOpacity>

            </View>

            <View style={{width:'90%', height: 0.5, backgroundColor: '#fff', margin: 10}}></View>

                <LinearGradient
                    colors={['#800427', '#D70944']}
                    start={{x:0,y:0}} 
                    end={{x:1,y:0}}
                    style={stlyes.BtnSair}
                >
                    <TouchableOpacity 
                        style={{flexDirection: 'row', justifyContent: 'space-between', padding: 7}}
                        onPress={async () => {
                            try {
                                await logout();
                                navigation.navigate('Login'); 
                            } catch (error) {
                                console.error('Erro ao fazer logout:', error);
                            }
                        }}
                    >
                        
                            <Text style={stlyes.TitleSair}>
                                Sair
                            </Text>
                            <View style={{marginTop: 5}}>
                            <Ionicons name="chevron-forward-outline" size={20} color="#fff"/>
                            </View>
                    </TouchableOpacity>
                </LinearGradient>
                


        </LinearGradient>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={stlyes.modalOverlay}>
                <View style={stlyes.modalContent}>
                    <Text style={stlyes.modalTitle}>Editar Perfil</Text>
                    
                    <TextInput
                        style={stlyes.input}
                        placeholder="Nome"
                        placeholderTextColor="#6b6969"
                        value={editNome}
                        onChangeText={setEditNome}
                    />
                    
                    <TextInput
                        style={stlyes.input}
                        placeholder="Email"
                        placeholderTextColor="#6b6969"
                        value={editEmail}
                        onChangeText={setEditEmail}
                        keyboardType="email-address"
                    />
                    
                    <TextInput
                        style={stlyes.input}
                        placeholder="Telefone"
                        placeholderTextColor="#6b6969"
                        value={editTelefone}
                        onChangeText={setEditTelefone}
                        keyboardType="phone-pad"
                    />
                    
                    <TextInput
                        style={stlyes.input}
                        placeholder="Nova Senha (opcional)"
                        placeholderTextColor="#6b6969"
                        value={editSenha}
                        onChangeText={setEditSenha}
                        secureTextEntry
                    />
                    
                    <TextInput
                        style={stlyes.input}
                        placeholder="Confirmar Nova Senha"
                        placeholderTextColor="#6b6969"
                        value={editConfirmaSenha}
                        onChangeText={setEditConfirmaSenha}
                        secureTextEntry
                    />
                    
                    <View style={stlyes.modalButtons}>
                        <TouchableOpacity 
                            style={[stlyes.modalButton, stlyes.cancelButton]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={stlyes.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[stlyes.modalButton, stlyes.saveButton]}
                            onPress={salvarEdicao}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={stlyes.buttonText}>Salvar</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        </View>
    )
}

const stlyes = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    AreaImgPerfil: {
        width: 150,
        height: 150,
        marginTop: 60,
        marginBottom: 20
    },
    AreaUser: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,

    },
    NomeUser: {
        fontFamily: 'Poppins_700Bold',
        color: '#fff',
        fontSize: 20
    },
    AreaInfo: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30
},
    Info: {
        fontFamily: 'Poppins_400Regular',
        color: '#fff',
        fontSize: 15
    },
    BtnSair: {
        width: 250,
        height: 53,
        marginTop: 80,
        marginBottom: 30,
        borderRadius: 12,
        justifyContent: 'center'
    },
    TitleSair: {
        fontFamily: 'Poppins_400Regular',
        color: '#fff',
        fontSize: 20
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        maxHeight: '80%'
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        color: '#000'
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    modalButton: {
        flex: 1,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5
    },
    cancelButton: {
        backgroundColor: '#666'
    },
    saveButton: {
        backgroundColor: '#D70944'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins_700Bold'
    }
});
