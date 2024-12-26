import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

const EventPage = () => {
  return (
    <ScrollView style={styles.container}>
      

      {/* Event Banner */}
      <Image
        source={{ uri: "https://via.placeholder.com/400x200" }} // Replace with your image URL
        style={styles.banner}
      />

      {/* Event Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.eventTitle}>Event Title</Text>
        <Text style={styles.organizer}>Organized by: Organizer Name</Text>
        <Text style={styles.dateTime}>Date: Jan 15, 2025 | Time: 10:00 AM</Text>
        <Text style={styles.location}>Location: City Hall, Downtown</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel
          odio elit. Ut at vehicula tortor. Mauris id fermentum purus.
        </Text>
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

      {/* Additional Information */}
      <View style={styles.relatedEventsContainer}>
        <Text style={styles.relatedEventsTitle}>Related Events</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.relatedEvent}>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.relatedEventImage}
            />
            <Text style={styles.relatedEventText}>Event 1</Text>
          </View>
          <View style={styles.relatedEvent}>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.relatedEventImage}
            />
            <Text style={styles.relatedEventText}>Event 2</Text>
          </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  backButton: {
    color: "#fff",
    fontSize: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  shareButton: {
    color: "#fff",
    fontSize: 16,
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
});

export default EventPage;
