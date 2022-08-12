import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AuthStack from './stacks/AuthStack'
import { useSelector } from 'react-redux'
import configAxios from '../services'
import TabNavigator from './tabs/TabNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeStack from './stacks/HomeStack'
import CommentsScreen from '../components/modules/Comments/CommentsScreen'
import I18n from "react-native-i18n"
import fonts from '../theme/fonts';

const AppNavigation = () => {
    const { auth, token } = useSelector((state: any) => state.User)
    const state = useSelector((state: any) => state)
    console.log('====================================');
    console.log({ state });
    console.log('====================================');
    const Stack = createNativeStackNavigator();
    useEffect(() => {
        configAxios(token);
    }, [token]);

    return (
        <View style={{
            flex: 1
        }}>{
                auth ? (
                    <Stack.Navigator initialRouteName='Tabs'
                        defaultScreenOptions={{
                            headerShown: false
                        }}
                    >
                        <Stack.Screen name="Tabs" component={TabNavigator} options={{
                            headerShown: false
                        }} />
                        <Stack.Screen name="CommentsScreen" component={CommentsScreen}
                            options={{
                                headerTitle: I18n.t("comments"),
                                headerTitleStyle: {
                                    fontFamily: fonts.type.NunitoSemiBold,
                                    fontSize: fonts.size.font16
                                }
                            }}
                        />
                    </Stack.Navigator>
                )
                    : <AuthStack />
            }
        </View>
    )
}

export default AppNavigation

const styles = StyleSheet.create({})