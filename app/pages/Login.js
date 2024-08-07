
import { Button, StyleSheet, View, Text, TextInput, Alert, Image } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();



const Login = () => {


    useEffect(() => {
        // Simula uma tarefa de inicialização (ex: carregar dados)
        setTimeout(async () => {
            // Esconde a splash screen após 3 segundos
            await SplashScreen.hideAsync();
        }, 4000); // 3000 ms = 3 segundos
    }, []);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    
    var user1 = ['Lucas','29599157']
    var user2 = ['Juanqueirozx','appdejurados01@']
    
   const navigation = useNavigation();
    function navegar() {
        navigation.navigate('Ferramenta')
    }
 
    useEffect(() => {
        checkLoginStatus();
      }, []);
    

      const checkLoginStatus = async () => {
        try {
          const isLoggedIn = await AsyncStorage.getItem('loggedIn');
          if (isLoggedIn) {
            navigation.navigate('Ferramenta');
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      const handleLogin = async () => {
        if ((username === user1[0] && password === user1[1]) || (username === user2[0] && password === user2[1])) { 
          try {
            await AsyncStorage.setItem('loggedIn', 'true');
            navigation.navigate('Ferramenta');
          } catch (error) {
            console.log(error);
            Alert.alert('Erro ao fazer login.');
          }
        } else {
          Alert.alert('Credenciais inválidas.');
        }
      };


    return (
        <View style={styles.container}>
            <View style={{ width: '100%', display: 'flex', }}>
                <Image style={styles.logoB} source={require('../imagens/logo.png')} />
            </View>

            <Text style={styles.title}>$jurados - Login</Text>
            <TextInput
                style={styles.input}
                placeholder='Usuário'
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder='Senha'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.btn}>
                <Button color="#3A1F7C" title='Login'  onPress={handleLogin} />
            </View>

            <Text style={styles.copy}>© 2024 BatalhaDosS. Todos os direitos reservados.</Text>

        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#131313'
    },
    copy: {
        padding: 20,
        color: '#666',
        fontSize: 12,

    },
    logoB: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    title: {
        fontSize: 30,
        marginBottom: 16,
        textAlign: 'center',
        color: 'white'
    },
    btn: {
        width: '100%',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: 'white'
    },
    welcomeText: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
});


export default Login;