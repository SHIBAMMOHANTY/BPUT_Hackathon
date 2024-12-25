import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Project from './pages/Project';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for Login, Sign Up, Profile
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

// Bottom Tab Navigator for main app screens
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
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
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

const App = () => {
  return (
    <NavigationContainer>
      {/* <AuthStack /> Use AuthStack for Login, Sign Up, Profile */}
      <MainTabNavigator /> Uncomment for main app navigation
    </NavigationContainer>
  );
};

export default App;
