import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const Home = () => {
  const navigate =useNavigation()
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.tagline}>Empowering Abilities, One Crowd at a Time!</Text>
        <Text style={styles.subTagline}>A platform where dreams of the differently-abled take flight.</Text>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={require('../assets/ebiza1.png')}
          style={styles.heroImage}
          resizeMode="contain"
        />
        <Text style={styles.heroText}>Together, We Can Make a Difference!</Text>
        <Text style={styles.heroSubText}>
          Join hands to create opportunities for those who inspire us every day.
        </Text>
        <View style={styles.heroButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={()=>navigate.navigate('Campaign')}>
            <Text style={styles.buttonText} >Explore Campaigns</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={()=>navigate.navigate('Project')}>
            <Text style={styles.buttonText}>Start a Campaign</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Vision Section */}
      <View style={styles.visionSection}>
        <Text style={styles.sectionTitle}>Our Vision</Text>
        <Text style={styles.sectionText}>
          We aim to create an inclusive platform where differently-abled individuals can share their
          stories and receive the support they need to achieve their dreams. By fostering a
          community of empathy and collaboration, we can help them break barriers and thrive.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures content grows and scrolls if needed
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tagline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004AAD',
    textAlign: 'center',
    marginBottom: 10,
  },
  subTagline: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  heroImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  heroText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  heroButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#004AAD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  secondaryButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#004AAD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  visionSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004AAD',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default Home;
