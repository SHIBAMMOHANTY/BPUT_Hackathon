import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    // Redirect to Home route after 1 second
    const timer = setTimeout(() => {
      navigation.replace('Drawer'); // Navigate to Home (Drawer)
    }, 1000);

    // Cleanup timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/ebiza.png')} // Correct way to load local image
        style={styles.logo}
      />
      <Text style={styles.subtitle}>Connecting investors, NGOs, and businesses for social impact</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f9fc',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius: 15,
    backgroundColor: '#ddd',
  },
  subtitle: {
    fontSize: 18,
    color: '#7F8C8D',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default WelcomeScreen;
