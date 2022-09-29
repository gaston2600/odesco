/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import HeaderHomeCmp from '../Home/components/HeaderHomeCmp';
import colors from '../../../styles/colors';
import {useSelector} from 'react-redux';
import AvatarCmp from '../../common/AvatarCmp';
import {extractImage} from '../../../helpers/extractImage';
import fonts from '../../../theme/fonts';
import {Divider} from '@rneui/themed';
import Icons from '../../../styles/icons';

const MenuScreen = (props: any) => {
  const {navigation} = props;
  const {myInstitutions, myPartners, defaultPartner, loading} = useSelector(
    (state: any) => state?.Inst,
  );

  const listMenu = [
    {
      name: 'Enseignants',
      icon: require('../../../../assets/icons/menu/groupe.png'),
      desc: 'description Groupe',
      route: 'TeachersScreen',
      img: 'calendar-month-outline',
    },
    {
      name: 'Évenements',
      icon: require('../../../../assets/icons/menu/events.png'),
      desc: 'description Évenements',
      route: 'EventsScreen',
      img: 'account-group-outline',
    },

    {
      name: 'Cours',
      icon: require('../../../../assets/icons/menu/members.png'),
      desc: 'description Membres',
      img: 'book-multiple-outline',
    },
    {
      name: 'Formations',
      icon: require('../../../../assets/icons/menu/job.png'),
      desc: "description Offre d'emploi",
      img: 'projector-screen-outline',
    },
    {
      name: 'Soutien Scolaire',
      icon: require('../../../../assets/icons/menu/inst.png'),
      desc: 'description Établissements',
      img: 'handshake-outline',
    },

    {
      name: 'Établissements',
      icon: require('../../../../assets/icons/menu/inst.png'),
      desc: 'description Établissements',
      img: 'office-building-outline',
    },
  ];

  const [selectedInst, setSelectedInst] = useState({
    id: -1,
    type: '',
  });

  const toggleInst = (data: any) => {
    setSelectedInst(data?.id === selectedInst?.id ? null : data);
  };

  const renderInst = (data: any) => {
    const inversed =
      selectedInst?.type === 'Institution' &&
      selectedInst?.id === data?.institute?._id;
    return (
      <Pressable
        onPress={() => {
          toggleInst({id: data?.institute?._id, type: 'Institution'});
        }}
        style={styles.instContainerStyle}>
        <View
          style={{
            borderWidth: 2,
            borderRadius: 100,
            borderColor: colors.primary,
          }}>
          <Image
            source={require('../../../../assets/images/inst.png')}
            style={{
              height: 40,
              width: 40,
              borderRadius: 40,
              borderWidth: inversed ? 2 : 1,
              borderColor: inversed ? colors.primary : colors.grey,
            }}
          />
        </View>
        <Text
          style={[
            styles.instTiteTextStyle,
            {
              color: inversed ? colors.primary : colors.blackTrans,
            },
          ]}>{`${data?.institute?.name}`}</Text>
      </Pressable>
    );
  };
  const renderPartners = (data: any) => {
    const inversed =
      selectedInst?.type === 'Partner' && selectedInst?.id === data?._id;
    return (
      <Pressable
        onPress={() => {
          toggleInst({id: data?._id, type: 'Partner'});
        }}
        style={styles.instContainerStyle}>
        <View
          style={{
            borderWidth: 2,
            borderRadius: 100,
            borderColor: colors.primary,
          }}>
          <AvatarCmp
            name={String(data?.first_name)?.slice(0, 2)}
            uri={extractImage(data?.avatar?.path)}
            size={data?._id === defaultPartner ? 60 : 40}
            inversed={inversed}
          />
        </View>

        {data?._id !== defaultPartner && (
          <Text
            numberOfLines={1}
            style={[
              styles.instTiteTextStyle,
              {
                color: inversed ? colors.primary : colors.blackTrans,
              },
            ]}>{`${data?.first_name}`}</Text>
        )}
      </Pressable>
    );
  };

  const renderMenuItem = (data: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (data?.route) {
            navigation?.navigate(data?.route);
          }
        }}
        style={styles.menuItemContainerStyle}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <View
            style={{
              // borderWidth: 1,
              borderRadius: 50,
              padding: 5,
              backgroundColor: `${colors.grey}30`,
            }}>
            <Icons.MCI name={data?.img} size={25} color={colors.darkGray} />
          </View>
          {/* <Image
            source={data.icon}
            style={{
              height: 50,
              width: 50,
            }}
          /> */}
        </View>
        <View
          style={{
            flex: 5,
            padding: 10,
          }}>
          <Text style={styles.menuTitleTextStyle}>{data?.name}</Text>
          {/* <Text style={styles.menuDescTextStyle}>{data?.desc}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.containerStyle}>
      <HeaderHomeCmp />
      <View
        style={{
          marginVertical: 5,
          justifyContent: 'center',
        }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}
          horizontal
          keyExtractor={item => item?._id}
          data={myPartners?.concat(myInstitutions)}
          renderItem={({item}) =>
            item?.institute ? renderInst(item) : renderPartners(item)
          }
        />
      </View>
      <Divider orientation="horizontal" style={{marginVertical: 5}} />
      <ScrollView style={styles.menuListContainer}>
        {listMenu?.map((item: any, index: any) => (
          <View key={`item_menu_${index}`}>
            {renderMenuItem(item)}
            <Divider orientation="horizontal" />
          </View>
        ))}
        {/* <FlatList
          data={listMenu}
          renderItem={({ item, index }: any) => renderMenuItem(item)}
          ItemSeparatorComponent={() => <Divider orientation='horizontal' />}
        /> */}
      </ScrollView>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainerStyle: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instContainerStyle: {
    // height: 100,
    margin: 5,
  },
  instTiteTextStyle: {
    fontFamily: fonts.type.NunitoRegular,
    fontSize: fonts.size.font10,
    maxWidth: 70,
    alignSelf: 'center',
  },
  menuListContainer: {
    // flexGrow: 1,
    // borderWidth: 1
  },
  menuItemContainerStyle: {
    // borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: 5,
    // backgroundColor :colors.white
  },
  menuTitleTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font14,
    color: colors.black,
  },
  menuDescTextStyle: {
    fontFamily: fonts.type.NunitoRegular,
    fontSize: fonts.size.font12,
    color: colors.gray,
  },
});
