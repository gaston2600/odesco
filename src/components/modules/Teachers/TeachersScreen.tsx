import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTeachersList} from '../../../store/actions/teachersActions';
import TeacherCmp from './components/TeacherCmp';
import colors from '../../../styles/colors';
import Icons from '../../../styles/icons';
import I18n from 'react-native-i18n';
import fonts from '../../../theme/fonts';
import {Divider} from '@rneui/themed';

const TeachersScreen = (props: any) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {loading} = useSelector((state: any) => state?.Teachers);
  const [list, setList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  function getPage() {
    dispatch(
      getTeachersList(
        {
          filters: {
            searchInput,
          },
        },
        (res: any) => {
          // console.log({ res });
          setList(res?.teachers);
        },
        (err: any) => {
          console.log({err});
        },
      ),
    );
  }
  useEffect(() => {
    getPage();
  }, [searchInput]);

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
          <Text style={styles.titleTextStyle}>{I18n.t('teachers')}</Text>
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
      <FlatList
        data={list}
        renderItem={({item}) => (
          <TeacherCmp data={item} navigation={navigation} refresh={getPage} />
        )}
        keyExtractor={(item: any) => item?._id}
        refreshControl={
          <RefreshControl
            style={{width: 0, height: 0}}
            colors={[colors.primary]}
            refreshing={loading}
            onRefresh={() => {
              getPage();
            }}
          />
        }
      />
    </View>
  );
};

export default TeachersScreen;

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
