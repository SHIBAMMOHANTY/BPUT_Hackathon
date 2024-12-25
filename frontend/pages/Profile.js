// // import React from 'react';
// // import { View, Text, StyleSheet } from 'react-native';

// // const Profile = () => {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Your Profile</Text>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#f3f4f6',
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //   },
// // });

// // export default Profile;


// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

// const ProfileScreen = () => {
//   const [userData, setUserData] = useState(null);

//   // Example of fetching user data from backend (replace with actual API call)
//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       const fetchedData = {
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         disabilityType: 'Visual Impairment',
//         profilePicture: 'https://via.placeholder.com/150',
//         role: 'Investor/NGO',
//       };
//       setUserData(fetchedData);
//     }, 1000);
//   }, []);

//   if (!userData) {
//     return (
//       <View style={styles.centeredContainer}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {/* Profile Header */}
//       <View style={styles.headerContainer}>
//         <View style={styles.profilePictureWrapper}>
//           <Image
//             source={{ uri: userData.profilePicture }}
//             style={styles.profileImage}
//           />
//         </View>
//         <Text style={styles.name}>{userData.name}</Text>
//         <Text style={styles.role}>{userData.role}</Text>
//       </View>

//       {/* Profile Details */}
//       <View style={styles.profileDetailsContainer}>
//         <Text style={styles.sectionTitle}>Profile Information</Text>
        
//         <View style={styles.profileCard}>
//           <Text style={styles.detailLabel}>Email:</Text>
//           <Text style={styles.detailValue}>{userData.email}</Text>
//         </View>
        
//         <View style={styles.profileCard}>
//           <Text style={styles.detailLabel}>Disability Type:</Text>
//           <Text style={styles.detailValue}>{userData.disabilityType}</Text>
//         </View>

//         <View style={styles.profileCard}>
//           <Text style={styles.detailLabel}>Role:</Text>
//           <Text style={styles.detailValue}>{userData.role}</Text>
//         </View>
//       </View>

//       {/* Edit Profile Button */}
//       <TouchableOpacity
//         style={styles.editButton}
//         onPress={() => alert('Edit Profile')}>
//         <Text style={styles.editButtonText}>Edit Profile</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fafb',
//   },
//   centeredContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 18,
//     color: '#3b82f6',
//     fontWeight: 'bold',
//   },
//   headerContainer: {
//     backgroundColor: '#3b82f6',
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.2,
//     shadowRadius: 15,
//   },
//   profilePictureWrapper: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     overflow: 'hidden',
//     marginBottom: 16,
//     borderWidth: 4,
//     borderColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//   },
//   profileImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 75,
//   },
//   name: {
//     color: '#fff',
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   role: {
//     color: '#e5e7eb',
//     fontSize: 18,
//     marginTop: 5,
//   },
//   profileDetailsContainer: {
//     marginTop: 30,
//     paddingHorizontal: 20,
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 10,
//   },
//   profileCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginBottom: 15,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   detailLabel: {
//     fontSize: 16,
//     color: '#6b7280',
//   },
//   detailValue: {
//     fontSize: 16,
//     color: '#111827',
//     fontWeight: '500',
//     marginTop: 5,
//   },
//   editButton: {
//     backgroundColor: '#3b82f6',
//     paddingVertical: 15,
//     paddingHorizontal: 50,
//     borderRadius: 30,
//     marginTop: 30,
//     alignSelf: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.3,
//     shadowRadius: 15,
//     elevation: 6,
//   },
//   editButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
// });

// export default ProfileScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      const fetchedData = {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Investor",
        profilePicture: "https://via.placeholder.com/150", // Replace with actual profile picture
        disabilityType: "None",
      };
      setUserData(fetchedData);
      setIsLoading(false);
    }, 1500);
  }, []);

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
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: userData.profilePicture }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.role}>{userData.role}</Text>
      </View>

      {/* Profile Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Profile Information</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Email</Text>
          <Text style={styles.cardValue}>{userData.email}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Disability Type</Text>
          <Text style={styles.cardValue}>{userData.disabilityType}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Role</Text>
          <Text style={styles.cardValue}>{userData.role}</Text>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => alert("Edit Profile pressed")}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => alert("Logout pressed")}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F9FC",
  },
  loadingText: {
    fontSize: 16,
    color: "#4C8DFF",
    marginTop: 10,
  },
  headerContainer: {
    backgroundColor: "#4C8DFF",
    paddingVertical: 40,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  role: {
    fontSize: 18,
    color: "#DDE6F5",
    marginTop: 5,
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    marginTop: 5,
  },
  editButton: {
    backgroundColor: "#4C8DFF",
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#FF5757",
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ProfileScreen;
