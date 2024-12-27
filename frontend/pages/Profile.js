import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      const fetchedData = {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Investor",
        profilePicture: "https://via.placeholder.com/150", // Replace with actual profile picture
        disabilityType: "None",
      };
      setUserData(fetchedData);
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#4C8DFF" />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, }}
    >
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: userData.profilePicture }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.role}>{userData.role}</Text>
      </View>

      {/* Profile Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Profile Information</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Email</Text>
          <Text style={styles.cardValue}>{userData.email}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Disability Type</Text>
          <Text style={styles.cardValue}>{userData.disabilityType}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Role</Text>
          <Text style={styles.cardValue}>{userData.role}</Text>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => alert("Edit Profile pressed")}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => AsyncStorage.removeItem("authToken")}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    width: "100%", // Ensure the container takes full width of the screen
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F9FC",
  },
  loadingText: {
    fontSize: 16,
    color: "#4C8DFF",
    marginTop: 10,
  },
  headerContainer: {
    backgroundColor: "#4C8DFF",
    paddingVertical: 16,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: "100%", // Ensures header takes full width
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  role: {
    fontSize: 18,
    color: "#DDE6F5",
    marginTop: 5,
  },
  detailsContainer: {
    marginTop: 20,
    width: "100%", // Ensures the details container spans full width
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    width: "100%", // Ensure cards take full width
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    marginTop: 5,
  },
  editButton: {
    backgroundColor: "#4C8DFF",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    width: "100%", // Ensure button takes full width
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#FF5757",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    width: "100%", // Ensure button takes full width
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ProfileScreen;
