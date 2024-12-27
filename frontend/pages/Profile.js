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
  Modal,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedData, setEditedData] = useState({ name: "", email: "" }); // Fix: Add state for editedData
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuthToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        navigation.replace("Login"); // Redirect to Login if no token
      }
    };

    checkAuthToken();

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
      setEditedData({ name: fetchedData.name, email: fetchedData.email }); // Initialize editedData
      setIsLoading(false);
    }, 1500);
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken");
    navigation.replace("Drawer"); // Navigate to Drawer screen after logout
  };

  const handleEditSave = () => {
    setUserData({ ...userData, ...editedData });
    setIsModalVisible(false);
  };

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#4C8DFF" />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
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
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={editedData.name}
              onChangeText={(text) =>
                setEditedData({ ...editedData, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={editedData.email}
              onChangeText={(text) =>
                setEditedData({ ...editedData, email: text })
              }
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleEditSave}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    width: "100%",
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
    width: "100%",
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
    paddingHorizontal: 20,
    width: "100%",
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
    width: "100%",
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
    width: "90%",
    alignSelf: "center",
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
    width: "90%",
    alignSelf: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#4C8DFF",
    paddingVertical: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#FF5757",
    paddingVertical: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileScreen;
