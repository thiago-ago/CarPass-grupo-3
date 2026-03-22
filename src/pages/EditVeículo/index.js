import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as ImagePicker from 'expo-image-picker';
import Perfil from "../Perfil";

import { AuthContext } from "../../context/auth"; 

export default function EditVeículo() {
    
    const { EditarVeiculo, getVeiculoPorPlaca } = useContext(AuthContext);

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [description, setDescription] = useState('');
    const [placa, setPlaca] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [color, setColor] = useState('');
    const [loading, setLoading] = useState(true);
    
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        async function carregarDados() {
            if (route.params?.placa) {
                try {
                    const dados = await getVeiculoPorPlaca(route.params.placa);
                    if (dados) {
                        setPlaca(dados.placa || '');
                        setBrand(dados.marca || '');
                        setModel(dados.modelo || '');
                        setYear(dados.ano_fabricacao?.toString() || '');
                        setColor(dados.cor || '');
                        setDescription(dados.descricao || '');
                        setSelectedImage(dados.imagem || null);
                    }
                } catch (error) {
                    console.error('Erro ao carregar dados do veículo:', error);
                    Alert.alert('Erro', 'Não foi possível carregar os dados do veículo.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        }
        carregarDados();
    }, [route.params?.placa]);

    const handleImagePicker = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Aviso', 'Precisamos de permissão para acessar sua galeria.');
                return;
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    if (!fontsLoaded || loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#000'}}>
                <ActivityIndicator size="large" color="#D70944" />
            </View>
        );
    }

    async function handleSaveVehicle() {
        if (!brand || !model || !year || !color) {
            Alert.alert("Aviso", "Por favor, preencha todos os campos obrigatórios (*).");
            return;
        }

        try {
            const dadosAtualizados = {
                marca: brand,
                modelo: model,
                ano_fabricacao: parseInt(year),
                cor: color,
                descricao: description,
            };

            // Verifica se uma nova imagem foi selecionada (não é a URL da API)
            const novaImagem = selectedImage && selectedImage.startsWith('file://') ? selectedImage : null;

            await EditarVeiculo(placa, dadosAtualizados, novaImagem);
            Alert.alert("Sucesso", "Veículo editado com sucesso!");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", error.message || "Não foi possível editar o veículo.");
        }
    }

    return (
        <LinearGradient
            colors={['#666666', '#000000']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
      
            <View style={styles.areaImg}>
                <Image
                    source={require('../../../assets/Logo v1.png')}
                    style={styles.logo}
                />
            </View>

            <View style={styles.separator} />

            <View style={styles.areaTitle}>
                <Text style={styles.title}>Editar Veículo</Text>
            </View>

            <View style={styles.areaAdd}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="PLACA"
                        placeholderTextColor="#6b6969"
                        style={styles.inputText}
                        onChangeText={setPlaca}
                        value={placa}
                        editable={false}
                    />
                </View>


                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="MARCA *"
                        placeholderTextColor="#6b6969"
                        style={styles.inputText}
                        onChangeText={setBrand}
                        value={brand}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="MODELO *"
                        placeholderTextColor="#6b6969"
                        style={styles.inputText}
                        onChangeText={setModel}
                        value={model}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="ANO DE FABRICAÇÃO *"
                        placeholderTextColor="#6b6969"
                        style={styles.inputText}
                        keyboardType="numeric"
                        onChangeText={setYear}
                        value={year}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="COR *"
                        placeholderTextColor="#6b6969"
                        style={styles.inputText}
                        onChangeText={setColor}
                        value={color}
                    />
                </View>

                <View style={styles.areaAdd}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="DESCRIÇÃO"
                            placeholderTextColor="#6b6969"
                            style={styles.inputText}
                            multiline={true}
                            numberOfLines={3}
                            onChangeText={setDescription}
                            value={description}
                        />
                    </View>
                </View>

                <View style={styles.imagePickerContainer}>
                    <TouchableOpacity onPress={handleImagePicker} style={styles.imagePickerButton}>
                        <Text style={styles.imagePickerText}>
                            {selectedImage ? 'Foto selecionada ✓' : 'Selecionar foto'}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.confirmButtonContainer}>
                <TouchableOpacity onPress={handleSaveVehicle} style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
            </View>

            <LinearGradient
                colors={['#800427', '#D70944']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.footer}
            >
                <TouchableOpacity style={styles.garageButton}
                onPress={() => navigation.navigate('DashBoard')}
                >
                    <Image source={require('../../../assets/Garagem.png')} />
                    <Text style={styles.buttonText}>Garagem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileButton}
                onPress={()=> navigation.navigate('Perfil')}
                >
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