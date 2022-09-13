import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import fonts from '../../../../theme/fonts'
import colors from '../../../../styles/colors'
import I18n from '../../../../translation/I18n'
import { Divider } from '@rneui/themed'
import moment from 'moment'

const TeacherDescProfileScreen = (props: any) => {
    const { teacher } = props
    const [data, setData] = useState(teacher)

    function renderTraining(params: any) {
        return (
            <View style={styles.itemContainerStyle}>
                <Text style={[styles.titleTextStyle, { fontFamily: fonts.type.NunitoBold }]}>{params?.institution}</Text>
                <Text style={styles.titleTextStyle}>{params?.diplome}</Text>
                <View style={styles.rowContainer}>
                    <Text style={styles.titleTextStyle}>{moment(params?.startDate).format("MMM YYYY")}</Text>
                    {params?.endDate && <Text style={styles.titleTextStyle}> - </Text>}
                    {params?.endDate && <Text style={styles.titleTextStyle}>{moment(params?.endDate).format("MMM YYYY")}</Text>}
                </View>
                <Divider orientation='horizontal' />
            </View>
        )
    }

    function renderExperience(params: any) {
        return (
            <View style={styles.itemContainerStyle}>
                <Text style={[styles.titleTextStyle, { fontFamily: fonts.type.NunitoBold }]}>{params?.institution}</Text>
                <Text style={styles.titleTextStyle}>{params?.profession}</Text>
                <View style={styles.rowContainer}>
                    <Text style={styles.titleTextStyle}>{moment(params?.startDate).format("MMM YYYY")}</Text>
                    {params?.endDate && <Text style={styles.titleTextStyle}> - </Text>}
                    {params?.endDate && <Text style={styles.titleTextStyle}>{moment(params?.endDate).format("MMM YYYY")}</Text>}
                </View>
                <Divider orientation='horizontal' />
            </View>
        )
    }
    function renderSkills(params: any) {
        return (
            <View style={styles.itemContainerStyle}>
                <Text style={[styles.titleTextStyle, { fontFamily: fonts.type.NunitoBold }]}>{params}</Text>
                <Divider orientation='horizontal' />
            </View>
        )
    }

    useEffect(() => {
        setData(teacher)
    }, [teacher])


    return (
        <View style={styles.containerStyle}>
            {!!data?.trainings?.length &&
                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.sectionTextStyle}>{I18n.t("trainings")}</Text>
                    <FlatList
                        data={data?.trainings}
                        renderItem={({ item }) => renderTraining(item)}
                        keyExtractor={item => item?._id}
                    />
                </View>}
            {!!data?.experiences?.length &&
                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.sectionTextStyle}>{I18n.t("experiences")}</Text>
                    <FlatList
                        data={data?.experiences}
                        renderItem={({ item }) => renderExperience(item)}
                        keyExtractor={item => item?._id}
                    />
                </View>}
            {!!data?.skills?.length &&
                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.sectionTextStyle}>{I18n.t("skills")}</Text>
                    <FlatList
                        data={data?.skills}
                        horizontal
                        renderItem={({ item }) => renderSkills(item)}
                        keyExtractor={item => item?._id}
                    />
                </View>}
        </View>
    )
}

export default TeacherDescProfileScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 10
    },
    sectionTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font14,
        color: colors.darkBlue,
        // marginLeft: 15
    },
    titleTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        color: colors.gray,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    itemContainerStyle: {
        padding: 10,
        marginTop: 5
    },
    sectionContainerStyle: {
        marginVertical: 5
    }

})