import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Icons from '../../styles/icons';
import colors from '../../styles/colors';

const GoBackNavigation = (props: any) => {
  console.log({props});

  const {navigation} = props;
  return (
    <Pressable
      onPress={() => {
        console.log('pressed');

        navigation?.goBack();
      }}
      style={styles.containerStyle}>
      <Icons.AntDesign name="left" size={25} color={colors.gray} />
    </Pressable>
  );
};

export default GoBackNavigation;

const styles = StyleSheet.create({
  containerStyle: {
    padding: 10,
  },
});
