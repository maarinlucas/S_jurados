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
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/firebaseConection";
import { corFundo, cor5 } from "../colors";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    // Carregar e-mail e senha armazenados ao inicializar o componente
    const loadCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('email');
        const savedPassword = await AsyncStorage.getItem('password');
        if (savedEmail) setEmail(savedEmail);
        if (savedPassword) setPassword(savedPassword);
      } catch (error) {
        console.error(error);
      }finally {
        setIsLoading(false);
      }
    };

    loadCredentials();
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      if (user.emailVerified) {
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("password", password);
        Alert.alert("Login realizado com sucesso!");
        navigation.navigate("Ferramenta");
      } else {
        await auth.signOut();
        Alert.alert("Por favor, verifique seu e-mail antes de fazer login.");
      }

      // O App.js vai automaticamente redirecionar para a Home devido ao listener onAuthStateChanged
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao realizar login:", error.message);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", display: "flex" }}>
        <Image style={styles.logoB} source={require("../imagens/logo.png")} />
      </View>

      <Text style={styles.title}>$jurados - Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
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
      <View style={styles.btn}>
        <Button color={cor5} title="Acessar" onPress={handleLogin} />
      </View>
      <Text style={styles.text} onPress={() => navigation.navigate("Reset")}>
        Esqueceu sua senha?
      </Text>
      <Text style={styles.text} onPress={() => navigation.navigate("Cadastro")}>
        Ainda não tem uma conta?
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
  welcomeText: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  text:{
    padding: 10,
    color: "white",
    fontSize: 17
  }
});

export default Login;
