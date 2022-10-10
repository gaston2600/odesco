/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../../styles/colors';
import metrics from '../../../../theme/metrics';
import {extractImage} from '../../../../helpers/extractImage';
import fonts from '../../../../theme/fonts';
import I18n from 'react-native-i18n';
import globalStyles from '../../../../styles/globalStyles';
import Icons from '../../../../styles/icons';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {
  getEvents,
  subscribeEvent,
} from '../../../../store/actions/eventsActions';
import SelectInstitutionModal from '../../../modals/institutions/SelectInstitutionModal';

const {screenWidth, screenHeight} = metrics;
const EventCmp = (props: any) => {
  const dispatch = useDispatch();
  const {data, isInvitation, status} = props;

  const [visibleSelectInst, setVisibleSelectInst] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectedSpace = useSelector((state: any) => state?.User);
  
  function subscribe() {
    setLoading(true);
    // setVisibleSelectInst(false);
    let temp;
    if (selectedSpace?.type === 'Partner') {
      temp = {partner: selectedSpace?._id};
    } else {
      temp = {institution: selectedSpace?._id};
    }
    dispatch(
      subscribeEvent(
        {
          id: data?._id,
          data: temp,
        },
        () => {
          setLoading(false);
          dispatch(
            getEvents(
              {},
              () => null,
              () => null,
            ),
          );
        },
        (_err: any) => {
          setLoading(false);
        },
      ),
    );
  }

  function confirmSelecInstModal(params: any) {
    console.log({params});
    if (params?.type === 'Partner') {
      subscribe({partner: params?._id});
    } else {
      subscribe({institution: params?._id});
    }
  }
  function isSubscribed() {
    return data?.subscribers?.some(
      (v: any) => v?.partner === selectedSpace?._id,
    );
  }

  return (
    <View style={[styles.containerStyle, globalStyles.shadow]}>
      <View style={styles.imageContainerStyle}>
        <Image
          source={
            !data?.cover?.path
              ? require('../../../../../assets/images/odesco_logo.jpg')
              : {uri: extractImage(data?.cover?.path)}
          }
          style={{
            width: '100%',
            height: 150,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        />
      </View>
      <View style={[styles.bodyContainerStyle]}>
        <Text style={styles.titleTextStyle}>{data?.name}</Text>
        <Text style={styles.descTextStyle}>{I18n.t(data?.type)}</Text>
        <View style={styles.rowContainer}>
          <Icons.FontAwesome name="university" size={15} color={colors.grey} />
          <Text style={styles.instTitleTextStyle}>
            {data?.institution?.name
              ? data?.institution?.name
              : `${data?.partner?.first_name} ${data?.partner?.last_name} `}
          </Text>
        </View>

        {data?.address && (
          <View style={styles.rowContainer}>
            <Icons.FontAwesome
              name="map-marker"
              size={15}
              color={colors.grey}
            />
            <Text style={styles.instTitleTextStyle}>{data?.address}</Text>
          </View>
        )}
        {data?.link && (
          <Pressable
            onPress={async () => await Linking.openURL(data?.link)}
            style={styles.rowContainer}>
            <Icons.FontAwesome name="link" size={15} color={colors.grey} />
            <Text
              style={[styles.instTitleTextStyle, {color: colors.sereneBlue}]}>
              {data?.link}
            </Text>
          </Pressable>
        )}
        <View style={styles.rowContainer}>
          <Icons.FontAwesome name="calendar" size={15} color={colors.grey} />
          <Text style={styles.instTitleTextStyle}>{`${moment(
            data?.date_start,
          ).format('ll')} - ${moment(data?.date_end).format('ll')}`}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Icons.FontAwesome name="users" size={15} color={colors.grey} />
          <Text style={styles.instTitleTextStyle}>
            {data?.subscribers?.length}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Pressable
            onPress={() => {
              // setVisibleSelectInst(true);
              subscribe();
            }}
            style={[styles.buttonContainerStyle, styles.rowContainer]}>
            <Icons.FontAwesome name="star-o" size={15} color={colors.white} />
            {loading ? (
              <ActivityIndicator size={'small'} color={colors.white} />
            ) : (
              <Text style={styles.buttonTextStyle}>
                {isSubscribed()
                  ? 'Annuler'
                  : I18n.t(isInvitation ? 'accept' : 'subscribe')}
              </Text>
            )}
          </Pressable>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 20,
          left: -10,
        }}>
        {isInvitation ? (
          <View
            style={[
              styles.statusContainerStyle,
              {backgroundColor: colors.orange},
            ]}>
            {/* <Text style={styles.statusTextStyle}>{status}</Text> */}
            <Text style={styles.statusTextStyle}>{I18n.t(status)}</Text>
          </View>
        ) : null}
        {data?.is_online || data?.is_hybrid ? (
          <View style={styles.statusContainerStyle}>
            <Text style={styles.statusTextStyle}>{I18n.t('onligne')}</Text>
          </View>
        ) : null}
        {data?.is_presential || data?.is_hybrid ? (
          <View
            style={[
              styles.statusContainerStyle,
              {backgroundColor: colors.primary},
            ]}>
            <Text style={styles.statusTextStyle}>{I18n.t('presential')}</Text>
          </View>
        ) : null}
      </View>
      {/* <SelectInstitutionModal
        visible={visibleSelectInst}
        setVisible={setVisibleSelectInst}
        confirm={confirmSelecInstModal}
        selectedList={data?.subscribers?.map((v: any) => ({
          _id: v?._id,
          type: v?.partner ? 'Partner' : 'Institution',
        }))}
      /> */}
    </View>
  );
};

export default EventCmp;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.white,
    width: screenWidth * 0.9,
    alignSelf: 'center',
    minHeight: 320,
    // borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  imageContainerStyle: {
    flex: 1,
  },
  bodyContainerStyle: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderRadius: 5,
    marginTop: -20,
    backgroundColor: colors.white,
    borderColor: colors.lightGray,
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font14,
    color: colors.black,
  },
  descTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.gray,
  },
  instTitleTextStyle: {
    fontFamily: fonts.type.NunitoRegular,
    fontSize: fonts.size.font12,
    color: colors.black,
    marginLeft: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainerStyle: {
    borderWidth: 1,
    borderColor: colors.sereneBlue,
    borderRadius: 5,
    backgroundColor: colors.sereneBlue,
    padding: 5,
    width: screenWidth * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font12,
    color: colors.white,
    marginLeft: 5,
  },
  statusContainerStyle: {
    backgroundColor: colors.sereneBlue,
    // borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    marginVertical: 5,
  },
  statusTextStyle: {
    fontFamily: fonts.type.NunitoRegular,
    fontSize: fonts.size.font10,
    color: colors.white,
  },
});
