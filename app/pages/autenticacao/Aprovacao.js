import {
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Image,
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { corFundo, cor5 } from "../colors";
import { db } from "../../src/firebaseConection";
import { ref, set } from "firebase/database";
/* import * as Device from 'expo-device';  */// Adicione essa importação para obter o identificador do dispositivo
import { format } from 'date-fns'; // Adicione esta importação para formatar a data e hora

const Aprovacao = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (password !== password2) {
      Alert.alert("As senhas não coincidem!");
    } else if (email === "" || name === "" || number === "" || password === "") {
      Alert.alert("Por favor, preencha todos os campos!");
    } else if (password.length < 6) {
      Alert.alert("a senha deve conter pelo menos 6 caracteres.");
    } else {
      try {
        /*  const deviceId = Device.osBuildId; */ // Obtém o identificador do dispositivo
        const now = new Date();
        const formattedDate = format(now, 'yyyy-MM-dd HH:mm:ss'); // Formata a data e hora

        // Salva os dados do usuário no Realtime Database
        await set(ref(db, "solicitacaoS/" + name), {
          nome: name,
          email: email,
          celular: number,
          senha: password,
          dataCadastro: formattedDate,
          /* identificadorDispositivo: deviceId, */
        });

        Alert.alert("Solicitação enviada...");
        setName("");
        setEmail("");
        setPassword("");
        setNumber("");
        navigation.navigate("Successo");
      } catch (error) {
        Alert.alert("Erro ao realizar a Solicitação:", error.message);
      }
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: corFundo
      }}>
        <ActivityIndicator color="#FFF" size="large" />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", display: "flex" }}>
        <Image
          style={styles.logoB}
          source={require("../../imagens/logoc.png")}
        />
      </View>

      <Text style={styles.title}>Solicitação de Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome (Apenas letras e números)"
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
        placeholder="Numero de Contato"
        value={number}
        onChangeText={setNumber}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Criar Senha"
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
            routes: [{ name: "Login" }], // Corrigido o nome da rota
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
    padding: 20,
    backgroundColor: corFundo,
  },
  copy: {
    padding: 20,
    color: "white",
    fontSize: 12,
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
    width: "90%",
  },
  input: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  text: {
    padding: 10,
    color: "white",
    fontSize: 17,
  },
});

export default Aprovacao;
