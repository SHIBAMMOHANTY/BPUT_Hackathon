import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Project from './pages/Project';
import Profile from './pages/Profile';
import Notification from './pages/Notification';

// Create Navigators
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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
          } else if (route.name === 'Events') {
            iconName = 'calendar';
          } else if (route.name === 'Project') {
            iconName = 'briefcase';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false, // Hide header for bottom tab screens
      })}
      tabBarOptions={{
        activeTintColor: '#6366f1',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Project" component={Project} />
    </Tab.Navigator>
  );
};

// Drawer Navigator (Hamburger Menu)
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        // Add notification icon to the header
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        ),
      })}
    >
      {/* Drawer Screen for MainTabNavigator */}
      <Drawer.Screen name="Home" component={MainTabNavigator} />
      {/* Additional Drawer Screens */}
      <Drawer.Screen name="Language Support">
        {() => (
          <View style={styles.screen}>
            <Text style={styles.routeName}>Language Support</Text>
          </View>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Help & Support">
        {() => (
          <View style={styles.screen}>
            <Text style={styles.routeName}>Help & Support</Text>
          </View>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="My Profile">
        {() => (
          <View style={styles.screen}>
            <Profile />
          </View>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Notifications">
        {() => (
          <View style={styles.screen}>
            <Notification />
          </View>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

// App Component - Entry Point
const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator /> {/* Drawer Navigator wrapped around Main Tab */}
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
