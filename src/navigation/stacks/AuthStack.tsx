import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../components/modules/Auth/LoginScreen';

const AuthStack = () => {

    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})