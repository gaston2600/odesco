import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import moment from 'moment';
import I18n from 'react-native-i18n';
import fonts from '../../../theme/fonts';
import colors from '../../../styles/colors';
import {Divider} from '@rneui/themed';
import Icons from '../../../styles/icons';

const AddTimeCmp = (props: any) => {
  const {
    data,
    times,
    index,
    addTime,
    dayIndex,
    removeTime,
    showStarTime,
    showEndTime,
  } = props;
  //   console.log({data});

  return (
    <View key={`times_${Math.random() + 1000 * index}`}>
      <View style={styles.timeContainerStyle}>
        <Pressable
          onPress={() => {
            showStarTime(dayIndex, index);
          }}
          style={styles.timeContainerStyle}>
          <Text style={styles.titleTextStyle}>De</Text>
          {/* <Icons.AntDesign name="clockcircleo" size={20} color={colors.green} /> */}
          <TextInput
            value={data?.timeFrom ? data?.timeFrom : 'HH:mm'}
            style={[styles.textInputStyle, {width: '50%', marginLeft: 10}]}
            placeholder={I18n.t('startDate')}
            editable={false}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            showEndTime(dayIndex, index);
          }}
          style={styles.timeContainerStyle}>
          <Text style={styles.titleTextStyle}>À</Text>
          {/* <Icons.AntDesign name="clockcircleo" size={20} color={colors.red} /> */}
          <TextInput
            value={data?.timeTo ? data?.timeTo : 'HH:mm'}
            style={[styles.textInputStyle, {width: '50%', marginLeft: 10}]}
            placeholder={I18n.t('startDate')}
            editable={false}
          />
        </Pressable>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {times?.length - 1 === index ? (
            <Pressable
              onPress={() => {
                addTime(dayIndex);
              }}
              style={styles.addButtonContainerstyle}>
              <Icons.AntDesign name="plus" size={20} color={colors.primary} />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                removeTime(dayIndex, index);
              }}
              style={styles.addButtonContainerstyle}>
              <Icons.AntDesign name="minus" size={20} color={colors.primary} />
            </Pressable>
          )}
        </View>
      </View>
      <Divider orientation="horizontal" />
    </View>
  );
};

export default AddTimeCmp;

const styles = StyleSheet.create({
  timeContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    flex: 4,
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.darkBlue,
    marginVertical: 5,
  },
  textInputStyle: {
    // width: '100%',
    borderWidth: 0.5,
    borderColor: colors.grey,
    borderRadius: 5,
    padding: 5,
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
  },
  addButtonContainerstyle: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 50,
    padding: 5,
  },
});