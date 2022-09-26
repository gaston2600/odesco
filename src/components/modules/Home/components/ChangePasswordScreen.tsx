import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icons from '../../../../styles/icons';
import {Divider} from '@rneui/themed';
import colors from '../../../../styles/colors';
import fonts from '../../../../theme/fonts';
import I18n from 'react-native-i18n';

const ChangePasswordScreen = (props: any) => {
  const {navigation} = props;
  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.headerTitleTextStyle}>
          {I18n.t('change_password')}
        </Text>
        <Pressable
          onPress={() => navigation?.goBack()}
          style={styles.closeContainerStyle}>
          <Icons.AntDesign name="left" size={20} color={colors.black} />
        </Pressable>
      </View>
      <Divider orientation="horizontal" />
      <View style={styles.bodyContainerStyle}>
        <Text>{I18n.t('change_password')}</Text>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;

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
  headerTitleTextStyle: {
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
});
