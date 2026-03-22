import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from "../../context/auth"; 
import AddServico from '../AddServiço';
import DashBoard from "../DashBoard";
import Perfil from "../Perfil";

export default function Veículos() {
    const navigation = useNavigation();
    const route = useRoute();
    const { getVeiculoPorPlaca, getServicos, DeletarVeiculo, DeletarServico } = useContext(AuthContext);

    const [veiculo, setVeiculo] = useState(null);
    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold
    });

    useEffect(() => {
        async function carregarDados() {
            if (route.params?.placa) {
                setLoading(true);
                const dados = await getVeiculoPorPlaca(route.params.placa);
                setVeiculo(dados);

                try {
                    const todos = await getServicos();
                    const filtrados = Array.isArray(todos)
                        ? todos.filter(s => s.veiculo_placa === route.params.placa || s.placa === route.params.placa)
                        : [];
                    setServicos(filtrados);
                } catch (error) {
                    console.error('Erro ao carregar serviços:', error);
                    setServicos([]);
                }

                setLoading(false);
            }
        }
        carregarDados();
    }, [route.params?.placa]);

    if (!fontsLoaded || loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#000'}}>
                <ActivityIndicator size="large" color="#D70944" />
            </View>
        );
    }

    // Caso o veículo não seja encontrado
    if (!veiculo) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#fff'}}>Veículo não encontrado.</Text>
            </View>
        );
    }

    return (
        <LinearGradient
            colors={['#666666', '#000000']}
            style={stlyes.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <View style={stlyes.areaImg}>
                <Image
                    source={require('../../../assets/Logo v1.png')}
                    style={stlyes.logo}
                />
            </View>

            <LinearGradient
                colors={['#800427', '#D70944']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={stlyes.AreaMyCar}
            >
                <View style={stlyes.AreaImageMyCar}>
                    <Image
                        style={stlyes.logoCard}
                        // Se tiver imagem na API, usa ela, senão usa a padrão
                        source={veiculo.imagem 
                            ? { uri: `https://gerenciamento-manutencoes-production.up.railway.app/files/${veiculo.imagem}` } 
                            : require('../../../assets/Rectangle 16.png')
                        }
                    />

                    <View style={stlyes.areasLogo}>
                        <View style={stlyes.BtnCard}>
                            <TouchableOpacity onPress={() => navigation.navigate('DashBoard')}>
                                <Ionicons name="arrow-back" size={22} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        <View style={stlyes.BtnTrashEdit}>
                            <TouchableOpacity 
                                style={stlyes.BtnCard}
                                onPress={() => {
                                    Alert.alert(
                                        'Confirmar exclusão',
                                        'Deseja realmente deletar este veículo?',
                                        [
                                            { text: 'Cancelar', style: 'cancel' },
                                            { 
                                                text: 'Deletar', 
                                                style: 'destructive',
                                                onPress: async () => {
                                                    try {
                                                        await DeletarVeiculo(veiculo.placa);
                                                        Alert.alert('Sucesso', 'Veículo deletado com sucesso!');
                                                        navigation.navigate('DashBoard');
                                                    } catch (error) {
                                                        Alert.alert('Erro', 'Não foi possível deletar o veículo.');
                                                        console.error('Erro ao deletar veículo:', error);
                                                    }
                                                }
                                            }
                                        ]
                                    );
                                }}
                            >
                                <Ionicons name="trash-outline" size={20} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={stlyes.BtnCard}
                                onPress={() => navigation.navigate('EditVeículo', { placa: veiculo.placa })}
                            >
                                <Ionicons name="create-outline" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={stlyes.LinhaMyCard}>
                    <Text>
                        <Text style={stlyes.label}>Marca: </Text>
                        <Text style={stlyes.valor}>{veiculo.marca}</Text>
                    </Text>

                    <Text>
                        <Text style={stlyes.label}>Cor: </Text>
                        <Text style={stlyes.valor}>{veiculo.cor}</Text>
                    </Text>
                </View>

                <View style={stlyes.LinhaMyCard}>
                    <Text>
                        <Text style={stlyes.label}>Modelo: </Text>
                        <Text style={stlyes.valor}>{veiculo.modelo}</Text>
                    </Text>

                    <Text>
                        <Text style={stlyes.label}>Placa: </Text>
                        <Text style={stlyes.valor}>{veiculo.placa}</Text>
                    </Text>
                </View>

                <View style={stlyes.LinhaMyCard}>
                    <Text>
                        <Text style={stlyes.label}>Ano de fabricação: </Text>
                        <Text style={stlyes.valor}>{veiculo.ano_fabricacao}</Text>
                    </Text>

                    <Text>
                        <Text style={stlyes.label}>Km: </Text>
                        <Text style={stlyes.valor}>{veiculo.quilometragem || '0'} km</Text>
                    </Text>
                </View>

                <View style={{ backgroundColor: '#fff', width: '100%', height: 0.5, marginBottom: 15 }}></View>

                <View style={{ paddingLeft: 5, marginBottom: 5 }}>
                    <Text style={stlyes.label}>Descrição</Text>
                    <Text style={stlyes.valor}>
                        {veiculo.descricao || "Nenhuma descrição informada para este veículo."}
                    </Text>
                </View>

            </LinearGradient>

            <View style={{ backgroundColor: '#fff', width: '100%', height: 0.5, marginBottom: 15, marginTop: 20 }}></View>

        <View
  style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  }}
>
  <View style={stlyes.areaTitle}>
    <Text style={stlyes.Title}>Serviços</Text>
  </View>

  <TouchableOpacity
   onPress={() => {
    console.log("Placa antes de navegar:", veiculo?.placa);
    navigation.navigate('AddServico', { placa: veiculo?.placa });
}}
    
    style={{
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 2 }}>+</Text>
  </TouchableOpacity>
</View>
            <FlatList
                data={servicos}
                keyExtractor={(item, index) => item.id?.toString() || item._id?.toString() || index.toString()}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                ListEmptyComponent={() => (
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <Text style={{ color: '#fff' }}>Nenhum serviço encontrado para este veículo.</Text>
                    </View>
                )}
                renderItem={({ item }) => (

                    <LinearGradient
                        colors={['#800427', '#D70944']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={stlyes.containerServiços}
                    >

                        <View style={stlyes.Serviço}>
                            <Text style={stlyes.label}>{item.descricao || 'Serviço'}</Text>
                            <Text style={stlyes.valor}>{item.data_realizacao ? item.data_realizacao.split('T')[0] : 'Data não informada'}</Text>
                            <Text style={stlyes.valor}>{item.km ? `${item.km} km` : 'Km não informado'}</Text>
                        </View>

                        <View style={{ height: 53, width: 1, backgroundColor: '#fff', margin: 10 }}></View>

                        <View style={stlyes.Oficina}>
                            <Text style={stlyes.label}>{item.oficina || 'Oficina não informada'}</Text>
                            <Text style={stlyes.valor}>{item.preco ? `R$ ${item.preco}` : 'R$ 0,00'}</Text>
                            
                            <View style={{flexDirection:'row', justifyContent:'space-between', gap: 5, alignSelf:'flex-end'}}>   
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert(
                                            'Confirmar exclusão',
                                            'Deseja realmente deletar este serviço?',
                                            [
                                                { text: 'Cancelar', style: 'cancel' },
                                                { 
                                                    text: 'Deletar', 
                                                    style: 'destructive',
                                                    onPress: async () => {
                                                        try {
                                                            await DeletarServico(item.id, veiculo.placa);
                                                            Alert.alert('Sucesso', 'Serviço deletado com sucesso!');
                                                            // Recarregar serviços
                                                            const todos = await getServicos();
                                                            const filtrados = Array.isArray(todos)
                                                                ? todos.filter(s => s.veiculo_placa === veiculo.placa || s.placa === veiculo.placa)
                                                                : [];
                                                            setServicos(filtrados);
                                                        } catch (error) {
                                                            Alert.alert('Erro', 'Não foi possível deletar o serviço.');
                                                            console.error('Erro ao deletar serviço:', error);
                                                        }
                                                    }
                                                }
                                            ]
                                        );
                                    }}
                                >
                                <Ionicons name="trash-outline" size={20} color="white" />
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                onPress={() => navigation.navigate('EditServico', { placa: veiculo.placa, id: item.id })}
                            >
                                <Ionicons name="create-outline" size={20} color="white"/>
                            </TouchableOpacity>
                            </View> 

                        </View>

                    </LinearGradient>
                )}
            />

            <LinearGradient
                colors={['#800427', '#D70944']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={stlyes.footer}
            >

                <TouchableOpacity
                style={stlyes.BtnGaragem}
                onPress={() => navigation.navigate('DashBoard')}
                >
                    <Image
                        source={require('../../../assets/Garagem.png')}
                    />
                    <Text style={stlyes.TextBtn}>Garagem</Text>
                </TouchableOpacity>

                <TouchableOpacity style={stlyes.BtnPerfil} 
                onPress={()=> navigation.navigate('Perfil')}>
                    <Image
                        source={require('../../../assets/Vector.png')}
                    />
                    <Text style={stlyes.TextBtnPerfil}>Perfil</Text>
                </TouchableOpacity>

            </LinearGradient>

        </LinearGradient>
    )
}

