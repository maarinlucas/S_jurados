import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";



import Ferramenta from "./pages/Ferramenta";
import Login from "./pages/Login";
import Interditado from "./pages/interditado";
import Reset from "./pages/Reset";
import Cadastro from "./pages/Cadastro";

/* const [loading, setLoading] = useState(true);
const [initialRoute, setInitialRoute] = useState("Login"); */

const Stack = createNativeStackNavigator();

export default function Routes() {

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='Login'
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Reset" component={Reset} />
        <Stack.Screen name="Interditado" component={Interditado} />
        <Stack.Screen name="Ferramenta" component={Ferramenta} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );

};

