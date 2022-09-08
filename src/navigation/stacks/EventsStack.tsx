import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from '../../components/modules/Menu/MenuScreen';
import EventsScreen from '../../components/modules/Events/EventsScreen';
import I18n from "react-native-i18n"
import fonts from '../../theme/fonts';
const EventsStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="EventsSceen ">
            <Stack.Screen name="EventsSceen" component={EventsScreen}
                options={{
                    headerTitle: I18n.t("events"),
                    headerTitleStyle: {
                        fontFamily: fonts.type.NunitoSemiBold,
                        fontSize: fonts.size.font16
                    }
                }}
            />
        </Stack.Navigator>
    )
}

export default EventsStack

const styles = StyleSheet.create({})