import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedData, setEditedData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        if (user) {
          const fetchedData = {
            name: user.fullname || "Akash Dhal",
            role: user.role || "NGO",
            profilePicture: "https://media.licdn.com/dms/image/v2/D5603AQFT-xY2Y6FLrQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730923192791?e=2147483647&v=beta&t=YmuQMBOae_bm2SKhS_LaXQIgCMMps-knZOLl6QoPRcQ",
            profileInfo: { email: user.email || "akash@gmail.com", phone: user.phone || "+1 234 567 890" },
            posts: [
              { id: 1, title: "Post 1" },
              { id: 2, title: "Post 2" },
              { id: 3, title: "Post 3" },
              { id: 4, title: "Post 4" },
            ],
          };
          setUserData(fetchedData);
          setEditedData({ ...fetchedData.profileInfo, name: fetchedData.name });
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditSave = async () => {
    if (!editedData.name || !editedData.email ) {
        Alert.alert("Error", "Please fill all the fields.");
        return;
    }

    try {
        const axios = require('axios');
        const response = await axios.put(
            `http://localhost:5000/api/users/updateuser/${userData.id}`,
            {
                fullname: editedData.name,
                email: editedData.email,
             
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        if (response.status === 200) {
            setUserData((prev) => ({
                ...prev,
                name: editedData.name,
                profileInfo: { 
                    email: editedData.email, 
                    phone: editedData.phone 
                }
            }));
            setIsModalVisible(false);
            Alert.alert("Success", "Profile updated successfully!");
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        Alert.alert("Error", "Failed to update profile. Please try again.");
    }
};



  const handleDeleteAccount = () => {
    Alert.alert(
      "Logout Account",
      "Are you sure you want to Logout your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            navigation.navigate('Login');
            AsyncStorage.removeItem('authToken');
            AsyncStorage.removeItem('user');
          },
        },
      ]
    );
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
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: userData.profilePicture }} style={styles.profileImage} />
        <View style={styles.nameRoleContainer}>
          <Text style={styles.name}>{userData.name}</Text>
          <View style={styles.roleContainer}>
            <Text style={styles.role}>{userData.role}</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Ionicons name="pencil" size={20} color="#4C8DFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>New Profile Badge</Text>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <View style={styles.infoCard}>
          <Text>Email: {userData.profileInfo.email}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text>Phone: {userData.profileInfo.phone}</Text>
        </View>
      </View>

      <View style={styles.postsSection}>
        <Text style={styles.sectionTitle}>Posts</Text>
        <View style={styles.postsContainer}>
          {userData.posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <Text>{post.title}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Logout Your Account</Text>
      </TouchableOpacity>

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
              onChangeText={(text) => setEditedData({ ...editedData, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={editedData.email}
              onChangeText={(text) => setEditedData({ ...editedData, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={editedData.phone}
              onChangeText={(text) => setEditedData({ ...editedData, phone: text })}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleEditSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#F9FAFB" 
  },
  headerContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 20 
  },
  profileImage: { 
    width: 90, 
    height: 90, 
    borderRadius: 45, 
    borderWidth: 2, 
    borderColor: "#4C8DFF", 
    marginRight: 20 
  },
  nameRoleContainer: { 
    flex: 1 
  },
  name: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#1A202C" 
  },
  roleContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginTop: 5 
  },
  role: { 
    fontSize: 16, 
    marginRight: 10, 
    color: "#4C8DFF", 
    fontWeight: "600" 
  },
  badgeContainer: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeText: { 
    color: "#FFF", 
    fontWeight: "bold" 
  },
  profileInfo: { 
    marginBottom: 20 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: "700", 
    marginBottom: 10, 
    color: "#1A202C" 
  },
  infoCard: { 
    backgroundColor: "#FFFFFF", 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postsSection: { 
    marginBottom: 20 
  },
  postsContainer: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between" 
  },
  postCard: {
    width: "47%",
    height:150,
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  deleteButton: { 
    backgroundColor: "#E53E3E", 
    padding: 15, 
    borderRadius: 10, 
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom:50,
  },
  deleteButtonText: { 
    color: "#FFF", 
    fontSize: 16, 
    fontWeight: "600" ,
    
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: "center", 
    backgroundColor: "rgba(0,0,0,0.5)" 
  },
  modalContent: { 
    backgroundColor: "#FFF", 
    padding: 20, 
    borderRadius: 15, 
    marginHorizontal: 20, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#1A202C" 
  },
  input: { 
    borderBottomWidth: 1, 
    borderBottomColor: "#4C8DFF", 
    marginBottom: 20, 
    fontSize: 16, 
    paddingVertical: 5 
  },
  saveButton: { 
    backgroundColor: "#4C8DFF", 
    padding: 15, 
    borderRadius: 10, 
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: { 
    color: "#FFF", 
    fontWeight: "bold", 
    fontSize: 16 
  },
});

export default ProfileScreen;
