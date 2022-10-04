import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRoomsList} from '../../../store/actions/chatActions';
import {useIsFocused} from '@react-navigation/native';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import I18n from 'react-native-i18n';
import ChatRoomCmp from './components/ChatRoomCmp';
import {Divider} from '@rneui/themed';
import Icons from '../../../styles/icons';
import AddConversationModal from '../../modals/Chat/AddConversationModal';
import fonts from '../../../theme/fonts';
import ChatScreenModal from '../../modals/Chat/ChatScreenModal';
import {getNetwork} from '../../../store/actions/networkActions';
const ChatScreen = (props: any) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {defaultPartner} = useSelector((state: any) => state?.Inst);
  const {chatRooms, loading} = useSelector((state: any) => state?.Chat);
  const [showAddConversationModal, setshowAddConversationModal] =
    useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [contact, setContact] = useState(null);

  function getPage() {
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
    dispatch(
      getNetwork({
        partner: defaultPartner,
      }),
    );
  }
  useEffect(() => {
    getPage();
  }, [isFocused]);

  useEffect(() => {
    const interval = setInterval(() => {
      getPage();
    }, 100000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.titleTextStyle}>{I18n.t('chat')}</Text>

        <Pressable
          onPress={() => {
            setshowAddConversationModal(true);
            // setShowSearchInput(!showSearchInput);
            // if (!showSearchInput) {
            //   refSearchInput?.current?.focus();
            // } else {
            //   setSearchInput('');
            // }
          }}
          style={styles.closeContainerStyle}>
          <Icons.Feather name="edit" size={20} color={colors.black} />
        </Pressable>
      </View>
      <Divider orientation="horizontal" />
      <FlatList
        data={chatRooms}
        renderItem={({item}: any) => (
          <ChatRoomCmp refresh={getPage} data={item} />
        )}
        keyExtractor={item => item?._id}
        refreshControl={
          <RefreshControl
            style={{width: 0, height: 0}}
            colors={[colors.primary]}
            refreshing={loading}
            onRefresh={() => {
              getPage();
            }}
          />
        }
        ListEmptyComponent={() => (
          <View style={globalStyles.center}>
            <Text style={globalStyles.defaultText}>
              {I18n.t('empty_result')}
            </Text>
          </View>
        )}
      />
      {/* <Pressable
        onPress={() => {
          setshowAddConversationModal(true);
        }}
        style={styles.addConversationContainerStyle}>
        <Icons.AntDesign name="adduser" size={20} color={colors.white} />
      </Pressable> */}
      {showAddConversationModal && (
        <AddConversationModal
          visible={showAddConversationModal}
          setVisible={setshowAddConversationModal}
          setShowChatModal={setShowChatModal}
          setContact={setContact}
        />
      )}
      {showChatModal && (
        <ChatScreenModal
          data={contact}
          visible={showChatModal}
          setVisible={setShowChatModal}
          refresh={getPage}
        />
      )}
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  addConversationContainerStyle: {
    position: 'absolute',
    bottom: 25,
    right: 15,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 50,
  },
  headerContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    height: 60,
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font14,
  },
  closeContainerStyle: {
    padding: 10,
    // position: 'absolute',
    // left: 15,
    // right: 15,
  },
});
