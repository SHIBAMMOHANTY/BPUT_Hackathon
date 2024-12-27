import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ReportForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fundingGoal: "",
    category: "",
    team: "",
    contact: "",
    time: "",
    location: {
      link: "",
      title: "",
    },
    photo: null,
  });

  // Handle photo capture
  const handlePhotoCapture = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      const photo = await ImagePicker.launchCameraAsync();
      if (!photo.cancelled) {
        setFormData({ ...formData, photo: photo.uri });
        Alert.alert("Success", "Photo captured successfully!");
      } else {
        Alert.alert("Cancelled", "Photo capture was cancelled.");
      }
    } else {
      Alert.alert("Permission Denied", "Camera permissions are required.");
    }
  };

  // Handle submit functionality
  const handleSubmit = () => {
    const { title, description, fundingGoal, category, team, contact, time, location, photo } = formData;

    if (!title || !description || (!location.link && !location.title) || !photo) {
      Alert.alert("Error", "Please fill all required fields and upload a photo.");
      return;
    }

    // Save or submit logic (e.g., send to backend or local storage)
    onSubmit(formData);
    Alert.alert("Success", "Report submitted successfully!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Project Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Project Title"
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Describe the problem"
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
        multiline
      />

      <Text style={styles.label}>Funding Goal</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Funding Goal"
        value={formData.fundingGoal}
        onChangeText={(text) => setFormData({ ...formData, fundingGoal: text })}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Project Category"
        value={formData.category}
        onChangeText={(text) => setFormData({ ...formData, category: text })}
      />

      <Text style={styles.label}>Team</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Team Members"
        value={formData.team}
        onChangeText={(text) => setFormData({ ...formData, team: text })}
      />

      <Text style={styles.label}>Contact Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Contact Information"
        value={formData.contact}
        onChangeText={(text) => setFormData({ ...formData, contact: text })}
      />

      <Text style={styles.label}>Project Time</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Time Duration"
        value={formData.time}
        onChangeText={(text) => setFormData({ ...formData, time: text })}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Google Maps Link"
        value={formData.location.link}
        onChangeText={(text) =>
          setFormData({
            ...formData,
            location: { ...formData.location, link: text },
          })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Location Title (e.g., School Entrance)"
        value={formData.location.title}
        onChangeText={(text) =>
          setFormData({
            ...formData,
            location: { ...formData.location, title: text },
          })
        }
      />

      <Text style={styles.label}>Photo</Text>
      <TouchableOpacity style={styles.button} onPress={handlePhotoCapture}>
        <Text style={styles.buttonText}>Capture Photo</Text>
      </TouchableOpacity>
      {formData.photo && <Image source={{ uri: formData.photo }} style={styles.photo} />}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1 },
  label: { fontSize: 16, marginBottom: 8, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  photo: { height: 100, width: 100, marginTop: 10, borderRadius: 8, alignSelf: "center" },
  button: {
    backgroundColor: "#6200ee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  submitButton: {
    backgroundColor: "#6200ee",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
});

export default ReportForm;
