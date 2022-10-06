import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import fonts from '../../../../theme/fonts';
import colors from '../../../../styles/colors';

const AdminisrationScreen = () => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>Disponible sur l'éspace Web</Text>
    </View>
  );
};

export default AdminisrationScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: fonts.type.NunitoBold,
    fontSize: fonts.size.font16,
    color: colors.primary,
  },
});
