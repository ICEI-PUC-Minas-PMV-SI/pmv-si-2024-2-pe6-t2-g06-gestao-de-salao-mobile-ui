// src/components/Button.js
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
      backgroundColor: '#93876e', // Beige Rose for primary buttons
      borderColor: '#cfa2a0', // Marsala as border highlight
      borderWidth: 1,
    },
    secondaryButton: {
      backgroundColor: '#93876e', // Seafoam Green for secondary actions
      borderColor: '#cfa2a0', // Marsala for subtle contrast
      borderWidth: 1,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff', // Black for high-contrast text
    },
  });

export default Button;
