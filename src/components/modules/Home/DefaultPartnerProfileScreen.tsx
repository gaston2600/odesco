import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import colors from '../../../styles/colors';
import fonts from '../../../theme/fonts';
import {useDispatch, useSelector} from 'react-redux';
import AvatarCmp from '../../common/AvatarCmp';
import {extractImage} from '../../../helpers/extractImage';
import I18n from 'react-native-i18n';
import {Divider} from '@rneui/themed';
import Icons from '../../../styles/icons';
import {TextInput} from 'react-native-gesture-handler';
import ButtonCmp from '../../common/ButtonCmp';
import {ScreenWidth} from '@rneui/base';
import {
  confirmEmailToken,
  confirmPhoneToken,
  editUser,
  getProfile,
  verifEmailToken,
  verifPhone,
} from '../../../store/actions';
import ImagePicker from '../../common/ImagePicker';
import {addImage, takeImage} from '../../common/CameraActions';
import EditUserProfileModal from '../../modals/Home/EditUserProfileModal';

const DefaultPartnerProfileScreen = (props: any) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state?.User);
  const [activated, setActivated] = useState(false);
  const [showPhoneToken, setShowPhoneToken] = useState(false);
  const [showEmailToken, setShowEmailToken] = useState(false);
  const [phoneToken, setPhoneToken] = useState('');
  const [emailToken, setEmailToken] = useState('');
  const [loadingConfirmPhone, setLoadingConfirmPhone] = useState(false);
  const [loadingConfirmEmail, setLoadingConfirmEmail] = useState(false);
  const refImageModal = useRef();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  useEffect(() => {
    setActivated(!!user?.phoneVerified && !!user?.emailVerified);
  }, [user]);

  function getUserProfile() {
    dispatch(
      getProfile(
        {
          user: user?._id,
        },
        () => null,
        () => null,
      ),
    );
  }

  function verifPone() {
    if (!user?.phoneVerified) {
      if (user?.phone) {
        const fullNumber = user?.phone;
        const last3Digits = fullNumber.slice(-3);
        const maskedNumber = last3Digits.padStart(fullNumber.length, '*');
        // verif phone action
        console.log('verif phone action');
        Alert.alert(
          'Vérification Télephone',
          `Un token à été envoyé à votre telephone ${maskedNumber}`,
          [
            {
              text: 'OK',
              onPress: () => {
                dispatch(
                  verifPhone(
                    {
                      userId: user?._id,
                    },
                    () => null,
                    () => null,
                  ),
                );
                setShowPhoneToken(true);
              },
            },
          ],
        );
      } else {
        Alert.alert('Pas de numéro de telephone enregistré !');
      }
    }
  }

  function confirmPhone() {
    setLoadingConfirmPhone(true);
    dispatch(
      confirmPhoneToken(
        {
          userId: user?._id,
          token: phoneToken,
        },
        () => {
          setLoadingConfirmPhone(false);
          setShowPhoneToken(false);
          Alert.alert('success');
          getUserProfile();
        },
        () => {
          setLoadingConfirmPhone(false);
          Alert.alert('erreur');
        },
      ),
    );
  }

  function verifEmail() {
    if (!user?.emailVerified) {
      Alert.alert(
        'Vérification Email',
        `Un token à été envoyé à adreese mail`,
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(
                verifEmailToken(
                  {
                    userId: user?._id,
                  },
                  () => null,
                  () => null,
                ),
              );
              setShowEmailToken(true);
            },
          },
        ],
      );
    }
  }

  function confirmEmail() {
    setLoadingConfirmEmail(true);
    dispatch(
      confirmEmailToken(
        {
          userId: user?._id,
          token: emailToken,
        },
        () => {
          setLoadingConfirmEmail(false);
          setShowEmailToken(false);
          getUserProfile();
        },
        () => {
          setLoadingConfirmEmail(false);
          Alert.alert('erreur');
        },
      ),
    );
  }

  function changeImageProfile(params: any) {
    const frm = new FormData();
    frm.append('avatar', params);
    dispatch(
      editUser(
        {
          id: user?._id,
          data: frm,
        },
        (res: any) => {
          console.log('edit_user', res);
          getUserProfile();
        },
        (err: any) => {
          console.log('err edit_user', err);
        },
      ),
    );
  }

  async function getImage(params: any) {
    if (params === 'ADD') {
      addImage(
        refImageModal,
        (res: any) => {
          changeImageProfile(res);
        },
        (err: any) => {
          console.log({err});
        },
      );
    } else {
      takeImage(
        refImageModal,
        (res: any) => {
          changeImageProfile(res);
        },
        (err: any) => {
          console.log({err});
        },
      );
    }
  }

  return (
    <ScrollView style={styles.containerStyle}>
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
          {/* <Text style={styles.titleTextStyle}>{`${user?.last_name}`}</Text> */}
        </View>

        <AvatarCmp
          name={String(user?.first_name)?.slice(0, 2)}
          uri={extractImage(user?.avatar?.path)}
          size={80}
          profile={true}
        />
      </View>
      <Divider orientation="horizontal" />
      <Pressable
        onPress={() => {
          refImageModal?.current?.open();
        }}
        style={styles.lineContainerStyle}>
        <Text style={styles.actionTextStyle}>
          {I18n.t('edit_photo_profile')}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setShowEditProfileModal(true);
        }}
        style={styles.lineContainerStyle}>
        <Text style={styles.actionTextStyle}>
          {I18n.t('edit_personnel_informations')}
        </Text>
      </Pressable>
      <View style={styles.profileStatusContainerStyle}>
        <Text style={styles.profileStatusTextStyle}>
          {I18n.t(
            activated ? 'verified_profile_title' : 'unverified_profile_title',
          )}
        </Text>
        <Pressable onPress={verifPone} style={styles.lineContainerStyle}>
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
        </Pressable>
        {showPhoneToken && (
          <View style={styles.phoneTokenContainerStyle}>
            <TextInput
              value={phoneToken}
              onChangeText={setPhoneToken}
              style={styles.textInputStyle}
              maxLength={4}
              placeholder={I18n.t('phone')}
            />
            <View style={styles.buttonContainerStyle}>
              <ButtonCmp
                label={I18n.t('cancel')}
                action={() => setShowPhoneToken(false)}
                width={ScreenWidth * 0.3}
                loading={false}
              />
              <ButtonCmp
                label={I18n.t('save')}
                action={confirmPhone}
                width={ScreenWidth * 0.3}
                loading={loadingConfirmPhone}
              />
            </View>
          </View>
        )}
        <Pressable onPress={verifEmail} style={styles.lineContainerStyle}>
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
        </Pressable>
        {showEmailToken && (
          <View style={styles.phoneTokenContainerStyle}>
            <TextInput
              value={emailToken}
              onChangeText={setEmailToken}
              style={styles.textInputStyle}
              maxLength={4}
              placeholder={I18n.t('email')}
            />
            <View style={styles.buttonContainerStyle}>
              <ButtonCmp
                label={I18n.t('cancel')}
                action={() => setShowEmailToken(false)}
                width={ScreenWidth * 0.3}
                loading={false}
              />
              <ButtonCmp
                label={I18n.t('save')}
                action={confirmEmail}
                width={ScreenWidth * 0.3}
                loading={loadingConfirmEmail}
              />
            </View>
          </View>
        )}
      </View>
      <Divider orientation="horizontal" />
      <View style={styles.profileStatusContainerStyle}>
        <Text style={styles.profileStatusTextStyle}>{I18n.t('about_you')}</Text>
        <View
          style={{
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: colors.lightGray,
          }}>
          <Text style={styles.verifiedProfileStatusTextStyle}>
            {user?.note}
          </Text>
        </View>
      </View>
      <ImagePicker
        refImageModal={refImageModal}
        takeImage={() => getImage('TAKE')}
        addImage={() => getImage('ADD')}
      />
      {showEditProfileModal && (
        <EditUserProfileModal
          visible={showEditProfileModal}
          setVisible={setShowEditProfileModal}
          data={user}
          refresh={getUserProfile}
        />
      )}
    </ScrollView>
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
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
  phoneTokenContainerStyle: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.grey,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  textInputStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.grey,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 15,
    width: '100%',
  },
});
