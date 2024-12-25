import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper'; // Make sure to install react-native-paper
import { MaterialIcons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <MaterialIcons name="attach-money" size={40} color="#4CAF50" />
            <Text style={styles.cardTitle}>Total Funds Raised</Text>
            <Text style={styles.cardValue}>$50,000</Text>
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <MaterialIcons name="business" size={40} color="#2196F3" />
            <Text style={styles.cardTitle}>Total Projects</Text>
            <Text style={styles.cardValue}>15</Text>
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <MaterialIcons name="people" size={40} color="#FF9800" />
            <Text style={styles.cardTitle}>Total Investors</Text>
            <Text style={styles.cardValue}>120</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    flex: 1,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Dashboard;