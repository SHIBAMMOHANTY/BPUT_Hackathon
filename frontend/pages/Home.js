import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

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
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          placeholder="Search campaigns by title"
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchBar}
          underlineColor="#dadada"
          underlineColorAndroid="transparent"
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Header Content Below Search Bar */}
      <View style={styles.introContainer}>
        <Text style={styles.introTitle}>Welcome to Ebiza</Text>
        <Text style={styles.introSubtitle}>
          Discover campaigns that matter to you and make a difference today.
        </Text>
        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => navigation.navigate('Explore')}
        >
          <Text style={styles.exploreButtonText}>Explore Now</Text>
        </TouchableOpacity>
      </View>

      {/* Header Section */}
      <View style={styles.headerSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/1200x400?text=Ebiza' }}
          style={styles.bannerImage}
        />
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>
            Empowering Abilities, One Crowd At a Time
          </Text>
          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => navigation.navigate('Report')}
          >
            <Text style={styles.reportButtonText}>Start Campaign</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Trending Campaigns Section */}
      <Text style={styles.subHeader}>Trending Campaigns</Text>
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
              onPress={() =>
                navigation.navigate('Donate', { campaignId: campaign.id })
              }
            >
              <Text style={styles.donateButtonText}>Donate</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {filteredCampaigns.length === 0 && (
        <Text style={styles.noResults}>No campaigns found</Text>
      )}

      {/* Mission Section */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionHeader}>Our Mission</Text>
        <Text style={styles.missionText}>
          Our mission is to connect people with causes that matter. Through our platform, we empower individuals to create and support campaigns that have the potential to change lives, bringing communities closer together.
        </Text>
      </View>

      {/* Vision Section */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionHeader}>Our Vision</Text>
        <Text style={styles.visionText}>
          We envision a world where everyone has the opportunity to contribute to a greater cause, creating lasting change and positive impact in communities across the globe.
        </Text>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Contact Us: info@ebizasocial.com</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com')}>
            <Ionicons name="logo-facebook" size={30} color="#fff" style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com')}>
            <Ionicons name="logo-twitter" size={30} color="#fff" style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com')}>
            <Ionicons name="logo-instagram" size={30} color="#fff" style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.footerText}>
          © 2025 Crowdfunding Platform. All Rights Reserved.
        </Text>
      </View>
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingHorizontal: 15,
    marginBottom: 10,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    borderWidth: 0,
    height: '100%',
    backgroundColor: 'transparent',
  },
  introContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    alignItems: 'center',
  },
  introTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  introSubtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  exploreButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSection: {
    marginBottom: 30,
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
    fontSize: 19,
    fontWeight: '600',
    color: '#222',
    marginBottom: 15,
    textAlign: 'left',
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
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: 10,
  },
  missionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  visionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  footer: {
    backgroundColor: '#6200ea',
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    paddingBottom: 50,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 5,
  },
  socialIcons: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
});

export default Home;
