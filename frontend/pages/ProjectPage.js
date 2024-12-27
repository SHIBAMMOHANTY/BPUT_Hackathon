
// import React from "react";
// import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { ProgressBar } from "react-native-paper";

// const ProjectPage = ({ route }) => {
//   // Dummy report data for testing
//   const report = {
//     title: 'Improve Accessibility for Disabled People',
//     description: 'This project aims to improve accessibility in public spaces for people with disabilities.',
//     fundingGoal: 5000,
//     photo: 'https://via.placeholder.com/150',
//     location: { latitude: 20.2961, longitude: 85.8189 }, // Bhubaneswar coordinates
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>{report.title}</Text>
//       <Text style={styles.description}>{report.description}</Text>

//       {report.photo && <Image source={{ uri: report.photo }} style={styles.photo} />}

//       {report.location && (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: report.location.latitude,
//             longitude: report.location.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//         >
//           <Marker coordinate={report.location} title="Problem Location" />
//         </MapView>
//       )}

//       <Text style={styles.subTitle}>Funding Progress</Text>
//       <ProgressBar progress={0.2} color="#4CAF50" style={styles.progressBar} />

//       <Text style={styles.fundingText}>{`$100 raised of $${report.fundingGoal} goal`}</Text>

//       {/* Donate Button */}
//       <TouchableOpacity style={styles.button} onPress={() => {}}>
//         <Text style={styles.buttonText}>Donate $10</Text>
//       </TouchableOpacity>

//       {/* Vote buttons */}
//       <Text style={styles.subTitle}>Vote on this Project</Text>
//       <View style={styles.voteContainer}>
//         <TouchableOpacity style={[styles.voteButton, styles.voteYes]} onPress={() => {}}>
//           <Text style={styles.voteButtonText}>Yes</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.voteButton, styles.voteNo]} onPress={() => {}}>
//           <Text style={styles.voteButtonText}>No</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#333",
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: "#555",
//   },
//   photo: {
//     height: 200,
//     width: "100%",
//     marginTop: 10,
//     borderRadius: 8,
//   },
//   map: {
//     height: 300,
//     marginVertical: 16,
//     borderRadius: 8,
//   },
//   subTitle: {
//     fontSize: 18,
//     marginTop: 20,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   progressBar: {
//     marginTop: 10,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   fundingText: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: "#333",
//   },
//   button: {
//     backgroundColor: "#4CAF50",
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     alignItems: "center",
//     marginTop: 15,
//     marginBottom: 15,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//   },
//   voteContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   voteButton: {
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//     flex: 1,
//     alignItems: "center",
//     marginHorizontal: 5,
//   },
//   voteYes: {
//     backgroundColor: "#4CAF50", // Green color for Yes
//   },
//   voteNo: {
//     backgroundColor: "#F44336", // Red color for No
//   },
//   voteButtonText: {
//     fontSize: 18,
//     color: "#fff",
//   },
// });

// export default ProjectPage;

//Dont REmove Anything With Out Permisson -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ProgressBar } from "react-native-paper";

