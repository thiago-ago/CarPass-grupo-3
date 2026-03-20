import React, { useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AuthRoutes from '../routes/AuthRoutes';
import AppRoutes from "./AppRoutes";
import { AuthContext } from "../context/auth";

function Routes() {
    // Pegamos o signed (booleano) e o loading (se você tiver no contexto)
    const { signed, loading } = useContext(AuthContext);

    // 1. Se você tiver um estado de loading no contexto, use aqui
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#D70944" />
            </View>
        );
    }

    // 2. Lógica de OURO: 
    // Se signed for true -> Vai para AppRoutes (Internas)
    // Se signed for false -> Fica em AuthRoutes (Login/Cadastro)
    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
});

export default Routes;