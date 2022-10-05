import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {ScreenWidth} from '@rneui/base';
import Icons from '../../../../styles/icons';
import colors from '../../../../styles/colors';
import fonts from '../../../../theme/fonts';
import globalStyles from '../../../../styles/globalStyles';

const PublicHomeScreen = () => {
  const list = [
    {
      title: 'ETABLISSEMENT',
      note: 'Le programme avancé reflète la culture de votre école. Statistique du temps de lecture: meilleur étudiant, meilleur professeur... Chat entre les administrateurs, les parents et les enseignants. Envoyer des emails et des SMS filtrés selon vos besoins.',
      icon: 'school',
    },
    {
      title: 'ETUDIANT',
      note: 'Dévéloppez vos compétances grâce aux conseils et aux observations des enseignants. Dévéloppez votre relation avec vos professeurs. Vous pouvez partager vos nouvelles et vos photos avec vos amis.',
      icon: 'school',
    },
    {
      title: 'ENSEIGNANTS',
      note: 'Vous pouvez communiquer facilement avec vos élèves et leurs parents. Facilitez votre travail et vous obtenez le soutien des parents. Vous pouvez partager vos cours et exercices en ligne',
      icon: 'school',
    },
    {
      title: 'PARENTS',
      note: "Suivez le moment spécial de votre enfant par moment. Discutez avec les enseignants via le site social de l'école. Suivez l'absence, les notes et les examens de votre enfants.",
      icon: 'school',
    },
  ];
  function renderItem(data: any) {
    return (
      <View style={[styles.itemContainerStyle, globalStyles.shadow]}>
        <View style={styles.iconCotainerStyle}>
          <Icons.Ionicons
            name="ios-school-outline"
            size={20}
            color={colors.white}
          />
        </View>
        <Text style={styles.itemTitleTextStyle}>{data?.title}</Text>
        <Text style={styles.itemNoteTextStyle}>{data?.note}</Text>
      </View>
    );
  }
  return (
    <View style={styles.containerStyle}>
      <ImageBackground
        source={require('../../../../../assets/images/header_template.png')}
        style={{
          height: 120,
          width: '100%',
        }}>
        <Image
          source={require('../../../../../assets/images/homing.51844f5c.png')}
          style={{
            height: 200,
            width: 220,
            position: 'absolute',
            right: 10,
          }}
          resizeMode="contain"
        />
      </ImageBackground>
      <View style={styles.bodyConatainerStyle}>
        <FlatList
          horizontal
          bounces
          pagingEnabled
          data={list}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={item => item?.title}
        />
      </View>
      <View style={styles.dotsContainerStyle}>
        <View style={styles.SelectedDotStyle} />
        <View style={styles.dotStyle} />
        <View style={styles.dotStyle} />
        <View style={styles.dotStyle} />
      </View>
    </View>
  );
};

export default PublicHomeScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  bodyConatainerStyle: {
    flex: 1,
    paddingTop: 70,
    // borderWidth: 1,
  },
  itemContainerStyle: {
    width: ScreenWidth * 0.9,
    margin: ScreenWidth * 0.05,
    height: 280,
    // borderWidth: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
  iconCotainerStyle: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 50,
  },
  itemTitleTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font14,
    color: colors.primary,
    marginVertical: 10,
  },
  itemNoteTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.gray,
    marginVertical: 10,
  },
  dotsContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    // borderWidth: 1,
  },
  dotStyle: {
    height: 10,
    width: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 50,
    margin: 5,
  },
  SelectedDotStyle: {
    height: 15,
    width: 15,
    backgroundColor: colors.primary,
    borderRadius: 50,
    margin: 5,
  },
});
