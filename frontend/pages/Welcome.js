import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = ({ navigation }) => {
    const [token, setToken] = useState(null);

    async function fetchToken() {
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (token) {
                setToken(token);
                // Redirect to Drawer after token retrieval
                setTimeout(() => {
                    navigation.replace('Drawer'); 
                }, 2000);
            } else {
                navigation.replace('Login'); // Redirect to Login if no token is found
            }
        } catch (error) {
            console.error("Error fetching token:", error);
            navigation.replace('Login'); // Redirect to Login on error
        }
    }

    useEffect(() => {
        fetchToken(); 
    }, [navigation]); // Removed token from dependency array to avoid multiple redirects.

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/ebiza.png')} 
                style={styles.logo}
            />
            <Text style={styles.subtitle}>
                Connecting investors, NGOs, and businesses for social impact
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f9fc',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 30,
        borderRadius: 15,
        backgroundColor: '#ddd',
    },
    subtitle: {
        fontSize: 18,
        color: '#7F8C8D',
        marginBottom: 40,
        textAlign: 'center',
        paddingHorizontal: 40,
    },
});

export default WelcomeScreen;
