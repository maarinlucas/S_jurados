import {
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { resetPassword } from "../authService";
import { useNavigation } from "@react-navigation/native";
import { corFundo, cor5 } from "../colors";



const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const navigation = useNavigation();

  const handleResetPassword = () => {
    resetPassword(email)
      .then(() => {
        Alert.alert("Verifique seu e-mail para redefinir sua senha.");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .catch(error => Alert.alert("Erro ao redefinir senha", error.message));
  };

  


  return (
    <View style={styles.container}>
      <View style={{ width: "100%", display: "flex" }}>
        <Image style={styles.logoB} source={require("../../imagens/logoc.png")} />
      </View>

      <Text style={styles.title}>$jurados - Redefinir Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <View style={styles.btn}>
        <Button color={cor5} title="Redefinir Senha" onPress={handleResetPassword} />
      </View>
      <Text  style={styles.text} onPress={() => navigation.navigate('Login')}>Voltar ao Login</Text>
      <Text style={styles.copy}>
        © 2024 BatalhaDoS. Todos os direitos reservados.
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: corFundo,
  },
  logoB: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    color: "white",
  },
  btn: {
    width: "100%",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  copy: {
    padding: 20,
    color: "white",
    fontSize: 12,
  },
  text:{
    padding: 20,
    color: "white",
    fontSize: 17
  }
});

export default Reset;
