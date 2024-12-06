import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Hook for navigation
import CustomButton from '../../components/Button';  // Renamed to CustomButton
import LinkText from '../../components/LinkText';
import Header from '../../components/Header';

import { useAuth } from '../../navigation/AuthContext/AuthProvider';  // Use the auth context

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();  // Access login function from context
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.2.21:5000/users');
      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }
      const users = await response.json();
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        login();  // Call login from context to update global state
        Alert.alert('Login bem-sucedido', `Bem-vindo ${user.username}!`);
        navigation.navigate('InitialScreen'); 
        
      } else {
        Alert.alert('Erro', 'Credenciais inválidas');
        
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na conexão com o servidor');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header text="Login" />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <CustomButton title="Entrar" onPress={handleLogin} color="#6b726d" />
      <LinkText 
        title="Esqueceu sua senha?" 
        onPress={() => Alert.alert('Recuperar Senha', 'Instruções para recuperação de senha')} 
        style={styles.linkEsqueceuSenha}
      />
      <LinkText 
        title="Ainda não tem uma conta? Crie uma agora!" 
        onPress={() => Alert.alert('Registrar novo usuario. colocar link aqui!')} 
        style={styles.linkRegister}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#eeede7', // Fundo claro
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  linkEsqueceuSenha: {
    fontSize: 14,
    marginVertical: 5,
    textDecorationLine: 'underline',
    color: '#d85a60', // Vermelho suave
  },
  linkRegister: {
    fontSize: 14,
    marginVertical: 5,
    textDecorationLine: 'underline',
    color: '#6b726d', // Azul claro
  },
});

export default LoginScreen;
