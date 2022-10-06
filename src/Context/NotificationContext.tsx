import React, {createContext, useEffect, useState} from 'react';
import PushNotification, {Importance} from 'react-native-push-notification';
import {Alert, Linking, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  sendLocalNotif,
  sendLocalNotifPlanning,
  sendLocalNotifTaskWithNoTeam,
} from '../services/Notification/NotificationServices';
import {useDispatch} from 'react-redux';

const NotificationContext = createContext(null);

export {NotificationContext};

export default function ({children}: any) {
  const dispatch = useDispatch();

  let notif = null;
  let notifToken = '';

  // async function setDeviceToken() {
  //   const token = await messaging().getToken();
  //   dispatch(updateDeviceToken(token));
  // }
  // setDeviceToken();

  // dispatch(updateDeviceToken());

  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  const sendLocalNotif = (data: any) => {
    console.log({data});
    try {
      const local = JSON.parse(data?.data?.createdBy);
      console.log({local});

      PushNotification.localNotification({
        channelId: 'remote-notification',
        title: data?.notification?.title,
        // title: data?.notification?.ititle,
        message: data?.notification?.body, // (required)
        // color: colors.primary,
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
        // largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
        smallIcon: 'ic_notification',
        // bigPictureUrl: `${urls.baseURL}/${data?.notification?.android?.imageUrl}`, // (optional) default: undefined
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        /* Android Only Properties */
        repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      handelSendNotif(remoteMessage);
      sendLocalNotif(remoteMessage);

      // Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  function handelSendNotif(params: any) {
    // console.log(params);
    switch (params?.data?.action) {
      case 'UPDATE_PLANNING':
        // sendLocalNotifPlanning({
        //   title: params?.notification?.title,
        //   message: params?.data?.message,
        // });
        break;
      case 'TASK_WITH_NO_TEAM':
        console.log(
          '-------------------------------------',
          'Task with no team',
        );

        // sendLocalNotifTaskWithNoTeam(params);
        break;
      case 'TEST':
        // sendLocalNotif({
        //   title: params?.notification?.title,
        //   message: params?.data?.message,
        // });
        break;

      default:
        sendLocalNotif(params);
        break;
    }
  }

  const initiate = (hideNotif = false) => {
    PushNotification.configure({
      onRegister: function ({token, os}) {
        notifToken = token;
        console.log({token, os});
      },
      onNotification: async function (notification: any) {
        // dispatch(getNotifs({}, {}, {}));
        console.log('NOTIFICATION:', notification);
        try {
          const data = JSON.parse(notification?.data);
        } catch (error) {}
        // if (notification?.foreground) {
        //   sendLocalNotif({ notification });
        // } else {
        //   console.log("forground Notification");
        // }

        if (notification?.category == 'POINTING') {
          Linking.openURL(
            notification?.data?.type === 'start'
              ? 'applibtp://app/Pointings'
              : 'applibtp://app/Report',
          )
            .then(res => console.log(res))
            .catch(e => console.log(e));
        } else if (notification?.userInteraction) {
          Linking.openURL('applibtp://app/Notifications')
            .then(res => {
              console.log(res);
            })
            .catch(e => {
              console.log(e);
            });
        }
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      // popInitialNotification: true,
      popInitialNotification: false,
      requestPermissions: Platform.OS === 'ios',
    });

    PushNotification.createChannel(
      {
        channelId: 'working-time',
        channelName: 'Working time channel',
        channelDescription: 'A channel to receive working times notifications',
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      created => {},
    );
    PushNotification.createChannel(
      {
        channelId: 'remote-notification',
        channelName: 'Remote Notification',
        channelDescription: 'A channel to handel remote notifications',
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      created => {},
    );
    // PushNotification.getChannels(function (channel_ids) {
    //   console.log(channel_ids);
    // });
  };
  initiate();
  notif = {
    initiate,
    notifToken,
  };

  return (
    <NotificationContext.Provider value={notif}>
      {children}
    </NotificationContext.Provider>
  );
}
