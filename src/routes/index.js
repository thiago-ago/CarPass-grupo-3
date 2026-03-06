import React from "react";
import { View, ActivityIndicator } from 'react-native'

import AuthRoutes from '../routes/AuthRoutes';

function Routes() {
    const carregando =  false;
    const logado = false;

    return(
        carregando ? <View></View> : <AuthRoutes/>
    )
}

export default Routes; 