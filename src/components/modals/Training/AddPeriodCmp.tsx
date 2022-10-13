/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import moment from 'moment';
import I18n from 'react-native-i18n';
import fonts from '../../../theme/fonts';
import colors from '../../../styles/colors';
import Icons from '../../../styles/icons';
import AddTimeCmp from './AddTimeCmp';

const AddPeriodCmp = (props: any) => {
  const {
    data,
    index,
    addDay,
    days,
    removeDay,
    showDate,
    addTime,
    removeTime,
    showStarTime,
    showEndTime,
  } = props;
  console.log({data});

  return (
    <View>
      <View key={`${index}_periods`}>
        <Pressable style={styles.timeContainerStyle}>
          <View
            style={{
              // borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              flex: 6,
            }}>
            <Pressable
              onPress={() => {
                showDate(index, 'start');
              }}>
              <Text style={[styles.titleTextStyle, {flex: 1}]}>Début</Text>
              <TextInput
                value={data?.dayFrom ? data?.dayFrom : 'JJ-MM-YYYY'}
                style={[styles.textInputStyle, {flex: 5}]}
                placeholder={I18n.t('startDate')}
                editable={false}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                showDate(index, 'end');
              }}>
              <Text style={[styles.titleTextStyle, {flex: 1}]}>Fin</Text>
              <TextInput
                value={data?.dayTo ? data?.dayTo : 'JJ-MM-YYYY'}
                style={[styles.textInputStyle, {flex: 5}]}
                placeholder={I18n.t('startDate')}
                editable={false}
              />
            </Pressable>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text> </Text>
            {days?.length - 1 === index ? (
              <Pressable
                onPress={() => addDay()}
                style={styles.addButtonContainerstyle}>
                <Icons.AntDesign name="plus" size={20} color={colors.white} />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => removeDay(index)}
                style={styles.addButtonContainerstyle}>
                <Icons.AntDesign name="minus" size={20} color={colors.white} />
              </Pressable>
            )}
          </View>
        </Pressable>
        {data?.times?.map((time: any, indx: any) => (
          <AddTimeCmp
            data={time}
            index={indx}
            times={data?.times}
            addTime={addTime}
            dayIndex={index}
            removeTime={removeTime}
            showStarTime={showStarTime}
            showEndTime={showEndTime}
          />
        ))}
      </View>
    </View>
  );
};

export default AddPeriodCmp;

const styles = StyleSheet.create({
  timeContainerStyle: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    // borderWidth: 1,
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.darkBlue,
    marginVertical: 10,
  },
  textInputStyle: {
    // width: '100%',
    borderWidth: 0.5,
    borderColor: colors.grey,
    borderRadius: 5,
    padding: 10,
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
  },
  addButtonContainerstyle: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    padding: 5,
  },
});
