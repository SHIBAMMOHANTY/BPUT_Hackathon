import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";

const LocationPicker = ({ onSelectLocation }) => {
  const [location, setLocation] = useState({
    latitude: 20.2961, // Bhubaneswar latitude
    longitude: 85.8245, // Bhubaneswar longitude
  });

  const [searchText, setSearchText] = useState("");

  const predefinedLocations = {
    Bhubaneswar: { latitude: 20.2961, longitude: 85.8245 },
    Cuttack: { latitude: 20.4625, longitude: 85.8828 },
    Puri: { latitude: 19.8135, longitude: 85.8312 },
  };

  const handleSearch = () => {
    const newLocation = predefinedLocations[searchText];
    if (newLocation) {
      setLocation(newLocation);
    } else {
      alert("Location not found. Try Bhubaneswar, Cuttack, or Puri.");
    }
  };

  const handleConfirm = () => {
    onSelectLocation(location);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a location (e.g., Bhubaneswar)"
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      <MapView
        style={styles.map}
        initialRegion={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => setLocation(e.nativeEvent.coordinate)}
      >
        <Marker coordinate={location} />
      </MapView>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    marginBottom: 16,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  searchButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },
  confirmButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  confirmButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default LocationPicker;
