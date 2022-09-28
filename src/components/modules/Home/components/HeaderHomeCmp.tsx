import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import colors from '../../../../styles/colors';
import Icons from '../../../../styles/icons';
import SearchCmp from '../../../common/SearchCmp';
import {useDispatch, useSelector} from 'react-redux';
import {urls} from '../../../../utils';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import MenuContextCmp from './MenuContextCmp';
import globalStyles from '../../../../styles/globalStyles';
import AvatarCmp from '../../../common/AvatarCmp';
import {extractImage} from '../../../../helpers/extractImage';
import {selectSpace} from '../../../../store/actions';
import SelectInstitutionModal from '../../../modals/institutions/SelectInstitutionModal';
import I18n from 'react-native-i18n';
import SearchHomeModal from '../../../modals/Home/SearchHomeModal';

const HeaderHomeCmp = (props: any) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {user, selectedSpace} = useSelector((state: any) => state?.User);
  const {myPartners, defaultPartner, myInstitutions} = useSelector(
    (state: any) => state?.Inst,
  );
  const menuRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [visibleSelectInst, setVisibleSelectInst] = useState(false);

  const [showSearchModal, setshowSearchModal] = useState(false);

  function confirmSelecInstModal(params: any) {
    let temp = null;
    if (params?.type === 'Partner') {
      temp = {
        ...myPartners?.filter((v: any) => v?._id === params?._id)?.[0],
        type: 'Partner',
      };
    } else {
      temp = {
        ...myInstitutions?.filter(
          (v: any) => v?.institute?._id === params?._id,
        )?.[0]?.institute,
        type: 'Institution',
      };
    }
    dispatch(selectSpace(temp));
    setVisibleSelectInst(false);
  }

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
          // setVisibleSelectInst(true);
        }}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor : colors.white
        }}>
        <AvatarCmp
          name={String(
            selectedSpace?.type === 'Partner'
              ? selectedSpace?.first_name
              : selectedSpace?.name,
          )?.slice(0, 2)}
          uri={extractImage(selectedSpace?.avatar?.path)}
          size={40}
          inversed={true}
        />
        {/* <Image source={{
                    uri: user?.avatar?.path ? `${urls.baseURL}/${user?.avatar?.path}` : "https://www.preprod.odesco.l-wa.com/assets/img/no-user.png"
                }}
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 50
                    }}
                /> */}
      </Pressable>
      <View
        style={{
          flex: 5,
          //   alignItems: 'center',
          //   justifyContent: 'center',
          //   backgroundColor: colors.white,
        }}>
        {/* <SearchCmp value={searchText} setValue={setSearchText} /> */}
        <Pressable
          onPress={() => setshowSearchModal(true)}
          style={styles.searchContainerStyle}>
          <Text>{I18n.t('search')}</Text>
        </Pressable>
      </View>

      <View>
        <Pressable
          onPress={() => {
            menuRef?.current?.open();
          }}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
          }}>
          <Icons.AntDesign name="appstore-o" size={30} color={colors.white} />
        </Pressable>
        <Menu ref={menuRef}>
          <MenuTrigger />
          <MenuOptions
            optionsContainerStyle={[
              {
                width: '80%',
                padding: 10,
                shadowColor: colors.primary,
              },
              globalStyles.shadow,
            ]}>
            <MenuContextCmp
              close={() => menuRef?.current?.close()}
              navigation={navigation}
            />
          </MenuOptions>
        </Menu>
      </View>
      <SelectInstitutionModal
        visible={visibleSelectInst}
        setVisible={setVisibleSelectInst}
        confirm={confirmSelecInstModal}
        selectedList={[{_id: selectedSpace?._id, type: selectedSpace?.type}]}
      />
      <SearchHomeModal
        visible={showSearchModal}
        setVisible={setshowSearchModal}
      />
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
    justifyContent: 'center',
    flexDirection: 'row',
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
  },
  searchContainerStyle: {
    flex: 1,
    backgroundColor: colors.white,
    margin: 15,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 5,
  },
});
