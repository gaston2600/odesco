import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import fonts from '../../theme/fonts';
import colors from '../../styles/colors';

const ButtonCmp = (props: any) => {
  const {label, action, width, loading} = props;
  const newStyles = props?.styles || {};
  return (
    <Pressable
      onPress={action}
      style={[styles.containerStyle, width && {width}]}>
      {loading ? (
        <ActivityIndicator size={'small'} color={colors.white} />
      ) : (
        <Text style={styles.labelTextStyle}>{label}</Text>
      )}
    </Pressable>
  );
};

export default ButtonCmp;

const styles = StyleSheet.create({
  containerStyle: {
    padding: 10,
    // borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.white,
  },
});
