import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import I18n from "react-native-i18n"
import metrics from '../../theme/metrics';
import fonts from '../../theme/fonts';
import colors from '../../styles/colors';
import { StyleSheet, Text } from 'react-native';
import ProfilePostsScreen from '../../components/modules/MySpaces/screens/ProfilePostsScreen';
import AllNetworkScreen from '../../components/modules/Network/screens/AllNetworkScreen';
import InvitNetwokScreen from '../../components/modules/Network/screens/InvitNetwokScreen';
import PendingInvitaionNetworkScreen from '../../components/modules/Network/screens/PendingInvitaionNetworkScreen';

const Tab = createMaterialTopTabNavigator();

function NetworkTabNavigator(props: any) {
    const { refresh } = props
    return (
        <Tab.Navigator
            showPageIndicator
            screenOptions={{
                tabBarLabelStyle: { fontSize: fonts.size.font10, fontFamily: fonts.type.NunitoRegular },
                // tabBarItemStyle: { width: 100 },
                tabBarStyle: { backgroundColor: colors.white, },
            }}
            initialLayout={{ width: metrics.screenWidth }}
            initialRouteName='AllNetworkScreen'
        >
            <Tab.Screen
                options={{
                    tabBarLabel: () => <Text style={styles.labelTextStyle}>{I18n.t("contacts")}</Text>,
                }}
                name="AllNetworkScreen"
                children={(props) => <AllNetworkScreen refresh={refresh} {...props} />}
            // component={AllNetworkScreen}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: () => <Text style={styles.labelTextStyle}>{I18n.t("invitations")}</Text>,
                }}
                name="InvitNetwokScreen"
                children={(props) => <InvitNetwokScreen refresh={refresh} {...props} />}
                // component={InvitNetwokScreen}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: () => <Text style={styles.labelTextStyle}>{I18n.t("pending")}</Text>,
                }}
                name="PendingInvitaionNetworkScreen"
                children={(props) => <PendingInvitaionNetworkScreen refresh={refresh} {...props} />}
                // component={InvitNetwokScreen}
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
export default NetworkTabNavigator