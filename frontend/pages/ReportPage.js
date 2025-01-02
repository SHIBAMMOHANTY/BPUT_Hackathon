import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import LocationPicker from "../component/Entryinfo/LocationPicker";
import MediaUploader from "../component/Entryinfo/MediaUploader";

const ReportPage = () => {
  const [selectedTab, setSelectedTab] = useState("Social Work");

  const [formData, setFormData] = useState({
    title: "",
    details: "",
    funding: "",
    location: "",
    website: "",
    tags: "",
    salary: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
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
              label="Details"
              placeholder="Enter Details"
              value={formData.details}
              multiline
              onChangeText={(text) => handleInputChange("details", text)}
            />
            <InputField
              label="Funding Needed"
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={formData.funding}
              onChangeText={(text) => handleInputChange("funding", text)}
            />
            <MediaUploader />
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
              label="Details"
              placeholder="Enter Details"
              value={formData.details}
              multiline
              onChangeText={(text) => handleInputChange("details", text)}
            />
            <MediaUploader />
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
              value={formData.details}
              multiline
              onChangeText={(text) => handleInputChange("details", text)}
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
      {/* <View style={styles.tabs}>
        {["NGO/Business", "Social Work", "Job"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[styles.tabButton, selectedTab === tab && styles.activeTabButton]}
          >
            <Text
              style={[styles.tabText, selectedTab === tab && styles.activeTabText]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}

      <ScrollView contentContainerStyle={styles.form}>
        {renderFormFields()}
      </ScrollView>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => console.log(formData)}
      >
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
