/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icons from '../../../styles/icons';
import colors from '../../../styles/colors';
import {Divider} from '@rneui/themed';
import I18n from 'react-native-i18n';
import fonts from '../../../theme/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  editUser,
  getMyInstitutions,
  getMyPartners,
} from '../../../store/actions';
import {extractImage} from '../../../helpers/extractImage';

const HomeMenuScreen = (props: any) => {
  const {visible, setVisible, navigation} = props;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {myInstitutions, myPartners, loading} = useSelector(
    (state: any) => state?.Inst,
  );
  const {user} = useSelector((state: any) => state?.User);

  const [showAddPartner, setShowAddPartner] = useState(false);
  const [ref_code, setRef_code] = useState('');
  const [loadingAddPartner, setLoadingAddPartner] = useState(false);

  function getMyInsitutions() {
    dispatch(getMyInstitutions({}));
    dispatch(getMyPartners({user: user?._id}));
  }

  const toogleAddPartner = () => {
    setShowAddPartner(!showAddPartner);
    setRef_code('');
  };

  function renderInst(params: any, empty: boolean = false) {
    return (
      <TouchableOpacity
        onPress={() => {
          if (empty) {
            navigation?.navigate('AddNewInstScreen', {});
          } else {
            navigation?.navigate('MySpaces', {
              space: {...params?.institute, type: 'Institution'},
            });
          }
          //   close();
        }}
        style={[
          styles.instContainerStyle,
          !params?.institute?.active &&
            !empty && {backgroundColor: colors.grey},
        ]}>
        <View
          style={{
            flex: 2,
          }}>
          <Image
            source={
              empty
                ? require('../../../../assets/images/add.png')
                : require('../../../../assets/images/inst.png')
            }
            style={{
              height: 80,
              width: 80,
              marginTop: -20,
              borderWidth: 0.5,
              borderRadius: 80,
              borderColor: colors.primary,
              backgroundColor: colors.white,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            adjustsFontSizeToFit
            style={[
              styles.instTitleTextStyle,
              {
                color: empty
                  ? colors.primary
                  : !params?.institute?.active
                  ? colors.white
                  : colors.grey,
              },
            ]}>
            {empty ? I18n.t('add_new') : params?.institute?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  function renderPartners(params: any, empty: boolean = false) {
    return (
      <TouchableOpacity
        onPress={() => {
          if (empty) {
            toogleAddPartner();
          } else {
            navigation?.navigate('MySpaces', {
              space: {...params, type: 'Partner'},
            });
            // close();
          }
        }}
        style={styles.instContainerStyle}>
        <View
          style={{
            flex: 2,
          }}>
          <Image
            source={
              empty
                ? require('../../../../assets/images/add.png')
                : params?.avatar?.path
                ? {uri: extractImage(params?.avatar?.path)}
                : require('../../../../assets/images/inst.png')
            }
            style={{
              height: 80,
              width: 80,
              marginTop: -20,
              borderWidth: 0.5,
              borderRadius: 80,
              borderColor: colors.primary,
              backgroundColor: colors.white,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            adjustsFontSizeToFit
            style={[
              styles.instTitleTextStyle,
              {
                color: empty ? colors.primary : colors.grey,
              },
            ]}>
            {empty
              ? I18n.t('add_new')
              : `${params?.first_name} ${params?.last_name}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function addPartner(params: any) {
    if (params?.length) {
      setLoadingAddPartner(true);
      dispatch(
        editUser(
          {
            id: user?._id,
            data: {ref_code},
          },
          (res: any) => {
            setLoadingAddPartner(false);
            dispatch(getMyPartners({user: user?._id}));
          },
          (err: any) => {
            setLoadingAddPartner(false);
          },
        ),
      );
    }
  }
  useEffect(() => {
    getMyInsitutions();
  }, [isFocused]);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.containerStyle}>
        <View style={styles.headerContainerStyle}>
          <Text style={styles.headerTitleTextStyle}></Text>
          <Pressable
            onPress={() => setVisible(false)}
            style={styles.closeContainerStyle}>
            <Icons.AntDesign name="left" size={20} color={colors.black} />
          </Pressable>
        </View>
        <Divider orientation="horizontal" />
        <View style={styles.bodyContainer}>
          <View>
            <Text style={styles.titleTextStyle}>{I18n.t('myPartners')}</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={myPartners?.concat({plus: true})}
              numColumns={3}
              renderItem={({item}) =>
                !!item?.plus ? renderPartners({}, true) : renderPartners(item)
              }
              //   ListFooterComponent={() => renderPartners({}, true)}
              refreshControl={
                <RefreshControl
                  style={{width: 0, height: 0}}
                  colors={[colors.primary]}
                  refreshing={loading}
                />
              }
            />
            {showAddPartner && (
              <View style={styles.addPartnerConatinerStyle}>
                <TextInput
                  value={ref_code}
                  onChangeText={setRef_code}
                  style={styles.textIputStyle}
                  placeholder={I18n.t('code_access')}
                />
                <TouchableOpacity
                  onPress={() => {
                    addPartner(ref_code);
                  }}
                  style={{
                    backgroundColor: colors.primary,
                    padding: 5,
                    borderRadius: 5,
                  }}>
                  {loadingAddPartner ? (
                    <ActivityIndicator color={colors.white} size="small" />
                  ) : (
                    <Text
                      style={{
                        fontFamily: fonts.type.NunitoMedium,
                        fontSize: fonts.size.font10,
                        color: colors.white,
                      }}>
                      {I18n.t('save')}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
            <Divider orientation="horizontal" style={styles.dividerStyle} />
          </View>

          <View>
            <Text style={styles.titleTextStyle}>{I18n.t('myInsts')}</Text>
            <FlatList
              numColumns={3}
              showsHorizontalScrollIndicator={false}
              data={myInstitutions?.concat({plus: true})}
              renderItem={({item}) =>
                !!item?.plus ? renderInst({}, true) : renderInst(item)
              }
              //   ListFooterComponent={() => renderInst({}, true)}
              refreshControl={
                <RefreshControl
                  style={{width: 0, height: 0}}
                  colors={[colors.primary]}
                  refreshing={loading}
                />
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeMenuScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bodyContainer: {
    flex: 1,
    padding: 15,
  },
  headerContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  headerTitleTextStyle: {
    fontFamily: fonts.type.NunitoBold,
    fontSize: fonts.size.font14,
  },
  closeContainerStyle: {
    position: 'absolute',
    left: 15,
    right: 15,
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font14,
    color: colors.primary,
  },
  instContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 100,
    minHeight: 100,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.primary,
    marginHorizontal: 5,
    marginTop: 20,
    padding: 5,
  },
  instTitleTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font10,
    color: colors.grey,
  },
  dividerStyle: {
    marginVertical: 10,
  },
  addPartnerConatinerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth :1,
    marginVertical: 5,
  },
  textIputStyle: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.grey,
    width: '70%',
    padding: 5,
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.gray,
  },
});
