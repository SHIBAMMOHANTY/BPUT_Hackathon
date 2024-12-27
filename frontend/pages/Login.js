import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const data = {
      email: email,
      password: password,
    };
    console.log(data);
    try {
      const response = await axios.post(
        "http://192.168.29.193:5000/api/users/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token; // assuming token is returned in response.data.token
      await AsyncStorage.setItem("authToken", token); // Save token in AsyncStorage
      console.log(token);
      setLoading(false);
      // Redirect to home page
      navigation.navigate("Drawer");
    } catch (error) {
      setLoading(false);
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Error message */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      {/* Navigate to Signup */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.secondaryButtonText}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButton: {
    marginTop: 20,
  },
  secondaryButtonText: {
    color: "#3498db",
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default Login;
