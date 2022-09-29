/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar} from '@rneui/base';
import {extractImage} from '../../helpers/extractImage';
import colors from '../../styles/colors';
import Icons from '../../styles/icons';
import {useSelector} from 'react-redux';

const AvatarCmp = ({uri, name, size, inversed, profile}: any) => {
  const [activated, setActivated] = useState(false);
  const {user} = useSelector((state: any) => state?.User);
  useEffect(() => {
    if (!!profile) {
      setActivated(!!user?.phoneVerified && !!user?.emailVerified);
    }
  }, [profile]);

  return !uri ? (
    <Avatar
      size={size}
      rounded
      title={String(name)?.toUpperCase()}
      titleStyle={{
        color: inversed ? colors.primary : colors.white,
        borderColor: inversed ? colors.white : colors.primary,
        borderWidth: 1,
      }}
      containerStyle={{
        backgroundColor: inversed ? colors.white : colors.primary,
        borderWidth: 0.5,
        borderColor: inversed ? colors.primary : `${colors.primaryLight}`,
      }}
    />
  ) : (
    <View
      style={
        !!profile && [
          styles.profileContainerStyle,
          {
            borderColor: activated ? colors.sereneBlue : colors.orange,
          },
        ]
      }>
      <Image
        source={{uri}}
        style={{
          height: size,
          width: size,
          borderRadius: size,
        }}
      />
      {!!profile && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            // backgroundColor: colors.white,
            borderRadius: size,
            backgroundColor: activated ? colors.sereneBlue : colors.orange,
            // padding: 5,
          }}>
          <Icons.MCI
            name={activated ? 'shield-check-outline' : 'alert-circle-outline'}
            size={size / 3}
            color={colors.white}
          />
        </View>
      )}
    </View>

    // <Avatar
    //   size={size}
    //   rounded
    //   source={{uri}}
    //   containerStyle={{
    //     borderWidth: 1,
    //     borderColor: inversed ? colors.white : colors.primary,
    //   }}
    // />
  );
};

export default AvatarCmp;

const styles = StyleSheet.create({
  profileContainerStyle: {
    borderRadius: 100,
    borderWidth: 3,
  },
});
