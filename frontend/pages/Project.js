// import { Text, View } from 'react-native'
// import React, { Component } from 'react'

// export class Project extends Component {
//   render() {
//     return (
//       <View>
//         <Text>Project</Text>
//       </View>
//     )
//   }
// }

// export default Project;
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);

  // Example of fetching user data from backend (replace with actual API call)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const fetchedData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        disabilityType: 'Visual Impairment',
        profilePicture: 'https://via.placeholder.com/150',
        role: 'Investor/NGO',
      };
      setUserData(fetchedData);
    }, 1000);
  }, []);

  if (!userData) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.headerContainer}>
        <View style={styles.profilePictureWrapper}>
          <Image
            source={{ uri: userData.profilePicture }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.role}>{userData.role}</Text>
      </View>

      {/* Profile Details */}
      <View style={styles.profileDetailsContainer}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        
        <View style={styles.profileCard}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>{userData.email}</Text>
        </View>
        
        <View style={styles.profileCard}>
          <Text style={styles.detailLabel}>Disability Type:</Text>
          <Text style={styles.detailValue}>{userData.disabilityType}</Text>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.detailLabel}>Role:</Text>
          <Text style={styles.detailValue}>{userData.role}</Text>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => alert('Edit Profile')}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  headerContainer: {
    backgroundColor: '#3b82f6',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  profilePictureWrapper: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  name: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  role: {
    color: '#e5e7eb',
    fontSize: 18,
    marginTop: 5,
  },
  profileDetailsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  detailLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
    marginTop: 5,
  },
  editButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 30,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ProfileScreen;

// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

// const ProfileScreen = () => {
//   const [userData, setUserData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch user data from the backend
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Replace with your actual API endpoint
//         const response = await fetch('https://your-backend-api.com/user/profile');
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         setUserData(data); // Store fetched data
//       } catch (err) {
//         setError(err.message); // Handle error
//       } finally {
//         setIsLoading(false); // Set loading state to false after fetching
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={styles.centeredContainer}>
//         <ActivityIndicator size="large" color="#4C8DFF" />
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centeredContainer}>
//         <Text style={styles.errorText}>Error: {error}</Text>
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
//           <Text style={styles.detailLabel}>Email</Text>
//           <Text style={styles.detailValue}>{userData.email}</Text>
//         </View>
        
//         <View style={styles.profileCard}>
//           <Text style={styles.detailLabel}>Disability Type</Text>
//           <Text style={styles.detailValue}>{userData.disabilityType}</Text>
//         </View>

//         <View style={styles.profileCard}>
//           <Text style={styles.detailLabel}>Role</Text>
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
//     backgroundColor: '#F7F9FB',
//   },
//   centeredContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F7F9FB',
//   },
//   loadingText: {
//     fontSize: 18,
//     color: '#4C8DFF',
//     fontWeight: '600',
//     marginTop: 10,
//   },
//   errorText: {
//     fontSize: 18,
//     color: 'red',
//     fontWeight: '600',
//     marginTop: 10,
//   },
//   headerContainer: {
//     backgroundColor: '#4C8DFF',
//     paddingVertical: 40,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 20,
//   },
//   profilePictureWrapper: {
//     width: 130,
//     height: 130,
//     borderRadius: 65,
//     overflow: 'hidden',
//     borderWidth: 5,
//     borderColor: '#fff',
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.4,
//     shadowRadius: 10,
//   },
//   profileImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 65,
//   },
//   name: {
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: '700',
//     marginTop: 15,
//   },
//   role: {
//     color: '#F1F5F9',
//     fontSize: 18,
//     fontWeight: '500',
//     marginTop: 5,
//   },
//   profileDetailsContainer: {
//     marginTop: 40,
//     paddingHorizontal: 25,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#1F2937',
//     marginBottom: 15,
//   },
//   profileCard: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.2,
//     shadowRadius: 15,
//     elevation: 5,
//   },
//   detailLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#6B7280',
//   },
//   detailValue: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#1F2937',
//     marginTop: 8,
//   },
//   editButton: {
//     backgroundColor: '#4C8DFF',
//     paddingVertical: 15,
//     paddingHorizontal: 70,
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
