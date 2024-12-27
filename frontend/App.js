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
import LanguageSupport from './pages/LanguageSupport';


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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Campaign" component={Events} />
      <Tab.Screen name="Project" component={Project} />
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
      <Drawer.Screen name="Home" component={MainTabNavigator} />
      <Drawer.Screen name="Language Support">
        {() => (
          <View style={styles.screen}>
            <LanguageSupport />
          </View>
        )}
      </Drawer.Screen>
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
      />
      <Drawer.Screen name="My Profile">
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          </Stack.Navigator>
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
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
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