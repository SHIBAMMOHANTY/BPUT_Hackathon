import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av"; // Importing Video for playback

const MediaUploader = () => {
  const [mediaUri, setMediaUri] = useState(null);
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'

  // Request permissions for media library and camera
  const requestPermission = async () => {
    const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (mediaLibraryPermission.status !== "granted" || cameraPermission.status !== "granted") {
      Alert.alert("Permission Error", "Permissions to access media library and camera are required!");
    }
  };

  // Select media (photo/video) from gallery or take new
  const handleMediaSelection = async () => {
    await requestPermission();

    // Ask user to choose whether to take a photo or a video
    Alert.alert("Choose Media", "Select an option", [
      {
        text: "Pick from Gallery",
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
          });

          if (!result.canceled) {
            setMediaUri(result.assets[0].uri);
            setMediaType(result.assets[0].type); // 'image' or 'video'
          }
        },
      },
      {
        text: "Take Photo",
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // For photo capture
          });

          if (!result.canceled) {
            setMediaUri(result.uri);
            setMediaType("image");
          }
        },
      },
      {
        text: "Record Video",
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Videos, // For video capture
            quality: 1,
          });

          if (!result.canceled) {
            setMediaUri(result.uri);
            setMediaType("video");
          }
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleMediaSelection}>
        <Text style={styles.buttonText}>Select or Capture Media</Text>
      </TouchableOpacity>

      {mediaUri && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Media Preview:</Text>
          {mediaType === "image" ? (
            <Image source={{ uri: mediaUri }} style={styles.previewImage} />
          ) : mediaType === "video" ? (
            <Video
              source={{ uri: mediaUri }}
              style={styles.previewVideo}
              useNativeControls
              resizeMode="contain"
              isLooping
            />
          ) : null}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  previewContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  previewText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  previewImage: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
  previewVideo: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
});

export default MediaUploader;
