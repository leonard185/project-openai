// App.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Picker, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Splash Screen
function SplashScreen({ navigation }) {
    useEffect(() => {
        setTimeout(() => navigation.navigate('Login'), 2000); // Auto-redirect after 2s
    }, []);

    return (
        <View style={styles.splashContainer}>
            <Text style={styles.splashText}>NumberPay</Text>
        </View>
    );
}

// Login/Sign-Up Screen
function AuthScreen({ navigation }) {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <View style={styles.authContainer}>
            <Text style={styles.authTitle}>{isLogin ? 'Login' : 'Sign Up'}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.authButton}>Continue as Guest</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.switchText}>
                    {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

// Homepage
function HomeScreen() {
    const [currency, setCurrency] = useState('USD');
    const [amount, setAmount] = useState(10); // Default subscription amount
    const exchangeRates = { USD: 1, KES: 129, EUR: 0.92 }; // Placeholder rates
    const history = [
        { id: '1', date: '2025-03-08', amount: 10, currency: 'USD', status: 'Paid' },
        { id: '2', date: '2025-03-01', amount: 1290, currency: 'KES', status: 'Paid' },
    ];

    const convertedAmount = (amount * exchangeRates[currency]).toFixed(2);

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
                <Picker
                    selectedValue={currency}
                    style={styles.currencyPicker}
                    onValueChange={(value) => setCurrency(value)}
                >
                    <Picker.Item label="USD - United States" value="USD" />
                    <Picker.Item label="KES - Kenya" value="KES" />
                    <Picker.Item label="EUR - Europe" value="EUR" />
                </Picker>
                <Text style={styles.amountText}>
                    Amount: {convertedAmount} {currency}
                </Text>
                <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payButtonText}>Pay Now</Text>
                </TouchableOpacity>
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
                            <Text>{item.status}</Text>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={AuthScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    // Splash Screen
    splashContainer: {
        flex: 1,
        backgroundColor: '#2E7D32', // Dark green
        justifyContent: 'center',
        alignItems: 'center',
    },
    splashText: {
        fontSize: 36,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    // Auth Screen
    authContainer: {
        flex: 1,
        backgroundColor: '#2E7D32',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    authTitle: {
        fontSize: 28,
        color: '#FFFFFF',
        marginBottom: 20,
    },
    authButton: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        color: '#2E7D32',
        fontWeight: 'bold',
    },
    switchText: {
        color: '#FFFFFF',
        marginTop: 20,
    },

    // Homepage
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
    currencyPicker: {
        height: 50,
        width: '100%',
        color: '#2E7D32',
    },
    amountText: {
        fontSize: 16,
        color: '#2E7D32',
        marginVertical: 10,
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