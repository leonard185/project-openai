// screens/PaymentScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator, Picker } from 'react-native-paper';
import axios from 'axios';

const PaymentScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('15.49'); // Netflix in USD
    const [loading, setLoading] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('mpesa'); // Default to M-Pesa

    const validatePhoneNumber = (number) => {
        const regex = /^254\d{9}$/;
        return regex.test(number);
    };

    const handlePayment = async () => {
        if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
            setPhoneError(true);
            Alert.alert('Error', 'Enter a valid Kenyan number (e.g., 254712345678)');
            return;
        }

        setPhoneError(false);
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/stkpush', {
                phone: phoneNumber,
                amount: parseFloat(amount),
                method: paymentMethod, // Pass method to backend
            });
            Alert.alert('Success', 'STK Push sent! Check your phone to confirm.');
            console.log(response.data);
        } catch (error) {
            Alert.alert('Error', error.response?.data?.error || 'Payment failed.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>
                Pay Netflix with PhonePay
            </Text>
            <TextInput
                label="Phone Number (e.g., 254712345678)"
                value={phoneNumber}
                onChangeText={(text) => {
                    setPhoneNumber(text);
                    setPhoneError(false);
                }}
                keyboardType="phone-pad"
                mode="outlined"
                style={styles.input}
                error={phoneError}
            />
            <TextInput
                label="Amount (USD)"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
                disabled
            />
            <Picker
                selectedValue={paymentMethod}
                style={styles.picker}
                onValueChange={(itemValue) => setPaymentMethod(itemValue)}
            >
                <Picker.Item label="M-Pesa" value="mpesa" />
                <Picker.Item label="Airtel Money" value="airtel" />
            </Picker>
            <Button
                mode="contained"
                onPress={handlePayment}
                loading={loading}
                disabled={loading}
                style={styles.button}
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </Button>
            {loading && (
                <ActivityIndicator animating={true} size="large" style={styles.spinner} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        width: '100%',
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        marginBottom: 15,
    },
    picker: {
        marginBottom: 15,
    },
    button: {
        marginTop: 10,
    },
    spinner: {
        marginTop: 20,
    },
});

export default PaymentScreen;