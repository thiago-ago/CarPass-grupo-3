import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Veículos() {

    const veiculos = [
        { id: "1", nome: "Carro 1", ano: "2000", cor: "branco" },
        { id: "2", nome: "Carro 2", ano: "2000", cor: "branco" },
        { id: "3", nome: "Carro 3", ano: "2000", cor: "branco" },
        { id: "4", nome: "Carro 4", ano: "2000", cor: "branco" }
    ];

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold
    });

    if (!fontsLoaded) {
        return null;
    }

    const navigation = useNavigation();

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
                        source={require('../../../assets/Rectangle 16.png')}
                    />

                    <View style={stlyes.areasLogo}>

                        <View style={stlyes.BtnCard}>
                            <TouchableOpacity onPress={ ()=> navigation.navigate('DashBoard')}>
                                <Ionicons name="arrow-back" size={22} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        <View style={stlyes.BtnTrashEdit}>

                            <View style={stlyes.BtnCard}>
                                <TouchableOpacity>
                                    <Ionicons name="trash-outline" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>

                            <View style={stlyes.BtnCard}>
                                <TouchableOpacity>
                                    <Ionicons name="create-outline" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>

                <View style={stlyes.LinhaMyCard}>
                    <Text>
                        <Text style={stlyes.label}>Marca: </Text>
                        <Text style={stlyes.valor}>Mazda</Text>
                    </Text>

                    <Text>
                        <Text style={stlyes.label}>Cor: </Text>
                        <Text style={stlyes.valor}>Laranja</Text>
                    </Text>
                </View>

                <View style={stlyes.LinhaMyCard}>
                    <Text>
                        <Text style={stlyes.label}>Modelo: </Text>
                        <Text style={stlyes.valor}>RX-7</Text>
                    </Text>

                    <Text>
                        <Text style={stlyes.label}>Placa: </Text>
                        <Text style={stlyes.valor}>RRRRRR</Text>
                    </Text>
                </View>

                <View style={stlyes.LinhaMyCard}>
                    <Text>
                        <Text style={stlyes.label}>Ano de fabricação: </Text>
                        <Text style={stlyes.valor}>2002</Text>
                    </Text>

                    <Text>
                        <Text style={stlyes.label}>Quilometragem: </Text>
                        <Text style={stlyes.valor}>5.000 km</Text>
                    </Text>
                </View>

                <View style={{ backgroundColor: '#fff', width: '100%', height: 0.5, marginBottom: 15 }}></View>

                <View style={{ paddingLeft: 5, marginBottom: 5 }}>
                    <Text style={stlyes.label}>Descrição</Text>
                    <Text style={stlyes.valor}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id quam venenatis turpis rutrum dignissim. Etiam tincidunt tortor non dui fringilla molestie.
                    </Text>
                </View>

            </LinearGradient>

            <View style={{ backgroundColor: '#fff', width: '100%', height: 0.5, marginBottom: 15, marginTop: 20 }}></View>

            <View style={stlyes.areaTitle}>
                <Text style={stlyes.Title}>
                    Serviços
                </Text>
            </View>

            <FlatList
                data={veiculos}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                renderItem={({ item }) => (

                    <LinearGradient
                        colors={['#800427', '#D70944']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={stlyes.containerServiços}
                    >

                        <View style={stlyes.Serviço}>
                            <Text style={stlyes.label}>Troca de Óleo</Text>
                            <Text style={stlyes.valor}>05/02/2025</Text>
                            <Text style={stlyes.valor}>4800 km</Text>
                        </View>

                        <View style={{ height: 53, width: 1, backgroundColor: '#fff', margin: 10 }}></View>

                        <View style={stlyes.Oficina}>
                            <Text style={stlyes.label}>Oficina Dois Irmãos</Text>
                            <Text style={stlyes.valor}>R$ 250,00</Text>
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

                <TouchableOpacity style={stlyes.BtnGaragem}>
                    <Image
                        source={require('../../../assets/Garagem.png')}
                    />
                    <Text style={stlyes.TextBtn}>Garagem</Text>
                </TouchableOpacity>

                <TouchableOpacity style={stlyes.BtnPerfil}>
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
        resizeMode: 'contain',
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
        justifyContent: 'space-around',
        gap: 10,
        marginBottom: 8,
    },

    label: {
        fontFamily: 'Poppins_700Bold',
        color: '#fff',
        fontSize: 11
    },

    valor: {
        fontFamily: 'Poppins_400Regular',
        color: '#fff',
        fontSize: 11
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