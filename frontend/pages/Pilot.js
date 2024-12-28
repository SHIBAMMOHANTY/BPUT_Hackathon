import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../style/globalStyles';

const pilotPrograms = [
  { id: '1', name: 'AI for Accessibility', milestones: 3, funding: 50000, outcome: 'In Progress' },
  { id: '2', name: 'Smart City Solutions', milestones: 5, funding: 100000, outcome: 'Completed' },
  { id: '3', name: 'Green Energy Initiative', milestones: 2, funding: 30000, outcome: 'Pending' },
];

const PilotProgramTracker = () => {
  const handleViewDetails = (item) => {
    // Navigate or show detailed progress of the selected pilot program
    console.log('Viewing details for:', item.name);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Pilot Program Tracker</Text>
      <Text style={globalStyles.subtitle}>Track the progress of small-scale projects</Text>

      <FlatList
        data={pilotPrograms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleViewDetails(item)} style={styles.item}>
            <View style={styles.itemHeader}>
              <Text style={globalStyles.title}>{item.name}</Text>
              <Text style={styles.itemOutcome}>{item.outcome}</Text>
            </View>
            <Text>Milestones: {item.milestones}</Text>
            <Text>Funding: ${item.funding}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemOutcome: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default PilotProgramTracker;
