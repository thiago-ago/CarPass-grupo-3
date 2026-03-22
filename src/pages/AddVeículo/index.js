import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as ImagePicker from 'expo-image-picker';

// IMPORTAÇÃO DO CONTEXTO (Verifique se o caminho da pasta está correto para o seu projeto)
import { AuthContext } from "../../context/auth"; 

export default function AddVeículo() {
    // PUXANDO A FUNÇÃO DO CONTEXTO AQUI
    const { SalvarVeículo } = useContext(AuthContext);

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
    
    const navigation = useNavigation();

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

        // ATUALIZAÇÃO DO EXPO: canceled (com um 'L') e assets[0].uri
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    if (!fontsLoaded) {
        return null;
    }

    // FUNÇÃO ASSÍNCRONA COM FEEDBACK PARA O USUÁRIO
    async function handleSaveVehicle() {
        if (!placa || !brand || !model || !year || !color) {
            Alert.alert("Aviso", "Por favor, preencha todos os campos obrigatórios (*).");
            return;
        }

        try {
            await SalvarVeículo(placa, brand, model, year, color, selectedImage, description);
            Alert.alert("Sucesso", "Veículo cadastrado com sucesso!");
            // Limpar os campos ou voltar para a garagem após salvar:
            navigation.goBack(); 
        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar o veículo.");
        }
    }

    return (
        <LinearGradient
            colors={['#666666', '#000000']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            {/* O RESTO DO SEU RETURN CONTINUA EXATAMENTE IGUAL */}
            <View style={styles.areaImg}>
                <Image
                    source={require('../../../assets/Logo v1.png')}
                    style={styles.logo}
                />
            </View>

            <View style={styles.separator} />

            <View style={styles.areaTitle}>
                <Text style={styles.title}>Adicionar Veículo</Text>
            </View>

            <View style={styles.areaAdd}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="PLACA *"
                        placeholderTextColor="#6b6969"
                        style={styles.inputText}
                        onChangeText={setPlaca}
                        value={placa}
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
                            {selectedImage ? 'Foto anexada ✓' : 'Selecionar foto'}
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
                <TouchableOpacity style={styles.garageButton}>
                    <Image source={require('../../../assets/Garagem.png')} />
                    <Text style={styles.buttonText}>Garagem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileButton}>
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