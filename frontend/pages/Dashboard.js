import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const Dashboard = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const dummyData = {
    fundsRaised: [
      { month: 'January', amount: 5000 },
      { month: 'February', amount: 10000 },
      { month: 'March', amount: 15000 },
    ],
    projects: [
      { name: 'Project A', amount: '$20,000' },
      { name: 'Project B', amount: '$15,000' },
      { name: 'Project C', amount: '$10,000' },
    ],
    investors: [
      { name: 'Investor 1', project: 'Project A', amount: '$5,000' },
      { name: 'Investor 2', project: 'Project B', amount: '$7,000' },
      { name: 'Investor 3', project: 'Project C', amount: '$3,000' },
      { name: 'Investor 4', project: 'Project A', amount: '$10,000' },
      { name: 'Investor 5', project: 'Project B', amount: '$15,000' },
    ],
  };

  const toggleCard = (cardName) => {
    setExpandedCard(expandedCard === cardName ? null : cardName);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardContainer}>
        {/* Total Funds Raised */}
        <Card style={styles.card}>
          <TouchableOpacity onPress={() => toggleCard('fundsRaised')}>
            <View style={styles.cardContent}>
              <MaterialIcons name="attach-money" size={40} color="#4CAF50" />
              <Text style={styles.cardTitle}>Total Funds Raised</Text>
              <Text style={styles.cardValue}>$50,000</Text>
            </View>
          </TouchableOpacity>
          {expandedCard === 'fundsRaised' && (
            <View style={styles.expandedContentcharts}>
              <LineChart
                data={{
                  labels: dummyData.fundsRaised.map((item) => item.month),
                  datasets: [
                    {
                      data: dummyData.fundsRaised.map((item) => item.amount),
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 40}
                height={220}
                chartConfig={{
                  backgroundColor: '#4CAF50',
                  backgroundGradientFrom: '#4CAF50',
                  backgroundGradientTo: '#80E27E',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 10,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#4CAF50',
                  },
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 10,
                }}
              />
            </View>
          )}
        </Card>

        {/* Total Projects */}
        <Card style={styles.card}>
          <TouchableOpacity onPress={() => toggleCard('projects')}>
            <View style={styles.cardContent}>
              <MaterialIcons name="business" size={40} color="#2196F3" />
              <Text style={styles.cardTitle}>Total Projects</Text>
              <Text style={styles.cardValue}>15</Text>
            </View>
          </TouchableOpacity>
          {expandedCard === 'projects' && (
            <View style={styles.expandedContent}>
              {dummyData.projects.map((data, index) => {
                const desiredAmount = 25000; // Set the desired amount for all projects
                const receivedAmount = parseInt(
                  data.amount.replace('$', '').replace(',', '')
                ); // Remove $ and parse as number
                const progressPercentage = (receivedAmount / desiredAmount) * 100;

                return (
                  <View key={index} style={styles.projectRow}>
                    <Text style={styles.projectText}>{data.name}: {data.amount} of $25,000</Text>
                    <View style={styles.progressBarContainer}>
                      <View
                        style={[
                          styles.progressBar,
                          { width: `${progressPercentage}%` },
                        ]}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </Card>
        <Card style={styles.card}>
        <TouchableOpacity onPress={() => toggleCard('investors')}>
          <View style={styles.cardContent}>
            <MaterialIcons name="people" size={40} color="#FF9800" />
            <Text style={styles.cardTitle}>Total Investors</Text>
            <Text style={styles.cardValue}>{dummyData.investors.length}</Text>
          </View>
        </TouchableOpacity>
        {expandedCard === 'investors' && (
          <View style={styles.expandedContent}>
            {dummyData.investors.map((data, index) => (
              <View key={index} style={styles.investorCard}>
                <View style={styles.investorContent}>
                  <MaterialIcons name="person" size={24} color="#FF9800" />
                  <Text style={styles.investorName}>{data.name}</Text>
                </View>
                <Text style={styles.investorDetails}>
                  Invested {data.amount} in {data.project}
                </Text>
              </View>
            ))}
          </View>
        )}
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
  investorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  investorName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  investorDetails: {
    fontSize: 16,
    color: '#333',
    marginLeft: 30,
  },
  investorCard: {
    // backgroundColor: '#FFEB3B',  // Optional background color
    borderRadius: 0,
    marginBottom: 10,
    padding: 15,
    borderBottomWidth: 1, // Adds a bottom border
    borderBottomColor: '#ddd', // Light gray color for the bottom border
    borderBottomEndRadius: 10, // Rounded corner at the bottom right
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
  expandedContent: {
    padding: 15,
    // backgroundColor: '#e0f7fa',
  },
  expandedContentcharts: {
    padding: 0,
    backgroundColor: '#e0f7fa',
  },
  expandedText: {
    fontSize: 18,
    marginVertical: 7,
    color: '#333',
  },
  projectRow: {
    marginBottom: 15,
  },
  projectText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2196F3',
  },
  
});

export default Dashboard;
