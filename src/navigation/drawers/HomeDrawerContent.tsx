import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {extractImage} from '../../helpers/extractImage';
import AvatarCmp from '../../components/common/AvatarCmp';
import fonts from '../../theme/fonts';
import colors from '../../styles/colors';
import I18n from 'react-native-i18n';
import {Divider} from '@rneui/themed';
import Icons from '../../styles/icons';
import SelectInstitutionModal from '../../components/modals/institutions/SelectInstitutionModal';
import {logout, selectSpace} from '../../store/actions';

const HomeDrawerContent = (props: any) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {user, selectedSpace} = useSelector((state: any) => state?.User);
  const {myPartners, defaultPartner, myInstitutions} = useSelector(
    (state: any) => state?.Inst,
  );
  const [visibleSelectInst, setVisibleSelectInst] = useState(false);

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
    navigation.toggleDrawer();
  }

  return (
    <View style={styles.containerStyle}>
      <ScrollView style={styles.bodyContainer}>
        <Pressable
          onPress={() => {
            navigation?.navigate('DefaultPartnerProfileScreen');
          }}
          style={styles.headerContainerStyle}>
          <AvatarCmp
            name={String(user?.first_name)?.slice(0, 2)}
            uri={extractImage(user?.avatar?.path)}
            size={80}
            // profile={true}
          />
          <Text style={styles.titleTextStyle}>
            {`${user?.first_name} ${user?.last_name}`}
          </Text>
          <Text style={styles.seeProfileTextStyle}>
            {I18n.t('see_profile')}
          </Text>
        </Pressable>
        <Divider orientation="horizontal" />
        <Pressable
          onPress={() => setVisibleSelectInst(true)}
          style={styles.lineContainerStyle}>
          <View style={styles.contentContainerStyle}>
            <Text style={styles.lineTextStyle}>
              {I18n.t('switch_selected_partner')}
            </Text>
          </View>
          <View style={styles.iconContainerStyle}>
            <Icons.AntDesign name="user" size={20} color={colors.gray} />
          </View>
        </Pressable>
        <Divider orientation="horizontal" />
        <Pressable
          onPress={() => navigation?.navigate('ChangePasswordScreen')}
          style={styles.lineContainerStyle}>
          <View style={styles.contentContainerStyle}>
            <Text style={styles.lineTextStyle}>
              {I18n.t('change_password')}
            </Text>
          </View>

          <View style={styles.iconContainerStyle}>
            <Icons.AntDesign name="lock" size={20} color={colors.gray} />
          </View>
        </Pressable>
        <Divider orientation="horizontal" />
      </ScrollView>
      <View style={styles.footerContainerStyle}>
        <Divider orientation="horizontal" />
        <Pressable
          onPress={() => {
            dispatch(logout());
          }}
          style={styles.lineContainerStyle}>
          <View style={styles.contentContainerStyle}>
            <Text style={styles.lineTextStyle}>{I18n.t('logout')}</Text>
          </View>

          <View style={styles.iconContainerStyle}>
            <Icons.AntDesign name="logout" size={20} color={colors.gray} />
          </View>
        </Pressable>
      </View>
      <SelectInstitutionModal
        visible={visibleSelectInst}
        setVisible={setVisibleSelectInst}
        confirm={confirmSelecInstModal}
        selectedList={[{_id: selectedSpace?._id, type: selectedSpace?.type}]}
      />
    </View>
  );
};

export default HomeDrawerContent;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerContainerStyle: {
    padding: 15,
  },
  bodyContainer: {
    flex: 1,
  },
  footerContainerStyle: {},
  titleTextStyle: {
    fontFamily: fonts.type.NunitoBold,
    fontSize: fonts.size.font16,
    color: colors.black,
  },
  seeProfileTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font14,
    color: colors.grey,
    marginVertical: 5,
  },
  lineContainerStyle: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  lineTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.darkBlue,
  },

  contentContainerStyle: {
    flex: 6,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
