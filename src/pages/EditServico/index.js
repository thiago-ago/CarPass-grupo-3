import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { AuthContext } from "../../context/auth";
import Perfil from "../Perfil";

export default function EditServico() {
    const navigation = useNavigation();
    const route = useRoute();
    const { EditarServico, getServicos } = useContext(AuthContext);

    const { placa: veiculo_placa, id: servico_id } = route.params || {};

    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [km, setKm] = useState('');
    const [oficina, setOficina] = useState('');
    const [dataRealizacao, setDataRealizacao] = useState('');
    const [loading, setLoading] = useState(true);

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold
    });

    useEffect(() => {
        async function carregarDados() {
            if (servico_id && veiculo_placa) {
                try {
                    const todosServicos = await getServicos();
                    const servico = todosServicos.find(s => s.id == servico_id && (s.veiculo_placa === veiculo_placa || s.placa === veiculo_placa));
                    
                    if (servico) {
                        setDescricao(servico.descricao || '');
                        setPreco(servico.preco?.toString() || '');
                        setKm(servico.km?.toString() || '');
                        setOficina(servico.oficina || '');
                        setDataRealizacao(servico.data_realizacao ? servico.data_realizacao.split('T')[0] : '');
                    }
                } catch (error) {
                    console.error('Erro ao carregar dados do serviço:', error);
                    Alert.alert('Erro', 'Não foi possível carregar os dados do serviço.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        }
        carregarDados();
    }, [servico_id, veiculo_placa]);

    async function handleConfirmar() {
        if (!descricao || !preco || !km || !oficina || !dataRealizacao) {
            Alert.alert("Atenção", "Preencha todos os campos obrigatórios (*)");
            return;
        }

        const precoConvertido = parseFloat(preco.replace(',', '.'));
        const kmConvertido = parseInt(km, 10);

        if (isNaN(precoConvertido) || isNaN(kmConvertido)) {
            Alert.alert("Erro", "Preço ou KM inválido.");
            return;
        }

        try {
            setLoading(true);

            const dados = {
                descricao,
                preco: precoConvertido,
                km: kmConvertido,
                oficina,
                data_realizacao: dataRealizacao
            };

            await EditarServico(veiculo_placa, servico_id, dados);

            Alert.alert("Sucesso", "Serviço editado com sucesso!", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert("Erro", error.response?.data?.error || "Não foi possível editar o serviço.");
        } finally {
            setLoading(false);
        }
    }

    if (!fontsLoaded || loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#000'}}>
                <ActivityIndicator size="large" color="#D70944" />
            </View>
        );
    }

    return (
        <LinearGradient
            colors={['#666666', '#000000']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <View style={styles.areaImg}>
                <Image source={require('../../../assets/Logo v1.png')} style={styles.logo} />
            </View>

            <View style={styles.separator} />

            <View style={styles.areaTitle}>
                <Text style={styles.title}>
                    Editar Serviço {veiculo_placa ? `para ${veiculo_placa}` : ''}
                </Text>
            </View>

            <View style={styles.areaAdd}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="DESCRIÇÃO *"
                        placeholderTextColor="#6b6969"
                        style={styles.inputText}
                        multiline={true}
                        numberOfLines={3}
                        value={descricao}
                        onChangeText={setDescricao}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Preço *"
                        placeholderTextColor="#6b6969"
                        style={styles.inputText}
                        keyboardType="numeric"
                        value={preco}
                        onChangeText={setPreco}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Km *"
                        placeholderTextColor="#6b6969"
                        style={styles.inputText}
                        keyboardType="numeric"
                        value={km}
                        onChangeText={setKm}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Oficina *"
                        placeholderTextColor="#6b6969"
                        style={styles.inputText}
                        value={oficina}
                        onChangeText={setOficina}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Data da realização (Ex: 21/03/2026) *"
                        placeholderTextColor="#6b6969"
                        style={styles.inputText}
                        value={dataRealizacao}
                        onChangeText={setDataRealizacao}
                    />
                </View>
            </View>

            <View style={styles.confirmButtonContainer}>
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleConfirmar}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.confirmButtonText}>Confirmar</Text>
                    )}
                </TouchableOpacity>
            </View>

            <LinearGradient
                colors={['#800427', '#D70944']}
                style={styles.footer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <TouchableOpacity
                    style={styles.garageButton}
                    onPress={() => navigation.navigate('DashBoard')}
                >
                    <Image source={require('../../../assets/Garagem.png')} />
                    <Text style={styles.buttonText}>Garagem</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.profileButton}
                onPress={()=> navigation.navigate('Perfil')}>
                    <Image source={require('../../../assets/Vector.png')} />
                    <Text style={styles.buttonText}>Perfil</Text>
                </TouchableOpacity>
            </LinearGradient>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    areaImg: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 27,
        marginTop: 25
    },
    logo: {
        resizeMode: 'contain'
    },
    separator: {
        backgroundColor: '#fff',
        width: '100%',
        height: 0.5,
        marginBottom: 10
    },
    areaTitle: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 20
    },
    title: {
        color: '#fff',
        opacity: 0.62,
        fontWeight: 'bold',
    },
    areaAdd: {
        flexDirection: 'column',
        gap: 10,
    },
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
        height: 55,
    },
    inputText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 10,
        color: '#6b6969',
    },
    footer: {
        height: 88,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    garageButton: {
        alignItems: 'center'
    },
    profileButton: {
        alignItems: 'center',
        marginTop: 7
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins_400Regular',
        marginTop: 5
    },
    imagePickerContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    imagePickerButton: {
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    imagePickerText: {
        color: '#6b6969',
        fontFamily: 'Poppins_400Regular',
        fontSize: 15,
    },
    selectedImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 6,
    },
    confirmButtonContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: '#800427',
        borderRadius: 100,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    confirmButtonText: {
        color: '#fff',
        fontFamily: 'Poppins_400Regular',
        fontSize: 20,
    },
});