import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icons from '../../../styles/icons';
import colors from '../../../styles/colors';
import fonts from '../../../theme/fonts';
import {Divider} from '@rneui/themed';
import I18n from 'react-native-i18n';
import globalStyles from '../../../styles/globalStyles';
import moment from 'moment';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';

const TrainingDetailsModal = (props: any) => {
  const {visible, setVisible, data} = props;
  function renderType(params: any) {
    if (params?.is_hybrid) {
      return I18n.t('hybrid');
    } else if (params?.is_online) {
      return I18n.t('onligne');
    } else {
      return I18n.t('presential');
    }
  }

  LocaleConfig.locales['fr'] = {
    monthNames: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ],
    monthNamesShort: [
      'Janv.',
      'Févr.',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juil.',
      'Août',
      'Sept.',
      'Oct.',
      'Nov.',
      'Déc.',
    ],
    dayNames: [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = 'fr';
  const getDaysArray = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push({
        [moment(dt).format('YYYY-MM-DD')]: {
          selected: true,
          startingDay: true,
          color: colors.primary,
        },
      });
    }
    return arr;
  };
  let temp = getDaysArray(data?.date_start, data?.date_end);
  let tempObj = {};
  for (const iterator of temp) {
    tempObj = {
      ...tempObj,
      [iterator]: {selected: true},
    };
  }

  console.log(temp);

  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View style={styles.containerStyle}>
        <View style={styles.headerContainerStyle}>
          <Text style={styles.titleTextStyle}>{data?.name}</Text>
          <Pressable
            onPress={() => setVisible(false)}
            style={styles.closeContainerStyle}>
            <Icons.AntDesign name="left" size={20} color={colors.black} />
          </Pressable>
        </View>
        <Divider orientation="horizontal" />
        <View style={styles.bodyContainerStyle}>
          <View style={styles.calendarContainerStyle}>
            <Calendar
              initialDate={moment(data?.date_start).format('YYYY-MM-DD')}
              minDate={moment(data?.date_start).format('YYYY-MM-DD')}
              maxDate={moment(data?.date_end).format('YYYY-MM-DD')}
              markingType={'period'}
              markedDates={{
                [moment(data?.date_start).format('YYYY-MM-DD')]: {
                  selected: true,
                  startingDay: true,
                  color: colors.primary,
                },
                [moment(data?.date_start).add(1, 'day').format('YYYY-MM-DD')]: {
                  selected: true,
                  endingDay: true,
                  color: colors.primary,
                },
                [moment(data?.date_end).format('YYYY-MM-DD')]: {
                  selected: true,
                  endingDay: true,
                  color: colors.primary,
                },
              }}
              monthFormat={'MMM yyyy'}
              firstDay={1}
              theme={{
                textDayFontFamily: fonts.type.NunitoMedium,
                textMonthFontFamily: fonts.type.NunitoMedium,
                textDayHeaderFontFamily: fonts.type.NunitoMedium,
                textDayFontSize: fonts.size.font12,
                textMonthFontSize: fonts.size.font12,
                textDayHeaderFontSize: fonts.size.font12,
              }}
            />
          </View>
          <View style={styles.lineContainerStyle}>
            <Text style={styles.titleLineTextStyle}>{` ${I18n.t(
              'startDate',
            )} : `}</Text>
            <Text style={styles.descLineTextStyle}>
              {moment(data?.date_start).format('ll')}
            </Text>
          </View>
          <View style={styles.lineContainerStyle}>
            <Text style={styles.titleLineTextStyle}>{` ${I18n.t(
              'endDate',
            )} : `}</Text>
            <Text style={styles.descLineTextStyle}>
              {moment(data?.date_end).format('ll')}
            </Text>
          </View>
          <View style={styles.lineContainerStyle}>
            <Text style={styles.titleLineTextStyle}>{` ${I18n.t(
              'theme',
            )} : `}</Text>
            <Text style={styles.descLineTextStyle}>{data?.theme}</Text>
          </View>
          <View style={styles.lineContainerStyle}>
            <Text style={styles.titleLineTextStyle}>{` ${I18n.t(
              'type',
            )} : `}</Text>
            <Text style={styles.descLineTextStyle}>{renderType(data)}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TrainingDetailsModal;

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
  titleTextStyle: {
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
  lineContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 5,
    // ...globalStyles.shadow,
    // padding: 10,
  },
  titleLineTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.darkBlue,
  },
  descLineTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.gray,
    // padding: 5,
  },
  calendarContainerStyle: {
    padding: 10,
  },
});
