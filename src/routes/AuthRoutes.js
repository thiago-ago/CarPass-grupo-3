import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashBoard from '../pages/DashBoard';
import Veículos from "../pages/Veículos";
import Perfil from '../pages/Perfil';

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
    return(
        <AuthStack.Navigator>
           
            <AuthStack.Screen 
                name= "DashBoard"
                component={DashBoard}
                options={{ headerShown: false }}
            />

            <AuthStack.Screen 
                name= "Veículos"
                component={Veículos} 
                options={{ headerShown: false }}
            />

            <AuthStack.Screen 
                name= "Perfil"
                component={Perfil} 
                options={{ headerShown: false }}
            />

        </AuthStack.Navigator>
    )
}

export default AuthRoutes;