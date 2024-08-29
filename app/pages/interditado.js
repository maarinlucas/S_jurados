import { StyleSheet, View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { corFundo } from "../colors";
import { useNavigation } from "@react-navigation/native";

const Interditado = () => {
  const navigation = useNavigation();
  
  const handlePressWhatsApp = () => {
    const whatsappUrl = 'https://wa.me/5511976047647?text=Olá,%20vim%20do%20App%20*Sjurados*%20e%20gostaria%20de%20saber%20como%20faço%20para%20criar%20uma%20conta!'; // Substitua pelo seu número de telefone
    Linking.openURL(whatsappUrl).catch((err) => console.error("Couldn't load page", err));
  };
  return (
    <View style={styles.container}>
      <View style={{ width: 50, display: "flex", alignItems: "center" }}>
      <Image style={styles.logoB} source={require("../imagens/logoc.png")} />
      </View>
      <View style={styles.box}>
        <Text style={styles.exclamation}>!</Text>
        <Text style={styles.text}>Cadastro automático temporariamente indisponível, fale com o desenvolvedor para mais informações:</Text>
        
      </View>
      <Text style={styles.text2} onPress={() => navigation.navigate("Login")}>
        Voltar ao Login
      </Text>
      <TouchableOpacity onPress={handlePressWhatsApp} style={styles.button}>
        <Text style={styles.text}>Chamar No Watsapp</Text>
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
  text2:{
    padding: 10,
    color: "white",
    fontSize: 17
  },
  logoB: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});

export default Interditado;
