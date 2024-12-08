import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const LinkText = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.linkBase, style]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkBase: {
    fontSize: 14,
    marginVertical: 5,
    textDecorationLine: 'underline',
  },
  linkEsqueceuSenha: {
    color: '#20add0', 
  },
  linkRegister: {
    color: '#d85a60', 
  },
});

export default LinkText;
