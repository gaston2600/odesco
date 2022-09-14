import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InvitEventsScreen from '../../components/modules/Events/Screens/InvitEventsScreen';
import MyEventScreen from '../../components/modules/Events/Screens/MyEventScreen';
import I18n from "react-native-i18n"
import metrics from '../../theme/metrics';
import fonts from '../../theme/fonts';
import colors from '../../styles/colors';
import { StyleSheet, Text } from 'react-native';
import ProfilePostsScreen from '../../components/modules/MySpaces/screens/ProfilePostsScreen';
import PartnerDescProfileScreen from '../../components/modules/MySpaces/screens/PartnerDescProfileScreen';

const Tab = createMaterialTopTabNavigator();

function ProfileTabNavigator(props: any) {
    console.log({ props })
    const { partner, type } = props
    return (
        <Tab.Navigator
            showPageIndicator
            screenOptions={{
                tabBarLabelStyle: { fontSize: fonts.size.font10, fontFamily: fonts.type.NunitoRegular },
                // tabBarItemStyle: { width: 100 },
                tabBarStyle: { backgroundColor: colors.white, },
            }}
            initialLayout={{ width: metrics.screenWidth }}
            initialRouteName='ProfilePostsScreen'
        >
            <Tab.Screen
                options={{
                    tabBarLabel: () => <Text style={styles.labelTextStyle}>{I18n.t("posts")}</Text>,
                }}
                name="ProfilePostsScreen"
                children={(props: any) => <ProfilePostsScreen partner={partner} type={type} {...props} />}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: () => <Text style={styles.labelTextStyle}>{I18n.t("infoProfile")}</Text>,
                }}
                name="TeacherDescProfileScreen"
                children={(props: any) => <PartnerDescProfileScreen partner={partner} type={type} {...props} />}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    labelTextStyle: {
        fontSize: fonts.size.font10,
        fontFamily: fonts.type.NunitoRegular
    }
})
export default ProfileTabNavigator