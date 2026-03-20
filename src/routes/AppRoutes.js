import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoard from '../pages/DashBoard';
import Veículos from '../pages/Veículos';

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

    </Stack.Navigator>
  );
}