const stlyes = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },

    areaImg: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 27,
        marginTop: 18,
    },

    logo: {
        resizeMode: 'contain',
    },

    logoCard: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        zIndex: 2
    },

    areasLogo: {
        position: 'absolute',
        zIndex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-start'
    },

    BtnCard: {
        backgroundColor: 'rgba(215, 9, 68, 0.6)',
        alignItems: 'center',
        width: 30,
        height: 26,
        marginTop: 5,
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 5
    },

    AreaMyCar: {
        width: '91%',
        borderRadius: 8,
        alignSelf: 'center',
    },

    BtnTrashEdit: {
        gap: 5,
        flexDirection: 'row',
        paddingLeft: 210
    },

    AreaImageMyCar: {
        position: 'relative',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        width: '100%',
        height: 120,
        alignItems: 'baseline',
        overflow: 'hidden',
        marginBottom: 10,
    },

    LinhaMyCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    label: {
        fontFamily: 'Poppins_700Bold',
        color: '#fff',
        fontSize: 13
    },

    valor: {
        fontFamily: 'Poppins_400Regular',
        color: '#fff',
        fontSize: 13
    },

    areaTitle: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 18
    },

    Title: {
        color: '#fff',
        opacity: 0.62,
        fontWeight: 'bold'
    },

    containerServiços: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderRadius: 8,
        width: 336,
        height: 73,
        marginBottom: 30
    },

    Serviço: {
        height: '45%',
        width: '45%',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },

    Oficina: {
        height: '45%',
        width: '45%',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },

    footer: {
        height: 88,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

    BtnGaragem: {
        alignItems: 'center'
    },

    BtnPerfil: {
        alignItems: 'center',
        marginTop: 7
    },

    TextBtn: {
        color: '#fff',
        fontFamily: 'Poppins_400Regular'
    },

    TextBtnPerfil: {
        color: '#fff',
        fontFamily: 'Poppins_400Regular',
        marginTop: 5
    }
});