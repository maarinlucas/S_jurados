import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import Ferramenta from './pages/Ferramenta'
import Login from './pages/Login'
import Interditado from './pages/interditado'



const Stack = createNativeStackNavigator()

export default function Routes() {



    return (
        <NavigationContainer
            independent={true}
        >
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName='Interditado'>
                    
                <Stack.Screen  name="Login" component={Login} />
                <Stack.Screen  name="Interditado" component={Interditado} />
                <Stack.Screen  name="Ferramenta" component={Ferramenta} />
                
            </Stack.Navigator>

        </NavigationContainer>
    )
}