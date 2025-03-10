// screens/PaymentScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';

const PaymentScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('15.49'); // Netflix example
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        if (!phoneNumber || phoneNumber.length < 10) {
            Alert.alert('Error', 'Please enter a valid phone number (e.g., 254712345678)');
            return;
        }

        setLoading(true);
        try {
            // Placeholder for backend API call
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
                phone: phoneNumber,
                amount: parseFloat(amount),
            });
            Alert.alert('Success', 'STK Push sent! Check your phone.');
            console.log(response.data);
        } catch (error) {
            Alert.alert('Error', 'Payment failed. Try again.');
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
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="Amount (USD)"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
                disabled // Fixed for Netflix example
            />
            <Button
                mode="contained"
                onPress={handlePayment}
                loading={loading}
                disabled={loading}
                style={styles.button}
            >
                Pay Now
            </Button>
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
    button: {
        marginTop: 10,
    },
});

export default PaymentScreen;