import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Switch,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ttsEnabled, setTtsEnabled] = useState(true); // Default is true (enabled)
  const [campaigns] = useState([
    {
      id: '1',
      title: 'Ramp Access for Wheelchair Users',
      location: 'India',
      media: 'https://www.karmamedical.com/wp-content/uploads/2021/05/JCFF0110-1024x683-1.jpg',
    },
    {
      id: '2',
      title: 'Uneven sidewalks or obstructions like potholes, construction',
      location: 'India',
      media: 'https://truchargv.com/wp-content/uploads/2024/06/pothole1-1024x683.jpg',
    },
    {
      id: '3',
      title: 'Poorly Designed Restrooms for Disabled Individuals',
      location: 'Bhubaneswar, Odisha',
      media: 'https://media.istockphoto.com/id/1071783152/photo/toilet-with-friendly-design.jpg?s=612x612&w=0&k=20&c=NxH6hOXV6NxUY55n63beSC8Qf2YoX80HD_zSHJ9DM_s=',
    },
    {
      id: '4',
      title: 'Lack of Braille or Audio Cues in Public Spaces',
      location: 'Houston',
      media: 'https://acropolis-wp-content-uploads.s3.us-west-1.amazonaws.com/blind-woman-crossing-street-help-guide.webp',
    },
    {
      id: '5',
      title: 'Clean Water Project',
      location: 'Bhubaneswar, Odisha',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUu5R4ujNrNBC2jdNQ_38xswXuVPIJc2LK8t3Pr7ywnw-LDzH1-c3vgWox9aoJ3J0TLE&usqp=CAU',
    },
  ]);

  const [routes, setRoutes] = useState({
    dashboard: 'Dashboard',
    explore: 'Explore',
    report: 'Report',
    campaign: 'Campaign',
    community: 'Community',
    events: 'Events',
    notification: 'Notifications',
    profile: 'My Profile',
    wallet:'Wallet',
  });

  useEffect(() => {
    fetch('https://your-backend.com/api/routes')
      .then((response) => response.json())
      .then((data) => setRoutes(data))
      .catch((error) => {
        console.error('Error fetching routes:', error);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const route = routes[query.toLowerCase()];
    if (route) {
      navigation.navigate(route);
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const speakText = (text) => {
    if (ttsEnabled) {
      Speech.speak(text, {
        language: 'en',
        pitch: 1.1,
        rate: 0.9,
      });
    }
  };

  const handleDonatePress = (campaignId) => {
    speakText('Donate now to this campaign.');
    navigation.navigate('Donate', { campaignId });
  };

  const handleSocialIconPress = (url, platformName) => {
    speakText(`Redirecting to ${platformName}`);
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      {/* TTS Toggle */}
      <View style={styles.ttsToggleContainer}>
        
        <Text style={styles.ttsToggleText} onPress={() => speakText('Enable or disable Screen Reader')} >
          Screen Reader
        </Text>
        <Switch
          value={ttsEnabled}
          onValueChange={(value) => setTtsEnabled(value)}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          placeholder="Search campaigns or pages"
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchBar}
          underlineColor="#dadada"
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle} onPress={() => speakText('Welcome to Ebiza')}>
          Welcome to Ebiza
        </Text>
        <Text
          style={styles.welcomeSubtitle}
          onPress={() => speakText(
            'Discover campaigns that matter to you and make a difference today.'
          )}
        >
          Discover campaigns that matter to you and make a difference today.
        </Text>
        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => {
            navigation.navigate('Explore');
            speakText('Explore Now');
          }}
        >
          <Text style={styles.exploreButtonText}>Explore Now</Text>
        </TouchableOpacity>
      </View>

      {/* Trending Campaigns */}
      <Text style={styles.sectionHeader} onPress={() => speakText('Trending Campaigns')}>
        Trending Campaigns
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {filteredCampaigns.map((campaign) => (
          <View key={campaign.id} style={styles.campaignCard}>
            <Image source={{ uri: campaign.media }} style={styles.campaignImage} />
            <Text style={styles.campaignTitle} onPress={() => speakText(campaign.title)}>
              {campaign.title}
            </Text>
            <Text style={styles.campaignLocation} onPress={() => speakText(campaign.location)}>
              {campaign.location}
            </Text>
            <TouchableOpacity
              style={styles.donateButton}
              onPress={() => handleDonatePress(campaign.id)}
            >
              <Text style={styles.donateButtonText}>Donate</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {filteredCampaigns.length === 0 && (
        <Text style={styles.noResults} onPress={() => speakText('No campaigns found')}>
          No campaigns found
        </Text>
      )}

      {/* Mission and Vision */}
      <View style={styles.missionVisionContainer}>
        <TouchableOpacity
          style={styles.missionCard}
          onPress={() => speakText('Our mission is to create a more inclusive world.')}
        >
          <Text style={styles.missionTitle}>Our Mission</Text>
          <Text style={styles.missionText}>
            Creating a more inclusive world by solving accessibility issues through social impact
            crowdfunding.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.visionCard}
          onPress={() =>
            speakText('Our vision is to empower disabled individuals with necessary resources.')
          }
        >
          <Text style={styles.visionTitle}>Our Vision</Text>
          <Text style={styles.visionText}>
            Empowering disabled individuals by providing resources to make public spaces accessible
            for all.
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText} onPress={() => speakText('Contact Us: info@ebizasocial.com')}>
          Contact Us: info@ebizasocial.com
        </Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => handleSocialIconPress('https://facebook.com', 'Facebook')}>
            <Ionicons name="logo-facebook" size={30} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSocialIconPress('https://twitter.com', 'Twitter')}>
            <Ionicons name="logo-twitter" size={30} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSocialIconPress('https://instagram.com', 'Instagram')}>
            <Ionicons name="logo-instagram" size={30} color="#fff" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.footerText} onPress={() => speakText('© 2025 Crowdfunding Platform. All Rights Reserved.')}>
          © 2025 Crowdfunding Platform. All Rights Reserved.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10, // Increased padding for better spacing
  },
  ttsToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  ttsToggleText: {
    fontSize: 16,
    color: '#495057',
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#f1f3f5',
    color: '#495057',
  },
  searchIcon: {
    marginRight: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#495057',
    textAlign: 'center',
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: '#0d6efd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  exploreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  missionVisionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  missionCard: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#e7f5ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  visionCard: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#fff3e6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d6efd',
    marginBottom: 10,
  },
  missionText: {
    fontSize: 14,
    color: '#495057',
    textAlign: 'center',
  },
  visionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fd7e14',
    marginBottom: 10,
  },
  visionText: {
    fontSize: 14,
    color: '#495057',
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: '#212529',
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  campaignCard: {
    marginRight: 15,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: 'hidden',
    justifyContent: 'space-between', // Align elements evenly
    alignItems: 'center', // Centering the content
    padding: 15, // Add padding for inner content spacing
    marginBottom: 10, // Add margin to separate cards
  },
  campaignImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10, // Optional: to make image corners rounded
  },
  campaignTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#212529',
    textAlign: 'center', // Center title text
  },
  campaignLocation: {
    fontSize: 12,
    color: '#495057',
    textAlign: 'center', // Center location text
  },
  donateButton: {
    backgroundColor: '#0d6efd',
    paddingVertical: 8,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center', // Ensure button is centered within card
  },
  donateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noResults: {
    fontSize: 16,
    color: '#495057',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#212529',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default Home;
