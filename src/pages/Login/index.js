import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';


export default function Login() {
    const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
    });
    if (!fontsLoaded) {
    return null;
  }
    const navigation = useNavigation();
    
    return(
       <LinearGradient
  colors={['#666666', '#000000']}
  style={stlyes.containerLogin}
  start={{x:0,y:0}} 
  end={{x:1,y:0}}
>

    <View style={stlyes.areaCadastro}>
        <Text style={stlyes.textBtn} >Ainda não tem uma conta?</Text>

        <TouchableOpacity onPress={ ()=> navigation.navigate('Cadastro')} >
            <LinearGradient
            colors={['#800427', '#D70944']}
            start={{x:0,y:0}} 
            end={{x:1,y:0}}
            style={stlyes.BtnCadastro}
            >
            <Text style={stlyes.textBtn}>Cadastre-se</Text>
            </LinearGradient>
        </TouchableOpacity>
    </View>


    <View style={stlyes.areaImg}>
        <Image 
        source={require('../../../assets/carpass 1.png')}
        style={stlyes.logo}
        />
    </View>

    
    <LinearGradient 
        style={stlyes.RetanguloPequeno}
        colors={['#800427', '#D70944']}
        start={{x:0,y:0}} 
        end={{x:1,y:0}}
    />

    
    <LinearGradient 
        style={stlyes.RetanguloGrande}
        colors={['#800427', '#D70944']}
        start={{x:0,y:0}} 
        end={{x:1,y:0}}
    >
            <View style={stlyes.AreaTitulo}>
                <Text style={stlyes.H1}>Faça seu login</Text>
            </View>

            <View style={stlyes.areaInput} >
                    <TextInput 
                    placeholder="Digite seu nome *"
                    placeholderTextColor="#6b6969"
                    style={{ fontFamily: 'Poppins_400Regular', alignSelf: 'flex-start', marginBottom: 8}}
                    />
            </View>

            <View style={stlyes.areaInput}>
                <TextInput 
                placeholder="Digite sua senha *"
                placeholderTextColor="#6b6969"
                style={{ fontFamily: 'Poppins_400Regular', alignSelf: 'flex-start', marginBottom: 8}}
                />
            </View>

            <View style={{alignContent: 'flex-end', paddingLeft: 32, marginTop: 8}}>
                <TouchableOpacity>
                    <Text style={{fontSize: 12, color: '#fff', fontFamily: 'Poppins_400Regular'}}>
                        Esqueceu a senha?
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={stlyes.BtnConfirmar}>
                <TouchableOpacity>
                    <Text style={{color: '#000000', fontSize: 24, fontFamily: 'Poppins_700Bold', alignItems: 'center', justifyContent: 'center'}}>Confirmar</Text>
                </TouchableOpacity>
            </View>

    </LinearGradient>

    

</LinearGradient>
    )
}

const stlyes = StyleSheet.create(
    {
        containerLogin: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
            areaCadastro: {
            marginTop: 40,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            padding: 10,
        },
        BtnCadastro: {
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center'
        },
        textBtn:{
            color:'#fff',
            fontWeight:'600',
            fontFamily: 'Poppins_400Regular'
        },
        areaImg:{               
            justifyContent:'center',
            alignItems:'center',
            marginBottom: 730
        },

        logo:{
            width:217,
            height:217,
            resizeMode:'contain'
        },

        RetanguloGrande: {
            width: '100%',
            height: 528,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            position: 'absolute',
            bottom: 0,
            zIndex: 2
        },
        RetanguloPequeno: {
            width: '80%',
            height: 80,
            borderRadius: 25,
            position: 'absolute',
            bottom: 468,
            alignSelf: 'center',
            zIndex: 1
        },
        AreaTitulo: {
            marginTop:50,
            marginBottom: 40,
            alignItems: 'center',
            justifyContent: 'center'
        },
        H1: {
            color:'#fff',
            fontSize: 32,
            fontFamily: 'Poppins_700Bold'
        },
        areaInput: {
            width: 300,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: 16,
            marginTop: 30,
            alignSelf: 'center',
            padding: 6
        },
        BtnConfirmar: {
            alignSelf: 'center',
            width: 317,
            height: 53,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50,
            borderRadius: 14
        }
    }
)
