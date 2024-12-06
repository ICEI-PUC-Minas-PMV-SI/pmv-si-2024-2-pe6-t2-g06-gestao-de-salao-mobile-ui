// src/components/Header.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Header = ({ text }) => {
  return (
    <Text style={styles.header}>{text}</Text>
    
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#906876', // Maroon suave para o título
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Header;