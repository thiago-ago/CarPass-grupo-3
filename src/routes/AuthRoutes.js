import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
    return(
        <AuthStack.Navigator>
           
            <AuthStack.Screen 
                name= "Login"
                component={Login}
                options={{ headerShown: false }}
            />

            <AuthStack.Screen 
                name= "Cadastro"
                component={Cadastro} 
                options={{ headerShown: false }}
            />

        </AuthStack.Navigator>
    )
}

export default AuthRoutes;