import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoard from '../pages/DashBoard';
import Veículos from '../pages/Veículos';
import AddVeículo from '../pages/AddVeículo'
import AddServico from '../pages/AddServiço';
import Perfil from '../pages/Perfil';
import EditVeículo from '../pages/EditVeículo';
import EditServico from '../pages/EditServico';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen 
        name="DashBoard" 
        component={DashBoard} 
        options={{ headerShown: false }}
      />

       <Stack.Screen 
        name="Veículos" 
        component={Veículos} 
        options={{ headerShown: false }}
       />

      <Stack.Screen
        name="AddVeículo"
        component={AddVeículo}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AddServico"
        component={AddServico}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditVeículo"
        component={EditVeículo}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditServico"
        component={EditServico}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}