const ProjectPage = ({ route }) => {
  // Dummy report data for testing
  const report = {
    title: 'Improve Accessibility for Disabled People',
    description: 'This project aims to improve accessibility in public spaces for people with disabilities.',
    fundingGoal: 5000,
    // Remove the photo URL for testing local image
    // photo: 'https://via.placeholder.com/150',
    photo: require('../assets/ebiza1.png'), // Local image
    location: { latitude: 20.2961, longitude: 85.8189 }, // Bhubaneswar coordinates
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{report.title}</Text>
      <Text style={styles.description}>{report.description}</Text>

      {/* Display local image */}
      {report.photo && <Image source={report.photo} style={styles.photo} />}

      {report.location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: report.location.latitude,
            longitude: report.location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={report.location} title="Problem Location" />
        </MapView>
      )}

      <Text style={styles.subTitle}>Funding Progress</Text>
      <ProgressBar progress={0.2} color="#4CAF50" style={styles.progressBar} />

      <Text style={styles.fundingText}>{`$100 raised of $${report.fundingGoal} goal`}</Text>

      {/* Donate Button */}
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Donate $10</Text>
      </TouchableOpacity>

      {/* Vote buttons */}
      <Text style={styles.subTitle}>Vote on this Project</Text>
      <View style={styles.voteContainer}>
        <TouchableOpacity style={[styles.voteButton, styles.voteYes]} onPress={() => {}}>
          <Text style={styles.voteButtonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.voteButton, styles.voteNo]} onPress={() => {}}>
          <Text style={styles.voteButtonText}>No</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  photo: {
    height: 200,
    width: "100%",
    marginTop: 10,
    borderRadius: 8,
  },
  map: {
    height: 300,
    marginVertical: 16,
    borderRadius: 8,
  },
  subTitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    color: "#333",
  },
  progressBar: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  fundingText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  voteContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 20,
  },
  voteButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  voteYes: {
    backgroundColor: "#4CAF50", // Green color for Yes
  },
  voteNo: {
    backgroundColor: "#F44336", // Red color for No
  },
  voteButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default ProjectPage;



//Route Page -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// import React from "react";
// import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { ProgressBar } from "react-native-paper";

// const ProjectPage = ({ route }) => {
//   const { report } = route.params || {}; // Check if route.params is defined
  
//   if (!report) {
//     return <Text>Loading...</Text>; // Render a loading state or a message if report is missing
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>{report.title}</Text>
//       <Text style={styles.description}>{report.description}</Text>

//       {report.photo && <Image source={{ uri: report.photo }} style={styles.photo} />}

//       {report.location && (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: report.location.latitude,
//             longitude: report.location.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//         >
//           <Marker coordinate={report.location} title="Problem Location" />
//         </MapView>
//       )}

//       <Text style={styles.subTitle}>Funding Progress</Text>
//       <ProgressBar progress={0.5} color="#4CAF50" style={styles.progressBar} />

//       <Text style={styles.fundingText}>$100 raised of $5000 goal</Text>
//       {/* Add donation button logic here */}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#333",
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: "#555",
//   },
//   photo: {
//     height: 200,
//     width: "100%",
//     marginTop: 10,
//     borderRadius: 8,
//   },
//   map: {
//     height: 300,
//     marginVertical: 16,
//     borderRadius: 8,
//   },
//   subTitle: {
//     fontSize: 18,
//     marginTop: 20,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   progressBar: {
//     marginTop: 10,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   fundingText: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: "#333",
//   },
// });

// export default ProjectPage;

// import React from "react";
// import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { ProgressBar } from "react-native-paper";

// const ProjectPage = ({ route }) => {
//   const { report } = route.params || {}; // Check if route.params is defined
  
//   // Check if the report data is available
//   if (!report) {
//     return <Text>Loading...</Text>; // Render a loading state or a message if report is missing
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>{report.title}</Text>
//       <Text style={styles.description}>{report.description}</Text>

//       {report.photo && <Image source={{ uri: report.photo }} style={styles.photo} />}

//       {report.location && (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: report.location.latitude,
//             longitude: report.location.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//         >
//           <Marker coordinate={report.location} title="Problem Location" />
//         </MapView>
//       )}

//       <Text style={styles.subTitle}>Funding Progress</Text>
//       <ProgressBar progress={report.fundingProgress || 0} color="#4CAF50" style={styles.progressBar} />

//       <Text style={styles.fundingText}>{`$${report.fundingRaised} raised of $${report.fundingGoal} goal`}</Text>
//       {/* Add donation button logic here */}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#333",
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: "#555",
//   },
//   photo: {
//     height: 200,
//     width: "100%",
//     marginTop: 10,
//     borderRadius: 8,
//   },
//   map: {
//     height: 300,
//     marginVertical: 16,
//     borderRadius: 8,
//   },
//   subTitle: {
//     fontSize: 18,
//     marginTop: 20,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   progressBar: {
//     marginTop: 10,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   fundingText: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: "#333",
//   },
// });

// export default ProjectPage;
