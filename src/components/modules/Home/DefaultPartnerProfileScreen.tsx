import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../../styles/colors';
import fonts from '../../../theme/fonts';
import {useSelector} from 'react-redux';
import AvatarCmp from '../../common/AvatarCmp';
import {extractImage} from '../../../helpers/extractImage';
import I18n from 'react-native-i18n';
import {Divider} from '@rneui/themed';
import Icons from '../../../styles/icons';

const DefaultPartnerProfileScreen = (props: any) => {
  const {navigation} = props;
  const {user} = useSelector((state: any) => state?.User);
  const [activated, setActivated] = useState(false);
  useEffect(() => {
    setActivated(!!user?.phoneVerified && !!user?.emailVerified);
  }, [user]);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.headerTitleTextStyle}>{I18n.t('profile')}</Text>
        <Pressable
          onPress={() => navigation?.goBack()}
          style={styles.closeContainerStyle}>
          <Icons.AntDesign name="left" size={20} color={colors.black} />
        </Pressable>
      </View>
      <Divider orientation="horizontal" />
      <View style={[styles.topContainerStyle, styles.rowContainer]}>
        <View>
          <Text style={styles.titleTextStyle}>{`${user?.first_name}`}</Text>
          <Text style={styles.titleTextStyle}>{`${user?.last_name}`}</Text>
        </View>

        <AvatarCmp
          name={String(user?.first_name)?.slice(0, 2)}
          uri={extractImage(user?.avatar?.path)}
          size={80}
          profile={true}
        />
      </View>
      <Divider orientation="horizontal" />
      <View style={styles.lineContainerStyle}>
        <Text style={styles.actionTextStyle}>
          {I18n.t('edit_photo_profile')}
        </Text>
      </View>
      <View style={styles.lineContainerStyle}>
        <Text style={styles.actionTextStyle}>
          {I18n.t('edit_personnel_informations')}
        </Text>
      </View>
      <View style={styles.profileStatusContainerStyle}>
        <Text style={styles.profileStatusTextStyle}>
          {I18n.t(
            activated ? 'verified_profile_title' : 'unverified_profile_title',
          )}
        </Text>
        <View style={styles.lineContainerStyle}>
          <Icons.AntDesign
            name={user?.phoneVerified ? 'checkcircleo' : 'infocirlceo'}
            size={20}
            color={user?.phoneVerified ? colors.sereneBlue : colors.orange}
          />
          <Text
            style={
              user?.phoneVerified
                ? styles.verifiedProfileStatusTextStyle
                : styles.errorProfileStatusTextStyle
            }>
            {!!user?.phone ? user?.phone : I18n.t('no_phone_msg')}
          </Text>
        </View>
        <View style={styles.lineContainerStyle}>
          <Icons.AntDesign
            name={user?.emailVerified ? 'checkcircleo' : 'infocirlceo'}
            size={20}
            color={user?.emailVerified ? colors.sereneBlue : colors.orange}
          />
          {/* <Text>{user?.email}</Text> */}
          <Text
            style={
              user?.emailVerified
                ? styles.verifiedProfileStatusTextStyle
                : styles.errorProfileStatusTextStyle
            }>
            {user?.email}
          </Text>
        </View>
      </View>
      <Divider orientation="horizontal" />
    </View>
  );
};

export default DefaultPartnerProfileScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topContainerStyle: {
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoBold,
    fontSize: fonts.size.font16,
    color: colors.black,
  },
  lineContainerStyle: {
    // height: 60,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font14,
    color: colors.sereneBlue,
  },
  headerContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  headerTitleTextStyle: {
    fontFamily: fonts.type.NunitoBold,
    fontSize: fonts.size.font14,
  },
  closeContainerStyle: {
    position: 'absolute',
    left: 15,
    right: 15,
  },
  profileStatusContainerStyle: {
    padding: 10,
    marginVertical: 10,
  },
  profileStatusTextStyle: {
    fontFamily: fonts.type.NunitoBold,
    fontSize: fonts.size.font14,
    color: colors.darkBlue,
  },
  errorProfileStatusTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.orange,
    marginLeft: 5,
  },
  verifiedProfileStatusTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.darkGray,
    marginLeft: 5,
  },
});
