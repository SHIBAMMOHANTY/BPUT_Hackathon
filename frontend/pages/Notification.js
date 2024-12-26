import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);

  // Dummy notifications data (replace this with real API response)
  const dummyNotifications = [
    {
      id: '1',
      title: 'Welcome to EbizA!',
      message: 'We’re excited to have you onboard. Explore our platform to get started.',
      timestamp: '2024-12-26 10:00 AM',
    },
    {
      id: '2',
      title: 'Important Update!',
      message: 'A new version of the platform is available. Please update your app for a better experience.',
      timestamp: '2024-12-25 08:30 PM',
    },
    {
      id: '3',
      title: 'Campaign Alert!',
      message: 'Check out the new campaign opportunities for NGOs and businesses in your region.',
      timestamp: '2024-12-24 02:15 PM',
    },
  ];

  // Simulate fetching notifications from a backend (useEffect)
  useEffect(() => {
    // Simulate an API call with a delay
    setTimeout(() => {
      // Here you would replace the dummy data with your actual API call like:
      // fetch('your-api-endpoint')
      //   .then((response) => response.json())
      //   .then((data) => setNotifications(data))
      //   .catch((error) => console.error('Error fetching notifications:', error));

      setNotifications(dummyNotifications); // Using dummy data for now
    }, 1000);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        <Ionicons name="notifications-outline" size={24} color="#3498db" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.timestamp}</Text>
      </View>
    </View>
  );

  // Function to handle notification click (e.g., open specific page)
  const handleNotificationClick = (notification) => {
    Alert.alert('Notification clicked!', `You clicked on: ${notification.title}`);
    // Navigate or perform actions based on notification (e.g., go to a detailed page)
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshing={false}
        onRefresh={() => {}}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notifications available at the moment.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    paddingTop: 20,
    paddingHorizontal: 0, // Full width
    width: '100%', // Ensure full width
  },
  list: {
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%', // Full width
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#BDC3C7',
    marginTop: 5,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
});

export default NotificationScreen;
