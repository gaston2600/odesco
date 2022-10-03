import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../components/modules/Home/HomeScreen';
import CommentsScreen from '../../components/modules/Comments/CommentsScreen';
import MySpacesStack from '../stacks/MySpacesStack';
import HomeDrawerContent from './HomeDrawerContent';
import DefaultPartnerProfileScreen from '../../components/modules/Home/DefaultPartnerProfileScreen';
import ChangePasswordScreen from '../../components/modules/Home/ChangePasswordScreen';
import I18n from 'react-native-i18n';
import fonts from '../../theme/fonts';
import {Pressable, StyleSheet} from 'react-native';
import Icons from '../../styles/icons';
import colors from '../../styles/colors';

const Drawer = createDrawerNavigator();

export default function HomeDrawer(props: any) {
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
          headerTitle: I18n.t('comments'),
          headerTitleStyle: {
            fontFamily: fonts.type.NunitoSemiBold,
            fontSize: fonts.size.font16,
          },
          headerLeft: () => (
            <Pressable
              onPress={() => props?.navigation?.goBack()}
              style={styles.closeContainerStyle}>
              <Icons.AntDesign name="left" size={20} color={colors.black} />
            </Pressable>
          ),
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

const styles = StyleSheet.create({
  titleTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font14,
  },
  closeContainerStyle: {
    // position: 'absolute',
    // left: 15,
    // right: 15,
    padding: 10,
  },
});
