import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../../../styles/colors'
import { useDispatch } from 'react-redux'
import { getInstTeachersList } from '../../../../store/actions'
import TeacherCmp from '../../Teachers/components/TeacherCmp'

const InstTeachersListScreen = (props: any) => {
    const { partner,navigation } = props
    const dispatch = useDispatch()
    const [teachers, setTeachers] = useState([])
    const [loading, setLoading] = useState(false)
    function getPage() {
        setLoading(true)
        dispatch(
            getInstTeachersList(
                {
                    inst_id: partner,
                    limit: 100
                },
                (res: any) => {
                    setLoading(false)
                    setTeachers(res?.teachers)
                },
                (err: any) => {
                    console.log({ err });
                    setLoading(false)
                }
            )
        )
    }
    useEffect(() => {
        getPage()
    }, [])

    return (
        <ScrollView
            style={styles.containerStyle}
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
        >
            <FlatList
                data={teachers}
                renderItem={({ item }) => (
                <TeacherCmp
                    data={item}
                    navigation={navigation}
                    hideFollow={true}
                />
                )}
            />
            {/* <Text>InstTeachersListScreen</Text> */}
        </ScrollView>
    )
}

export default InstTeachersListScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white,
        // padding: 15
    }
})