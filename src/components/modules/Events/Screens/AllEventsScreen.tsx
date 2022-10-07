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
import {getEvents, getMyEvents} from '../../../../store/actions/eventsActions';
import colors from '../../../../styles/colors';
import Icons from '../../../../styles/icons';
import EventCmp from '../components/EventCmp';
import fonts from '../../../../theme/fonts';

const AllEventsScreen = (props: any) => {
  const dispatch = useDispatch();

  const {events, myEvents, loading} = useSelector(
    (state: any) => state?.Events,
  );

  const {searchInput, space} = props;

  function getPage() {
    if (!!space) {
      dispatch(
        getMyEvents(
          {
            filters: {
              searchInput,
              partner: space?.type === 'Partner' ? space?._id : '',
              institution: space?.type === 'Institution' ? space?._id : '',
            },
            limit: 100,
            offset: 0,
          },
          () => null,
          () => null,
        ),
      );
    } else {
      dispatch(
        getEvents(
          {
            filters: {
              searchInput,
              partner: space?._id,
            },
          },
          () => null,
          () => null,
        ),
      );
    }
  }
  useEffect(() => {
    getPage();
  }, [searchInput]);
  return (
    <View style={styles.containerStyle}>
      {/* <View
                style={{
                    flexDirection: "row",
                    // width: "100%",
                    borderWidth: 1,
                    borderColor: colors.grey,
                    borderRadius: 5,
                    margin: 15
                }}
            >
                <TextInput
                    value={searchInput}
                    onChangeText={setSearchInput}
                    style={styles.textInputStyle}
                />
                <Pressable
                    onPress={() => {
                        if (searchInput !== "") {
                            setSearchInput("")
                        }
                    }}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 5,
                        flex: 1,

                    }}
                >
                    <Icons.AntDesign name={searchInput !== "" ? "close" : "search1"} size={20} color={colors.gray} />
                </Pressable>

            </View> */}
      <FlatList
        data={!!space ? myEvents : events}
        renderItem={({item}) => <EventCmp data={item} />}
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.type.NunitoMedium,
                fontSize: fonts.size.font14,
                color: colors.gray,
              }}>
              Aucun résultat
            </Text>
          </View>
        )}
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

export default AllEventsScreen;

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
});
