import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the new package
import axios from 'axios';


const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone,setphone]=useState('')
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disabilityType, setDisabilityType] = useState('none'); // Only the disability type state
  const [loading, setLoading] = useState(false); // State to manage the loader

  // List of disability types
  const disabilityTypes = [
   'none', 'physical', 'hearing', 'visual', 'speech', 'cognitive', 'psychological','other'
  ];

  const handleSignup = async () => {
    // Check if passwords match before submitting
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Prepare the data to send in the POST request
    const userData = JSON.stringify({
      fullname: name,
      phone:phone,
      email: email,
      password: password,
      role: role,
      disabilityType: disabilityType
    });
// console.log(userData)
// console.log(userData)
    // Axios request configuration
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://ebizaapi-production.up.railway.app/api/users/create',
      headers: {
        'Content-Type': 'application/json',
      },
      data: userData,
    };

    setLoading(true); // Start loader

    try {
      const response = await axios.request(config);
      console.log('Signup successful:', response.data);

      // Reset form fields after successful signup
      setName('');
      setphone('')
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('');
      setDisabilityType('');

      // Redirect to the login page
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during signup:', error.response || error.message);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
       <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setphone}
      
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

      {/* Role Select Input */}
      <View style={styles.input}>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Role" value="" />
          <Picker.Item label="user" value="user" />
          <Picker.Item label="NGO" value="ngo" />
          <Picker.Item label="BUSINESS" value="business" />
        </Picker>
      </View>

      {/* Disability Type Dropdown for Business Owners */}
      {role === 'user' && (
        <View style={styles.input}>
          <Picker
            selectedValue={disabilityType}
            onValueChange={(itemValue) => setDisabilityType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Disability Type" value="" />
            {disabilityTypes.map((type, index) => (
              <Picker.Item key={index} label={type} value={type} />
            ))}
          </Picker>
        </View>
      )}

      {/* Show the loader if the signup is in progress */}
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    borderRadius: 8,
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
