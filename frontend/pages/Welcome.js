import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Signup from './Signup';
import Login from './Login';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/150' }} 
        style={styles.logo}
      />

      <Text style={styles.welcomeText}>Welcome to EbizA</Text>
      <Text style={styles.subtitle}>Connecting investors, NGOs, and businesses for social impact</Text>

      {/* Get Started Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      {/* Login Redirect Button */}
      <TouchableOpacity 
        style={styles.secondaryButton} 
        onPress={() => navigation.navigate('Login')} // Navigate to Login screen
      >
        <Text style={styles.secondaryButtonText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f9fc',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius: 15,
    backgroundColor: '#ddd',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#7F8C8D',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    marginTop: 10,
  },
  secondaryButtonText: {
    color: '#3498db',
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
