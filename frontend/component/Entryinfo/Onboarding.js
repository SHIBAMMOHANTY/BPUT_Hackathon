// import React, { useState, useEffect } from 'react';
// import { getDefaultHeaderHeight } from '@react-navigation/elements/lib/commonjs/Header/getDefaultHeaderHeight';
// import { View, Text, Button, StyleSheet, Animated, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import InfoPage1 from './InfoPage1';
// import InfoPage2 from './InfoPage2';
// import InfoPage3 from './InfoPage3';

// const Onboarding = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const slideAnim = new Animated.Value(0); // Initial position of the sliding effect
//   const navigation = useNavigation();

//   const pages = [<InfoPage1 />, <InfoPage2 />, <InfoPage3 />];

//   // Function to move to the next page
//   const nextPage = () => {
//     if (currentIndex < pages.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//       Animated.timing(slideAnim, {
//         toValue: slideAnim._value + 1, // Slide by 1 page
//         duration: 1000,
//         useNativeDriver: true,
//       }).start();
//     }
//   };

//   useEffect(() => {
//     if (currentIndex < pages.length - 1) {
//       const timer = setTimeout(nextPage, 2000); // Automatically slide every 2 seconds
//       return () => clearTimeout(timer); // Cleanup on unmount
//     }
//   }, [currentIndex]);

//   return (
//     <View style={{ flex: 1 }}>
//       <Animated.View
//         style={{
//           transform: [{ translateX: slideAnim.interpolate({ inputRange: [0, 1, 2], outputRange: [0, -300, -600] }) }],
//         }}
//       >
//         {pages[currentIndex]}
//       </Animated.View>

//       {/* Skip Button */}
//       <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('SignUp')}>
//         <Text style={styles.skipText}>Skip</Text>
//       </TouchableOpacity>

//       {/* "Next" Button after first 2 pages */}
//       {currentIndex < pages.length - 1 && (
//         <TouchableOpacity style={styles.button} onPress={nextPage}>
//           <Text style={styles.buttonText}>Next</Text>
//         </TouchableOpacity>
//       )}

//       {/* "Get Started" Button after last page */}
//       {currentIndex === pages.length - 1 && (
//         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
//           <Text style={styles.buttonText}>Get Started</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     position: 'absolute',
//     bottom: 20,
//     left: 50,
//     right: 50,
//     backgroundColor: '#640708',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   skipButton: {
//     position: 'absolute',
//     top: 50,
//     right: 20,
//   },
//   skipText: {
//     fontSize: 16,
//     color: '#640708',
//   },
// });

// export default Onboarding;
