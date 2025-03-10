import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function HomeScreen() {
    const [currency, setCurrency] = useState('USD');
    const [amount, setAmount] = useState('10'); // Editable subscription amount
    const exchangeRates = { USD: 1, KES: 129, EUR: 0.92 }; // Placeholder rates
    const history = [
        { id: '1', date: '2025-03-08', amount: 10, currency: 'USD', status: 'Paid', txId: 'TX123' },
        { id: '2', date: '2025-03-01', amount: 1290, currency: 'KES', status: 'Paid', txId: 'TX456' },
    ];

    const scale = useSharedValue(1);
    const animatedButtonStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePayPress = () => {
        scale.value = withTiming(1.1, { duration: 100 }, () => {
            scale.value = withTiming(1, { duration: 100 });
        });
    };

    const convertedAmount = (parseFloat(amount || 0) * exchangeRates[currency]).toFixed(2);

    return (
        <ScrollView style={styles.homeContainer}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder profile pic
                    style={styles.profilePic}
                />
                <Text style={styles.profileName}>John Doe</Text>
            </View>

            {/* Subscription Selection */}
            <View style={styles.subscriptionSection}>
                <Text style={styles.sectionTitle}>Subscribe with NumberPay</Text>
                <TextInput
                    style={styles.amountInput}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
                <Text style={styles.currencyPicker}>
                    <Text style={styles.currencyLabel}>Currency: </Text>
                    <Text style={styles.currencyValue}>{currency}</Text>
                </Text>
                <TouchableOpacity onPress={() => setCurrency(currency === 'USD' ? 'KES' : currency === 'KES' ? 'EUR' : 'USD')}>
                    <Text style={styles.switchCurrency}>Switch Currency</Text>
                </TouchableOpacity>
                <Text style={styles.amountText}>
                    Total: {convertedAmount} {currency}
                </Text>
                <Animated.View style={animatedButtonStyle}>
                    <TouchableOpacity style={styles.payButton} onPress={handlePayPress}>
                        <Text style={styles.payButtonText}>Pay Now</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>

            {/* Payment History */}
            <View style={styles.historySection}>
                <Text style={styles.sectionTitle}>Payment History</Text>
                <FlatList
                    data={history}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.historyItem}>
                            <Text>{item.date}</Text>
                            <Text>{item.amount} {item.currency}</Text>
                            <Text>{item.status} (TxID: {item.txId})</Text>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    profileSection: {
        backgroundColor: '#2E7D32',
        padding: 20,
        alignItems: 'center',
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    subscriptionSection: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 10,
    },
    amountInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#2E7D32',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        color: '#2E7D32',
    },
    currencyPicker: {
        fontSize: 16,
        marginBottom: 10,
    },
    currencyLabel: {
        color: '#2E7D32',
    },
    currencyValue: {
        fontWeight: 'bold',
        color: '#2E7D32',
    },
    switchCurrency: {
        color: '#2E7D32',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    amountText: {
        fontSize: 16,
        color: '#2E7D32',
        marginBottom: 10,
    },
    payButton: {
        backgroundColor: '#2E7D32',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    payButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    historySection: {
        padding: 20,
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});