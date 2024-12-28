import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProposalScreen = ({ route, navigation }) => {
  const { proposalId } = route.params;
  
  // Dummy data for the example
  const [proposal, setProposal] = useState(null);

  useEffect(() => {
    // Fetch the proposal details using the proposalId
    // Here, we'll use dummy data for simplicity
    const proposalData = {
      1: {
        name: 'AI for Accessibility',
        socialImpact: 'High impact on disabled individuals...',
        scalability: 'Can scale globally...',
        innovation: 'Innovative use of AI...',
        sustainability: 'Financially self-sustaining...',
        inclusivity: 'Includes disabled employees...',
        status: 'Pending Evaluation',
        aiScore: 85,
      },
      2: {
        name: 'Smart City Solutions',
        socialImpact: 'Improves city accessibility...',
        scalability: 'Can be implemented globally...',
        innovation: 'Smart tech for cities...',
        sustainability: 'Sustainable in long term...',
        inclusivity: 'Supports accessibility...',
        status: 'Approved',
        aiScore: 90,
      },
      3: {
        name: 'Accessibility for All',
        socialImpact: 'Targets low-income disabled people...',
        scalability: 'Can be scaled locally...',
        innovation: 'Basic accessibility improvements...',
        sustainability: 'Relies on donations...',
        inclusivity: 'Emphasizes inclusivity...',
        status: 'Denied',
        aiScore: 78,
      },
    };

    // Set the proposal data based on the proposalId
    setProposal(proposalData[proposalId]);
  }, [proposalId]);

  return (
    <View style={styles.container}>
      {proposal ? (
        <>
          <Text style={styles.title}>{proposal.name}</Text>
          <Text><b>Social Impact:</b> {proposal.socialImpact}</Text>
          <Text><b>Scalability:</b> {proposal.scalability}</Text>
          <Text><b>Innovation:</b> {proposal.innovation}</Text>
          <Text><b>Sustainability:</b> {proposal.sustainability}</Text>
          <Text><b>Inclusivity:</b> {proposal.inclusivity}</Text>
          <Text><b>Status:</b> {proposal.status}</Text>
          <Text><b>AI Score:</b> {proposal.aiScore}</Text>
          <Button title="Back to Dashboard" onPress={() => navigation.goBack()} />
        </>
      ) : (
        <Text>Loading proposal...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProposalScreen;
