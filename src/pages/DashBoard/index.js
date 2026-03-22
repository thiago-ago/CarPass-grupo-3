import React, { useContext, useState, useCallback } from "react";
// ADICIONADO: Importação do Alert
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from "../../context/auth";
import Perfil from "../Perfil";


export default function DashBoard() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold
    });
    
    // PUXANDO A NOVA FUNÇÃO DE DELETAR
    const { getVeiculos, DeletarVeiculo } = useContext(AuthContext);
    const navigation = useNavigation();
    
    const [veiculos, setVeiculos] = useState([]);
    const [loadingList, setLoadingList] = useState(true);

    // Função para carregar os veículos (separada para podermos reutilizar após deletar)
    async function fetchVeiculos() {
        try {
            setLoadingList(true);
            const data = await getVeiculos();
            setVeiculos(data);
        } catch (error) {
            console.log("Erro ao carregar lista:", error);
        } finally {
            setLoadingList(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchVeiculos();
        }, [])
    );

    // NOVA FUNÇÃO: Lida com o clique na lixeira
    const handleDelete = (placa) => {
        Alert.alert(
            "Excluir Veículo",
            `Tem certeza que deseja excluir o veículo de placa ${placa}?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel" // Botão que não faz nada
                },
                {
                    text: "Excluir",
                    style: "destructive", // Deixa o texto vermelho no iOS
                    onPress: async () => {
                        try {
                            setLoadingList(true); // Mostra o loading enquanto deleta
                            await DeletarVeiculo(placa);
                            await fetchVeiculos(); // Recarrega a lista atualizada
                            Alert.alert("Sucesso", "Veículo excluído com sucesso.");
                        } catch (error) {
                            setLoadingList(false);
                            Alert.alert("Erro", "Não foi possível excluir o veículo.");
                        }
                    }
                }
            ]
        );
    };

    if (!fontsLoaded) {
        return null;
    }
    
    return(
        <LinearGradient
            colors={['#666666', '#000000']}
            style={stlyes.container}
            start={{x:0,y:0}} 
            end={{x:1,y:0}}
        >
            <View style={stlyes.areaImg}>
                <Image 
                    source={require('../../../assets/Logo v1.png')}
                    style={stlyes.logo}
                />
            </View>
        
            <View style={stlyes.areaAddCar}>
                <View style={stlyes.areaBtnAdd}>
                    <TouchableOpacity style={stlyes.areaBtnAdd} onPress={ ()=> navigation.navigate('AddVeículo')}>
                        <Text style={{ fontFamily: 'Poppins_700Bold'}}>Adicionar veículo</Text>
                        <Text style={{ fontFamily: 'Poppins_700Bold'}}>+</Text>
                    </TouchableOpacity>
                </View>  

                <View style={stlyes.areaBtnFilter}>
                    <TouchableOpacity>
                        <Ionicons name="options-outline" size={32} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{backgroundColor: '#fff', width: '100%', height: 0.5, marginBottom: 15}}></View>

            <View style={stlyes.areaTitle}>
                <Text style={stlyes.Title}>Veículos</Text>
            </View>
            
            {loadingList ? (
                <ActivityIndicator size="large" color="#D70944" style={{ flex: 1 }} />
            ) : (
                <FlatList
                    data={veiculos}
                    keyExtractor={(item) => String(item.id || item._id || item.placa)} 
                    numColumns={2}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    renderItem={({ item }) => {
                        // Construir a URL completa da imagem
                        const imageUri = item.imagem 
                            ? `https://gerenciamento-manutencoes-production.up.railway.app/files/${item.imagem}`
                            : null;
                        
                        return (
                        <View style={stlyes.cardcontainer}>
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate('Veículos', { placa: item.placa })}>
                                    <Image
                                        source={imageUri ? { uri: imageUri } : require('../../../assets/Rectangle 11.png')}
                                        style={stlyes.cardImage} 
                                    />
                                </TouchableOpacity>
                            </View >

                            <View style={stlyes.LinhaCard}>
                                <Text style={{color: '#fff', fontFamily: 'Poppins_400Regular' }}>{item.modelo}</Text>
                                <Text style={{color: '#fff', fontFamily: 'Poppins_400Regular'}}>{item.ano_fabricacao || item.ano}</Text>
                            </View>

                            <View style={stlyes.LinhaCard}>
                                <Text style={{color: '#fff', fontFamily: 'Poppins_400Regular'}}>{item.cor}</Text>
                                <View style={stlyes.LinhaCard}>
                                    
                                    {/* AQUI: Adicionado o onPress chamando handleDelete e passando a placa */}
                                    <TouchableOpacity 
                                        style={stlyes.LinhaCard} 
                                        onPress={() => handleDelete(item.placa)}
                                    >
                                        <Ionicons name="trash-outline" size={18} color="white" />
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                        style={stlyes.LinhaCard}
                                        onPress={() => navigation.navigate('EditVeículo', { placa: item.placa })}
                                    >
                                        <Ionicons name="create-outline" size={18} color="white"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        );
                    }}
                />
            )}

            <LinearGradient 
                colors={['#800427', '#D70944']}
                start={{x:0,y:0}} 
                end={{x:1,y:0}}
                style={stlyes.footer}
            >
                <TouchableOpacity style={stlyes.BtnGaragem}>
                    <Image source={require('../../../assets/Garagem.png')} />
                    <Text style={stlyes.TextBtn}>Garagem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={stlyes.BtnPerfil} onPress={()=> navigation.navigate('Perfil')}>
                    <Image source={require('../../../assets/Vector.png')} />
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
    areaImg:{               
        justifyContent:'center',
        alignItems:'center',
        alignSelf: 'center',
        marginLeft: 27,
        marginTop: 18
    },
    logo:{
        resizeMode:'contain',
    },
    areaAddCar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 22,
        marginTop: 15,
        marginBottom: 25,
        marginLeft: 16,
        marginRight: 16,
        alignSelf: 'center',
        alignItems: 'center'
    },
    areaBtnAdd: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 6,
        width: 255,
        height: 34,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        alignSelf: 'center'
    },
    areaBtnFilter: {
        backgroundColor: '#fff',
        borderRadius: 6,
        width: '12.92%',
        height: 34,
        alignItems: 'center'
    },
    areaTitle: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 20
    },
    Title: {
        color: '#fff',
        opacity: 0.62,
        fontWeight: 'bold'
    },
    cardcontainer:{
        width: 160,
        height: 216,
        backgroundColor: '#C8083F',
        borderRadius: 8,
        marginRight: 15,
        marginBottom: 15,
        overflow: 'hidden' // Garante que a imagem não "vaze" das bordas
    },
    // NOVO ESTILO PARA A IMAGEM DO CARD
    cardImage: {
        width: '100%',
        height: 120, // Altura fixa para ficar bonito no card
        resizeMode: 'cover',
    },
    LinhaCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
        marginTop: 3,
        paddingHorizontal: 5, // Adicionei um leve padding para os textos não colarem na borda
        
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