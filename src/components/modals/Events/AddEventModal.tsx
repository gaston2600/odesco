import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Icons from '../../../styles/icons';
import {CheckBox, Divider} from '@rneui/themed';
import fonts from '../../../theme/fonts';
import colors from '../../../styles/colors';
import I18n from 'react-native-i18n';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import ButtonCmp from '../../common/ButtonCmp';
import {ScreenWidth} from '@rneui/base';
import ImagePicker from '../../common/ImagePicker';
import {addImage, takeImage} from '../../common/CameraActions';
import {useDispatch, useSelector} from 'react-redux';
import {createEvent} from '../../../store/actions/eventsActions';

const AddEventModal = (props: any) => {
  const dispatch = useDispatch();
  const {visible, setVisible, refresh, space} = props;

  const {user} = useSelector((state: any) => state?.User);
  const [payload, setPayload] = useState({
    name: '',
    cover: null,
    type: '',
    date_start: new Date(),
    date_end: new Date(),
    deadline_subscription: new Date(),
    program: '',
    desc: '',
    is_public: true,
    is_online: false,
    is_hybrid: false,
    is_presential: false,
    address: '',
    link: '',
    user: user?._id,
    ...(space?.type === 'Partner' && {partner: space?._id}),
    ...(space?.type === 'Institution' && {inst_id: space?._id}),
  });

  const [loading, setLoading] = useState(false);
  const refImageModal = useRef();
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showBeforeDate, setShowBeforeDate] = useState(false);

  async function getImage(params: any) {
    if (params === 'ADD') {
      addImage(
        refImageModal,
        (res: any) => {
          handleChange('cover', res);
          console.log({res});
        },
        (err: any) => {
          console.log({err});
        },
      );
    } else {
      takeImage(
        refImageModal,
        (res: any) => {
          handleChange('cover', res);
          console.log({res});
        },
        (err: any) => {
          console.log({err});
        },
      );
    }
  }

  function handleChange(key: any, value: any) {
    setPayload((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  }
  function checkData() {
    let msg = '';
    if (!payload?.name) {
      ToastAndroid.show(
        `${I18n.t('required')} : ${I18n.t('first_name')} `,
        ToastAndroid.SHORT,
      );
      msg = 'err';
    } else {
      msg = '';
    }
    return msg;
  }
  function submit() {
    if (!!checkData()) {
    } else {
      setLoading(true);
      dispatch(
        createEvent(
          payload,
          () => {
            setLoading(false);
            refresh();
            setVisible(!visible);
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
      }}>
      <ScrollView style={styles.containerStyle}>
        <View style={styles.headerContainerStyle}>
          <Text style={styles.headerTitleTextStyle}>
            {I18n.t('add_new_event')}
          </Text>
          <Pressable
            onPress={() => setVisible(false)}
            style={styles.closeContainerStyle}>
            <Icons.AntDesign name="left" size={20} color={colors.black} />
          </Pressable>
        </View>
        <Divider orientation="horizontal" />
        <View style={styles.bodyContainer}>
          <Pressable
            onPress={() => {
              refImageModal?.current?.open();
            }}
            style={styles.imageContainerstyle}>
            <Image
              source={
                payload?.cover?.uri
                  ? {
                      uri: payload?.cover?.uri,
                    }
                  : require('../../../../assets/images/img_placeholder.png')
              }
              style={styles.imageStyle}
              resizeMode="cover"
            />
          </Pressable>
          <Text style={styles.titleTextStyle}>{I18n.t('event_name')}</Text>
          <TextInput
            value={payload?.name}
            onChangeText={name => handleChange('name', name)}
            style={styles.textInputStyle}
            placeholder={I18n.t('event_name')}
          />
          {/* <Text style={styles.titleTextStyle}>{I18n.t('public')}</Text> */}

          <Pressable
            onPress={() => {
              setShowStartDate(!showStartDate);
            }}>
            <Text style={styles.titleTextStyle}>{I18n.t('startDate')}</Text>
            <TextInput
              value={
                moment(payload?.date_start).isValid()
                  ? moment(payload?.date_start).format('ll')
                  : 'JJ-MM-YYYY'
              }
              style={styles.textInputStyle}
              placeholder={I18n.t('startDate')}
              editable={false}
            />
          </Pressable>
          {/* ----------------------------- */}
          <Pressable
            onPress={() => {
              setShowEndDate(!showEndDate);
            }}>
            <Text style={styles.titleTextStyle}>{I18n.t('endDate')}</Text>
            <TextInput
              value={
                moment(payload?.date_end).isValid()
                  ? moment(payload?.date_end).format('ll')
                  : 'JJ-MM-YYYY'
              }
              style={styles.textInputStyle}
              placeholder={I18n.t('endDate')}
              editable={false}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setShowBeforeDate(!showBeforeDate);
            }}>
            <Text style={styles.titleTextStyle}>
              {I18n.t('register_before_date')}
            </Text>
            <TextInput
              value={
                moment(payload?.deadline_subscription).isValid()
                  ? moment(payload?.deadline_subscription).format('ll')
                  : 'JJ-MM-YYYY'
              }
              style={styles.textInputStyle}
              placeholder={I18n.t('register_before_date')}
              editable={false}
            />
          </Pressable>
          {/* ----------------------- */}

          <Text style={styles.titleTextStyle}>{I18n.t('type')}</Text>
          <View style={styles.itmeContainerStyle}>
            <Picker
              selectedValue={payload?.type}
              onValueChange={itemValue => handleChange('type', itemValue)}>
              <Picker.Item
                style={styles.itemPickerTextStyle}
                value=""
                label={''}
              />
              <Picker.Item
                style={styles.itemPickerTextStyle}
                value="athletic"
                label={'Sportif'}
              />
              <Picker.Item
                style={styles.itemPickerTextStyle}
                value="cultural"
                label={'Culturel'}
              />
            </Picker>
          </View>
          <View style={styles.checkBoxContainerStyle}>
            <CheckBox
              title={`${I18n.t('online')}`}
              checked={payload?.is_online}
              onPress={() => {
                handleChange('is_online', !payload?.is_online);
                handleChange(
                  'is_hybrid',
                  !payload?.is_online && payload.is_presential,
                );
              }}
            />
            <CheckBox
              title={`${I18n.t('presential')}`}
              checked={payload?.is_presential}
              onPress={() => {
                handleChange('is_presential', !payload?.is_presential);
                handleChange(
                  'is_hybrid',
                  !payload?.is_presential && payload.is_online,
                );
              }}
            />
          </View>
          <CheckBox
            title={`${I18n.t('hybrid')}`}
            checked={payload?.is_hybrid}
            onPress={() => {
              handleChange('is_hybrid', !payload?.is_hybrid);
              handleChange('is_online', !payload?.is_hybrid);
              handleChange('is_presential', !payload?.is_hybrid);
            }}
          />
          <CheckBox
            title={`${I18n.t('public')}`}
            checked={payload?.is_public}
            onPress={() => handleChange('is_public', !payload?.is_public)}
          />
          {(payload?.is_online || payload?.is_hybrid) && (
            <View>
              <Text style={styles.titleTextStyle}>{I18n.t('link')}</Text>
              <TextInput
                value={payload?.link}
                style={styles.textInputStyle}
                placeholder={I18n.t('link')}
                onChangeText={link => handleChange('link', link)}
              />
            </View>
          )}
          {(payload?.is_presential || payload?.is_hybrid) && (
            <View>
              <Text style={styles.titleTextStyle}>{I18n.t('address')}</Text>
              <TextInput
                value={payload?.address}
                style={styles.textInputStyle}
                placeholder={I18n.t('address')}
                onChangeText={address => handleChange('address', address)}
              />
            </View>
          )}
          <Text style={styles.titleTextStyle}>{I18n.t('program')}</Text>
          <TextInput
            value={payload?.program}
            style={styles.textInputStyle}
            placeholder={I18n.t('program')}
            onChangeText={program => handleChange('program', program)}
            multiline
            numberOfLines={3}
          />
          <Text style={styles.titleTextStyle}>{I18n.t('description')}</Text>
          <TextInput
            value={payload?.desc}
            style={styles.textInputStyle}
            placeholder={I18n.t('description')}
            onChangeText={desc => handleChange('desc', desc)}
            multiline
            numberOfLines={3}
          />
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
        </View>
      </ScrollView>
      <DatePicker
        modal
        title={I18n.t('startDate')}
        mode="date"
        minimumDate={new Date()}
        open={showStartDate}
        date={new Date()}
        onConfirm={date_start => {
          setShowStartDate(!showStartDate);
          setPayload({...payload, date_start});
        }}
        onCancel={() => {
          setShowStartDate(!showStartDate);
        }}
      />
      <DatePicker
        modal
        mode="date"
        title={I18n.t('endDate')}
        minimumDate={new Date(payload?.date_start) || new Date()}
        open={showEndDate}
        date={new Date()}
        onConfirm={date_end => {
          setShowEndDate(false);
          setPayload({...payload, date_end});
        }}
        onCancel={() => {
          setShowEndDate(!showEndDate);
        }}
      />
      <DatePicker
        modal
        mode="date"
        title={I18n.t('register_before_date')}
        maximumDate={new Date(payload?.date_end) || new Date()}
        open={showBeforeDate}
        date={new Date()}
        onConfirm={deadline_subscription => {
          setShowBeforeDate(!showBeforeDate);
          setPayload({...payload, deadline_subscription});
        }}
        onCancel={() => {
          setShowBeforeDate(!showBeforeDate);
        }}
      />
      <ImagePicker
        refImageModal={refImageModal}
        takeImage={() => getImage('TAKE')}
        addImage={() => getImage('ADD')}
      />
    </Modal>
  );
};

export default AddEventModal;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bodyContainer: {
    flex: 1,
    padding: 15,
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
  titleTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.darkBlue,
    marginVertical: 10,
  },
  textInputStyle: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: colors.grey,
    borderRadius: 5,
    padding: 10,
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
  },
  itemPickerTextStyle: {
    fontFamily: fonts.type.NunitoRegular,
    fontSize: fonts.size.font12,
    color: colors.gray,
  },
  itmeContainerStyle: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.grey,
  },
  checkBoxContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 25,
  },
  imageContainerstyle: {
    width: '100%',
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: 150,
    width: '100%',
  },
});
