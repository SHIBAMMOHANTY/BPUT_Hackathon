import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const PaymentRedirect = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  const handlePaymentRedirect = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid payment amount.');
      return;
    }
    if (!paymentMethod) {
      Alert.alert('No Payment Method', 'Please select a payment method.');
      return;
    }

    // Define account information
    const accountId = '845826216621@ptyes';
    const paymentAmount = amount;

    // Redirect based on the selected payment method
    switch (paymentMethod) {
      case 'Paytm':
        Linking.openURL(`https://paytm.com/pay?amount=${paymentAmount}&account=${accountId}`);
        break;
      case 'GPay':
        Linking.openURL(`https://pay.google.com/gp/p/ui/pay?amount=${paymentAmount}&account=${accountId}`);
        break;
      case 'PhonePe':
        // Attempt to redirect to PhonePe App (if it supports deep links)
        Linking.openURL(`phonepe://payment?amount=${paymentAmount}&account=${accountId}`);
        break;
      case 'ApplePay':
        Linking.openURL(`https://applepay.com/pay?amount=${paymentAmount}&account=${accountId}`);
        break;
      case 'AmazonPay':
        Linking.openURL(`https://pay.amazon.com/pay?amount=${paymentAmount}&account=${accountId}`);
        break;
      default:
        Alert.alert('Invalid Payment Method', 'Please select a valid payment method.');
    }
  };

  const handleQRCodeGeneration = () => {
    setShowQRCode(true);
  };

  // Paytm QR Code format (example)
  const paytmQRCodeData = `https://paytm.com/qr?amount=${amount}&account=845826216621@ptyes`;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payment Gateway</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter the amount to pay:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter amount"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <Text style={styles.label}>Select Payment Method:</Text>
      <View style={styles.paymentOptions}>
        <View style={styles.paymentRow}>
          <TouchableOpacity
            style={[styles.paymentCard, paymentMethod === 'Paytm' && styles.selectedCard]}
            onPress={() => setPaymentMethod('Paytm')}
          >
            <Text style={styles.paymentMethodText}>Paytm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.paymentCard, paymentMethod === 'GPay' && styles.selectedCard]}
            onPress={() => setPaymentMethod('GPay')}
          >
            <Text style={styles.paymentMethodText}>Google Pay</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.paymentRow}>
          <TouchableOpacity
            style={[styles.paymentCard, paymentMethod === 'PhonePe' && styles.selectedCard]}
            onPress={() => setPaymentMethod('PhonePe')}
          >
            <Text style={styles.paymentMethodText}>PhonePe</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.paymentCard, paymentMethod === 'ApplePay' && styles.selectedCard]}
            onPress={() => setPaymentMethod('ApplePay')}
          >
            <Text style={styles.paymentMethodText}>Apple Pay</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.paymentRow}>
          <TouchableOpacity
            style={[styles.paymentCard, paymentMethod === 'AmazonPay' && styles.selectedCard]}
            onPress={() => setPaymentMethod('AmazonPay')}
          >
            <Text style={styles.paymentMethodText}>Amazon Pay</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePaymentRedirect}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.qrButton} onPress={handleQRCodeGeneration}>
        <Text style={styles.qrButtonText}>Generate QR Code</Text>
      </TouchableOpacity>

      {showQRCode && (
        <View style={styles.qrCodeContainer}>
          {/* Generate Paytm QR Code */}
          <QRCode value={paytmQRCodeData} size={200} />
          <Text style={styles.qrText}>Scan to pay</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  paymentOptions: {
    width: '100%',
    marginBottom: 30,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  paymentCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9',
  },
  paymentMethodText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
    elevation: 2,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  qrButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
    elevation: 2,
    alignSelf: 'center',
  },
  qrButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  qrCodeContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  qrText: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
});

export default PaymentRedirect;
