import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyles from '../../../../styles/globalStyles';
import {ScreenWidth} from '@rneui/base';
import fonts from '../../../../theme/fonts';
import colors from '../../../../styles/colors';
import {extractImage} from '../../../../helpers/extractImage';
import I18n from 'react-native-i18n';

const CoursCmp = (props: any) => {
  const {data, navigation} = props;

//   console.log({data}, data?.name);

  return (
    <Pressable
      onPress={() => {
        navigation?.navigate('CoursDetailsScreen', {id: data?._id});
      }}
      style={styles.containerStyle}>
      <View style={styles.imageContainer}>
        <Image
          source={
            data?.cover?.path
              ? {uri: extractImage(data?.cover?.path)}
              : require('../../../../../assets/images/odesco_logo.jpg')
          }
          style={styles.imageStyle}
          resizeMode="cover"
        />
      </View>

      <View style={styles.bodyContainerStyle}>
        <Text numberOfLines={1} style={styles.titleTextStyle}>
          {data?.name}
        </Text>
        {!!data?.theme && (
          <Text numberOfLines={2} style={styles.typeTextStyle}>
            {data?.theme}
          </Text>
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          top: 20,
          left: -10,
        }}>
        {data?.price ? (
          <View
            style={[
              styles.statusContainerStyle,
              {backgroundColor: colors.red},
            ]}>
            <Text
              style={
                styles.statusTextStyle
              }>{`${data?.price} ${data?.currency}`}</Text>
          </View>
        ) : null}
        {data?.is_free ? (
          <View style={[styles.statusContainerStyle]}>
            <Text style={styles.statusTextStyle}>{I18n.t('free')}</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

export default CoursCmp;

const styles = StyleSheet.create({
  containerStyle: {
    ...globalStyles.shadow,
    width: ScreenWidth * 0.4,
    margin: ScreenWidth * 0.05,
    marginVertical: 10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  imageContainer: {
    height: 130,
    width: '100%',
  },
  imageStyle: {
    height: 120,
    width: '100%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoBold,
    fontSize: fonts.size.font12,
    color: colors.darkBlue,
    // marginTop: 10,
  },

  typeTextStyle: {
    fontFamily: fonts.type.NunitoRegular,
    fontSize: fonts.size.font12,
    color: colors.gray,
  },
  bodyContainerStyle: {
    flex: 1,
    // justifyContent: 'space-between',
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
