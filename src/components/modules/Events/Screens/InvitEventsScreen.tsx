import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInvitationsList } from '../../../../store/actions/invitationsActions'
import EventCmp from '../components/EventCmp'
import colors from '../../../../styles/colors'
import fonts from '../../../../theme/fonts'

const InvitEventsScreen = (props: any) => {
    const { searchInput } = props
    const dispatch = useDispatch()
    const state = useSelector((state: any) => state)
    const { defaultPartner } = useSelector((state: any) => state?.Inst)
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])

    function getPage() {
        setLoading(true)
        dispatch(
            getInvitationsList({
                offset: 0,
                limit: 100,
                partner: defaultPartner,
                filters: {
                    type: "event",
                    searchInput
                }
            },
                (res: any) => {
                    setList(res?.invitations)
                    setLoading(false)
                },
                (err: any) => {
                    console.log(err);
                    setLoading(false)
                }
            )
        )
    }


    useEffect(() => {
        getPage()
    }, [searchInput])
    return (
        <View
            style={styles.containerStyle}
        >
            <FlatList
                data={list}
                keyExtractor={item => `invit_event_${item?._id}`}
                renderItem={({ item }) => {
                    console.log({ item });

                    return (<EventCmp
                        data={item?.event}
                        isInvitation={true}
                        status={item?.status}
                    />)
                }
                }
                ListEmptyComponent={() => (
                    <View style={{
                        flex :1,
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

export default InvitEventsScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        backgroundColor: colors.white
    }
})