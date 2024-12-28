import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Correct import for Picker
import { globalStyles } from '../style/globalStyles';

const PartnershipPortal = () => {
  const [organizationName, setOrganizationName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organizationType, setOrganizationType] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!organizationName || !contactName || !email || !phone || !organizationType || !country || !description) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    // Handle form submission logic here
    console.log('Organization Registered:', organizationName);
    Alert.alert('Success', 'Your organization has been successfully registered');
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Partnership Portal</Text>
      <Text style={globalStyles.subtitle}>Register Your Organization</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="Organization Name"
          value={organizationName}
          onChangeText={setOrganizationName}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Contact Name"
          value={contactName}
          onChangeText={setContactName}
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

        <Picker
          selectedValue={organizationType}
          style={globalStyles.picker}
          onValueChange={(itemValue) => setOrganizationType(itemValue)}
        >
          <Picker.Item label="Select Organization Type" value="" />
          <Picker.Item label="Non-profit" value="non_profit" />
          <Picker.Item label="Corporate" value="corporate" />
          <Picker.Item label="Government" value="government" />
        </Picker>

        <Picker
          selectedValue={country}
          style={globalStyles.picker}
          onValueChange={(itemValue) => setCountry(itemValue)}
        >
          <Picker.Item label="Select Country" value="" />
          <Picker.Item label="India" value="india" />
          <Picker.Item label="United States" value="us" />
          <Picker.Item label="United Kingdom" value="uk" />
        </Picker>

        <TextInput
          style={globalStyles.textArea}
          placeholder="Brief Description of Your Organization"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
});

export default PartnershipPortal;
