import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Veículos() {
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


            <View style={stlyes.AreaImgPerfil}>
                <Image
                    source={require('../../../assets/Ellipse 1.png')}
                    style={{resizeMode: 'contain', alignSelf: 'center'}}
                />
            </View>

            <View style={stlyes.AreaUser}>
                <Text style={stlyes.NomeUser}>Nome de usúario</Text>
                <TouchableOpacity style={{marginBottom: 5}}> 
                    <Ionicons name="create-outline" size={25} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={stlyes.AreaInfo}>
    
                <View style={{flexDirection: 'row', alignSelf: 'center', gap: 10}}>
                    <Ionicons name="call-outline" size={20} color="#fff" />
                    <Text style={stlyes.Info}>(12)99999-9999</Text>
                </View>

                <TouchableOpacity onPress={() => console.log('clicou')}>
                    <Ionicons name="chevron-forward-outline" size={20} color="#fff" />
                </TouchableOpacity>

            </View>

            <View style={{width:'90%', height: 0.5, backgroundColor: '#fff', margin: 10}}></View>

            <View style={stlyes.AreaInfo}>
    
                <View style={{flexDirection: 'row', alignSelf: 'center', gap: 10}}>
                    <Ionicons name="mail-outline" size={20} color="#fff" />
                    <Text style={stlyes.Info}>email@gmail.com</Text>
                </View>

                <TouchableOpacity onPress={() => console.log('clicou')}>
                    <Ionicons name="chevron-forward-outline" size={20} color="#fff" />
                </TouchableOpacity>

            </View>

            <View style={{width:'90%', height: 0.5, backgroundColor: '#fff', margin: 10}}></View>

            <View style={stlyes.AreaInfo}>
    
                <View style={{flexDirection: 'row', alignSelf: 'center', gap: 10}}>
                    <Ionicons name="id-card-outline" size={20} color="#fff" />
                    <Text style={stlyes.Info}>888.888.888-8</Text>
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
                    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', padding: 7}}>
                        
                            <Text style={stlyes.TitleSair}>
                                Sair
                            </Text>
                            <View style={{marginTop: 5}}>
                            <Ionicons name="chevron-forward-outline" size={20} color="#fff"/>
                            </View>
                    </TouchableOpacity>
                </LinearGradient>
                


        </LinearGradient>
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
        altura: 150,
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
    }
});