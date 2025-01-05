import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Wallet = () => {
    const [balance, setBalance] = useState(5000); // Initial balance

    const handleWithdraw = (method) => {
        if (balance > 0) {
            Alert.alert(
                'Withdraw Money',
                `Are you sure you want to withdraw ₹1000 to your ${method}?`,
                [
                    { text: 'Cancel', style: 'cancel' },
                    { 
                        text: 'Confirm', 
                        onPress: () => {
                            setBalance(balance - 1000); 
                            Alert.alert('Success', `₹1000 has been withdrawn to your ${method}.`);
                        }
                    }
                ]
            );
        } else {
            Alert.alert('Insufficient Balance', 'You do not have enough balance to withdraw.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Wallet</Text>

            {/* Balance Section */}
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceText}>₹{balance.toFixed(2)}</Text>
                <Text style={styles.balanceLabel}>Current Balance</Text>
            </View>

            {/* Withdraw Buttons Section */}
            <View style={styles.withdrawContainer}>
                <TouchableOpacity 
                    style={styles.withdrawButton}
                    onPress={() => handleWithdraw('Bank Account')}
                >
                    <Text style={styles.buttonText}>Withdraw to Bank</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.withdrawButton, styles.upiButton]}
                    onPress={() => handleWithdraw('UPI')}
                >
                    <Text style={styles.buttonText}>Withdraw to UPI</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    balanceContainer: {
        backgroundColor: '#4CAF50',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    balanceText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
    },
    balanceLabel: {
        fontSize: 18,
        color: 'white',
        marginTop: 10,
    },
    withdrawContainer: {
        width: '100%',
        alignItems: 'center',
    },
    withdrawButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        marginVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    upiButton: {
        backgroundColor: '#FF5722',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }
});

export default Wallet;
