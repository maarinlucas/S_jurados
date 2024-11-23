import {
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
  Linking,
} from "react-native";
import CheckBox from 'expo-checkbox';
import { getDatabase, ref, set, update } from 'firebase/database';
import DeviceInfo from 'react-native-device-info';
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../src/firebaseConection";
import { corFundo, cor5 } from "../colors";
import { FirebaseError } from "firebase/app";
import { format } from 'date-fns'; // Importando a função de formatação
import { ptBR } from 'date-fns/locale'; // Importando a localidade (opcional, mas recomendado para português)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [authUser, setAuthUser] = useState(null)
  const navigation = useNavigation();


  // Função auxiliar para tratar e-mails (Firebase não permite pontos nas chaves)


  const handleCheckout = () => {


    /* const phoneNumber = "5511976047647"; // Número de WhatsApp com o código do país (55 para o Brasil)
    const message = "Vim do Sjurados, gostaria de ajuda com a plataforma!";
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url)
      .catch(() => {
        Alert.alert("Erro", "Parece que o WhatsApp não está instalado no seu dispositivo.");
      }); */

    const checkoutUrl = 'https://checkout-sjurados.onrender.com'; // URL do seu checkout hospedado
    Linking.openURL(checkoutUrl).catch((err) => console.error("Couldn't load page", err));
  };

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        // Recupera email e senha armazenados no AsyncStorage
        const savedEmail = await AsyncStorage.getItem("email");
        const savedPassword = await AsyncStorage.getItem("password");

        if (savedEmail) setEmail(savedEmail); // Seta o email no estado
        if (savedPassword) setPassword(savedPassword); // Seta a senha no estado


      } catch (error) {
        console.error("Erro ao carregar credenciais: ", error);
      } finally {
        setLoading(false);
      }
    };


    // Carrega as credenciais salvas ao inicializar o componente
    loadCredentials();


  }, []);



  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {

        if (user) {
          setAuthUser({
            email: user.email,
            uid: user.uid
          })
          // Armazena email e senha no AsyncStorage
          setLoading(true);

          // Obtem o número único do dispositivo
          const deviceId = await DeviceInfo.getUniqueId();
          const loginTime = format(new Date(), "dd/MM/yyyy HH:mm:ss", { locale: ptBR }); // Formato legível

          // Armazenando dados no Realtime Database
          const db = getDatabase();
          const logRef = ref(db, 'logins/' + user.uid + `- ${deviceId}`); // Caminho onde os dados serão armazenados

          await set(logRef, {
            email: email,
            deviceId: deviceId,
            loginTime: loginTime,
          });


          // Referência ao caminho no Realtime Database (por exemplo, "cadastroS/emailDoUsuario")
          const userRef = ref(db, "cadastroS/" + user.uid);

          // Atualizando o campo específico (por exemplo, "nome" ou "senha")
          await update(userRef, {
            senha: password, // Substitui o valor da senha
          });


          

          navigation.navigate("Ferramenta");
        } else {
          // Se o e-mail não estiver verificado, desloga o usuário
          await auth.signOut();
          setLoading(false);
          Alert.alert("Erro ao entrar no App! Por favor verifique sua internet.");
        }
        return;
      
    })
  }, [])




  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Verifica se o e-mail foi confirmado
      if (user.emailVerified) {
        // Armazena email e senha no AsyncStorage
        setLoading(true);

        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("password", password);

        // Obtem o número único do dispositivo
        const deviceId = await DeviceInfo.getUniqueId();
        const loginTime = format(new Date(), "dd/MM/yyyy HH:mm:ss", { locale: ptBR }); // Formato legível

        // Armazenando dados no Realtime Database
        const db = getDatabase();
        const logRef = ref(db, 'logins/' + user.uid + `- ${deviceId}`); // Caminho onde os dados serão armazenados

        await set(logRef, {
          email: email,
          deviceId: deviceId,
          loginTime: loginTime,
        });


        // Referência ao caminho no Realtime Database (por exemplo, "cadastroS/emailDoUsuario")
        const userRef = ref(db, "cadastroS/" + user.uid);

        // Atualizando o campo específico (por exemplo, "nome" ou "senha")
        await update(userRef, {
          senha: password, // Substitui o valor da senha
        });


        Alert.alert("Login realizado com sucesso!");

        navigation.navigate("Ferramenta");
      } else {
        // Se o e-mail não estiver verificado, desloga o usuário
        await auth.signOut();
        setLoading(false);
        Alert.alert("Por favor, verifique seu e-mail antes de fazer login.");
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof FirebaseError) {
        let errorMessage;

        switch (error.code) {
          case "auth/invalid-credential":
            errorMessage = "A senha e/ou email inseridos não são válidos.";
            break;
          case "auth/invalid-email":
            errorMessage = "O e-mail inserido não é válido.";
            break;
          case "auth/user-disabled":
            errorMessage = "Esta conta foi desativada. Entre em contato com o suporte.";
            break;
          case "auth/user-not-found":
            errorMessage = "Nenhuma conta encontrada com este e-mail.";
            break;
          case "auth/network-request-failed":
            errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão com a internet.";
            break;
          case "auth/too-many-requests":
            errorMessage = "O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou tentar novamente mais tarde.";
            break;
          default:
            errorMessage = `Erro inesperado: ${error.message}`;
            break;
        }

        Alert.alert("Erro ao realizar login", errorMessage);
      } else {
        // Caso não seja um erro do Firebase, exibe uma mensagem genérica
        Alert.alert("Erro desconhecido", "Não foi possível realizar o login.");
      }
    }
  };



  if (loading) {
    return (
      <View style={styles.container}>
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
        secureTextEntry={!showPassword}
        autoCapitalize="none"
      />
      <View style={styles.checkboxContainer}>

        <Text style={styles.label}>Mostrar senha</Text>
        <CheckBox
          value={showPassword}
          onValueChange={setShowPassword}
          style={styles.checkbox}
        />
      </View>
      <View style={styles.btn}>
        <Button color={cor5} title="Acessar" onPress={handleLogin} />
      </View>
      <Text style={styles.text} onPress={() => navigation.navigate("Reset")}>
        Esqueceu sua senha?
      </Text>
      <Text
        style={styles.text}
        onPress={() => { navigation.navigate("Successo"); }} // Chamando a função de suporte ao clicar
      >
        Falar com o Suporte
      </Text>
      <Text
        style={styles.text}
        onPress={() => {
          handleCheckout();
        }}
      >
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
    margin: 10,
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
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    columnGap: 5,
    alignItems: 'center',
    marginBottom: 6
  },
  label: {
    color: 'white'
  }
});

export default Login;
