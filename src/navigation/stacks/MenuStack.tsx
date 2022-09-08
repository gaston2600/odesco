import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from '../../components/modules/Menu/MenuScreen';

const MenuStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="MenuScreen">
            <Stack.Screen name="MenuScreen" component={MenuScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default MenuStack

const styles = StyleSheet.create({})