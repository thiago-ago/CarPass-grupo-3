import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Cadastro() {
    const veiculos = [
  { id: "1", nome: "Carro 1", ano: "2000", cor: "branco"},
  { id: "2", nome: "Carro 2", ano: "2000", cor: "branco"},
  { id: "3", nome: "Carro 3", ano: "2000", cor: "branco"},
  { id: "4", nome: "Carro 4", ano: "2000", cor: "branco"}
];
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
                <TouchableOpacity style={stlyes.areaBtnAdd}>
                    <Text style={{ fontFamily: 'Poppins_700Bold'}}>
                        Adicionar veículo
                    </Text>
                
                    <Text style={{ fontFamily: 'Poppins_700Bold'}}>
                        +
                    </Text>
              
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
    <Text style={stlyes.Title}>
        Veículos
    </Text>
  </View>
    
    <FlatList
  data={veiculos}
  keyExtractor={(item) => item.id}
  numColumns={2}
  contentContainerStyle={{ paddingHorizontal: 10 }}
  renderItem={({ item }) => (
    <View style={stlyes.cardcontainer}>
        <View>
            <TouchableOpacity onPress={ ()=> navigation.navigate('Cadastro')}>
            <Image
                source={require('../../../assets/Rectangle 11.png')}
                style={stlyes.logo}
            />
            </TouchableOpacity>
        </View >

        <View style={stlyes.LinhaCard}>
            <Text style={{color: '#fff', fontFamily: 'Poppins_400Regular' }}>{item.nome}</Text>
            <Text style={{color: '#fff', fontFamily: 'Poppins_400Regular'}}>{item.ano}</Text>
        </View>

        <View style={stlyes.LinhaCard}>
            <Text style={{color: '#fff', fontFamily: 'Poppins_400Regular'}}>{item.cor}</Text>
            <View style={stlyes.LinhaCard}>
                <TouchableOpacity style={stlyes.LinhaCard}>
                    <Ionicons name="trash-outline" size={18} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={stlyes.LinhaCard}>
                    <Ionicons name="create-outline" size={18} color="white"/>
                    <Text></Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )}
/>

 <LinearGradient 
        colors={['#800427', '#D70944']}
        start={{x:0,y:0}} 
        end={{x:1,y:0}}
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

const stlyes = StyleSheet.create(
    {
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
            marginRight: 16
        },
        areaBtnAdd: {
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderRadius: 6,
            width: 255,
            height: 34,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 8
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
            marginBottom: 15
        },
        LinhaCard: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 3,
            marginTop: 3,
            gap: 5
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
    }
)
