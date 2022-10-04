/* eslint-disable react-native/no-inline-styles */
import {
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import MemberCmp from '../../modules/Network/components/MemberCmp';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import I18n from 'react-native-i18n';
import Icons from '../../../styles/icons';
import {Divider} from '@rneui/themed';
import fonts from '../../../theme/fonts';
import MemberLineCmp from '../../modules/Network/components/MemberLineCmp';
const AddConversationModal = (props: any) => {
  const {visible, setVisible, setShowChatModal, setContact} = props;
  const {
    members,
    // loading
  } = useSelector((state: any) => state?.Network);
  const {chatRooms, loading} = useSelector((state: any) => state?.Chat);
  const [searchInput, setSearchInput] = useState('');

  const [membersList, setMembersList] = useState([]);
  const [membersListTemp, setMembersListTemp] = useState([]);
  const [chatRoomsList, setChatRoomsList] = useState([]);

  useEffect(() => {
    setMembersListTemp(
      members?.filter(
        (v: any) =>
          !Array.from(chatRooms?.map((t: any) => t?.chatMember?._id)).includes(
            v?.user?._id,
          ),
      ),
    );
    return () => {
      setMembersListTemp([]);
    };
  }, [members, chatRooms]);

  useEffect(() => {
    console.log('in search ', searchInput);

    setChatRoomsList(
      chatRooms?.filter((v: any) =>
        String(`${v?.chatMember?.first_name} ${v?.chatMember?.last_name}`)
          .toUpperCase()
          .includes(String(searchInput)?.toUpperCase()),
      ),
    );
    setMembersList(
      membersListTemp?.filter((v: any) =>
        String(`${v?.user?.first_name} ${v?.user?.last_name}`)
          .toUpperCase()
          .includes(String(searchInput)?.toUpperCase()),
      ),
    );

    return () => {};
  }, [searchInput]);

  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.titleTextStyle}>{I18n.t('new_message')}</Text>
        <Pressable
          onPress={() => setVisible(false)}
          style={styles.closeContainerStyle}>
          <Icons.AntDesign name="close" size={20} color={colors.black} />
        </Pressable>
      </View>
      <Divider orientation="horizontal" />
      <View style={styles.searchContainerStyle}>
        <Text style={styles.titleTextStyle}>À : </Text>
        <TextInput
          value={searchInput}
          onChangeText={setSearchInput}
          style={styles.textInputStyle}
          placeholder={I18n.t('search')}
          focusable
          autoFocus
        />
        {/* <Pressable
          onPress={() => {
            if (!!searchInput) {
              setSearchInput('');
            }
          }}>
          <Icons.AntDesign
            name={!!searchInput ? 'close' : 'search1'}
            size={20}
            color={!!searchInput ? colors.black : colors.grey}
          />
        </Pressable> */}
      </View>
      <View
        style={{
          flex: 1,
        }}>
        {!!chatRoomsList?.length && (
          <Text style={styles.typeTextStyle}>{I18n.t('suggestions')}</Text>
        )}
        {!!chatRoomsList?.length &&
          chatRoomsList?.map((item: any, index: any) => (
            <MemberLineCmp
              item={item}
              setShowChatModal={setShowChatModal}
              setshowAddConversation={setVisible}
              setContact={setContact}
              type="old"
            />
          ))}
        {/* <FlatList
          data={chatRooms}
          //   ?.filter((v: any) =>
          //   String(`${v?.user?.first_name} ${v?.user?.last_name}`)
          //     ?.toUpperCase()
          //     ?.includes(String(searchInput)?.toUpperCase()),
          // )}
          renderItem={({item}: any) => (
            <MemberLineCmp
              data={item}
              setShowChatModal={setShowChatModal}
              setContact={setContact}
              type="member"
            />
            // <MemberCmp data={item?.user} type="member" />
          )}
          keyExtractor={item => item?._id}
          ItemSeparatorComponent={() => <Divider orientation="horizontal" />}
          refreshControl={
            <RefreshControl
              style={{width: 0, height: 0}}
              colors={[colors.primary]}
              refreshing={loading}
              onRefresh={() => {
                // getPage();
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
        /> */}
        {/* ------------------------------------------------------------- */}
        {!!membersList?.length && (
          <Text style={styles.typeTextStyle}>{I18n.t('add_new')}</Text>
        )}
        {!!membersList?.length &&
          membersList?.map((item: any, index: any) => (
            <MemberLineCmp
              item={item}
              setShowChatModal={setShowChatModal}
              setContact={setContact}
              type="new"
            />
          ))}

        {!membersList?.length && !chatRoomsList?.length && (
          <View style={globalStyles.center}>
            <Text style={globalStyles.defaultText}>
              {I18n.t('empty_result')}
            </Text>
          </View>
        )}
        {/* <FlatList
          data={members}
          renderItem={({item}: any) => (
            <MemberLineCmp
              data={item}
              setShowChatModal={setShowChatModal}
              setContact={setContact}
              type="member"
            />
            // <MemberCmp data={item?.user} type="member" />
          )}
          keyExtractor={item => item?._id}
          ItemSeparatorComponent={() => <Divider orientation="horizontal" />}
          refreshControl={
            <RefreshControl
              style={{width: 0, height: 0}}
              colors={[colors.primary]}
              refreshing={loading}
              onRefresh={() => {
                // getPage();
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
        /> */}
      </View>
    </Modal>
  );
};

export default AddConversationModal;

const styles = StyleSheet.create({
  headerContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoBold,
    fontSize: fonts.size.font14,
    color: colors.black,
  },
  closeContainerStyle: {
    position: 'absolute',
    left: 15,
    right: 15,
  },
  searchContainerStyle: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 15,
    // borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInputStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.gray,
    flex: 1,
  },
  typeTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.gray,
    marginLeft: 10,
  },
});
