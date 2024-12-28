import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from 'react-native';

const ProposalForm = () => {
  const [proposalData, setProposalData] = useState({
    name: '',
    socialImpact: '',
    scalability: '',
    innovation: '',
    sustainability: '',
    inclusivity: '',
  });

  const handleChange = (name, value) => {
    setProposalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here (e.g., API call)
    console.log('Proposal Submitted:', proposalData);
    // Redirect to dashboard or show success message
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Submit a Proposal</Text>

      <Text style={styles.label}>Proposal Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter proposal name"
        value={proposalData.name}
        onChangeText={(text) => handleChange('name', text)}
      />

      <Text style={styles.label}>Social Impact Potential</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe social impact"
        value={proposalData.socialImpact}
        onChangeText={(text) => handleChange('socialImpact', text)}
      />

      <Text style={styles.label}>Scalability</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe scalability"
        value={proposalData.scalability}
        onChangeText={(text) => handleChange('scalability', text)}
      />

      <Text style={styles.label}>Innovation</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe innovation"
        value={proposalData.innovation}
        onChangeText={(text) => handleChange('innovation', text)}
      />

      <Text style={styles.label}>Sustainability</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe sustainability"
        value={proposalData.sustainability}
        onChangeText={(text) => handleChange('sustainability', text)}
      />

      <Text style={styles.label}>Inclusivity</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe inclusivity"
        value={proposalData.inclusivity}
        onChangeText={(text) => handleChange('inclusivity', text)}
      />

      <Button title="Submit Proposal" onPress={handleSubmit} color="#4CAF50" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
});

export default ProposalForm;
