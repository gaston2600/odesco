import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import EventTabNavigator from '../../../navigation/tabs/EventTabNavigator';
import colors from '../../../styles/colors';
import Icons from '../../../styles/icons';
import fonts from '../../../theme/fonts';
import {Divider} from '@rneui/themed';
import I18n from 'react-native-i18n';

const EventsScreen = (props: any) => {
  const {navigation} = props;
  const [searchInput, setSearchInput] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerContainerStyle}>
        <Pressable
          onPress={() => {
            navigation?.goBack();
          }}>
          <Icons.AntDesign
            name="left"
            size={20}
            //   color={colors.darkGray}
          />
        </Pressable>
        {!showSearchInput ? (
          <Text style={styles.titleTextStyle}>{I18n.t('events')}</Text>
        ) : (
          <TextInput
            // ref={refSearchInput}
            value={searchInput}
            onChangeText={setSearchInput}
            style={styles.textInputStyle}
            placeholder={I18n.t('search')}
            focusable
          />
        )}
        <Pressable
          onPress={() => {
            setShowSearchInput(!showSearchInput);
            if (!showSearchInput) {
              //   refSearchInput?.current?.focus();
            } else {
              setSearchInput('');
            }
          }}
          style={styles.closeContainerStyle}>
          <Icons.AntDesign
            name={showSearchInput ? 'close' : 'search1'}
            size={20}
            color={colors.black}
          />
        </Pressable>
      </View>
      <Divider orientation="horizontal" />
      <View
        style={{
          flex: 1,
        }}>
        <EventTabNavigator searchInput={searchInput} />
      </View>
    </View>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textInputStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.gray,
    paddingHorizontal: 5,
    flex: 8,
  },
  headerContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    height: 60,
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font14,
  },
  closeContainerStyle: {
    // position: 'absolute',
    // left: 15,
    // right: 15,
  },
});
