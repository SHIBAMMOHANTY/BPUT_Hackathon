import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { globalStyles } from '../style/globalStyles';

const CSROnboarding = () => {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedVenture, setSelectedVenture] = useState('');

  const ventures = ['AI for Accessibility', 'Smart City Solutions', 'Green Energy Initiative'];

  const handleSubmit = () => {
    // Handle CSR registration submission logic here
    console.log('CSR Registered:', companyName);
    console.log('Selected Venture:', selectedVenture);
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>CSR Onboarding</Text>
      <Text style={globalStyles.subtitle}>Register your company and select a venture to support</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="Company Name"
          value={companyName}
          onChangeText={setCompanyName}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Contact Person"
          value={contactPerson}
          onChangeText={setContactPerson}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={globalStyles.subtitle}>Select Venture to Support:</Text>
        {ventures.map((venture, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedVenture(venture)} style={styles.ventureButton}>
            <Text style={styles.buttonText}>{venture}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  ventureButton: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    padding: 14,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CSROnboarding;
