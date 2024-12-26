import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CampaignDetails = ({ route }) => {
  const { campaign } = route.params;

  return (
    <View style={styles.container}>
      <Image source={campaign.image} style={styles.banner} />
      <Text style={styles.title}>{campaign.title}</Text>
      <Text style={styles.description}>Details about the campaign...</Text>
      <Text style={styles.fundingNeeded}>Funding Needed: ${campaign.targetAmount - campaign.raisedAmount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  banner: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  fundingNeeded: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d9534f", // Red color for emphasis
  },
});

export default CampaignDetails;