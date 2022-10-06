import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import InvitEventsScreen from '../../components/modules/Events/Screens/InvitEventsScreen';
import MyEventScreen from '../../components/modules/Events/Screens/MyEventScreen';
import I18n from 'react-native-i18n';
import metrics from '../../theme/metrics';
import fonts from '../../theme/fonts';
import colors from '../../styles/colors';
import {StyleSheet, Text} from 'react-native';
import AllEventsScreen from '../../components/modules/Events/Screens/AllEventsScreen';

const Tab = createMaterialTopTabNavigator();

function EventTabNavigator(props: any) {
  // console.log({props});
  const {searchInput, space} = props;
  return (
    <Tab.Navigator
      showPageIndicator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: fonts.size.font10,
          fontFamily: fonts.type.NunitoRegular,
        },
        // tabBarItemStyle: { width: 100 },
        tabBarStyle: {backgroundColor: colors.white},
      }}
      initialLayout={{width: metrics.screenWidth}}
      initialRouteName="AllEventScreen">
      <Tab.Screen
        options={{
          tabBarLabel: () => (
            <Text style={styles.labelTextStyle}>{I18n.t('events')}</Text>
          ),
        }}
        name="AllEventScreen"
        // component={AllEventsScreen}
        children={(props: any) => (
          <AllEventsScreen searchInput={searchInput} {...props} space={space} />
        )}
      />
      {/* <Tab.Screen
                options={{
                    tabBarLabel: () => <Text style={styles.labelTextStyle}>{I18n.t("myEvents")}</Text>,
                }}
                name="MyEventScreen"
                // component={MyEventScreen}
                children={(props: any) => <MyEventScreen searchInput={searchInput} {...props} space={space} />}
            /> */}
      {!space && (
        <Tab.Screen
          options={{
            tabBarLabel: () => (
              <Text style={styles.labelTextStyle}>{I18n.t('invitations')}</Text>
            ),
          }}
          name="InvitEventsScreen"
          //  component={InvitEventsScreen}
          children={(props: any) => (
            <InvitEventsScreen
              searchInput={searchInput}
              {...props}
              space={space}
            />
          )}
        />
      )}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  labelTextStyle: {
    fontSize: fonts.size.font10,
    fontFamily: fonts.type.NunitoRegular,
  },
});
export default EventTabNavigator;
