import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import LocationPicker from "../component/Entryinfo/LocationPicker";
import MediaUploader from "../component/Entryinfo/MediaUploader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ReportPage = () => {
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState("user");
  const [loader,setLoader]=useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;
        setUser(user);
        setSelectedTab(user?.role);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredAmount: "",
    location: "",
    website: "",
    tags: "",
    salary: "",
    skills: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    setLoader(true)
    const token = await AsyncStorage.getItem("token"); 
    const data = {
        title: formData.title,
        description: formData.description,
        media: formData.media || "https://upload.wikimedia.org/wikipedia/commons/3/3f/JPEG_example_flower.jpg",
        mediaType: "image",
        requiredAmount: formData.requiredAmount || 0,
        company: formData.tags || "N/A",  // Ensure a default value
        location: typeof formData.location === 'object' 
                  ? `${formData.location.latitude}, ${formData.location.longitude}`
                  : formData.location,
        salary: formData.salary || "N/A",
        role: user?.role,
        userId: user?.id || "N/A", // Provide a default if missing
    };
console.log(data)
    try {
        const response = await axios.post(
            "https://ebizaapi-production.up.railway.app/api/post/posts",
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Post created successfully", response.data);
        alert("Post submitted successfully!");
        setLoader(false)
    } catch (error) {
        console.error("Error submitting post:", error.response?.data || error);
        alert("Failed to submit post.");
        setLoader(false)
    }
};

  const renderFormFields = () => {
    switch (selectedTab) {
      case "ngo":
      case "business":
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
            <MediaUploader  />
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
      case "user":
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
            <MediaUploader  />
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
      {/* Tabs Section */}
      <View
        style={[
          styles.tabs,
          (user?.role === "user" || selectedTab === "user") && { display: "none" },
        ]}
      >
        {["ngo", "business"].includes(user?.role) ? (
          <>
            <TouchableOpacity
              onPress={() => setSelectedTab(user.role)}
              style={[
                styles.tabButton,
                selectedTab === user.role && styles.activeTabButton,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === user.role && styles.activeTabText,
                ]}
              >
                {user.role === "ngo" ? "NGO" : "Business"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab("Job")}
              style={[
                styles.tabButton,
                selectedTab === "Job" && styles.activeTabButton,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "Job" && styles.activeTabText,
                ]}
              >
                Job
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => setSelectedTab("user")}
            style={[
              styles.tabButton,
              selectedTab === "user" && styles.activeTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "user" && styles.activeTabText,
              ]}
            >
              User
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Form Section */}
      <ScrollView contentContainerStyle={styles.form}>{renderFormFields()}</ScrollView>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        
        {loader ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.submitButtonText}>Submit</Text>
        )}
       
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
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: "#1976D2",
  },
  tabText: {
    color: "#ffffff",
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: "bold",
  },

});

export default ReportPage;
