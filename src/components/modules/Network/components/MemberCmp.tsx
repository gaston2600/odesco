import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AvatarCmp from '../../../common/AvatarCmp';
import {extractImage} from '../../../../helpers/extractImage';
import fonts from '../../../../theme/fonts';
import colors from '../../../../styles/colors';
import I18n from 'react-native-i18n';
import globalStyles from '../../../../styles/globalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  acceptMemberNetwork,
  addMemberNetwork,
} from '../../../../store/actions/networkActions';
import Icons from '../../../../styles/icons';
import metrics from '../../../../theme/metrics';
import {initiateChatRoom} from '../../../../store/actions/chatActions';
import ChatScreenModal from '../../../modals/Chat/ChatScreenModal';

const {screenWidth} = metrics;

const MemberCmp = (props: any) => {
  const {data, type, refresh = () => null} = props;
  const {defaultPartner} = useSelector((state: any) => state?.Inst);
  const dispatch = useDispatch();
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [contact, setContact] = useState({
    first_name: '',
    last_name: '',
    _id: '',
  });
  const [showChatModal, setShowChatModal] = useState(false);

  function initiateChat(params: any) {
    dispatch(
      initiateChatRoom(
        {
          chatInitiator: defaultPartner,
          receiver: params,
        },
        (res: any) => {
          setContact({
            chatMember: {
              first_name: data?.first_name,
              last_name: data?.last_name,
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

  function accept() {
    setLoadingAccept(true);
    dispatch(
      acceptMemberNetwork(
        {
          partner: defaultPartner,
          data: {
            member_id: data?._id,
          },
        },
        () => {
          setLoadingAccept(false);
          refresh();
        },
        (err: any) => {
          setLoadingAccept(false);
        },
      ),
    );
  }

  function add() {
    setLoadingAdd(true);
    dispatch(
      addMemberNetwork(
        {
          partner: defaultPartner,
          data: {
            member_id: data?._id,
          },
        },
        () => {
          setLoadingAdd(false);
          refresh();
        },
        (err: any) => {
          setLoadingAdd(false);
        },
      ),
    );
  }

  function renderButton(params: any) {
    switch (params) {
      case 'member':
        return (
          <Pressable
            onPress={() => {
              initiateChat(data?._id);
            }}
            style={styles.buttonContainerStyle}>
            {/* <Text style={styles.buttonTextStyle}>{I18n.t("discussion")}</Text> */}
            <Icons.Ionicons
              name="ios-chatbubble-ellipses-outline"
              size={20}
              color={colors.primary}
            />
          </Pressable>
        );
      case 'invitation':
        return (
          <Pressable
            onPress={accept}
            style={[
              styles.buttonContainerStyle,
              {backgroundColor: colors.primary},
            ]}>
            {loadingAccept ? (
              <ActivityIndicator color={colors.primary} size="small" />
            ) : (
              // <Text style={[styles.buttonTextStyle, { color: colors.white }]}>{I18n.t("accept")}</Text>
              <Icons.Ionicons
                name="checkmark-outline"
                size={20}
                color={colors.primary}
              />
            )}
          </Pressable>
        );
      case 'pending':
        return <View />;
        return (
          <Pressable style={styles.buttonContainerStyle}>
            <Text style={styles.buttonTextStyle}>{I18n.t('cancel')}</Text>
          </Pressable>
        );
      case 'add':
        return (
          <Pressable onPress={add} style={styles.buttonContainerStyle}>
            {loadingAdd ? (
              <ActivityIndicator color={colors.primary} size="small" />
            ) : (
              // <Text style={styles.buttonTextStyle}>{I18n.t("connect")}</Text>
              <Icons.Ionicons
                name="ios-person-add-outline"
                size={20}
                color={colors.primary}
              />
            )}
          </Pressable>
        );
      default:
        return <View />;
    }
  }

  return (
    <View style={[styles.containerStyle, globalStyles.shadow]}>
      <AvatarCmp
        name={String(data?.first_name)?.slice(0, 2)}
        uri={extractImage(data?.avatar?.path)}
        size={screenWidth * 0.25}
      />
      <Text
        numberOfLines={2}
        style={
          styles.titleTextStyle
        }>{`${data?.first_name} ${data?.last_name}`}</Text>
      {renderButton(type)}
      {showChatModal && (
        <ChatScreenModal
          data={contact}
          visible={showChatModal}
          setVisible={setShowChatModal}
          refresh={refresh}
        />
      )}
    </View>
  );
};

export default MemberCmp;

const styles = StyleSheet.create({
  containerStyle: {
    width: screenWidth * 0.28,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginHorizontal: screenWidth * 0.0275,
    marginVertical: 10,
    borderRadius: 5,
    flexDirection: 'column',
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font10,
    color: colors.darkBlue,
    marginVertical: 5,
  },
  buttonContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: screenWidth * .3,
    // borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 15,
    padding: 5,
  },
  buttonTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font10,
    color: colors.primary,
  },
});
