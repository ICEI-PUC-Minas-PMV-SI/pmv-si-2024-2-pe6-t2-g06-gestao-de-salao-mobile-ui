import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, color = '#1a4314' }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      alignItems: 'center',
      marginVertical: 10,
      elevation: 5,
    },
    primaryButton: {
      backgroundColor: '#93876e', 
      borderColor: '#cfa2a0', 
      borderWidth: 1,
    },
    secondaryButton: {
      backgroundColor: '#93876e', 
      borderColor: '#cfa2a0', 
      borderWidth: 1,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff', 
    },
  });

export default Button;
