import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import ProposalCard from '../component/Entryinfo/ProposalCard';

const dummyProposals = [
  {
    id: 1,
    name: 'AI for Accessibility',
    aiScore: 85,
    status: 'Pending Evaluation',
  },
  {
    id: 2,
    name: 'Smart City Solutions',
    aiScore: 90,
    status: 'Approved',
  },
  {
    id: 3,
    name: 'Accessibility for All',
    aiScore: 78,
    status: 'Denied',
  },
];

const DashboardScreen = ({ navigation }) => {
  const [proposals, setProposals] = useState(dummyProposals);

  useEffect(() => {
    // Simulate an API call or fetching data
    setProposals(dummyProposals); // Replace with real API call if needed
  }, []);

  const handleApprove = (id) => {
    console.log('Approved Proposal ID:', id);
    // Logic to approve the proposal
  };

  const handleDeny = (id) => {
    console.log('Denied Proposal ID:', id);
    // Logic to deny the proposal
  };

  const handleProposalClick = (proposalId) => {
    navigation.navigate('ProposalScreen', { proposalId }); // Navigate to ProposalScreen with proposalId
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Proposal Dashboard</Text>
      {proposals.length > 0 ? (
        proposals.map((proposal) => (
          <TouchableOpacity key={proposal.id} onPress={() => handleProposalClick(proposal.id)}>
            <ProposalCard
              proposal={proposal}
              onApprove={handleApprove}
              onDeny={handleDeny}
            />
          </TouchableOpacity>
        ))
      ) : (
        <Text>No proposals available</Text>
      )}
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
    marginBottom: 20,
  },
});

export default DashboardScreen;
