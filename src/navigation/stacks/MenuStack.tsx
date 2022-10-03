import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MenuScreen from '../../components/modules/Menu/MenuScreen';
import EventsStack from './EventsStack';
import EventTabNavigator from '../tabs/EventTabNavigator';
import TeachersStack from './TeachersStack';

const MenuStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="MenuScreen">
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EventsScreen"
        component={EventsStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TeachersScreen"
        component={TeachersStack}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="EventsScreen" component={EventsStack}
                options={{
                    headerShown: false,
                }}
            /> */}
    </Stack.Navigator>
  );
};

export default MenuStack;

const styles = StyleSheet.create({});
