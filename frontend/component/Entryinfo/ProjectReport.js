import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ProgressBar } from "react-native-paper"; // Using ProgressBar from react-native-paper

const ProjectReport = ({ report }) => {
  // Default to $100 if fundingGoal is not available in the report
  const fundingGoal = report.fundingGoal || 100;

  const [votes, setVotes] = useState({ yes: 0, no: 0 });
  const [funding, setFunding] = useState({
    total: 0,
    goal: fundingGoal,
  });

  const handleVote = (type) => {
    setVotes({ ...votes, [type]: votes[type] + 1 });
  };

  const handleDonation = (amount) => {
    setFunding({
      ...funding,
      total: funding.total + amount,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{report.title}</Text>
      <Text style={styles.description}>{report.description}</Text>

      {report.photo && <Image source={{ uri: report.photo }} style={styles.photo} />}

      {report.location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: report.location.latitude,
            longitude: report.location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={report.location} title="Problem Location" />
        </MapView>
      )}

      <Text style={styles.subTitle}>Funding Progress</Text>
      <ProgressBar
        progress={funding.total / funding.goal}
        color="#4CAF50"
        style={styles.progressBar}
      />
      <Text style={styles.fundingText}>{`$${funding.total} raised of $${funding.goal}`}</Text>
      <Button title="Donate $10" onPress={() => handleDonation(10)} />

      <Text style={styles.subTitle}>Vote on this Project</Text>
      <Button title="Yes" onPress={() => handleVote("yes")} />
      <Button title="No" onPress={() => handleVote("no")} />
      <Text style={styles.voteCount}>{`Yes: ${votes.yes}, No: ${votes.no}`}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  photo: {
    height: 200,
    width: "100%",
    marginTop: 10,
    borderRadius: 8,
  },
  map: {
    height: 300,
    marginVertical: 16,
    borderRadius: 8,
  },
  subTitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    color: "#333",
  },
  progressBar: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  fundingText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  voteCount: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default ProjectReport;
