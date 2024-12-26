import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const Dashboard = () => {
  const [expandedCard, setExpandedCard] = useState(null); // Track which card is expanded

  // Dummy data for projects and their progress
  const dummyData = {
    projects: [
      { name: 'Project A', totalInvestment: '$50000', progress: '50%' },
      { name: 'Project B', totalInvestment: '$70000', progress: '30%' },
      { name: 'Project C', totalInvestment: '$30000', progress: '70%' },
    ],
  };

  // Function to toggle expanded card view
  const toggleCard = (cardName) => {
    setExpandedCard(expandedCard === cardName ? null : cardName); // Toggle between expanded and collapsed
  };

  return (
    <ScrollView style={styles.container}>
      {/* Total Investment Card */}
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => toggleCard('projects')}>
          <View style={styles.cardContent}>
            <MaterialIcons name="account-balance-wallet" size={40} color="#FF9800" />
            <Text style={styles.cardTitle}>Total Investment</Text>
            <Text style={styles.cardValue}>$150000</Text>
          </View>
        </TouchableOpacity>
        {expandedCard === 'projects' && (
          <View style={styles.expandedContent}>
            {dummyData.projects.map((data, index) => (
              <View key={index} style={styles.projectCard}>
                <View style={styles.projectContent}>
                  <MaterialIcons name="business" size={24} color="#FF9800" />
                  <Text style={styles.projectName}>{data.name}</Text>
                </View>
                <Text style={styles.projectDetails}>
                  Total Investment: {data.totalInvestment}
                </Text>
                <Text style={styles.projectProgress}>
                  Progress: {data.progress}
                </Text>
                <TouchableOpacity onPress={() => alert(`Redirecting to details of ${data.name}`)}>
                  <Text style={styles.projectLink}>View Details</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  card: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    flex: 1,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  expandedContent: {
    marginTop: 15,
    paddingLeft: 10,
  },
  projectCard: {
    marginBottom: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  projectContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  projectDetails: {
    fontSize: 14,
    marginLeft: 40,
    marginTop: 5,
  },
  projectProgress: {
    fontSize: 14,
    marginLeft: 40,
    marginTop: 5,
  },
  projectLink: {
    fontSize: 14,
    color: '#FF9800',
    marginTop: 5,
    fontWeight: 'bold',
  },
});

export default Dashboard;
