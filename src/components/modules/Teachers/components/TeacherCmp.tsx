/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import fonts from '../../../../theme/fonts';
import colors from '../../../../styles/colors';
import AvatarCmp from '../../../common/AvatarCmp';
import {extractImage} from '../../../../helpers/extractImage';
import I18n from 'react-native-i18n';
import globalStyles from '../../../../styles/globalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {subscribeToTeacher} from '../../../../store/actions/teachersActions';

const TeacherCmp = (props: any) => {
  const {data, navigation, hideFollow, refresh = () => null} = props;
  const dispatch = useDispatch();
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [isSub, setIsSub] = useState(false);
  const {defaultPartner} = useSelector((state: any) => state?.Inst);

  function isSubscribed() {
    setIsSub(
      data?.subscribers?.some((v: any) => v?.partner === defaultPartner),
    );
  }
  function subscribe() {
    setLoadingFollow(true);
    dispatch(
      subscribeToTeacher(
        {
          teacher: data?._id,
          data: {
            partner: defaultPartner,
          },
        },
        () => {
          refresh();

          setLoadingFollow(false);
        },
        (err: any) => {
          setLoadingFollow(false);
          console.log({err});
        },
      ),
    );
  }

  useEffect(() => {
    isSubscribed();
  }, [defaultPartner, data]);

  return (
    <Pressable
      onPress={() => {
        if (!hideFollow) {
          navigation?.navigate('TeacherDetailsScreen', {teacher: data?._id});
        }
      }}
      style={[styles.containerStyle, globalStyles.shadow]}>
      <View
        style={{
          flex: 1,
        }}>
        <AvatarCmp
          name={String(data?.first_name)?.slice(0, 2)}
          uri={extractImage(data?.avatar?.path)}
          size={45}
        />
      </View>

      <View
        style={{
          flex: 5,
          paddingLeft: 10,
        }}>
        <Text
          style={
            styles.titleTextStyle
          }>{`${data?.first_name} ${data?.last_name}`}</Text>
        <Text style={styles.descTextStyle}>{I18n.t(data?.partnertype)}</Text>
      </View>
      <View
        style={{
          flex: 1.5,
          justifyContent: 'center',
        }}>
        {hideFollow ? null : (
          <Pressable
            onPress={subscribe}
            style={[
              styles.followContainerStyle,
              !isSub && {
                backgroundColor: colors.white,
                borderColor: colors.primary,
              },
            ]}>
            {loadingFollow ? (
              <ActivityIndicator
                color={isSub ? colors.white : colors.primary}
                size="small"
              />
            ) : (
              <Text
                style={[
                  styles.followTextStyle,
                  !isSub && {color: colors.primary},
                ]}>
                {isSub ? 'Abonnée' : I18n.t('follow')}
              </Text>
            )}
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default TeacherCmp;

const styles = StyleSheet.create({
  containerStyle: {
    margin: 10,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.darkBlue,
  },
  descTextStyle: {
    fontFamily: fonts.type.NunitoRegular,
    fontSize: fonts.size.font10,
    color: colors.gray,
  },
  followContainerStyle: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: colors.sereneBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.sereneBlue,
    height: 30,
  },
  followTextStyle: {
    fontFamily: fonts.type.NunitoRegular,
    fontSize: fonts.size.font10,
    color: colors.white,
  },
});
