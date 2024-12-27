import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Events from './pages/ProjectPage';
import Project from './pages/ReportPage';
import Profile from './pages/Profile';
import Notification from './pages/Notification';
import WelcomeScreen from './pages/Welcome';
import Signup from './pages/Signup';
import Login from './pages/Login';

// Create Navigators
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Main Bottom Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Dashboard') {
            iconName = 'analytics';
          } else if (route.name === 'Campaign') {
            iconName = 'calendar';
          } else if (route.name === 'Project') {
            iconName = 'briefcase';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
      tabBarOptions={{
        activeTintColor: '#6366f1',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarAccessibilityLabel: 'Navigate to Home screen',
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarAccessibilityLabel: 'Navigate to Dashboard screen',
        }}
      />
      <Tab.Screen
        name="Campaign"
        component={Events}
        options={{
          tabBarAccessibilityLabel: 'Navigate to Campaigns screen',
        }}
      />
      <Tab.Screen
        name="Project"
        component={Project}
        options={{
          tabBarAccessibilityLabel: 'Navigate to Project screen',
        }}
      />
    </Tab.Navigator>
  );
};

// Function to redirect to WhatsApp
const openWhatsApp = () => {
  const phoneNumber = '8458024651';
  const message = 'Hello, I need help and support.';
  const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert('Error', 'WhatsApp is not installed on your device');
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('An error occurred', err));
};

// Drawer Navigator (Hamburger Menu)
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#4e73df',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen
        name="Home"
        component={MainTabNavigator}
        options={{
          drawerAccessibilityLabel: 'Navigate to Home screen',
        }}
      />
      <Drawer.Screen
        name="Language Support"
        component={() => (
          <View style={styles.screen}>
            <Text style={styles.routeName}>Language Support</Text>
          </View>
        )}
        options={{
          drawerAccessibilityLabel: 'Go to Language Support screen',
        }}
      />
      <Drawer.Screen
        name="Help & Support"
        component={() => {
          openWhatsApp();
          return (
            <View style={styles.screen}>
              <Text style={styles.routeName}>Redirecting to WhatsApp...</Text>
            </View>
          );
        }}
        options={{
          drawerAccessibilityLabel: 'Navigate to Help & Support',
        }}
      />
      <Drawer.Screen
        name="My Profile"
        component={() => (
          <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          </Stack.Navigator>
        )}
        options={{
          drawerAccessibilityLabel: 'Navigate to Profile screen',
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={() => (
          <View style={styles.screen}>
            <Notification />
          </View>
        )}
        options={{
          drawerAccessibilityLabel: 'View Notifications',
        }}
      />
    </Drawer.Navigator>
  );
};

// App Component - Entry Point
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  routeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;
