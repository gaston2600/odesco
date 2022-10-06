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
import TeacherPostsScreen from '../../components/modules/Teachers/screens/TeacherPostsScreen';
import TeacherDescProfileScreen from '../../components/modules/Teachers/screens/TeacherDescProfileScreen';

const Tab = createMaterialTopTabNavigator();

function TeacherProfileTabScreen(props: any) {
  console.log({props});
  const {teacher} = props;
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
      initialRouteName="TeacherPostsScreen">
      <Tab.Screen
        options={{
          tabBarLabel: () => (
            <Text style={styles.labelTextStyle}>{I18n.t('posts')}</Text>
          ),
        }}
        name="TeacherPostsScreen"
        children={(props: any) => (
          <TeacherPostsScreen teacher={teacher} {...props} />
        )}
      />
      <Tab.Screen
        options={{
          tabBarLabel: () => (
            <Text style={styles.labelTextStyle}>{I18n.t('infoProfile')}</Text>
          ),
        }}
        name="TeacherDescProfileScreen"
        children={(props: any) => (
          <TeacherDescProfileScreen teacher={teacher} {...props} />
        )}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  labelTextStyle: {
    fontSize: fonts.size.font10,
    fontFamily: fonts.type.NunitoRegular,
  },
});
export default TeacherProfileTabScreen;
