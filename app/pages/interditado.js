import { StyleSheet, View, Text, Image } from "react-native";
import { corFundo } from "../colors";

const Interditado = () => {
  return (
    <View style={styles.container}>
      <View style={{ width: 50, display: "flex", alignItems: 'center' }}>
        <Image style={styles.logoB} source={require("../imagens/logo.png")} />
      </View>
      <View style={styles.box}>
        <Text style={styles.exclamation}>!</Text>
        <Text style={styles.text}>
          App temporariamente indisponível {"\n"} Para mais informações, entre em contato com o desenvolvedor.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingVertical: '43%',
    backgroundColor: corFundo,
    display: 'flex',
    rowGap: 20
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
});

export default Interditado;
