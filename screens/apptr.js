import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './homepage';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const Stack = createStackNavigator();

function SplashScreen({ navigation }) {
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 1000, easing: Easing.ease });
        setTimeout(() => navigation.navigate('Home'), 3000); // Redirect after 3s
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <View style={styles.splashContainer}>
            <Animated.View style={[styles.splashContent, animatedStyle]}>
                <Text style={styles.splashText}>NumberPay</Text>
                <View style={styles.iconRow}>
                    <Image
                        source={{ uri: 'https://img.icons8.com/ios-filled/50/FFFFFF/phone.png' }}
                        style={styles.icon}
                    />
                    <Image
                        source={{ uri: 'https://img.icons8.com/ios-filled/50/FFFFFF/money.png' }}
                        style={styles.icon}
                    />
                </View>
            </Animated.View>
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        backgroundColor: '#2E7D32', // Dark green
        justifyContent: 'center',
        alignItems: 'center',
    },
    splashContent: {
        alignItems: 'center',
    },
    splashText: {
        fontSize: 36,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 120,
    },
    icon: {
        width: 40,
        height: 40,
        tintColor: '#FFFFFF',
    },
});