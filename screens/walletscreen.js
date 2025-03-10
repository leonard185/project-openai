// screens/WalletScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput, ActivityIndicator } from 'react-native-paper';

const WalletScreen = () => {
    const [balance, setBalance] = useState(2014); // KES
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddFunds = () => {
        setLoading(true);
        // TODO: Call backend to fund via M-Pesa/Airtel
        setTimeout(() => {
            setBalance(balance + parseFloat(amount || 0));
            setLoading(false);
            setAmount('');
        }, 2000); // Mock delay
    };

    const handlePayNetflix = () => {
        if (balance < 2014) {
            alert('Insufficient balance');
            return;
        }
        setLoading(true);
        // TODO: Call backend to pay Netflix
        setTimeout(() => {
            setBalance(balance - 2014);
            setLoading(false);
            alert('Netflix paid successfully!');
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineLarge" style={styles.balance}>
                Balance: KES {balance}
            </Text>
            <TextInput
                label="Amount to Add (KES)"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
            />
            <Button mode="contained" onPress={handleAddFunds} loading={loading} style={styles.button}>
                Add Funds
            </Button>
            <Button mode="contained" onPress={handlePayNetflix} loading={loading} style={styles.button}>
                Pay Netflix (KES 2014)
            </Button>
            {loading && <ActivityIndicator size="large" style={styles.spinner} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    balance: { textAlign: 'center', marginBottom: 20 },
    input: { marginBottom: 15 },
    button: { marginVertical: 10 },
    spinner: { marginTop: 20 },
});

export default WalletScreen;