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
import AddEventModal from '../../../modals/Events/AddEventModal';

const AllEventsScreen = (props: any) => {
  const dispatch = useDispatch();
  const [showAddEventModal, setShowAddEventModal] = useState(false);
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
      {!!space && (
        <Pressable
          onPress={() => {
            setShowAddEventModal(!showAddEventModal);
          }}
          style={styles.addContainerStyle}>
          <Icons.AntDesign name="plus" size={20} color={colors.white} />
        </Pressable>
      )}
      {showAddEventModal && (
        <AddEventModal
          visible={showAddEventModal}
          setVisible={setShowAddEventModal}
          refresh={getPage}
          space={space}
        />
      )}
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
  addContainerStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 50,
  },
});
