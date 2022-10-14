import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MenuScreen from '../../components/modules/Menu/MenuScreen';
import EventsStack from './EventsStack';
import EventTabNavigator from '../tabs/EventTabNavigator';
import TeachersStack from './TeachersStack';
import TrainingScreen from '../../components/modules/Training/TrainingScreen';
import I18n from 'react-native-i18n';
import AllInstScreen from '../../components/modules/Institution/AllInstScreen';
import CoursStack from './CoursStack';

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

      <Stack.Screen
        name="TrainingScreen"
        component={TrainingScreen}
        options={{
          title: I18n.t('trainings'),
          //   headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllInstScreen"
        component={AllInstScreen}
        options={{
          title: I18n.t('institutions'),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CoursStack"
        component={CoursStack}
        options={{
          title: I18n.t('Cours'),
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
