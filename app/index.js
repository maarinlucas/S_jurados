import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";


import Ferramenta from "./pages/ferramenta/Ferramenta";
import Login from "./pages/autenticacao/Login";
import Interditado from "./pages/interditado";
import Reset from "./pages/autenticacao/Reset";
import Cadastro from "./pages/autenticacao/Cadastro";
import Successo from "./pages/Successo";
import Aprovacao from "./pages/autenticacao/Aprovacao";


/* const [loading, setLoading] = useState(true);
const [initialRoute, setInitialRoute] = useState("Login"); */

const Stack = createNativeStackNavigator();




export default function Routes() {

  return (
    <NavigationContainer independent={true} >
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='Login'
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Reset" component={Reset} />
        <Stack.Screen name="Interditado" component={Interditado} />
        <Stack.Screen name="Ferramenta" component={Ferramenta} />
        <Stack.Screen name="Cadastro" component={Cadastro} /> 
        <Stack.Screen name="Successo" component={Successo} />
        {/* <Stack.Screen name="Aprovacao" component={Aprovacao} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );

};

