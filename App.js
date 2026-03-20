import React from "react";
import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Routes from './src/routes/index';
import AuthProvider from "./src/context/auth";

export default function App(){
  return(
    <NavigationContainer>
      <AuthProvider>
      <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}