/* eslint-disable no-fallthrough */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../components/modules/Home/HomeScreen';
import NetworkScreen from '../../components/modules/Network/NetworkScreen';
import ChatScreen from '../../components/modules/Chat/ChatScreen';
import NotificationScreen from '../../components/modules/Notification/NotificationScreen';
import MenuScreen from '../../components/modules/Menu/MenuScreen';
import Icons from '../../styles/icons';
import colors from '../../styles/colors';
import HomeStack from '../stacks/HomeStack';
import MenuStack from '../stacks/MenuStack';
import I18n from 'react-native-i18n';
import fonts from '../../theme/fonts';
import HomeDrawer from '../drawers/HomeDrawer';
import HeaderHomeCmp from '../../components/modules/Home/components/HeaderHomeCmp';
import MySpacesStack from '../stacks/MySpacesStack';
import {useSelector} from 'react-redux';

const TabNavigator = (props: any) => {
  const {navigation} = props;
  const Tab = createBottomTabNavigator();
  const chatRooms = useSelector((state: any) => state?.Chat);
  const [newMessage, setNewMessage] = useState(false);

  function hasNewMessage() {
    setNewMessage(
      Array.from(chatRooms?.chatRooms || [])?.some((v: any) => !v?.isRead),
    );
  }

  useEffect(() => {
    hasNewMessage();
  }, [chatRooms]);
  console.log({newMessage});

  return (
    <View style={{flex: 1}}>
      <HeaderHomeCmp navigation={navigation} />
      <Tab.Navigator
        initialRouteName="HomeStack"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let iconColor;
            switch (route.name) {
              case 'HomeStack':
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
              <View>
                <Icons.Feather name={iconName} size={size} color={iconColor} />
                {route?.name === 'Chat' && newMessage && (
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 50,
                      backgroundColor: colors.orange,
                      position: 'absolute',
                      top: -5,
                      right: -5,
                      zIndex: 5,
                    }}
                  />
                )}
              </View>
            );
          },
          tabBarShowLabel: false,
        })}
        // tabBarOptions={{
        //     activeTintColor: colors.primary,
        //     inactiveTintColor: colors.gray,
        // }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          // component={HomeStack}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Network"
          component={NetworkScreen}
          options={{
            headerShown: false,
            headerTitle: I18n.t('network'),
            headerTitleStyle: {
              fontSize: fonts.size.font16,
              fontFamily: fonts.type.NunitoSemiBold,
              color: colors.gray,
            },
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerShown: false,
            headerTitle: I18n.t('chat'),
            headerTitleStyle: {
              fontSize: fonts.size.font16,
              fontFamily: fonts.type.NunitoSemiBold,
              color: colors.gray,
            },
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name="Menu"
          component={MenuStack}
        />
        {/*
        <Tab.Screen
          name="MySpaces"
          component={MySpacesStack}
          options={{
            headerShown: false,
          }}
        /> */}
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
