import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../style/globalStyles';

const events = [
  { id: '1', name: 'Impact Investment Summit 2024', date: 'June 20, 2024' },
  { id: '2', name: 'Innovators in Accessibility', date: 'September 15, 2024' },
  { id: '3', name: 'Global CSR Conference', date: 'December 10, 2024' },
];

const EventPlatform = () => {
  const handleRegister = (event) => {
    // Handle event registration logic
    console.log('Registered for event:', event.name);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Event Platform</Text>
      <Text style={globalStyles.subtitle}>Upcoming Events</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>{item.name}</Text>
            <Text style={styles.eventDate}>{item.date}</Text>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => handleRegister(item)}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    padding: 20,
    marginVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  registerButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventPlatform;
