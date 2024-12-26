import React, { useState } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disabilityCategory, setDisabilityCategory] = useState('');

  const handleSignup = () => {
    const userData = { name, email, role, password, disabilityCategory };
    console.log(userData);  // Replace with actual signup logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Role (Investor / NGO / Business Owner)"
        value={role}
        onChangeText={setRole}
      />

      {role === 'Business Owner' && (
        <TextInput
          style={styles.input}
          placeholder="Disability Category"
          value={disabilityCategory}
          onChangeText={setDisabilityCategory}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginLink} onPress={() => {/* Navigate to Login */}}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
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
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 20,
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
  loginLink: {
    marginTop: 15,
  },
  linkText: {
    color: '#3498db',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
