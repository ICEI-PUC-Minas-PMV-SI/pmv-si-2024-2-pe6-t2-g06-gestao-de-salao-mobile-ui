import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({ value, onChangeText, placeholder, secureTextEntry = false }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#dcb4b1" 
    />
  );
};

const styles = StyleSheet.create({
    input: {
      height: 50,
      width: '100%',
      borderColor: '#cca78a', 
      borderWidth: 1,
      borderRadius: 25,
      paddingLeft: 15,
      marginVertical: 10,
      backgroundColor: '#eeeeee',
      color: '#dcb4b1', 
      fontSize: 14,
    },
  });

export default Input;
