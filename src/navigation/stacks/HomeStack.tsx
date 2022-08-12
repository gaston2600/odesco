import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../components/modules/Home/HomeScreen';
import CommentsScreen from '../../components/modules/Comments/CommentsScreen';
import I18n from "react-native-i18n"
import fonts from '../../theme/fonts';

const HomeStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
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
}

export default HomeStack

const styles = StyleSheet.create({})