import PushNotification from 'react-native-push-notification';
import {urls} from '../../utils/urls';
import colors from '../../styles/colors';
import moment from 'moment';

export const sendLocalNotif = (data: any) => {
  console.log({data});
  try {
    PushNotification.localNotification({
      channelId: 'remote-notification',
      title: data?.notification?.title,
      message: data?.notification?.body, // (required)
      color: colors.primary,
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
      // largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      smallIcon: 'ic_notification',
      // bigPictureUrl: `${data?.notification?.android?.imageUrl}`, // (optional) default: undefined
      // bigPictureUrl: `${urls.baseURL}/${data?.notification?.android?.imageUrl}`, // (optional) default: undefined
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
      playSound: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendLocalNotifPlanning = (data: any) => {
  console.log({data});
  try {
    PushNotification.localNotification({
      channelId: 'remote-notification',
      title: data?.title,
      ticker: 'Applibtp',
      // title: data?.notification?.ititle,
      message: data?.message, // (required)
      bigText: data?.message,
      color: colors.primary,
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
      // largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      smallIcon: 'ic_notification',
      bigPictureUrl: `${data?.notification?.android?.imageUrl}`, // (optional) default: undefined
      // date: new Date(Date.now()),
      priority: 'high',
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendLocalNotifTaskWithNoTeam = (data: any) => {
  // console.log({ data });
  try {
    PushNotification.localNotification({
      channelId: 'remote-notification',
      title: data?.data?.title,
      ticker: 'Applibtp',
      // title: "My Notification Title",
      message: data?.data?.message, // (required)
      bigText: `Chantier : ${data?.data?.projectName}
      Date : ${moment(data?.data?.startDate).format('DD MMM YYYY')}
      Intervention : ${data?.data?.taskName}
      `,
      color: colors.primary,
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
      // largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      smallIcon: 'ic_notification',
      bigPictureUrl: `${data?.notification?.android?.imageUrl}`, // (optional) default: undefined
      // date: new Date(Date.now()),
      priority: 'high',
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
  } catch (error) {
    console.log(error);
  }
};
