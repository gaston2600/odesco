/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AvatarCmp from '../../../common/AvatarCmp';
import {extractImage} from '../../../../helpers/extractImage';
import fonts from '../../../../theme/fonts';
import colors from '../../../../styles/colors';
import moment from 'moment';
import {Divider} from '@rneui/themed';
import Icons from '../../../../styles/icons';
import ChatScreenModal from '../../../modals/Chat/ChatScreenModal';
import {useDispatch, useSelector} from 'react-redux';
import {markReadMessage} from '../../../../store/actions/chatActions';

const ChatRoomCmp = (props: any) => {
  const {data, refresh = () => null} = props;
  const [showChatModal, setShowChatModal] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setShowChatModal(true);
      }}>
      <View
        style={[
          styles.containerStyle,
          {
            backgroundColor: data?.isRead
              ? colors.white
              : `${colors.primary}10`,
          },
        ]}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <AvatarCmp
            name={data?.chatMember?.first_name?.slice(0, 2)}
            uri={extractImage(data?.chatMember?.avatar?.path)}
            size={50}
          />
        </View>

        <View
          style={{
            flex: 5,
            justifyContent: 'center',
            marginLeft: 15,
          }}>
          <Text
            style={
              styles.titleTextStyle
            }>{`${data?.chatMember?.first_name} ${data?.chatMember?.last_name}`}</Text>
          <Text
            numberOfLines={1}
            style={
              styles.lastMessageTextStyle
            }>{`${data?.lastMessage?.message}`}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.timeTextStyle}>
            {moment(data?.lastMessage?.createdAt).isSame(new Date(), 'day')
              ? moment(data?.lastMessage?.createdAt).format('HH:mm')
              : moment(data?.lastMessage?.createdAt).format('DD MMM')}
          </Text>
          {!!data?.isRead && (
            <Icons.Ionicons
              name="checkmark-done"
              size={15}
              color={colors.sereneBlue}
            />
          )}
        </View>
      </View>
      <Divider orientation="horizontal" />
      {showChatModal && (
        <ChatScreenModal
          data={data}
          visible={showChatModal}
          setVisible={setShowChatModal}
          refresh={refresh}
        />
      )}
    </TouchableOpacity>
  );
};

export default ChatRoomCmp;

const styles = StyleSheet.create({
  containerStyle: {
    // borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: 12,
    color: colors.darkBlue,
  },
  lastMessageTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: 12,
    color: colors.grey,
  },
  timeTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: 10,
    color: colors.darkBlue,
  },
});
