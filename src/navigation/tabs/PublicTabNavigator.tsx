/* eslint-disable no-fallthrough */
import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from '../../styles/icons';
import colors from '../../styles/colors';
import PublicHomeScreen from '../../components/modules/Public/Screens/PublicHomeScreen';
import PublicInstScreen from '../../components/modules/Public/Screens/PublicInstScreen';
import PublicServicesScreen from '../../components/modules/Public/Screens/PublicServicesScreen';
import PublicJobsScreen from '../../components/modules/Public/Screens/PublicJobsScreen';

const PublicTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="PublicHomeScreen"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconColor;
          switch (route.name) {
            case 'PublicHomeScreen':
              iconName = focused ? 'home' : 'home';
              iconColor = focused ? colors.primary : colors.grey;
              break;
            case 'Network':
              iconName = focused ? 'users' : 'users';
              iconColor = focused ? colors.primary : colors.grey;
              break;
            case 'Menu':
              iconName = focused ? 'align-justify' : 'align-justify';
              iconColor = focused ? colors.primary : colors.grey;
              break;
            case 'Chat':
              iconName = focused ? 'message-circle' : 'message-circle';
              iconColor = focused ? colors.primary : colors.grey;

              break;
            case 'Notification':
              iconName = focused ? 'bell' : 'bell';
              iconColor = focused ? colors.primary : colors.grey;

              break;
            default:
              iconName = focused ? 'home' : 'home';
              iconColor = focused ? colors.primary : colors.grey;

              break;
          }

          // You can return any component that you like here!
          return (
            <Icons.Feather name={iconName} size={size} color={iconColor} />
          );
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="PublicHomeScreen"
        component={PublicHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PublicServicesScreen"
        component={PublicServicesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PublicInstScreen"
        component={PublicInstScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PublicJobsScreen"
        component={PublicJobsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default PublicTabNavigator;

const styles = StyleSheet.create({});
