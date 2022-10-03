import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icons from '../../../styles/icons';
import {Divider} from '@rneui/themed';
import colors from '../../../styles/colors';
import fonts from '../../../theme/fonts';
import I18n from 'react-native-i18n';
import ButtonCmp from '../../common/ButtonCmp';
import {ScreenWidth} from '@rneui/base';
import {useDispatch, useSelector} from 'react-redux';
import {changePassword} from '../../../store/actions';

const ChangePasswordScreen = (props: any) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state?.User);
  const [payload, setPayload] = useState({
    new_pass: '',
    old_pass: '',
    confirm_pass: '',
  });
  const [loading, setLoading] = useState(false);

  function submit() {
    if (!payload?.old_pass) {
      ToastAndroid.show(
        `${I18n.t('required')} ${I18n.t('old_password')}`,
        ToastAndroid.SHORT,
      );
    } else if (!payload?.new_pass) {
      ToastAndroid.show(
        `${I18n.t('required')} ${I18n.t('new_password')}`,
        ToastAndroid.SHORT,
      );
    } else if (!payload?.confirm_pass) {
      ToastAndroid.show(
        `${I18n.t('required')} ${I18n.t('confirm_password')}`,
        ToastAndroid.SHORT,
      );
    } else if (payload?.new_pass !== payload?.confirm_pass) {
      ToastAndroid.show(
        `${I18n.t('new_password')} ${I18n.t('dont_match')} ${I18n.t(
          'confirm_password',
        )}`,
        ToastAndroid.SHORT,
      );
    } else {
      setLoading(true);
      dispatch(
        changePassword(
          {
            user: user?._id,
            data: {
              new_pass: payload?.new_pass,
              old_pass: payload?.old_pass,
            },
          },
          (res: any) => {
            setLoading(false);
            navigation?.goBack();
            console.log({res});
          },
          (err: any) => {
            setLoading(false);
            console.log({err});
            ToastAndroid.show(
              `Erreur changement mot de passe`,
              ToastAndroid.SHORT,
            );
          },
        ),
      );
    }
  }
  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.headerTitleTextStyle}>
          {I18n.t('change_password')}
        </Text>
        <Pressable
          onPress={() => navigation?.goBack()}
          style={styles.closeContainerStyle}>
          <Icons.AntDesign name="left" size={20} color={colors.black} />
        </Pressable>
      </View>
      <Divider orientation="horizontal" />
      <View style={styles.bodyContainerStyle}>
        <Text style={styles.titleTextStyle}>{I18n.t('old_password')}</Text>
        <TextInput
          value={payload?.old_pass}
          onChangeText={(old_pass: any) => setPayload({...payload, old_pass})}
          style={styles.textInputStyle}
          placeholder={I18n.t('old_password')}
          secureTextEntry
        />
        <Text style={styles.titleTextStyle}>{I18n.t('new_password')}</Text>
        <TextInput
          value={payload?.new_pass}
          onChangeText={(new_pass: any) => setPayload({...payload, new_pass})}
          style={styles.textInputStyle}
          placeholder={I18n.t('new_password')}
          secureTextEntry
        />
        <Text style={styles.titleTextStyle}>{I18n.t('confirm_password')}</Text>
        <TextInput
          value={payload?.confirm_pass}
          onChangeText={(confirm_pass: any) =>
            setPayload({...payload, confirm_pass})
          }
          style={styles.textInputStyle}
          placeholder={I18n.t('confirm_password')}
          secureTextEntry
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-evenly',
          }}>
          <View style={styles.buttonContainerStyle}>
            <ButtonCmp
              label={I18n.t('cancel')}
              action={() => {
                navigation?.goBack();
                navigation.openDrawer();
              }}
              width={ScreenWidth * 0.3}
            />
            <ButtonCmp
              label={I18n.t('save')}
              action={submit}
              width={ScreenWidth * 0.3}
              loading={loading}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;

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
  headerTitleTextStyle: {
    fontFamily: fonts.type.NunitoBold,
    fontSize: fonts.size.font14,
  },
  closeContainerStyle: {
    position: 'absolute',
    left: 15,
    right: 15,
  },
  bodyContainerStyle: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.darkBlue,
    marginVertical: 10,
  },
  textInputStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.grey,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.grey,
    width: '100%',
    marginVertical: 5,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 15,
    width: '100%',
  },
});
