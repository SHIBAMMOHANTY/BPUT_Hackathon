import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProposalCard = ({ proposal, onApprove, onDeny }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{proposal.name}</Text>
      <Text>Status: {proposal.status}</Text>
      <Text>AI Score: {proposal.aiScore}</Text>
      <Button title="Approve" onPress={() => onApprove(proposal.id)} />
      <Button title="Deny" onPress={() => onDeny(proposal.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProposalCard;
