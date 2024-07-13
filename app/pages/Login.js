
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
        }, 2000); // 3000 ms = 3 segundos
      }, []);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const IS_DEBUG = process.env.NODE_ENV === 'development';

    if (IS_DEBUG) {
        var user1 = 'Lucas';
        var pass1 = '29599157';
    }


    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const loggedIn = await AsyncStorage.getItem('loggedIn');

            } catch (error) {
                console.log(error);

            }
        };

        checkLoginStatus();
    }, []);
    function navegar() {
        navigation.navigate('Ferramenta')
    }
    const handleLogin = async () => {
        if (username === user1 && password === pass1) {
            try {
                await AsyncStorage.setItem('loggedIn', 'true');
                Alert.alert('Logado com sucesso!');
                navegar()

            } catch (error) {

                console.log(error);
            }
        } else {
            Alert.alert('Usuário ou senha incorretos');
        }
    };

    const navigation = useNavigation();

 




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
                <Button title='Login' onPress={handleLogin} />
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