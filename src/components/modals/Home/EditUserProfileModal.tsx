import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../styles/colors';
import fonts from '../../../theme/fonts';
import I18n from 'react-native-i18n';
import ButtonCmp from '../../common/ButtonCmp';
import {ScreenWidth} from '@rneui/base';
import {useDispatch} from 'react-redux';
import {editPartner, editUser} from '../../../store/actions';
import Icons from '../../../styles/icons';
import {Divider} from '@rneui/themed';

const EditUserProfileModal = (props: any) => {
  const {visible, setVisible, data, refresh} = props;
  console.log(data);

  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    first_name: data?.first_name,
    last_name: data?.last_name,
    phone: data?.phone,
    email: data?.email,
    note: data?.note,
  });
  const [loading, setLoading] = useState(false);

  function checkData(params: any) {
    let msg = '';
    if (!params?.first_name) {
      ToastAndroid.show(
        `${I18n.t('required')} : ${I18n.t('first_name')} `,
        ToastAndroid.SHORT,
      );
      msg = 'err';
    } else if (!params?.last_name) {
      ToastAndroid.show(
        `${I18n.t('required')} : ${I18n.t('last_name')} `,
        ToastAndroid.SHORT,
      );
      msg = 'err';
    } else if (!params?.email) {
      ToastAndroid.show(
        `${I18n.t('required')} : ${I18n.t('email')} `,
        ToastAndroid.SHORT,
      );
      msg = 'err';
    } else if (!params?.phone) {
      ToastAndroid.show(
        `${I18n.t('required')} : ${I18n.t('phone')} `,
        ToastAndroid.SHORT,
      );
      msg = 'err';
    } else {
      msg = '';
    }
    return msg;
  }

  function submit() {
    if (!!checkData(payload)) {
    } else {
      setLoading(true);
      dispatch(
        editUser(
          {
            id: data?._id,
            data: {
              ...payload,
            },
          },
          () => {
            refresh();
            setLoading(false);
            setVisible(false);
          },
          (err: any) => {
            console.log({err});
            setLoading(false);
          },
        ),
      );
    }
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
        }}>
        <ScrollView style={styles.containerStyle}>
          <View style={styles.headerContainerStyle}>
            <Text style={styles.headerTitleTextStyle}>
              {I18n.t('edit_profile')}
            </Text>
            <Pressable
              onPress={() => setVisible(false)}
              style={styles.closeContainerStyle}>
              <Icons.AntDesign name="left" size={20} color={colors.black} />
            </Pressable>
          </View>
          <Divider orientation="horizontal" />
          <View style={styles.bodyContainerStyle}>
            {/* <Text style={styles.titleTextStyle}>{I18n.t('edit_profile')}</Text> */}
            <Text style={styles.itemTitleTextStyle}>
              {I18n.t('first_name')}
            </Text>
            <TextInput
              value={payload?.first_name}
              onChangeText={first_name => setPayload({...payload, first_name})}
              placeholder={I18n.t('first_name')}
              style={styles.textInputStyle}
            />
            <Text style={styles.itemTitleTextStyle}>{I18n.t('last_name')}</Text>
            <TextInput
              value={payload?.last_name}
              onChangeText={last_name => setPayload({...payload, last_name})}
              placeholder={I18n.t('last_name')}
              style={styles.textInputStyle}
            />

            <Text style={styles.itemTitleTextStyle}>{I18n.t('email')}</Text>
            <TextInput
              value={payload?.email}
              onChangeText={email => setPayload({...payload, email})}
              placeholder={I18n.t('email')}
              style={styles.textInputStyle}
            />
            <Text style={styles.itemTitleTextStyle}>{I18n.t('phone')}</Text>
            <TextInput
              value={payload?.phone}
              onChangeText={phone => setPayload({...payload, phone})}
              placeholder={I18n.t('phone')}
              style={styles.textInputStyle}
            />
            <Text style={styles.itemTitleTextStyle}>{I18n.t('note')}</Text>
            <TextInput
              value={payload?.note}
              onChangeText={note => setPayload({...payload, note})}
              placeholder={I18n.t('note')}
              style={styles.textInputStyle}
              multiline
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainerStyle}>
          <ButtonCmp
            label={I18n.t('cancel')}
            action={() => {
              setVisible(false);
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
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditUserProfileModal;

const styles = StyleSheet.create({
  containerStyle: {
    // flex: 1,
    backgroundColor: colors.white,
  },
  bodyContainerStyle: {
    padding: 10,
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: 14,
    color: colors.darkBlue,
    marginVertical: 10,
  },
  itemTitleTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: 12,
    color: colors.darkBlue,
    marginVertical: 10,
  },
  textInputStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: 12,
    color: colors.darkBlue,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.grey,
    paddingLeft: 10,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 25,
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
});
