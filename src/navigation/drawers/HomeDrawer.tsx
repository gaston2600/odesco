import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../components/modules/Home/HomeScreen';
import CommentsScreen from '../../components/modules/Comments/CommentsScreen';
import MySpacesStack from '../stacks/MySpacesStack';
import HomeDrawerContent from './HomeDrawerContent';
import DefaultPartnerProfileScreen from '../../components/modules/Home/DefaultPartnerProfileScreen';
import ChangePasswordScreen from '../../components/modules/Home/components/ChangePasswordScreen';

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props: any) => <HomeDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="MySpaces"
        component={MySpacesStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="DefaultPartnerProfileScreen"
        component={DefaultPartnerProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
