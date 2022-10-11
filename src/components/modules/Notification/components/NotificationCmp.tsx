import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import fonts from '../../../../theme/fonts';
import colors from '../../../../styles/colors';
import Icons from '../../../../styles/icons';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {getOneNotifcation} from '../../../../store/actions/notificationActions';

const NotificationCmp = (props: any) => {
  const dispatch = useDispatch();
  const {data, navigation} = props;
  console.log({data});

  function renderIconModel(params: any) {
    let iconName = '';
    switch (params) {
      case 'Network':
        iconName = 'users';
        break;
      case 'Event':
        iconName = 'calendar';
        break;
      case 'ChatMessage':
        iconName = 'message-circle';
        break;
      default:
        iconName = 'bell';
        break;
    }
    return (
      <View style={styles.iconContainerStyle}>
        <Icons.Feather name={iconName} size={25} color={colors.primary} />
      </View>
    );
  }
  function goTo(params: any) {
    let to = '';
    switch (params) {
      case 'Network':
        to = 'Network';
        break;
      case 'Event':
        to = 'Event';
        break;
      case 'ChatMessage':
        to = 'Chat';
        break;
      default:
        to = '';
        break;
    }
    navigation?.navigate(to);
  }

  function markRead() {
    dispatch(getOneNotifcation({id: data?._id}));
  }

  useEffect(() => {
    if (!data?.data?.isReaded) {
      markRead();
    }
  }, []);

  return (
    <Pressable
      onPress={() => {
        goTo(data?.data?.model);
      }}
      style={[
        styles.containerStyle,
        data?.data?.isReaded && {backgroundColor: `${colors.primary}10`},
      ]}>
      {renderIconModel(data?.data?.model)}
      <View style={styles.contentContainerStyle}>
        {data?.data?.model === 'ChatMessage' ? (
          <View>
            <Text numberOfLines={2} style={styles.titleMessageTextStyle}>
              {`${data?.data?.payload?.postedByPartner?.first_name} ${data?.data?.payload?.postedByPartner?.last_name}`}
            </Text>
            <Text
              numberOfLines={2}
              style={
                styles.messageTextStyle
              }>{`${data?.data?.payload?.message}`}</Text>
          </View>
        ) : (
          <Text numberOfLines={2} style={styles.titleMessageTextStyle}>
            {data?.data?.message}
          </Text>
        )}

        <Text style={styles.dateTextStyle}>{moment().format('llll')}</Text>
      </View>
    </Pressable>
  );
};

export default NotificationCmp;

const styles = StyleSheet.create({
  containerStyle: {
    // borderWidth: 1,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.darkBlue,
  },
  titleMessageTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.gray,
  },
  iconContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainerStyle: {
    flex: 6,
    padding: 10,
  },
  messageTextStyle: {
    fontFamily: fonts.type.NunitoRegular,
    fontSize: fonts.size.font10,
    color: colors.grey,
  },
  dateTextStyle: {
    fontFamily: fonts.type.NunitoRegular,
    fontSize: fonts.size.font10,
    color: colors.grey,
    // alignSelf: 'flex-end',
    marginTop: 10,
  },
});
