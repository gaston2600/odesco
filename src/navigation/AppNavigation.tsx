import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AuthStack from './stacks/AuthStack';
import {useSelector} from 'react-redux';
import configAxios from '../services';
import TabNavigator from './tabs/TabNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeStack from './stacks/HomeStack';
import CommentsScreen from '../components/modules/Comments/CommentsScreen';
import I18n from 'react-native-i18n';
import fonts from '../theme/fonts';
import NewPostScreen from '../components/modules/Home/components/NewPostScreen';
import AddInstScreen from '../components/modules/Institution/AddInstScreen';
import PublicStack from './stacks/PublicStack';
import HomeDrawerContent from './drawers/HomeDrawerContent';
import HomeScreen from '../components/modules/Home/HomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icons from '../styles/icons';
import MySpacesStack from './stacks/MySpacesStack';
import DefaultPartnerProfileScreen from '../components/modules/Home/DefaultPartnerProfileScreen';
import ChangePasswordScreen from '../components/modules/Home/ChangePasswordScreen';
import colors from '../styles/colors';
import HomeMenuScreen from '../components/modules/MySpaces/HomeMenuScreen';

const AppNavigation = (props: any) => {
  const {auth, token} = useSelector((state: any) => state.User);
  //   const state = useSelector((state: any) => state);
  // console.log('====================================');
  // console.log({ state });
  // console.log('====================================');
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    configAxios(token);
  }, [token]);
  const Drawer = createDrawerNavigator();
  return (
    <View
      style={{
        flex: 1,
      }}>
      {auth ? (
        <Drawer.Navigator
          initialRouteName="Tabs"
          drawerContent={(props: any) => <HomeDrawerContent {...props} />}>
          <Drawer.Screen
            name="Tabs"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
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
              // headerLeft: () => (
              //   <Pressable
              //     onPress={() => props?.navigation?.goBack()}
              //     style={styles.closeContainerStyle}>
              //     <Icons.AntDesign name="left" size={20} color={colors.black} />
              //   </Pressable>
              // ),
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
          <Drawer.Screen
            name="HomeMenuScreen"
            component={HomeMenuScreen}
            options={{
              headerShown: false,
            }}
          />
        </Drawer.Navigator>
      ) : (
        // <Stack.Navigator
        //   initialRouteName="Tabs"
        //   defaultScreenOptions={{
        //     headerShown: false,
        //   }}>
        //   <Stack.Screen
        //     name="Tabs"
        //     component={TabNavigator}
        //     options={{
        //       headerShown: false,
        //     }}
        //   />
        //   {/* <Stack.Screen
        //     name="CommentsScreen"
        //     component={CommentsScreen}
        //     options={{
        //       headerTitle: I18n.t('comments'),
        //       headerTitleStyle: {
        //         fontFamily: fonts.type.NunitoSemiBold,
        //         fontSize: fonts.size.font16,
        //       },
        //     }}
        //   /> */}
        //   <Stack.Screen
        //     name="NewPostScreen"
        //     component={NewPostScreen}
        //     options={{
        //       headerShown: false,
        //       headerTitle: I18n.t('new_post'),
        //       headerTitleStyle: {
        //         fontFamily: fonts.type.NunitoSemiBold,
        //         fontSize: fonts.size.font16,
        //       },
        //     }}
        //   />
        //   <Stack.Screen
        //     name="AddNewInstScreen"
        //     component={AddInstScreen}
        //     options={{
        //       // headerShown: false,
        //       headerTitle: I18n.t('add_new_inst'),
        //       headerTitleStyle: {
        //         fontFamily: fonts.type.NunitoSemiBold,
        //         fontSize: fonts.size.font16,
        //       },
        //     }}
        //   />
        // </Stack.Navigator>
        <PublicStack />
      )}
    </View>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
