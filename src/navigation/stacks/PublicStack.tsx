import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../components/modules/Auth/LoginScreen';
import PublicScreen from '../../components/modules/Public/PublicScreen';
import AuthStack from './AuthStack';

const PublicStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="PublicScreen">
      <Stack.Screen
        name="PublicScreen"
        component={PublicScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default PublicStack;

const styles = StyleSheet.create({});
