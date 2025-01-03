import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { LineChart } from 'react-native-chart-kit';
import * as FileSystem from 'expo-file-system';

const Dashboard = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width;

  const cards = [
    { id: '1', title: 'Donations Made', value: 15, icon: 'heart', graphData: [10, 15, 20, 25, 30, 35] },
    { id: '2', title: 'Badges Earned', value: 7, icon: 'award', graphData: [2, 3, 5, 6, 7, 8] },
    { id: '3', title: 'Total Invested', value: 1200, icon: 'money', graphData: [200, 400, 600, 800, 1000, 1200] },
  ];

  const activities = [
    { id: '1', title: 'Donated to Clean Water Initiative', date: 'Jan 2, 2025' },
    { id: '2', title: 'Posted: New Year Resolution!', date: 'Jan 1, 2025' },
  ];

  const [selectedGraphData, setSelectedGraphData] = useState(cards[0].graphData);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const downloadReport = async () => {
    const reportData = {
      graphData: selectedGraphData,
      date: new Date().toISOString(),
    };
    
    const fileUri = `${FileSystem.documentDirectory}report.json`;
    
    try {
      // Write the JSON string to the file
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(reportData, null, 2));
      Alert.alert('Success', 'Report downloaded successfully!', [{ text: 'OK' }]);
      
      // Optionally, provide the user with the path where the report is saved
      console.log('Report saved at:', fileUri);

    } catch (error) {
      Alert.alert('Error', 'Failed to download report. Please try again.', [{ text: 'OK' }]);
      console.error('Download failed:', error);
    }
  };

  const Header = () => (
    <View style={styles.header}>
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }}
        style={styles.profilePicture}
      />
      <View>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@example.com</Text>
      </View>
    </View>
  );

  const Card = ({ id, title, value, icon, graphData }) => (
    <TouchableOpacity
      style={[styles.card, selectedCardId === id && styles.selectedCard]}  // Apply selectedCard style conditionally
      onPress={() => {
        setSelectedGraphData(graphData);
        setSelectedCardId(id);  // Set selected card ID
      }}
    >
      <View style={styles.cardContent}>
        <Icon name={icon} type="feather" size={24} color="#4CAF50" />
        <Text style={styles.cardValue}>{value}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  const ListHeaderComponent = () => (
    <View>
      <Header />
      <FlatList
        data={cards}
        renderItem={({ item }) => <Card {...item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
        style={{ flexGrow: 0 }}
      />
      <Text style={styles.sectionTitle}>Performance Overview</Text>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{ data: selectedGraphData, color: () => `#4CAF50`, strokeWidth: 2 }],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#f0f0f0',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
        style={styles.graphStyle}
      />
      <TouchableOpacity style={styles.downloadButton} onPress={downloadReport}>
        <Text style={styles.downloadButtonText}>Download Report</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Recent Activities</Text>
    </View>
  );

  return (
    <FlatList
      data={activities}
      renderItem={({ item }) => (
        <View style={styles.activityItem}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <Text style={styles.activityDate}>{item.date}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  userEmail: {
    fontSize: 14,
    color: 'white',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 95,  // Set a fixed width for consistency
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 5,  // Space between cards
  },
  selectedCard: {
    backgroundColor: '#A5D6A7',  // Color when card is selected
  },
  cardContent: {
    alignItems: 'center',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 5,
  },
  cardTitle: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  graphStyle: {
    borderRadius: 15,
    marginBottom: 20,
  },
  downloadButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  activityDate: {
    fontSize: 12,
    color: '#666',
  },
});

export default Dashboard;
