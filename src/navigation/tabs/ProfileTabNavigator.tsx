import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import InvitEventsScreen from '../../components/modules/Events/Screens/InvitEventsScreen';
import MyEventScreen from '../../components/modules/Events/Screens/MyEventScreen';
import I18n from 'react-native-i18n';
import metrics from '../../theme/metrics';
import fonts from '../../theme/fonts';
import colors from '../../styles/colors';
import {StyleSheet, Text} from 'react-native';
import ProfilePostsScreen from '../../components/modules/MySpaces/screens/ProfilePostsScreen';
import PartnerDescProfileScreen from '../../components/modules/MySpaces/screens/PartnerDescProfileScreen';
import InstDescProfileScreen from '../../components/modules/MySpaces/screens/InstDescProfileScreen';
import InstTeachersListScreen from '../../components/modules/MySpaces/screens/InstTeachersListScreen';

const Tab = createMaterialTopTabNavigator();

function ProfileTabNavigator(props: any) {
  const {partner, type, data, navigation} = props;
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
      initialRouteName="ProfilePostsScreen">
      <Tab.Screen
        options={{
          tabBarLabel: () => (
            <Text style={styles.labelTextStyle}>{I18n.t('posts')}</Text>
          ),
        }}
        name="ProfilePostsScreen"
        children={(props: any) => (
          <ProfilePostsScreen partner={partner} type={type} {...props} />
        )}
      />
      {!!(type === 'Partner') && (
        <Tab.Screen
          options={{
            tabBarLabel: () => (
              <Text style={styles.labelTextStyle}>{I18n.t('infoProfile')}</Text>
            ),
          }}
          name="TeacherDescProfileScreen"
          children={(props: any) => (
            <PartnerDescProfileScreen
              data={data}
              partner={partner}
              type={type}
              {...props}
            />
          )}
        />
      )}

      {!!(type === 'Institution') && (
        <Tab.Screen
          options={{
            tabBarLabel: () => (
              <Text style={styles.labelTextStyle}>{I18n.t('details')}</Text>
            ),
          }}
          name="InstDescProfileScreen"
          children={(props: any) => (
            <InstDescProfileScreen
              data={data}
              partner={partner}
              type={type}
              {...props}
            />
          )}
        />
      )}
      {!!(type === 'Institution') && (
        <Tab.Screen
          options={{
            tabBarLabel: () => (
              <Text style={styles.labelTextStyle}>{I18n.t('teachers')}</Text>
            ),
          }}
          name="InstTeachersListScreen"
          children={(props: any) => (
            <InstTeachersListScreen
              data={data}
              partner={partner}
              type={type}
              {...props}
              navigation={navigation}
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
export default ProfileTabNavigator;
