import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyEvents } from '../../../../store/actions/eventsActions'
import EventCmp from '../components/EventCmp'
import fonts from '../../../../theme/fonts'
import colors from '../../../../styles/colors'

const MyEventScreen = () => {
    const dispatch = useDispatch()
    const [list, setList] = useState([])

    const { myEvents, loading } = useSelector((state: any) => state?.Events)

    function getPage() {
        dispatch(
            getMyEvents(
                {},
                res => {
                    console.log(res);

                },
                err => {
                    console.log(err);

                }

            )
        )
    }
    useEffect(() => {
        getPage()
    }, [])

    return (
        <View>
            <FlatList
                data={myEvents}
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

export default MyEventScreen

const styles = StyleSheet.create({})