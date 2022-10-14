import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from '../../../../styles/globalStyles';
import {ScreenWidth} from '@rneui/base';
import fonts from '../../../../theme/fonts';
import colors from '../../../../styles/colors';
import {extractImage} from '../../../../helpers/extractImage';
import I18n from 'react-native-i18n';
import {useDispatch, useSelector} from 'react-redux';
import {subscribeInst} from '../../../../store/actions';
import Icons from '../../../../styles/icons';

const InstCmp = (props: any) => {
  const {data, refresh = () => null} = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSub, setIsSub] = useState(false);

  const {defaultPartner} = useSelector((state: any) => state?.Inst);
  function isSubscribed() {
    setIsSub(
      data?.subscribers?.some((v: any) => v?.partner === defaultPartner),
    );
  }
  function subscribe() {
    setLoading(true);
    dispatch(
      subscribeInst(
        {
          id: data?._id,
          data: {
            partner: defaultPartner,
          },
        },
        () => {
          setLoading(false);
          isSubscribed();
          refresh();
        },
        (err: any) => {
          setLoading(false);
          console.log({err});
        },
      ),
    );
  }
  useEffect(() => {
    isSubscribed();
  }, [defaultPartner, data]);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.imageContainer}>
        <Image
          source={
            data?.logo?.path
              ? {uri: extractImage(data?.logo?.path)}
              : require('../../../../../assets/images/odesco_logo.jpg')
          }
          style={styles.imageStyle}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bodyContainerStyle}>
        <Text style={styles.titleTextStyle}>{data?.name}</Text>
        <Text style={styles.typeTextStyle}>{I18n.t(data?.type)}</Text>
        <View style={styles.rowContainer}>
          <Icons.Feather name="users" color={colors.grey} size={10} />
          <Text
            style={[
              styles.typeTextStyle,
              {marginLeft: 10, fontSize: fonts.size.font10},
            ]}>
            {data?.subscribers?.length}
          </Text>
        </View>
        <Pressable
          onPress={subscribe}
          style={[
            styles.buttonStyle,
            isSub && {
              backgroundColor: colors.sereneBlue,
              borderColor: colors.sereneBlue,
            },
          ]}>
          {loading ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <Text
              style={[styles.buttonTextStyle, isSub && {color: colors.white}]}>
              {isSub ? 'Abonnée' : 'Suivre'}
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default InstCmp;

const styles = StyleSheet.create({
  containerStyle: {
    ...globalStyles.shadow,
    width: ScreenWidth * 0.45,
    margin: ScreenWidth * 0.025,
    marginVertical: 10,
  },
  imageContainer: {
    height: 150,
    width: '100%',
  },
  imageStyle: {
    height: 150,
    width: '100%',
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoBold,
    fontSize: fonts.size.font12,
    color: colors.darkBlue,
    marginTop: 10,
  },

  typeTextStyle: {
    fontFamily: fonts.type.NunitoRegular,
    fontSize: fonts.size.font12,
    color: colors.gray,
  },
  bodyContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
    width: ScreenWidth * 0.3,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font12,
    color: colors.primary,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
