/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Icons from '../../../styles/icons';
import colors from '../../../styles/colors';
import I18n from 'react-native-i18n';
import fonts from '../../../theme/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {
  getOneRoomChat,
  markReadMessage,
  sendMessageChat,
} from '../../../store/actions/chatActions';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import {extractImage} from '../../../helpers/extractImage';
import {Divider} from '@rneui/themed';

const ChatScreenModal = (props: any) => {
  const {visible, setVisible, data, refresh} = props;
  const dispatch = useDispatch();
  const {defaultPartner} = useSelector((state: any) => state?.Inst);
  const [conversation, setConversation] = useState([]);

  const [messages, setMessages]: any = useState([]);
  const [updateMsg, setUpdateMsg] = useState(false);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  function close() {
    setVisible(false);
    refresh();
  }

  function getPage() {
    dispatch(
      getOneRoomChat(
        {
          room: data?._id,
          limit: 1000,
        },
        (res: any) => {
          setConversation(res?.conversation);
          setMessages(
            res?.conversation?.reverse()?.map((temp: any) => ({
              _id: temp?._id,
              text: temp?.message,
              createdAt: temp?.createdAt,
              user: {
                _id: temp?.postedByPartner?._id,
                name: `${temp?.postedByPartner?.first_name} ${temp?.postedByPartner?.last_name} `,
                //   avatar: extractImage(temp?.postedByPartner?.avatar?.path),
              },
            })),
          );
        },
        (err: any) => {
          console.log({err});
        },
      ),
    );
  }

  function sendMessage(message: any) {
    dispatch(
      sendMessageChat(
        {
          room: data?._id,
          data: {message, partner: defaultPartner},
        },
        (res: any) => {
          getPage();
        },
        (err: any) => {
          console.log(err);
        },
      ),
    );
  }

  function markRead() {
    dispatch(
      markReadMessage({
        room: data?._id,
        data: {
          partner: defaultPartner,
        },
      }),
    );
  }

  useEffect(() => {
    getPage();
    return () => {
      setConversation([]);
    };
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      getPage();
      markRead();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Modal visible={visible}>
      <View style={styles.containerStyle}>
        <View style={styles.headerContainerStyle}>
          <Text
            style={
              styles.titleTextStyle
            }>{`${data?.chatMember?.first_name} ${data?.chatMember?.last_name}`}</Text>
          <Pressable onPress={close} style={styles.closeContainerStyle}>
            <Icons.AntDesign name="left" size={20} color={colors.black} />
          </Pressable>
        </View>
        <Divider orientation="horizontal" />
        <View style={styles.bodyContainerStyle}>
          <GiftedChat
            messages={messages}
            // isLoadingEarlier
            // renderAvatarOnTop
            scrollToBottom
            timeFormat="HH:mm"
            dateFormat="ddd ,DD MMM"
            placeholder={I18n.t('type_message_placeholder')}
            textInputStyle={{
              fontFamily: fonts.type.NunitoMedium,
              fontSize: fonts.size.font14,
            }}
            renderSend={(props: any) => (
              <Send {...props}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.type.NunitoSemiBold,
                      fontSize: fonts.size.font12,
                      color: colors.sereneBlue,
                      alignSelf: 'center',
                    }}>
                    {I18n.t('send')}
                  </Text>
                </View>
              </Send>
            )}
            renderLoading={() => {
              return (
                <View>
                  <ActivityIndicator color={colors.primary} size="large" />
                </View>
              );
            }}
            onSend={messages => {
              sendMessage(messages?.[0]?.text);
              onSend(messages);
            }}
            user={{
              //   _id: '630f6fddf5f6f5002a859a41',
              _id: defaultPartner,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ChatScreenModal;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font14,
  },
  closeContainerStyle: {
    position: 'absolute',
    left: 15,
    right: 15,
  },
  bodyContainerStyle: {
    flex: 1,
  },
});
