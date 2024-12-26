import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const EventPage = () => {
  const navigation = useNavigation();

  // Sample data for the campaign
  const [campaignData] = useState({
    title: "EbiZa Social Crowdfunding",
    organizer: "Unicorn Team",
    date: "Jan 15, 2025",
    time: "10:00 AM",
    location: "GIET, Bhubaneswar",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel odio elit. Ut at vehicula tortor. Mauris id fermentum purus.",
    targetAmount: 10000,
    raisedAmount: 4000,
  });

  const relatedCampaigns = [
    { id: 1, title: "Campaign 1", image: require('../assets/ebiza1.png') },
    { id: 2, title: "Campaign 2", image: require('../assets/ebiza.png') },
    { id: 3, title: "Campaign 3", image: require('../assets/ebiza1.png') },
  ];

  const trendingCampaigns = [
    { id: 1, title: "Trending Campaign 1", image: require('../assets/ebiza1.png') },
    { id: 2, title: "Trending Campaign 2", image: require('../assets/ebiza.png') },
    { id: 3, title: "Trending Campaign 3", image: require('../assets/ebiza1.png') },
  ];

  const liveCampaigns = [
    { id: 1, title: "Live Campaign 1", image: require('../assets/ebiza1.png') },
    { id: 2, title: "Live Campaign 2", image: require('../assets/ebiza.png') },
    { id: 3, title: "Live Campaign 3", image: require('../assets/ebiza1.png') },
  ];

  const handleCampaignClick = (campaign) => {
    // Navigate to the campaign details page
    navigation.navigate('CampaignDetails', { campaign });
  };

  const progress = (campaignData.raisedAmount / campaignData.targetAmount) * 100;

  return (
    <ScrollView style={styles.container}>
      {/* Event Banner */}
      <Image source={require('../assets/ebiza1.png')} style={styles.banner} />

      {/* Event Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.eventTitle}>{campaignData.title}</Text>
        <Text style={styles.organizer}>{campaignData.organizer}</Text>
        <Text style={styles.dateTime}>Date: {campaignData.date} | Time: {campaignData.time}</Text>
        <Text style={styles.location}>Location: {campaignData.location}</Text>
        <Text style={styles.description}>{campaignData.description}</Text>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Raised: ${campaignData.raisedAmount} of ${campaignData.targetAmount}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>
      </View>

      {/* Call-to-Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.participateButton}>
          <Text style={styles.buttonText}>Participate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.buttonText}>Donate</Text>
        </TouchableOpacity>
      </View>

      {/* Related Campaigns */}
      <View style={styles.relatedEventsContainer}>
        <Text style={styles.relatedEventsTitle}>Related Campaigns</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {relatedCampaigns.map((campaign) => (
            <TouchableOpacity key={campaign.id} onPress={() => handleCampaignClick(campaign)} style={styles.relatedEvent}>
              <Image source={campaign.image} style={styles.relatedEventImage} />
              <Text style={styles.relatedEventText}>{campaign.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Trending Campaigns */}
      <View style={styles.trendingEventsContainer}>
        <Text style={styles.trendingEventsTitle}>Trending Campaigns</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {trendingCampaigns.map((campaign) => (
            <TouchableOpacity key={campaign.id} onPress={() => handleCampaignClick(campaign)} style={styles.trendingEvent}>
              <Image source={campaign.image} style={styles.trendingEventImage} />
              <Text style={styles.trendingEventText}>{campaign.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Live Campaigns */}
      <View style={styles.liveEventsContainer}>
        <Text style={styles.liveEventsTitle}>Live Campaigns</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {liveCampaigns.map((campaign) => (
            <TouchableOpacity key={campaign.id} onPress={() => handleCampaignClick(campaign)} style={styles.liveEvent}>
              <Image source={campaign.image} style={styles.liveEventImage} />
              <Text style={styles.liveEventText}>{campaign.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  banner: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  organizer: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
  },
  progressContainer: {
    marginTop: 15,
  },
  progressText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: "#007bff",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  participateButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  donateButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  relatedEventsContainer: {
    padding: 15,
    backgroundColor: "#fff",
  },
  relatedEventsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  relatedEvent: {
    marginRight: 15,
    alignItems: "center",
  },
  relatedEventImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  relatedEventText: {
    fontSize: 14,
    color: "#333",
  },
  trendingEventsContainer: {
    padding: 15,
    backgroundColor: "#fff",
  },
  trendingEventsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  trendingEvent: {
    marginRight: 15,
    alignItems: "center",
    backgroundColor: "#f0f8ff", // Light blue background for trending campaigns
    borderRadius: 10,
    padding: 10,
  },
  trendingEventImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  trendingEventText: {
    fontSize: 14,
    color: "#333",
  },
  liveEventsContainer: {
    padding: 15,
    backgroundColor: "#fff",
  },
  liveEventsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  liveEvent: {
    marginRight: 15,
    alignItems: "center",
    backgroundColor: "#ffe4e1", // Light coral background for live campaigns
    borderRadius: 10,
    padding: 10,
  },
  liveEventImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  liveEventText: {
    fontSize: 14,
    color: "#333",
  },
});

export default EventPage;