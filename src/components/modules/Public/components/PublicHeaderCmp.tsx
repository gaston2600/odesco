import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../../../styles/colors';
import fonts from '../../../../theme/fonts';
import Icons from '../../../../styles/icons';

const PublicHeaderCmp = (props: any) => {
  const {navigation} = props;
  return (
    <View style={styles.containerStyle}>
      <View style={styles.imageContainerStyle}>
        <Image
          source={require('../../../../../assets/icons/menu/odesco_background.png')}
          style={styles.imageStyle}
          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonContainerStyle}>
        <Pressable
          onPress={() => {
            navigation?.navigate('AuthStack');
          }}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connexion</Text>
          {/* <Icons.AntDesign name="login" size={25} color={colors.white} /> */}
        </Pressable>
      </View>
    </View>
  );
};

export default PublicHeaderCmp;

const styles = StyleSheet.create({
  containerStyle: {
    height: 60,
    width: '100%',
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainerStyle: {
    flex: 2,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  imageStyle: {
    height: 30,
    width: 100,
    borderRadius: 50,
    margin: 5,
  },
  buttonContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonStyle: {
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.white,
  },
  buttonTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font10,
    color: colors.white,
  },
});
