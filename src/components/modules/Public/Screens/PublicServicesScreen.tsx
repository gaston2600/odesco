import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyles from '../../../../styles/globalStyles';
import colors from '../../../../styles/colors';
import {ScreenWidth} from '@rneui/base';
import fonts from '../../../../theme/fonts';
import I18n from 'react-native-i18n';

const PublicServicesScreen = (props: any) => {
  const {navigation} = props;
  const list = [
    {
      title: 'Événements',
      note: 'Lorem ipsum dolor sit amet. Ea aspernatur maxime eum galisum totam dolores excepturi nam numquam doloribus et harum voluptas qui Quis dolores hic porro placeat? Aut porro veniam a sint perspiciatis et voluptatem doloremque ea laborum molestiae qui mollitia quia. ',
      img: require('../../../../../assets/icons/publiServices/events.png'),
    },
    {
      title: 'Soutien Scolaire',
      note: 'Lorem ipsum dolor sit amet. Ea aspernatur maxime eum galisum totam dolores excepturi nam numquam doloribus et harum voluptas qui Quis dolores hic porro placeat? Aut porro veniam a sint perspiciatis et voluptatem doloremque ea laborum molestiae qui mollitia quia. ',
      img: require('../../../../../assets/icons/publiServices/soutien_scolar.png'),
    },
    {
      title: 'Groupes',
      note: 'Lorem ipsum dolor sit amet. Ea aspernatur maxime eum galisum totam dolores excepturi nam numquam doloribus et harum voluptas qui Quis dolores hic porro placeat? Aut porro veniam a sint perspiciatis et voluptatem doloremque ea laborum molestiae qui mollitia quia. ',
      img: require('../../../../../assets/icons/publiServices/groupe.png'),
    },
    {
      title: 'Formation',
      note: 'Lorem ipsum dolor sit amet. Ea aspernatur maxime eum galisum totam dolores excepturi nam numquam doloribus et harum voluptas qui Quis dolores hic porro placeat? Aut porro veniam a sint perspiciatis et voluptatem doloremque ea laborum molestiae qui mollitia quia. ',
      img: require('../../../../../assets/icons/publiServices/formations.png'),
    },
    {
      title: 'E-Book',
      note: 'Lorem ipsum dolor sit amet. Ea aspernatur maxime eum galisum totam dolores excepturi nam numquam doloribus et harum voluptas qui Quis dolores hic porro placeat? Aut porro veniam a sint perspiciatis et voluptatem doloremque ea laborum molestiae qui mollitia quia. ',
      img: require('../../../../../assets/icons/publiServices/eBook.png'),
    },
  ];
  function renderItem(data: any) {
    return (
      <Pressable
        onPress={() => {
          navigation?.navigate('AuthStack');
        }}
        style={styles.itemContainerStyle}>
        <View style={styles.imageContainerStyle}>
          <Image
            source={data?.img}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </View>
        <View style={styles.itemContentStyle}>
          <Text style={styles.titleTextStyle}>{data?.title}</Text>

          <Text style={styles.noteTextStyle} numberOfLines={1}>
            {data?.note}
          </Text>
          <Text style={[styles.noteTextStyle, {color: colors.primary}]}>
            {I18n.t('seeMore')}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.containerStyle}>
      <FlatList
        data={list}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item: any) => item?._id}
        contentContainerStyle={{
          alignItems: 'center',
        }}
      />
      {/* <Text>PublicServicesScreen</Text> */}
    </View>
  );
};

export default PublicServicesScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  itemContainerStyle: {
    width: ScreenWidth * 0.95,
    // marginHorizontal: ScreenWidth * 0.05,
    padding: 10,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    // borderWidth: 1,
  },
  imageContainerStyle: {
    ...globalStyles.shadow,
    height: 70,
    width: 70,
  },
  imageStyle: {
    height: 70,
    width: 70,
  },
  itemContentStyle: {
    marginLeft: 10,
    flex: 1,
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font14,
    color: colors.gray,
  },
  noteTextStyle: {
    fontFamily: fonts.type.NunitoRegular,
    fontSize: fonts.size.font12,
    color: colors.grey,
  },
});
