import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const SignUp = ({ navigation }) => {
  const [userType, setUserType] = useState("business");
  const [disabilityType, setDisabilityType] = useState("");
  const [comment, setComment] = useState("");
  const disabilityTypes = [
    "Visual Impairment",
    "Hearing Impairment",
    "Mobility Issues",
    "Cognitive Disabilities",
    "Speech Impairments",
    "Other",
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <Text style={styles.heading}>Sign Up for EbizA</Text>
        {/* User Type Selector */}
        <Text style={styles.label}>User Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={userType}
            onValueChange={(value) => setUserType(value)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Business User" value="business" />
            <Picker.Item label="Investor" value="investor" />
            <Picker.Item label="NGO" value="ngo" />
          </Picker>
        </View>

        {/* Full Name Field */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#888"
        />

        {/* Email Address Field */}
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          keyboardType="email-address"
        />

        {/* Password Field */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Create a password"
          placeholderTextColor="#888"
          secureTextEntry
        />

        {/* Display Disability Options only for Business User */}
        {userType === "business" && (
          <>
            <Text style={styles.label}>Types of Disabilities</Text>
            {disabilityTypes.map((type) => (
              <View key={type} style={styles.radioContainer}>
                <TouchableOpacity
                  onPress={() => setDisabilityType(type)}
                  style={[
                    styles.radioButton,
                    disabilityType === type && styles.radioButtonSelected,
                  ]}
                />
                <Text style={styles.radioLabel}>{type}</Text>
              </View>
            ))}

            {/* Comment Box for 'Other' Disability Type */}
            {disabilityType === "Other" && (
              <View>
                <Text style={styles.label}>Please describe the disability</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Enter additional details"
                  placeholderTextColor="#888"
                  value={comment}
                  onChangeText={setComment}
                  multiline
                  numberOfLines={4}
                />
              </View>
            )}
          </>
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Login Redirect */}
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.link} onPress={() =>navigation.navigate("Login")}>
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "linear-gradient(to right, #cce7ff, #ffb3ff)",
    paddingHorizontal: 16,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginTop: 12,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 8,
    color: "#333",
  },
  pickerContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  picker: {
    width: "100%",
    height: Platform.OS === "ios" ? 150 : 40,
    color: "#333",
  },
  pickerItem: {
    color: "#333",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#888",
    marginRight: 8,
  },
  radioButtonSelected: {
    backgroundColor: "#4f46e5",
  },
  radioLabel: {
    fontSize: 14,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
  link: {
    color: "#4f46e5",
    fontWeight: "bold",
  },
});

export default SignUp;