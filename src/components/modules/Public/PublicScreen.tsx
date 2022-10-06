import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import PublicTabNavigator from '../../../navigation/tabs/PublicTabNavigator';
import PublicHeaderCmp from './components/PublicHeaderCmp';
import PublicHomeScreen from './Screens/PublicHomeScreen';
import PublicServicesScreen from './Screens/PublicServicesScreen';
import PublicInstScreen from './Screens/PublicInstScreen';
import PushNotification from 'react-native-push-notification';

const PublicScreen = (props: any) => {
  const {navigation} = props;
  useEffect(() => {
    setTimeout(() => {
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId: 'remote-notification',
        message: 'My Notification Message', // (required)
        date: new Date(Date.now() + 5 * 1), // in 60 secs
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false

        /* Android Only Properties */
        repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
      });
    }, 2000);
  }, []);

  return (
    <View style={styles.containStyle}>
      <PublicHeaderCmp navigation={navigation} />
      <ScrollView style={styles.containStyle}>
        {/* <PublicTabNavigator /> */}
        <PublicHomeScreen navigation={navigation} />
        <PublicServicesScreen navigation={navigation} />
        <PublicInstScreen navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default PublicScreen;

const styles = StyleSheet.create({
  containStyle: {
    flex: 1,
  },
});
