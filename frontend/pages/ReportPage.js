import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LocationPicker from "../component/Entryinfo/LocationPicker";
import MediaUploader from "../component/Entryinfo/MediaUploader";

const ReportPage = () => {
  const [selectedTab, setSelectedTab] = useState("NGO/Business");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredAmount: "",
    location: "",
    website: "",
    tags: "",
    salary: "",
    role: "business",
    userId: "",
    media: "https://example.com/image.jpg",
    mediaType: "image",
    company: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const parsedToken = JSON.parse(atob(token.split(".")[1]));
          setFormData((prevFormData) => ({
            ...prevFormData,
            role: parsedToken.role,
            userId: parsedToken.id,
          }));
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleMediaUpload = (url, type) => {
    setFormData({ ...formData, media: url, mediaType: type });
  };

  const handleSubmit = async () => {
    console.log(formData);
    // try {
    //   const token = await AsyncStorage.getItem("authToken");
    //   const config = {
    //     method: "post",
    //     maxBodyLength: Infinity,
    //     url: "http://192.168.218.149/api/post/posts",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     data: JSON.stringify(formData),
    //   };

    //   const response = await axios.request(config);
    //   console.log("Post created successfully:", response.data);
    //   alert("Post created successfully!");
    // } catch (error) {
    //   console.error("Error creating post:", error);
    //   alert("Failed to create post. Please try again.");
    // }
  };

  const renderFormFields = () => {
    switch (selectedTab) {
      case "NGO/Business":
        return (
          <>
            <InputField
              label="Title"
              placeholder="Enter Title"
              value={formData.title}
              onChangeText={(text) => handleInputChange("title", text)}
            />
            <InputField
              label="Description"
              placeholder="Enter Description"
              value={formData.description}
              multiline
              onChangeText={(text) => handleInputChange("description", text)}
            />
            <InputField
              label="Required Amount"
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={formData.requiredAmount}
              onChangeText={(text) => handleInputChange("requiredAmount", text)}
            />
            <MediaUploader onUpload={handleMediaUpload} />
            <LocationPicker
              onSelectLocation={(loc) => handleInputChange("location", loc)}
            />
            <InputField
              label="Website Link (Optional)"
              placeholder="Enter Website Link"
              value={formData.website}
              onChangeText={(text) => handleInputChange("website", text)}
            />
          </>
        );
      case "Social Work":
        return (
          <>
            <InputField
              label="Title"
              placeholder="Enter Title"
              value={formData.title}
              onChangeText={(text) => handleInputChange("title", text)}
            />
            <InputField
              label="Description"
              placeholder="Enter Description"
              value={formData.description}
              multiline
              onChangeText={(text) => handleInputChange("description", text)}
            />
            <MediaUploader onUpload={handleMediaUpload} />
            <LocationPicker
              onSelectLocation={(loc) => handleInputChange("location", loc)}
            />
            <InputField
              label="Tag NGO"
              placeholder="Enter NGO Name"
              value={formData.tags}
              onChangeText={(text) => handleInputChange("tags", text)}
            />
          </>
        );
      case "Job":
        return (
          <>
            <InputField
              label="Job Title"
              placeholder="Enter Job Title"
              value={formData.title}
              onChangeText={(text) => handleInputChange("title", text)}
            />
            <InputField
              label="Job Description"
              placeholder="Enter Job Description"
              value={formData.description}
              multiline
              onChangeText={(text) => handleInputChange("description", text)}
            />
            <InputField
              label="Disability Type"
              placeholder="Disability Type"
              value={formData.skills}
              onChangeText={(text) => handleInputChange("skills", text)}
            />
            <LocationPicker
              onSelectLocation={(loc) => handleInputChange("location", loc)}
            />
            <InputField
              label="Salary (Optional)"
              placeholder="Enter Salary"
              keyboardType="numeric"
              value={formData.salary}
              onChangeText={(text) => handleInputChange("salary", text)}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.form}>
        {renderFormFields()}
      </ScrollView>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const InputField = ({ label, placeholder, ...props }) => (
  <View style={styles.inputFieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, props.multiline && styles.multilineInput]}
      placeholder={placeholder}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f9fc",
  },
  form: {
    padding: 16,
  },
  inputFieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#37474F",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#ffffff",
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReportPage;
