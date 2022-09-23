/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Icons from '../../../styles/icons';
import colors from '../../../styles/colors';
import fonts from '../../../theme/fonts';
import {Divider} from '@rneui/themed';
import I18n from 'react-native-i18n';
import globalStyles from '../../../styles/globalStyles';
import moment from 'moment';
import {ScreenWidth} from '@rneui/base';

const TrainingDetailsModal = (props: any) => {
  const {visible, setVisible, data} = props;
  console.log({data});

  function renderType(params: any) {
    if (params?.is_hybrid) {
      return I18n.t('hybrid');
    } else if (params?.is_online) {
      return I18n.t('onligne');
    } else {
      return I18n.t('presential');
    }
  }

  function renderPeriodsDates(params: any) {
    return (
      <View style={styles.contentContainerStyle}>
        <View style={styles.periodsLineContainerStyle}>
          <Text
            style={[
              styles.periodsTextStyle,
              {
                color: colors.darkBlue,
              },
            ]}>
            {moment(params?.dayFrom).format('ll')}
          </Text>
          <Text style={styles.periodsTextStyle}>-</Text>
          <Text
            style={[
              styles.periodsTextStyle,
              {
                color: colors.darkBlue,
              },
            ]}>
            {moment(params?.dayTo).format('ll')}
          </Text>
        </View>
        <FlatList
          scrollEnabled={false}
          data={params?.times}
          renderItem={({item}) => renderPeriodsTimes(item)}
          keyExtractor={(item: any) => item?._id}
        />
      </View>
    );
  }
  function renderDaysDates(params: any) {
    return (
      <View style={styles.contentContainerStyle}>
        <View style={styles.periodsLineContainerStyle}>
          <Text
            style={[
              styles.periodsTextStyle,
              {
                color: colors.darkBlue,
              },
            ]}>
            {moment(params?.day).format('ll')}
          </Text>
        </View>
        <FlatList
          scrollEnabled={false}
          data={params?.times}
          renderItem={({item}) => renderPeriodsTimes(item)}
          keyExtractor={(item: any) => item?._id}
        />
      </View>
    );
  }
  function renderPeriodsTimes(params: any) {
    return (
      <View style={styles.periodsLineContainerStyle}>
        <Text style={styles.periodsTextStyle}>{params?.timeFrom}</Text>
        <Text style={styles.periodsTextStyle}>-</Text>
        <Text style={styles.periodsTextStyle}>{params?.timeTo}</Text>
      </View>
    );
  }

  function renderInfo(params: any) {
    return (
      <View
        style={{
          padding: 10,
          borderRadius: 25,
          backgroundColor: colors.primary,
          margin: 5,
          width: ScreenWidth * 0.3,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontFamily: fonts.type.NunitoSemiBold,
            fontSize: fonts.size.font10,
            color: colors.white,
          }}>
          {params}
        </Text>
      </View>
    );
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <ScrollView style={styles.containerStyle}>
        <View style={styles.headerContainerStyle}>
          <Text style={styles.titleTextStyle}>{I18n.t('training')}</Text>
          <Pressable
            onPress={() => setVisible(false)}
            style={styles.closeContainerStyle}>
            <Icons.AntDesign name="left" size={20} color={colors.black} />
          </Pressable>
        </View>
        <Divider orientation="horizontal" />

        <View style={styles.bodyContainerStyle}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
            }}>
            <Text
              style={[
                {
                  fontFamily: fonts.type.NunitoBold,
                  fontSize: fonts.size.font16,
                  color: colors.darkBlue,
                },
              ]}>
              {data?.name}
            </Text>
            <Text style={styles.descLineTextStyle}>{data?.theme}</Text>
          </View>
          <View style={styles.contentContainerStyle}>
            <View style={styles.lineContainerStyle}>
              <Text style={styles.titleLineTextStyle}>{` ${I18n.t(
                'institute',
              )} : `}</Text>
              <Text style={styles.descLineTextStyle}>
                {data?.institution?.name}
              </Text>
            </View>
          </View>
          <View style={styles.contentContainerStyle}>
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
          </View>
          <View style={styles.contentContainerStyle}>
            <View style={styles.lineContainerStyle}>
              <Text style={styles.titleLineTextStyle}>{` ${I18n.t(
                'type',
              )} : `}</Text>
              <Text style={styles.descLineTextStyle}>{renderType(data)}</Text>
            </View>
            {!!data?.link && (
              <View style={styles.lineContainerStyle}>
                <Text style={styles.titleLineTextStyle}>{` ${I18n.t(
                  'link',
                )} : `}</Text>
                <Text style={styles.descLineTextStyle}>{data?.link}</Text>
              </View>
            )}
            {!!data?.address && (
              <View style={styles.lineContainerStyle}>
                <Text style={styles.titleLineTextStyle}>{` ${I18n.t(
                  'address',
                )} : `}</Text>
                <Text style={styles.descLineTextStyle}>{data?.address}</Text>
              </View>
            )}
          </View>
          {!!data?.desc && (
            <View style={styles.contentContainerStyle}>
              <View style={styles.lineContainerStyle}>
                <Text style={styles.titleLineTextStyle}>{` ${I18n.t(
                  'description',
                )} : `}</Text>
                <Text style={styles.descLineTextStyle}>{data?.desc}</Text>
              </View>
            </View>
          )}
          {!!data?.periods?.length && (
            <View style={styles.contentContainerStyle}>
              <Text style={styles.titleLineTextStyle}>{` ${I18n.t(
                'periods',
              )} : `}</Text>
              <FlatList
                scrollEnabled={false}
                data={data?.periods}
                renderItem={({item}) => renderPeriodsDates(item)}
                keyExtractor={(item: any) => item?._id}
              />
            </View>
          )}
          {!!data?.days?.length && (
            <View style={styles.contentContainerStyle}>
              <Text style={styles.titleLineTextStyle}>{` ${I18n.t(
                'days',
              )} : `}</Text>
              <FlatList
                scrollEnabled={false}
                data={data?.days}
                renderItem={({item}) => renderDaysDates(item)}
                keyExtractor={(item: any) => item?._id}
              />
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            {data?.is_public && renderInfo('Public')}
            {data?.is_free
              ? renderInfo('Gratuit')
              : renderInfo(`${data?.price} ${data?.currency}`)}
          </View>
        </View>
      </ScrollView>
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
    color: colors.sereneBlue,
  },
  descLineTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.darkGray,
    // padding: 5,
  },
  calendarContainerStyle: {
    padding: 10,
  },
  contentContainerStyle: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.grey,
    marginVertical: 5,
  },
  periodsLineContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  periodsTextStyle: {
    fontFamily: fonts.type.NunitoRegular,
    fontSize: fonts.size.font10,
  },
});
