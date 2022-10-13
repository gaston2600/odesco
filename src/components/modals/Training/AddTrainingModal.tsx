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
import colors from '../../../styles/colors';
import fonts from '../../../theme/fonts';
import Icons from '../../../styles/icons';
import I18n from 'react-native-i18n';
import {CheckBox, Divider} from '@rneui/themed';
import {addImage, takeImage} from '../../common/CameraActions';
import {useDispatch, useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import ButtonCmp from '../../common/ButtonCmp';
import {ScreenWidth} from '@rneui/base';
import {Picker} from '@react-native-picker/picker';
import moment, {duration} from 'moment';
import ImagePicker from '../../common/ImagePicker';
import {trainingThemes} from '../../../config/CONSTANTS';
import AddDayCmp from './AddDayCmp';
import AddPeriodCmp from './AddPeriodCmp';
import {createTraining} from '../../../store/actions/trainingActions';

const AddTrainingModal = (props: any) => {
  const {visible, setVisible, space, refresh} = props;
  const dispatch = useDispatch();

  const {user} = useSelector((state: any) => state?.User);
  const [payload, setPayload] = useState({
    name: '',
    duration: '0',
    cover: null,
    theme: '',
    date_start: new Date(),
    date_end: new Date(),
    deadline_subscription: new Date(),
    program: '',
    desc: '',
    is_public: true,
    is_online: false,
    is_hybrid: false,
    is_presential: false,
    is_free: true,
    price: '0',
    currency: 'TND',
    address: '',
    link: '',
    user: user?._id,
    inst_id: space?._id,
    days: [
      {
        day: null,
        times: [{timeFrom: '', timeTo: '', duration: ''}],
      },
    ],
    periods: [
      {
        dayFrom: null,
        dayTo: null,
        times: [{timeFrom: '', timeTo: '', duration: ''}],
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const refImageModal = useRef();
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [isPeriod, setIsPeriod] = useState(false);

  const [showDateJour, setShowDateJour] = useState(false);
  const [tempDayIndex, setTempDayIndex] = useState(0);
  const [tempDayType, setTempDayType] = useState('start');

  const [showStartDayPeriod, setShowStartDayPeriod] = useState(false);
  const [showEndDayPeriod, setShowEndDayPeriod] = useState(false);

  const [showStartTimeJour, setShowStartTimeJour] = useState(false);
  const [showEndTimeJour, setShowEndTimeJour] = useState(false);
  const [tempTimeIndex, setTempTimeIndex] = useState(0);

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

  const calculDuration = (start: any, end: any) => {
    try {
      if (
        start &&
        end &&
        start !== '' &&
        end !== '' &&
        end !== '00:00' &&
        start !== '00:00'
      ) {
        const duration = moment.duration(
          Number(
            moment(moment().format('YYYY-MM-DD') + ' ' + end).diff(
              moment().format('YYYY-MM-DD') + ' ' + start,
              'milliseconds',
            ) || 0,
          ) || 0,
          'milliseconds',
        );

        const hours = Math.floor(duration.asHours());
        // return hours + ":" + Math.floor(duration.asMinutes()) - hours * 60;
        const durationTime = String(
          hours + ':' + (Math.floor(duration.asMinutes()) - hours * 60),
        )
          .padEnd(4, '0')
          .padStart(5, '0');
        return durationTime;
      }
    } catch (error) {
      return '';
    }
  };

  function AddDayJour() {
    setPayload((prev: any) => ({
      ...prev,
      days: [
        ...payload.days,
        {
          day: null,
          times: [{timeFrom: '', timeTo: '', duration: ''}],
        },
      ],
    }));
  }

  function removeDayJour(index) {
    setPayload((prev: any) => ({
      ...prev,
      days: payload?.days?.filter((_: any, i: any) => i !== index),
    }));
  }
  function editDayJour(index, value) {
    setPayload((prev: any) => ({
      ...prev,
      days: payload?.days?.map((item: any, i: any) => {
        let temp: any = item;
        if (i === index) {
          temp.day = moment(value).format('YYYY-MM-DD');
        }
        return temp;
      }),
    }));
  }

  function addTimeJour(index: any) {
    setPayload((prev: any) => ({
      ...prev,
      days: payload.days?.map((item: any, i: any) => {
        let temp = item;
        if (index === i) {
          temp?.times?.push({timeFrom: '', timeTo: '', duration: ''});
        }
        return temp;
      }),
    }));
  }
  function removeTimeJour(index: any, indexTime: any) {
    setPayload((prev: any) => ({
      ...prev,
      days: payload.days?.map((item: any, i: any) => {
        let temp = item;
        if (index === i) {
          temp.times = item?.times?.filter((_: any, j: any) => j !== indexTime);
        }
        return temp;
      }),
    }));
  }

  function editTimeJour(dayIndex: any, timeIndex: any, key: any, value: any) {
    const new_times = [...payload?.days[dayIndex].times];
    if (key === 'start') {
      new_times[timeIndex].timeFrom = moment(value).format('HH:mm');
    } else {
      new_times[timeIndex].timeTo = moment(value).format('HH:mm');
    }
    const new_duration = calculDuration(
      new_times[timeIndex].timeFrom,
      new_times[timeIndex].timeTo,
    );
    if (new_duration) {
      new_times[timeIndex].duration = new_duration;
    }

    const new_days = payload?.days;
    new_days[dayIndex].times = new_times;
    setPayload((prev: any) => ({
      ...prev,
      days: new_days,
    }));
  }

  function addPeriod() {
    setPayload((prev: any) => ({
      ...prev,
      periods: [
        ...payload.periods,
        {
          dayFrom: null,
          dayTo: null,
          times: [{timeFrom: '', timeTo: '', duration: ''}],
        },
      ],
    }));
  }
  function removePeriod(index: any) {
    setPayload((prev: any) => ({
      ...prev,
      periods: payload?.periods?.filter((_: any, i: any) => i !== index),
    }));
  }

  function addTimePeriod(index: any) {
    setPayload((prev: any) => ({
      ...prev,
      periods: payload.periods?.map((item: any, i: any) => {
        let temp = item;
        if (index === i) {
          temp?.times?.push({timeFrom: '', timeTo: '', duration: ''});
        }
        return temp;
      }),
    }));
  }
  function removeTimePeriod(index: any, indexTime: any) {
    setPayload((prev: any) => ({
      ...prev,
      periods: payload.periods?.map((item: any, i: any) => {
        let temp = item;
        if (index === i) {
          temp.times = item?.times?.filter((_: any, j: any) => j !== indexTime);
        }
        return temp;
      }),
    }));
  }
  function editTimePeriod(dayIndex: any, timeIndex: any, key: any, value: any) {
    const new_times = [...payload?.periods[dayIndex].times];
    if (key === 'start') {
      new_times[timeIndex].timeFrom = moment(value).format('HH:mm');
    } else {
      new_times[timeIndex].timeTo = moment(value).format('HH:mm');
    }
    const new_duration = calculDuration(
      new_times[timeIndex].timeFrom,
      new_times[timeIndex].timeTo,
    );
    if (new_duration) {
      new_times[timeIndex].duration = new_duration;
    }
    const new_periods = payload?.periods;
    new_periods[dayIndex].times = new_times;
    setPayload((prev: any) => ({
      ...prev,
      periods: new_periods,
    }));
  }
  function editPeriod(index: any, key: any, value: any) {
    const new_periods = payload?.periods;
    if (key === 'start') {
      new_periods[index].dayFrom = moment(value).format('YYYY-MM-DD');
    } else {
      new_periods[index].dayTo = moment(value).format('YYYY-MM-DD');
    }
    handleChange('periods', new_periods);
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
    const {
      name,
      theme,
      date_start,
      date_end,
      address,
      desc,
      duration,
      is_public,
      is_free,
      price,
      days,
      periods,
      is_online,
      is_presential,
      is_hybrid,
      link,
      currency,
    } = payload;
    // const { user, token, inst, addTraining, history } = this.props
    let data = {
      name,
      theme,
      is_free,
      price,
      currency,
      is_online,
      is_presential,
      is_hybrid,
      date_start: new Date(date_start).getTime(),
      date_end: new Date(date_end).getTime(),
      desc,
      duration,
      is_public,

      user: user ? user._id : '',

      inst_id: space?._id,
    };
    if (is_presential || is_hybrid) data.address = address;
    if (is_online || is_hybrid) data.link = link;

    if (!isPeriod) {
      for (let i = 0; i < days.length; i++) {
        const element = days[i];
        if (element && (element.day === '' || !element.day)) {
          days.splice(i, 1);
          i--;
        }
      }
    }

    if (isPeriod) {
      for (let i = 0; i < periods.length; i++) {
        const element = periods[i];
        if (
          element &&
          (element.dayFrom === '' ||
            !element.dayTo ||
            element.dayTo === '' ||
            !element.dayFrom)
        ) {
          periods.splice(i, 1);
          i--;
        }
      }
    }

    if (name !== '') {
      if (!isPeriod && days && days.length) data['days'] = days;
      if (isPeriod && periods && periods.length) data['periods'] = periods;
      console.log({data});
      setLoading(true);
      dispatch(
        createTraining(
          data,
          (res: any) => {
            // console.log({res});
            setLoading(false);
            refresh();
            setVisible(false);
          },
          (err: any) => {
            console.log('err :>> ', err);
            setLoading(false);
          },
        ),
      );
    } else {
      ToastAndroid.show('Nom obligatoire', ToastAndroid.SHORT);
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
            {I18n.t('add_new_training')}
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
          <Text style={styles.titleTextStyle}>{I18n.t('training_name')}</Text>
          <TextInput
            value={payload?.name}
            onChangeText={name => handleChange('name', name)}
            style={styles.textInputStyle}
            placeholder={I18n.t('training_name')}
          />

          <Pressable
            onPress={() => {
              setShowStartDate(!showStartDate);
            }}>
            <Text style={styles.titleTextStyle}>{I18n.t('startDate')}</Text>
            <TextInput
              value={
                moment(payload?.date_start).isValid()
                  ? moment(payload?.date_start).format('ll')
                  : 'YYYY-MM-DD'
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
                  : 'YYYY-MM-DD'
              }
              style={styles.textInputStyle}
              placeholder={I18n.t('endDate')}
              editable={false}
            />
          </Pressable>

          {/* ----------------------- */}

          <Text style={styles.titleTextStyle}>{I18n.t('type')}</Text>
          <View style={styles.itmeContainerStyle}>
            <Picker
              selectedValue={payload?.theme}
              onValueChange={itemValue => handleChange('theme', itemValue)}>
              <Picker.Item
                style={styles.itemPickerTextStyle}
                value=""
                label={''}
              />
              {trainingThemes?.map((item: any) => {
                return (
                  <Picker.Item
                    style={styles.itemPickerTextStyle}
                    value={item?.value}
                    label={item?.label}
                    key={item?.key}
                  />
                );
              })}
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
          <View style={styles.checkBoxContainerStyle}>
            <CheckBox
              title={`${I18n.t('public')}`}
              checked={payload?.is_public}
              onPress={() => handleChange('is_public', !payload?.is_public)}
            />
            <CheckBox
              title={`${I18n.t('free')}`}
              checked={payload?.is_free}
              onPress={() => handleChange('is_free', !payload?.is_free)}
            />
          </View>
          {!payload?.is_free && (
            <View>
              <Text style={styles.titleTextStyle}>{I18n.t('price')}</Text>
              <TextInput
                value={payload?.price}
                onChangeText={(price: any) => handleChange('price', price)}
                style={styles.textInputStyle}
                placeholder={I18n.t('price')}
                keyboardType="number-pad"
              />
            </View>
          )}
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

          <Text style={styles.titleTextStyle}>{I18n.t('duration')}</Text>
          <TextInput
            value={payload?.duration}
            style={styles.textInputStyle}
            placeholder={I18n.t('duration')}
            onChangeText={duration => handleChange('duration', duration)}
            keyboardType="number-pad"
          />
          <View style={styles.durationContainerStyle}>
            <Pressable
              onPress={() => setIsPeriod(!isPeriod)}
              style={[
                styles.durationButtonStyle,
                !isPeriod && {backgroundColor: colors.white},
              ]}>
              <Text
                style={[
                  styles.durationButtonTextStyle,
                  !isPeriod && {color: colors.primary},
                ]}>
                Jour
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setIsPeriod(!isPeriod)}
              style={[
                styles.durationButtonStyle,
                isPeriod && {backgroundColor: colors.white},
              ]}>
              <Text
                style={[
                  styles.durationButtonTextStyle,
                  isPeriod && {color: colors.primary},
                ]}>
                Période
              </Text>
            </Pressable>
          </View>
          {!isPeriod && (
            <View style={styles.timeContainerStyle}>
              {payload?.days?.map((item: any, index: any) => (
                <AddDayCmp
                  data={item}
                  index={index}
                  addDay={AddDayJour}
                  removeDay={removeDayJour}
                  days={payload?.days}
                  showDate={(indx: any) => {
                    setTempDayIndex(indx);
                    setShowDateJour(!showDateJour);
                  }}
                  addTime={addTimeJour}
                  removeTime={removeTimeJour}
                  showStarTime={(dayIndex: any, timeIndex: any) => {
                    setTempDayIndex(dayIndex);
                    setTempTimeIndex(timeIndex);
                    setShowStartTimeJour(!showStartTimeJour);
                  }}
                  showEndTime={(dayIndex: any, timeIndex: any) => {
                    setTempDayIndex(dayIndex);
                    setTempTimeIndex(timeIndex);
                    setShowEndTimeJour(!showEndTimeJour);
                  }}
                />
              ))}
            </View>
          )}

          {isPeriod && (
            <View style={styles.timeContainerStyle}>
              {payload?.periods?.map((item: any, index: any) => (
                <AddPeriodCmp
                  data={item}
                  index={index}
                  addDay={addPeriod}
                  removeDay={removePeriod}
                  days={payload?.periods}
                  showDate={(indx: any, type: any) => {
                    setTempDayType(type);
                    setTempDayIndex(indx);
                    if (type === 'start') {
                      setShowStartDayPeriod(true);
                    } else {
                      setShowEndDayPeriod(true);
                    }
                  }}
                  addTime={addTimePeriod}
                  removeTime={removeTimePeriod}
                  showStarTime={(dayIndex: any, timeIndex: any) => {
                    setTempDayIndex(dayIndex);
                    setTempTimeIndex(timeIndex);
                    setShowStartTimeJour(!showStartTimeJour);
                  }}
                  showEndTime={(dayIndex: any, timeIndex: any) => {
                    setTempDayIndex(dayIndex);
                    setTempTimeIndex(timeIndex);
                    setShowEndTimeJour(!showEndTimeJour);
                  }}
                />
              ))}
            </View>
          )}

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
        // title={I18n.t('endDate')}
        // maximumDate={new Date(payload?.date_start) || new Date()}
        open={showDateJour}
        date={new Date()}
        onConfirm={date => {
          setShowDateJour(false);
          if (isPeriod) {
            editPeriod(tempDayIndex, tempDayType, date);
          } else {
            editDayJour(tempDayIndex, date);
          }
        }}
        onCancel={() => {
          setShowDateJour(!showDateJour);
        }}
      />
      {/* -----------------------------starDate period */}
      <DatePicker
        modal
        mode="date"
        // title={I18n.t('endDate')}
        // maximumDate={new Date(payload?.date_start) || new Date()}
        open={showStartDayPeriod}
        date={new Date()}
        onConfirm={date => {
          setShowStartDayPeriod(false);
          editPeriod(tempDayIndex, 'start', date);
        }}
        onCancel={() => {
          setShowStartDayPeriod(false);
        }}
      />
      {/* -----------------------------endDate period */}
      <DatePicker
        modal
        mode="date"
        // title={I18n.t('endDate')}
        // maximumDate={new Date(payload?.date_start) || new Date()}
        open={showEndDayPeriod}
        date={new Date()}
        onConfirm={date => {
          setShowEndDayPeriod(false);
          editPeriod(tempDayIndex, 'end', date);
        }}
        onCancel={() => {
          setShowEndDayPeriod(!showEndDayPeriod);
        }}
      />
      <DatePicker
        modal
        mode="time"
        // title={I18n.t('endDate')}
        // minimumDate={
        //   moment(
        //     payload?.days[tempDayIndex]?.times[tempTimeIndex]?.timeTo,
        //   ).isValid()
        //     ? new Date(
        //         payload?.days[tempDayIndex]?.times[tempTimeIndex]?.timeTo,
        //       )
        //     : new Date()
        // }
        open={showStartTimeJour}
        date={new Date()}
        onConfirm={date => {
          setShowStartTimeJour(false);
          if (isPeriod) {
            editTimePeriod(tempDayIndex, tempTimeIndex, 'start', date);
          } else {
            editTimeJour(tempDayIndex, tempTimeIndex, 'start', date);
          }
        }}
        onCancel={() => {
          setShowStartTimeJour(false);
        }}
      />
      <DatePicker
        modal
        mode="time"
        // title={I18n.t('endDate')}
        // maximumDate={
        //   moment(
        //     payload?.days[tempDayIndex]?.times[tempTimeIndex]?.timeFrom,
        //   ).isValid()
        //     ? new Date(
        //         payload?.days[tempDayIndex]?.times[tempTimeIndex]?.timeFrom,
        //       )
        //     : new Date()
        // }
        open={showEndTimeJour}
        date={new Date()}
        onConfirm={date => {
          setShowEndTimeJour(false);
          if (isPeriod) {
            editTimePeriod(tempDayIndex, tempTimeIndex, 'end', date);
          } else {
            editTimeJour(tempDayIndex, tempTimeIndex, 'end', date);
          }
        }}
        onCancel={() => {
          setShowEndTimeJour(false);
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

export default AddTrainingModal;

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
  durationContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  durationButtonStyle: {
    width: ScreenWidth * 0.3,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  durationButtonTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.white,
  },
  timeContainerStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.grey,
    padding: 10,
    marginVertical: 10,
  },
});
