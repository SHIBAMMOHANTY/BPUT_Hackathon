import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTextSize } from './TextSizeContext';  // Import the TextSize context

const AccessibleTextComponent = () => {
  const { textSize, increaseTextSize, decreaseTextSize } = useTextSize();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: textSize }]}>
        This is an accessible text that changes size!
      </Text>
      <TouchableOpacity onPress={increaseTextSize} style={styles.button}>
        <Text style={styles.buttonText}>Increase Text Size</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={decreaseTextSize} style={styles.button}>
        <Text style={styles.buttonText}>Decrease Text Size</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  text: {
    marginBottom: 20,
    color: '#333',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#6366f1',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AccessibleTextComponent;
