import {
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Image,
  Linking,
  ActivityIndicator 
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { corFundo, cor5 } from "../colors";
import { auth, db } from "../../src/firebaseConection";
import { ref, set, get, child } from 'firebase/database';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import DeviceInfo from 'react-native-device-info';

// Adicione as credenciais

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);   
   
  }, []);


  if (loading) {
    return (
      <View style={{ flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: corFundo}}>
        <ActivityIndicator color="corFundo" size="large" />
      </View>
    )
  }
  
  const navigation = useNavigation();

  const cadastrar = async () => {
    // Obter identificador único do dispositivo
    const deviceId = await DeviceInfo.getUniqueId();

    if (password !== password2) {
      Alert.alert("Erro", "As senhas não coincidem!");
    } else if (!email || !name || !number || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos para se registrar!");
    } else {
      try {
        // Verificar se o dispositivo já está cadastrado
        const snapshot = await get(child(ref(db), "cadastroS/"));
        let deviceRegistered = false;

        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();
          if (userData.deviceId === deviceId) {
            deviceRegistered = true;
          }
        });

        if (deviceRegistered) {
          Alert.alert(
            "Registro Negado",
            "Você não pode se registrar sem pagar. Caso já tenha pago, envie seu comprovante e seu e-mail para: batalhadoss94@gmail.com"
          );
          return;
        }

        // Autenticação do usuário
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const currentDate = new Date().toLocaleString();
        await set(ref(db, `cadastroS/${user.uid}`), {
          nome: name,
          email: email,
          celular: number,
          senha: password, // Nota: Evite armazenar senhas em texto claro em produção
          dataCadastro: currentDate,
          deviceId: deviceId,
        });

        await sendEmailVerification(user);
        Alert.alert(
          "Cadastro realizado",
          `Um e-mail de verificação foi enviado para ${email}. Retorne ao Sjurados para logar. Caso tenha ocorrido algum erro, entre em contato pelo e-mail: batalhadoss94@gmail.com`
        );
        navigation.replace("Login"); // Substitua "LoginScreen" pelo nome correto da sua tela de login
      } catch (error) {
        // Tratamento de erros personalizados
        switch (error.code) {
          case "auth/email-already-in-use":
            Alert.alert("Erro", "Este e-mail já está em uso. Tente outro.");
            break;
          case "auth/invalid-email":
            Alert.alert("Erro", "E-mail inválido. Verifique o formato.");
            break;
          case "auth/weak-password":
            Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
            break;
          default:
            Alert.alert("Erro", `Erro ao realizar o cadastro: ${error.message}`);
        }
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
        <Button color={cor5} title="Cadastrar" onPress={cadastrar} />
      </View>
      <Text
        style={styles.text}
        onPress={() => {
          navigation.navigate("Login");
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

export default Cadastro;
