import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedData, setEditedData] = useState({ name: "", email: "", phone: "", location: "" });

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        const fetchedData = {
          name: "John Doe",
          role: "Investor",
          profilePicture: "https://via.placeholder.com/150",
          profileInfo: { email: "john.doe@example.com", phone: "+1 234 567 890" },
          location: "New York, USA",
          posts: Array.from({ length: 12 }, (_, index) => ({
            id: index + 1,
            image: "https://via.placeholder.com/150",
          })),
        };
        setUserData(fetchedData);
        setEditedData({
          name: fetchedData.name,
          email: fetchedData.profileInfo.email,
          phone: fetchedData.profileInfo.phone,
          location: fetchedData.location,
        });
        setIsLoading(false);
      }, 1500);
    };
    fetchData();
  }, []);

  const handleEditSave = () => {
    if (!editedData.name || !editedData.email || !editedData.phone || !editedData.location) {
      Alert.alert("Error", "Please fill all the fields.");
    } else {
      setUserData({
        ...userData,
        name: editedData.name,
        profileInfo: { email: editedData.email, phone: editedData.phone },
        location: editedData.location,
      });
      setIsModalVisible(false);
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#333" />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={[{ key: "header" }, { key: "info" }, { key: "posts" }]}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => {
        if (item.key === "header") {
          return (
            <View style={styles.header}>
              <Image source={{ uri: userData.profilePicture }} style={styles.profileImage} />
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{userData.name}</Text>
                <View style={styles.roleContainer}>
                  <Text style={styles.role}>{userData.role}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsModalVisible(true)}
              >
                <Ionicons name="pencil" size={24} color="#4C8DFF" />
              </TouchableOpacity>
            </View>
          );
        } else if (item.key === "info") {
          return (
            <View style={styles.profileInfo}>
              <Text style={styles.sectionTitle}>Profile Information</Text>
              <View style={styles.infoCard}>
                <MaterialIcons name="email" size={20} color="#333" />
                <Text style={styles.infoText}>{userData.profileInfo.email}</Text>
              </View>
              <View style={styles.infoCard}>
                <MaterialIcons name="phone" size={20} color="#333" />
                <Text style={styles.infoText}>{userData.profileInfo.phone}</Text>
              </View>
              <View style={styles.infoCard}>
                <MaterialIcons name="location-on" size={20} color="#333" />
                <Text style={styles.infoText}>{userData.location}</Text>
              </View>
            </View>
          );
        } else if (item.key === "posts") {
          return (
            <>
              <Text style={styles.sectionTitle}>Posts</Text>
              <FlatList
                data={userData.posts}
                renderItem={renderPost}
                keyExtractor={(post) => post.id.toString()}
                numColumns={3}
                nestedScrollEnabled
                contentContainerStyle={styles.postsContainer}
                showsVerticalScrollIndicator={false}
              />
            </>
          );
        }
        return null;
      }}
      ListFooterComponent={
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
              <TextInput
                style={styles.input}
                placeholder="Location"
                value={editedData.location}
                onChangeText={(text) => setEditedData({ ...editedData, location: text })}
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleEditSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 10 },
  header: { flexDirection: "row", alignItems: "center", padding: 20, marginBottom: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginRight: 15 },
  nameContainer: { flex: 1 },
  name: { fontSize: 20, fontWeight: "bold", color: "#333" },
  roleContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "#4C8DFF",
  },
  role: { fontSize: 16, fontWeight: "bold", textAlign: "center", color: "#FFF" },
  profileInfo: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  infoText: { marginLeft: 10, fontSize: 16 },
  postsContainer: { paddingBottom: 20 },
  postCard: { flex: 1, margin: 5, aspectRatio: 1, borderRadius: 10, overflow: "hidden" },
  postImage: { width: "100%", height: "100%", resizeMode: "cover" },
  modalContainer: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "#FFF", padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: { borderBottomWidth: 1, borderBottomColor: "#333", marginBottom: 20, fontSize: 16 },
  saveButton: { backgroundColor: "#333", padding: 15, borderRadius: 10, alignItems: "center" },
  saveButtonText: { color: "#FFF", fontWeight: "bold" },
  centeredContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#333" },
  editButton: {
    backgroundColor: "#EEE",
    padding: 8,
    borderRadius: 5,
  },
});

export default ProfileScreen;
