import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have expo/vector-icons installed

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [campaigns] = useState([
    {
      id: '1',
      title: "Support Emma's Education",
      location: 'New York',
      media: 'https://via.placeholder.com/600x400?text=Education',
    },
    {
      id: '2',
      title: "Help John's Walk",
      location: 'Los Angeles',
      media: 'https://via.placeholder.com/600x400?text=Medical+Aid',
    },
    {
      id: '3',
      title: "Anna's Surgery Fund",
      location: 'Chicago',
      media: 'https://via.placeholder.com/600x400?text=Health',
    },
    {
      id: '4',
      title: 'Build a School',
      location: 'Houston',
      media: 'https://via.placeholder.com/600x400?text=School',
    },
    {
      id: '5',
      title: 'Clean Water Project',
      location: 'Seattle',
      media: 'https://via.placeholder.com/600x400?text=Water',
    },
  ]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          placeholder="Search campaigns by title"
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchBar}
          underlineColor="#dadada" 
          underlineColorAndroid="transparent" // Remove underline for Android
          placeholderTextColor="#aaa"
        />
      </View>
      <View style={styles.headerSection}>
  <Image 
    source={{ uri: 'https://via.placeholder.com/1200x400?text=Ebiza' }} 
    style={styles.bannerImage} 
  />
  <View style={styles.headerContent}>
    <Text style={styles.headerText}>Empowering Abilities, One Crowd At a Time</Text>
    <Text style={styles.subHeader}>Trending Campaigns</Text>
    <TouchableOpacity
      style={styles.reportButton}
      onPress={() => navigation.navigate('Report')}
    >
      <Text style={styles.reportButtonText}>View Reports</Text>
    </TouchableOpacity>
  </View>
</View>


      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {filteredCampaigns.map((campaign) => (
          <View key={campaign.id} style={styles.campaignCard}>
            <Image source={{ uri: campaign.media }} style={styles.campaignMedia} />
            <Text style={styles.campaignTitle}>{campaign.title}</Text>
            <Text style={styles.campaignLocation}>{campaign.location}</Text>
            <TouchableOpacity
              style={styles.donateButton}
              onPress={() => navigation.navigate('Donate', { campaignId: campaign.id })}
            >
              <Text style={styles.donateButtonText}>Donate</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {filteredCampaigns.length === 0 && (
        <Text style={styles.noResults}>No campaigns found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 50, // Adjusted height
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    borderWidth:0,
    height: '100%', // Ensures full height usage
    backgroundColor: 'transparent',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  scrollView: {
    paddingVertical: 10,
  },
  campaignCard: {
    width: 250,
    height: 350,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    paddingBottom: 10,
  },
  campaignMedia: {
    width: '100%',
    backgroundColor: '#dadada',
    height: 200,
  },
  campaignTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    padding: 10,
  },
  campaignLocation: {
    fontSize: 14,
    color: '#777',
    paddingHorizontal: 10,
  },
  donateButton: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  donateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noResults: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  headerSection: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  headerContent: {
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
  },
  reportButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    elevation: 3,
  },
  reportButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});

export default Home;
