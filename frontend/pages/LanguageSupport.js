import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Wallet = () => {
    const [balance, setBalance] = useState(5000);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [transactions, setTransactions] = useState([]);

    const handleWithdraw = (method) => {
        const amount = parseFloat(withdrawAmount);
        if (!amount || amount > balance) {
            Alert.alert('Invalid Amount', 'Please enter a valid amount within your balance.');
            return;
        }
        Alert.alert(
            'Withdraw Money',
            `Are you sure you want to withdraw ₹${amount} to your ${method}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Confirm', 
                    onPress: () => {
                        setBalance(balance - amount); 
                        setTransactions([...transactions, { method, amount, date: new Date().toLocaleString() }]);
                        setWithdrawAmount('');
                        Alert.alert('Success', `₹${amount} has been withdrawn to your ${method}.`);
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Wallet</Text>
            
            {/* Balance Section */}
            <View style={styles.balanceContainer}>
                <Ionicons name="wallet" size={42} color="white" />
                <Text style={styles.balanceText}>₹{balance.toFixed(2)}</Text>
            </View>

            {/* Withdraw Input Section */}
            <TextInput
                style={styles.input}
                placeholder="Enter amount to withdraw"
                keyboardType="numeric"
                value={withdrawAmount}
                onChangeText={setWithdrawAmount}
            />

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

            {/* Transaction History Section */}
            <Text style={styles.transactionTitle}>Transaction History</Text>
            <FlatList
                data={transactions}
                renderItem={({ item }) => (
                    <View style={styles.transactionCard}>
                        <Text style={styles.transactionText}>Method: {item.method}</Text>
                        <Text style={styles.transactionText}>Amount: ₹{item.amount}</Text>
                        <Text style={styles.transactionText}>Date: {item.date}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
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
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        width: '100%',
    },
    balanceText: {
        fontSize: 42,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },
    input: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 20,
        width: '80%',
        fontSize: 18,
    },
    withdrawContainer: {
        width: '100%',
        alignItems: 'center',
    },
    withdrawButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        width: '90%',
        marginVertical: 10,
        alignItems: 'center',
    },
    upiButton: {
        backgroundColor: '#FF5722',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    transactionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 10,
    },
    transactionCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    transactionText: {
        fontSize: 16,
    }
});

export default Wallet;
