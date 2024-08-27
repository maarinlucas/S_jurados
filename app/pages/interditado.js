import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { corFundo } from "../colors";

const Interditado = () => {
  const handlePressWhatsApp = () => {
    const whatsappUrl = 'https://wa.me/5511976047647'; // Substitua pelo seu número de telefone
    Linking.openURL(whatsappUrl).catch((err) => console.error("Couldn't load page", err));
  };
  return (
    <View style={styles.container}>
      <View style={{ width: 50, display: "flex", alignItems: "center" }}>
      <Image style={styles.logoB} source={require("../imagens/logo.png")} />
      </View>
      <View style={styles.box}>
        <Text style={styles.exclamation}>!</Text>
        <Text style={styles.text}>Cadastro automático temporariamente indisponível {'\n'} Me chame no watsapp para mais informações:</Text>
        <TouchableOpacity onPress={handlePressWhatsApp} style={styles.button}>
        <Text style={styles.text}>Abrir WhatsApp</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingVertical: "43%",
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
    fontSize: 17,
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
  }
});

export default Interditado;
