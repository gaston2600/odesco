import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icons from '../../../styles/icons';
import {Divider} from '@rneui/themed';
import I18n from 'react-native-i18n';
import colors from '../../../styles/colors';
import fonts from '../../../theme/fonts';
import {useDispatch} from 'react-redux';
import {
  getChaptersCours,
  getListQuestionsCours,
  getOneCours,
  getSessionsCours,
} from '../../../store/actions';
import {extractImage} from '../../../helpers/extractImage';

const CoursDetailsScreen = (props: any) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  console.log({props});

  const id = props?.route?.params?.id;
  const [data, setData]: any = useState({});
  const [loading, setLoading] = useState(false);
  function getQuiz() {
    dispatch(
      getListQuestionsCours(
        {id},
        (res: any) => {
          console.log('list quiz', {res});
          setData((prev: any) => ({...prev, quizzes: res?.quizzes}));
        },
        (err: any) => {
          console.log({err});
        },
      ),
    );
  }
  function getChapters(filters: any) {
    dispatch(
      getChaptersCours(
        {filters},
        (res: any) => {
          console.log('list chapters', {res});
          setData((prev: any) => ({...prev, chapters: res?.chapters}));
        },
        (err: any) => {
          console.log({err});
        },
      ),
    );
  }
  function getSessions(filters: any) {
    dispatch(
      getSessionsCours(
        {filters},
        (res: any) => {
          console.log('list sessions', {res});
          setData((prev: any) => ({...prev, sessions: res?.sessions}));
        },
        (err: any) => {
          console.log({err});
        },
      ),
    );
  }

  function getData() {
    setLoading(true);
    dispatch(
      getOneCours(
        {
          id,
        },
        (res: any) => {
          console.log({res});
          setData(res?.course);
          setLoading(false);
          getQuiz();
          getChapters({
            course: id,
          });
          getSessions({
            course: id,
          });
        },
        (err: any) => {
          console.log({err});
          setLoading(false);
        },
      ),
    );
  }

  useEffect(() => {
    getData();
    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    console.log('====================================');
    console.log({data});
    console.log('====================================');
  }, [data]);

  return (
    <ScrollView
      style={styles.containerStyle}
      refreshControl={
        <RefreshControl
          style={{width: 0, height: 0}}
          colors={[colors.primary]}
          refreshing={loading}
          onRefresh={() => {
            getData();
          }}
        />
      }>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.headerTitleTextStyle}>
          {data?.name || I18n.t('cours')}
        </Text>
        <Pressable
          onPress={() => navigation?.goBack()}
          style={styles.closeContainerStyle}>
          <Icons.AntDesign name="left" size={20} color={colors.black} />
        </Pressable>
      </View>
      <Divider orientation="horizontal" />
      <View style={styles.imageContainer}>
        <Image
          source={
            data?.cover?.path
              ? {uri: extractImage(data?.cover?.path)}
              : require('../../../../assets/images/odesco_logo.jpg')
          }
          style={styles.imageStyle}
          //   resizeMode="contain"
        />
      </View>
      <View style={styles.bodyContainer}></View>
    </ScrollView>
  );
};

export default CoursDetailsScreen;

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
  imageContainer: {
    height: 150,
    width: '100%',
  },
  imageStyle: {
    height: 150,
    width: '100%',
  },
});
