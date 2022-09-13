import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../components/modules/Home/HomeScreen';
import NetworkScreen from '../../components/modules/Network/NetworkScreen';
import ChatScreen from '../../components/modules/Chat/ChatScreen';
import NotificationScreen from '../../components/modules/Notification/NotificationScreen';
import MenuScreen from '../../components/modules/Menu/MenuScreen';
import Icons from '../../styles/icons';
import colors from '../../styles/colors';
import HomeStack from '../stacks/HomeStack';
import MenuStack from '../stacks/MenuStack';

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();



    return (
        <Tab.Navigator
            initialRouteName='Menu'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let iconColor;
                    switch (route.name) {
                        case "HomeStack":
                            iconName = focused
                                ? 'home'
                                : 'home-outline';
                            iconColor = focused ? colors.primary : colors.grey;
                            break;
                        case "Network":
                            iconName = focused
                                ? 'call'
                                : 'call-outline';
                            iconColor = focused ? colors.primary : colors.grey;

                            break;
                        case "Menu":
                            iconName = focused
                                ? 'menu'
                                : 'menu';
                            iconColor = focused ? colors.primary : colors.grey;

                            break;
                        default:
                            iconName = focused
                                ? 'home'
                                : 'home-outline';
                            iconColor = focused ? colors.primary : colors.grey;

                            break;
                    }


                    // You can return any component that you like here!
                    return <Icons.Ionicons name={iconName} size={size} color={iconColor} />;
                },
            })}
        // tabBarOptions={{
        //     activeTintColor: colors.primary,
        //     inactiveTintColor: colors.gray,
        // }}

        >
            <Tab.Screen name="HomeScreen" component={HomeStack} options={{
                headerShown: false
            }} />
            <Tab.Screen name="Network" component={NetworkScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Notification" component={NotificationScreen} />
            <Tab.Screen options={{
                headerShown: false,
            }} name="Menu" component={MenuStack} />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({})