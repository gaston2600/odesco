import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import colors from '../../../styles/colors';
import NotificationCmp from './components/NotificationCmp';
import {Divider} from '@rneui/themed';
import fonts from '../../../theme/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {getMyNotifications} from '../../../store/actions/notificationActions';

const list = [
  {
    user: {
      first_name: 'ghassen',
      last_name: 'bouaziz',
    },
    is_readed: false,
    readedDate: new Date(),
    data: {
      model: 'Network',
      modelId: '213',
      message:
        'Lorem ipsum dolor sit amet. Ex tempore iusto et rerum dolorem et adipisci quasi id harum minima. ',
    },
    _id: '123',
  },
  {
    user: {
      first_name: 'ghassen',
      last_name: 'bouaziz',
    },
    is_readed: false,
    readedDate: new Date(),
    data: {
      model: 'Event',
      modelId: '213',
      message:
        'Lorem ipsum dolor sit amet. Ex tempore iusto et rerum dolorem et adipisci quasi id harum minima. ',
    },
    _id: '234',
  },
  {
    user: {
      first_name: 'ghassen',
      last_name: 'bouaziz',
    },
    is_readed: false,
    readedDate: new Date(),
    data: {
      model: 'Network',
      modelId: '213',
      message:
        'Lorem ipsum dolor sit amet. Ex tempore iusto et rerum dolorem et adipisci quasi id harum minima. ',
    },
    _id: '654',
  },
];

const NotificationScreen = () => {
  const dispatch = useDispatch();

  const {notifications, loading} = useSelector(
    (state: any) => state?.Notification,
  );
  console.log({notifications, loading});

  function getPage() {
    dispatch(getMyNotifications({}));
  }
  useEffect(() => {
    getPage();
  }, []);

  return (
    <View style={styles.containerStyle}>
      {/* <View style={styles.headerContainerStyle}>
        <Text style={styles.headerTitleTextStyle}>Afficher Tous</Text>
        <Text style={styles.headerTitleTextStyle}>Tous marquer comme lû</Text>
      </View> */}
      <Divider orientation="horizontal" />
      <FlatList
        // data={list}
        data={notifications}
        renderItem={({item}) => <NotificationCmp data={item} />}
        keyExtractor={item => item?._id}
        ItemSeparatorComponent={() => <Divider orientation="horizontal" />}
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
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.type.NunitoMedium,
                fontSize: fonts.size.font12,
                color: colors.grey,
              }}>
              Aucune Publication
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainerStyle: {
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.sereneBlue,
  },
});
