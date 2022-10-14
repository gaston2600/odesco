/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../../../styles/colors';
import Icons from '../../../../styles/icons';
import {useDispatch, useSelector} from 'react-redux';
import AvatarCmp from '../../../common/AvatarCmp';
import {extractImage} from '../../../../helpers/extractImage';
import {selectSpace} from '../../../../store/actions';
import SelectInstitutionModal from '../../../modals/institutions/SelectInstitutionModal';
import I18n from 'react-native-i18n';
import SearchHomeModal from '../../../modals/Home/SearchHomeModal';
import HomeMenuModal from '../../../modals/Home/HomeMenuModal';
import MembersListModal from '../../../modals/network/MembersListModal';

const HeaderHomeCmp = (props: any) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  console.log({state});

  const {selectedSpace} = useSelector((state: any) => state?.User);
  const {myPartners, defaultPartner} = useSelector((state: any) => state?.Inst);

  const [showSearchModal, setshowSearchModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);

  const [showMembersListModal, setShowMembersListModal] = useState(false);
  useEffect(() => {
    const temp = {
      ...myPartners?.filter((v: any) => v?._id === defaultPartner)?.[0],
      type: 'Partner',
    };
    if (!!defaultPartner && !!myPartners?.length && !selectedSpace) {
      dispatch(selectSpace(temp));
    }
  }, [myPartners, defaultPartner]);

  return (
    <View style={styles.containerStyle}>
      <Pressable
        onPress={() => {
          navigation?.openDrawer();
        }}
        style={[styles.itemContainerStyle]}>
        <AvatarCmp
          name={String(
            selectedSpace?.type === 'Partner'
              ? selectedSpace?.first_name
              : selectedSpace?.name,
          )?.slice(0, 2)}
          uri={extractImage(
            selectedSpace?.avatar?.path ? selectedSpace?.avatar?.path : null,
          )}
          size={40}
          inversed={true}
        />
      </Pressable>
      <View style={[styles.itemContainerStyle, {width: '70%'}]}>
        <Pressable
          onPress={() => {
            setShowMembersListModal(true);
          }}
          style={styles.searchContainerStyle}>
          <Text>{I18n.t('search')}</Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => {
          console.log('open menu ', showMenuModal);
          navigation?.navigate('HomeMenuScreen');
          // setShowMenuModal(!showMenuModal);
        }}
        style={[styles.itemContainerStyle]}>
        <Icons.AntDesign name="appstore-o" size={35} color={colors.white} />
      </Pressable>
      {showSearchModal && (
        <SearchHomeModal
          visible={showSearchModal}
          setVisible={setshowSearchModal}
        />
      )}
      {showMenuModal && (
        <HomeMenuModal
          visible={showMenuModal}
          setVisible={setShowMenuModal}
          navigation={navigation}
        />
      )}
      {showMembersListModal && (
        <MembersListModal
          visible={showMembersListModal}
          setVisible={setShowMembersListModal}
        />
      )}
    </View>
  );
};

export default HeaderHomeCmp;

const styles = StyleSheet.create({
  containerStyle: {
    height: 70,
    width: '100%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
  },
  itemContainerStyle: {
    // borderWidth: 1,
    height: '70%',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainerStyle: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
    // margin: 15,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 5,
  },
});
