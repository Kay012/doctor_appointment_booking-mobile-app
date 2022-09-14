import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { StyleSheet, Text, View } from 'react-native'
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import LandingScreen from '../screens/auth/LandingScreen';

const Stack = createStackNavigator();
const AuthNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LandingScreen}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerTitle: "Sign In"}}/>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerTitle: "Sign Up"}}/>
        </Stack.Navigator>
        
    )
}

export default AuthNavigator

const styles = StyleSheet.create({})
