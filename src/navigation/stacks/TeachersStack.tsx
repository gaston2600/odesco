import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import I18n from "react-native-i18n"
import fonts from '../../theme/fonts';
import TeachersScreen from '../../components/modules/Teachers/TeachersScreen';
import TeacherDetailsScreen from '../../components/modules/Teachers/TeacherDetailsScreen';
const TeachersStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="TeacherScreen ">
            <Stack.Screen name="TeacherScreen" component={TeachersScreen}
                options={{
                    headerTitle: I18n.t("teachers"),
                    headerTitleStyle: {
                        fontFamily: fonts.type.NunitoSemiBold,
                        fontSize: fonts.size.font16
                    }
                }}
            />
            <Stack.Screen name="TeacherDetailsScreen" component={TeacherDetailsScreen}
                options={{
                    headerTitle: I18n.t("teachers"),
                    headerTitleStyle: {
                        fontFamily: fonts.type.NunitoSemiBold,
                        fontSize: fonts.size.font16
                    }
                }}
            />
        </Stack.Navigator>
    )
}

export default TeachersStack

const styles = StyleSheet.create({})