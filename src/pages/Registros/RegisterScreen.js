import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';  // Assumed custom input component
import Button from '../../components/Button';  // Assumed custom button component
import Header from '../../components/Header';  // Assumed custom header component

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (username && email && password) {
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('Login');  // Ensure 'Login' is a valid screen name in your navigator
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Header text="Criar Conta" />

      <Input 
        placeholder="Usuário" 
        value={username} 
        onChangeText={setUsername} 
      />
      <Input 
        placeholder="E-mail" 
        value={email} 
        onChangeText={setEmail} 
      />
      <Input 
        placeholder="Senha" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />
      <Input 
        placeholder="Confirmar Senha" 
        secureTextEntry 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
      />

      <Button title="Registrar" onPress={handleRegister} color="#FF6F61" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F5F3F5', // Cor de fundo principal
  },
});

export default RegisterScreen;
