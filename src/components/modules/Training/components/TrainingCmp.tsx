import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {ScreenWidth} from '@rneui/base';
import fonts from '../../../../theme/fonts';
import colors from '../../../../styles/colors';
import globalStyles from '../../../../styles/globalStyles';
import moment from 'moment';
import I18n from 'react-native-i18n';
import Icons from '../../../../styles/icons';
import TrainingDetailsModal from '../../../modals/Training/TrainingDetailsModal';
const TrainingCmp = (props: any) => {
  const {data} = props;
  const [showTrainingModal, setShowTrainingModal] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setShowTrainingModal(true);
      }}
      style={[styles.containerStyle, globalStyles.shadow]}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../../../../assets/images/odesco_logo.jpg')}
          style={{
            width: ScreenWidth * 0.35,
            height: 120,
          }}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bodyContainerStyle}>
        <Text style={styles.titleTextStyle}>{data?.name}</Text>
        <Text
          numberOfLines={1}
          style={[styles.descTextStyle, {color: colors.gray, marginLeft: 0}]}>
          {data?.theme}
        </Text>
        <View style={styles.rowContainer}>
          <Icons.AntDesign name="team" size={10} color={colors.grey} />
          <Text style={styles.descTextStyle}>{data?.subscribers?.length}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Icons.AntDesign name="calendar" size={10} color={colors.green} />
          <Text style={styles.descTextStyle}>
            {moment(data?.date_start).format('ll')}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Icons.AntDesign name="calendar" size={10} color={colors.red} />
          <Text style={styles.descTextStyle}>
            {moment(data?.date_end).format('ll')}
          </Text>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 20,
          left: -10,
        }}>
        {data?.is_online || data?.is_hybrid ? (
          <View style={styles.statusContainerStyle}>
            <Text style={styles.statusTextStyle}>{I18n.t('onligne')}</Text>
          </View>
        ) : null}
        {data?.is_presential || data?.is_hybrid ? (
          <View
            style={[
              styles.statusContainerStyle,
              {backgroundColor: colors.primary},
            ]}>
            <Text style={styles.statusTextStyle}>{I18n.t('presential')}</Text>
          </View>
        ) : null}
      </View>
      <TrainingDetailsModal
        visible={showTrainingModal}
        setVisible={setShowTrainingModal}
        data={data}
      />
    </TouchableOpacity>
  );
};

export default TrainingCmp;

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 5,
    margin: 15,
    width: ScreenWidth * 0.4,
  },
  bodyContainerStyle: {
    padding: 10,
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font14,
    color: colors.darkBlue,
  },
  descTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font10,
    color: colors.grey,
    marginLeft: 5,
  },
  statusContainerStyle: {
    backgroundColor: colors.sereneBlue,
    // borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    marginVertical: 5,
  },
  statusTextStyle: {
    fontFamily: fonts.type.NunitoRegular,
    fontSize: fonts.size.font10,
    color: colors.white,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
