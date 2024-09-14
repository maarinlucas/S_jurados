import {
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { corFundo, cor5 } from "../colors";
import { auth, db } from "../../src/firebaseConection";
import { ref, set } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

// Adicione as credenciais

const Reset = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (password != password2) {
      Alert.alert("As senhas não coincidem!");
    } else if (email == "" || name == "" || number == "" || password == "") {
      Alert.alert("Por favor, preencha todos os campos para se registrar!");
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await sendEmailVerification(user);
        await set(ref(db, "cadastroS/" + user.uid), {
          nome: name,
          email: email,
          celular: number,
          senha: password,
        });
        Alert.alert(
          "E-mail de verificação enviado! Por favor, verifique seu e-mail antes de fazer login."
        );
        await auth.signOut();
        setName("");
        setEmail("");
        setPassword("");
        navigation.navigate("Login");
      } catch (error) {
        Alert.alert("Erro ao realizar o cadastro:", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", display: "flex" }}>
        <Image
          style={styles.logoB}
          source={require("../../imagens/logoc.png")}
        />
      </View>

      <Text style={styles.title}>$jurados - Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Numero de Celular"
        value={number}
        onChangeText={setNumber}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Repita a Senha"
        value={password2}
        onChangeText={setPassword2}
        secureTextEntry
        autoCapitalize="none"
      />
      <View style={styles.btn}>
        <Button color={cor5} title="Cadastrar" onPress={handleResetPassword} />
      </View>
      <Text
        style={styles.text}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "/login" }],
          });
        }}
      >
        Voltar ao Login
      </Text>
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
    fontSize: 30,
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
  text: {
    padding: 20,
    color: "white",
    fontSize: 17,
  },
});

export default Reset;
