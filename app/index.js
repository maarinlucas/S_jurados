import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import Ferramenta from './pages/Ferramenta'
import Login from './pages/Login'



const Stack = createNativeStackNavigator()

export default function Routes() {



    return (
        <NavigationContainer
            independent={true}
        >
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName='Login'>
                    
                <Stack.Screen name="Login" component={Login} />

                <Stack.Screen name="Ferramenta" component={Ferramenta} />
            </Stack.Navigator>

        </NavigationContainer>
    )
}