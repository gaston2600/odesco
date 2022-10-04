import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icons from '../../../styles/icons';
import {Divider} from '@rneui/themed';
import colors from '../../../styles/colors';
import fonts from '../../../theme/fonts';
import I18n from 'react-native-i18n';

const SearchHomeModal = (props: any) => {
  const {visible, setVisible} = props;
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View style={styles.containerStyle}>
        <View style={styles.headerContainerStyle}>
          <Text style={styles.titleTextStyle}>{I18n.t('search')}</Text>
          <Pressable
            onPress={() => setVisible(false)}
            style={styles.closeContainerStyle}>
            <Icons.AntDesign name="left" size={20} color={colors.black} />
          </Pressable>
        </View>
        <Divider orientation="horizontal" />

        <Text>SearchHomeModal</Text>
      </View>
    </Modal>
  );
};

export default SearchHomeModal;

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
  titleTextStyle: {
    fontFamily: fonts.type.NunitoBold,
    fontSize: fonts.size.font14,
  },
  closeContainerStyle: {
    position: 'absolute',
    left: 15,
    right: 15,
  },
});
