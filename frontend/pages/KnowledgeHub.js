import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../style/globalStyles';

const knowledgeItems = [
  { id: '1', title: 'Case Study 1', description: 'An example case study.' },
  { id: '2', title: 'Best Practices', description: 'A collection of best practices.' },
  { id: '3', title: 'Resource 1', description: 'Educational resource for nonprofits.' },
];

const KnowledgeHub = () => {
  const handleItemClick = (item) => {
    // Navigate to detailed view or open document
    console.log('Item Clicked:', item.title);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Knowledge Hub</Text>
      <Text style={globalStyles.subtitle}>Browse our case studies, best practices, and resources</Text>

      <FlatList
        data={knowledgeItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemClick(item)} style={styles.item}>
            <Text style={globalStyles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />

      <Button title="Upload New Resource" onPress={() => console.log('Upload New Resource')} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default KnowledgeHub;
