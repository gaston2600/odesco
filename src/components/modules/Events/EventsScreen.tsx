import { FlatList, Pressable, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../../../store/actions/eventsActions'
import EventCmp from './components/EventCmp'
import colors from '../../../styles/colors'
import fonts from '../../../theme/fonts'
import Icons from '../../../styles/icons'

const EventsScreen = (props: any) => {
    const dispatch = useDispatch()

    const { events, loading } = useSelector((state: any) => state?.Events)

    const [searchInput, setSearchInput] = useState("")

    function getPage() {
        dispatch(getEvents({
            filters: {
                searchInput
            }
        }, () => null, () => null))
    }
    useEffect(() => {
        getPage()
    }, [searchInput])
    return (
        <View style={styles.containerStyle}>
            <View
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

            </View>
            <FlatList
                data={events}
                renderItem={({ item }) => <EventCmp data={item} />}
                ListEmptyComponent={() => (
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontFamily: fonts.type.NunitoMedium,
                            fontSize: fonts.size.font14,
                            color: colors.gray
                        }}>
                            Aucun résultat
                        </Text>
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        style={{ width: 0, height: 0 }}
                        colors={[colors.primary]}
                        refreshing={loading}
                        onRefresh={() => {
                            getPage()
                        }}
                    />
                }

            />
        </View>
    )
}

export default EventsScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white
    },
    textInputStyle: {

        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        color: colors.gray,
        paddingHorizontal: 5,
        flex: 8

    }
})