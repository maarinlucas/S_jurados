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


/* const [loading, setLoading] = useState(true);
const [initialRoute, setInitialRoute] = useState("Login"); */

const Stack = createNativeStackNavigator();


/* const linking = {
  prefixes: ["sjurados://"],  // O mesmo scheme definido no app.json
  config: {
    screens: {
      Ferramenta: "ferramenta",
      Login: "login",
      Interditado: "interditado",
      Reset: "reset",
      Cadastro: "cadastro",
      Successo: "successo",
    },
  },
}; */

export default function Routes() {

  return (
    <NavigationContainer independent={true} /* linking={linking} */ >
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
      </Stack.Navigator>
    </NavigationContainer>
  );

};

