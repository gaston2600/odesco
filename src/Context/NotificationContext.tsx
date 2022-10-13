import React, {createContext, useEffect, useState} from 'react';
import PushNotification, {Importance} from 'react-native-push-notification';
import {Alert, Linking, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  sendLocalNotif,
  sendLocalNotifPlanning,
  sendLocalNotifTaskWithNoTeam,
} from '../services/Notification/NotificationServices';
import {useDispatch, useSelector} from 'react-redux';
import {getRoomsList} from '../store/actions/chatActions';
import {getMyNotifications} from '../store/actions/notificationActions';

const NotificationContext = createContext(null);

export {NotificationContext};

export default function ({children}: any) {
  const dispatch = useDispatch();
  const {defaultPartner} = useSelector((state: any) => state?.Inst);

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

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      handelSendNotif(remoteMessage);

      // Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  async function getToken() {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log({token});

    // save the token to the db
  }

  function handelSendNotif(params: any) {
    console.log(params);
    if (params?.data?.model === 'ChatMessage') {
      dispatch(
        getRoomsList(
          {
            partner: defaultPartner,
            limit: 1000,
          },
          () => {},
          (err: any) => {
            console.log({err});
          },
        ),
      );
    }
    dispatch(getMyNotifications({}));

    sendLocalNotif(params);
  }

  // useEffect(() => {
  //   getToken();
  // }, []);
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
          console.log({data});
        } catch (error) {}
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
