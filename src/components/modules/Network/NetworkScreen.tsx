import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import colors from '../../../styles/colors';
import NetworkTabNavigator from '../../../navigation/tabs/NetworkTabNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {getNetwork} from '../../../store/actions/networkActions';
import Icons from '../../../styles/icons';
import I18n from 'react-native-i18n';
import fonts from '../../../theme/fonts';
import MembersListModal from '../../modals/network/MembersListModal';
import {Divider} from '@rneui/themed';

const NetworkScreen = () => {
  const dispatch = useDispatch();
  const {defaultPartner} = useSelector((state: any) => state?.Inst);
  const {members, pendings, requests, loading} = useSelector(
    (state: any) => state?.Network,
  );

  const [showMembersListModal, setShowMembersListModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const refSearchInput = useRef(null);

  function getPage() {
    dispatch(
      getNetwork({
        partner: defaultPartner,
      }),
    );
  }

  useEffect(() => {
    getPage();
  }, []);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerContainerStyle}>
        {!showSearchInput ? (
          <Text style={styles.titleTextStyle}>{I18n.t('network')}</Text>
        ) : (
          <TextInput
            ref={refSearchInput}
            value={searchInput}
            onChangeText={setSearchInput}
            style={styles.textInputStyle}
            placeholder={I18n.t('search')}
            focusable
          />
        )}
        <Pressable
          onPress={() => {
            setShowSearchInput(!showSearchInput);
            if (!showSearchInput) {
              refSearchInput?.current?.focus();
            } else {
              setSearchInput('');
            }
          }}
          style={styles.closeContainerStyle}>
          <Icons.AntDesign
            name={showSearchInput ? 'close' : 'search1'}
            size={20}
            color={colors.black}
          />
        </Pressable>
      </View>
      <Divider orientation="horizontal" />
      {/* <Pressable
        onPress={() => {
          setShowMembersListModal(true);
        }}
        style={styles.barSearchContainerStyle}>
        <Text style={styles.barTextStyle}>{I18n.t('search')}</Text>
        <Icons.AntDesign name="search1" size={20} color={colors.gray} />
      </Pressable> */}
      <NetworkTabNavigator searchInput={searchInput} refresh={getPage} />
      <MembersListModal
        visible={showMembersListModal}
        setVisible={setShowMembersListModal}
      />
      <Pressable
        onPress={() => {
          setShowMembersListModal(true);
        }}
        style={styles.addContainerStyle}>
        <Icons.AntDesign name="plus" size={25} color={colors.white} />
      </Pressable>
    </View>
  );
};

export default NetworkScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  barSearchContainerStyle: {
    // width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  barTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.grey,
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
    // position: 'absolute',
    // left: 15,
    // right: 15,
  },
  textInputStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.gray,
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.grey,
  },
  addContainerStyle: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 15,
  },
});
