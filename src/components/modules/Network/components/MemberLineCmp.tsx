import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AvatarCmp from '../../../common/AvatarCmp';
import {extractImage} from '../../../../helpers/extractImage';
import fonts from '../../../../theme/fonts';
import colors from '../../../../styles/colors';
import {Divider} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import {initiateChatRoom} from '../../../../store/actions/chatActions';
import I18n from 'react-native-i18n';
import moment from 'moment';

const MemberLineCmp = (props: any) => {
  const {item, type, setContact, setShowChatModal, setshowAddConversation} =
    props;

  const dispatch = useDispatch();
  const {defaultPartner} = useSelector((state: any) => state?.Inst);
  const [data, setData] = useState({
    name: '',
    avatar: {path: ''},
    message: '',
    createdAt: null,
    user_id: '',
  });

  useEffect(() => {
    if (type === 'old') {
      setData({
        name: `${item?.chatMember?.first_name} ${item?.chatMember?.last_name}`,
        message: item?.lastMessage?.message,
        avatar: item?.chatMember?.avatar,
        createdAt: item?.lastMessage?.createdAt,
        user_id: item?.chatMember?._id,
      });
    } else {
      setData({
        name: `${item?.user?.first_name} ${item?.user?.last_name}`,
        message: I18n.t('type_message_placeholder'),
        avatar: item?.user?.avatar,
        user_id: item?.user?._id,
        createdAt: null,
      });
    }
    return () => {
      setData(null);
    };
  }, [item, type]);

  console.log({props, data});

  async function initiateChat(params: any) {
    console.log({params});
    setshowAddConversation(false);

    setShowChatModal(true);
    dispatch(
      initiateChatRoom(
        {
          chatInitiator: defaultPartner,
          receiver: params?.user_id,
        },
        async (res: any) => {
          await setContact({
            chatMember: {
              first_name: data?.name,
              last_name: '',
            },
            _id: res?.chatRoomId,
          });
          setShowChatModal(true);
        },
        (err: any) => {
          console.log({err});
        },
      ),
    );
  }
  return (
    <Pressable onPress={() => initiateChat(data)} style={styles.containerStyle}>
      <AvatarCmp
        name={String(data?.name)?.slice(0, 2)}
        uri={extractImage(data?.avatar?.path ? data?.avatar?.path : null)}
        size={50}
        inversed={true}
      />
      <View style={styles.bodyContainerStyle}>
        <Text style={styles.titleTextStyle}>{`${data?.name}`}</Text>
        <Text style={styles.lastMessageTextStyle}>{data?.message}</Text>
      </View>
      {!!data?.createdAt && (
        <Text style={styles.titleTextStyle}>{`${moment(data?.createdAt).format(
          'HH:mm DD MM',
        )}`}</Text>
      )}
    </Pressable>
  );
};

export default MemberLineCmp;

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font12,
    color: colors.darkBlue,
  },
  lastMessageTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font12,
    color: colors.gray,
  },
  bodyContainerStyle: {
    width: '100%',
    padding: 5,
  },
});
