import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, ActivityIndicator } from "react-native";
import { corFundo } from "./colors";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";

const Interditado = () => {
  const navigation = useNavigation();

  const handleCheckout = () => {
    const checkoutUrl = ''; // URL do seu checkout hospedado
    Linking.openURL(checkoutUrl).catch((err) => console.error("Couldn't load page", err));
  };
/* Por favor, aguarde o contato da nossa equipe para a realização do
pagamento do app para a validação do cadastro, prazo de 24h. */



useEffect(() => {
  setLoading(false);     
}, []);
const [loading, setLoading] = useState(true);

if (loading) {
return (
<View style={{ flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: corFundo}}>
  <ActivityIndicator color="#FFF" size="large" />
</View>
)
}

  return (
    <View style={styles.container}>
      <View style={{ width: 50, display: "flex", alignItems: "center" }}>
        <Image style={styles.logoB} source={require("../imagens/logoc.png")} />
      </View>
      <View style={styles.box}>
        <Text style={styles.exclamation}>!</Text>
        <Text style={styles.text}>Cadastro automatico temporariamente desativado, clique no botão para ser direcionado a um link de solicitação de cadastro.</Text>
      </View>
      <Text style={styles.text2} onPress={() => navigation.navigate("Login")}>
        Voltar ao Login
      </Text>
      <TouchableOpacity onPress={handleCheckout} style={styles.button}>
        <Text style={styles.text}>Página de cadastro</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: corFundo,
    display: "flex",
    rowGap: 20,
  },
  box: {
    backgroundColor: "white",
    borderRadius: 20,
    color: "black",
    width: "100%",
    height: 200,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  text2: {
    textAlign: "center",
    fontSize: 19,
    margin: 5,
    fontWeight: "bold",
  },

  exclamation: {
    fontSize: 40,
    color: "red",
  },
  button: {
    backgroundColor: '#25D366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  textButton: {
    padding: 10,
    color: "white",
    fontSize: 17,
  },
  logoB: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});

export default Interditado;
