import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../../../styles/colors'
import fonts from '../../../../theme/fonts'
import I18n from 'react-native-i18n'
import { Divider } from '@rneui/themed'
import moment from 'moment'
import Icons from '../../../../styles/icons'
import { useDispatch } from 'react-redux'
import { getOneInst } from '../../../../store/actions'
import { useIsFocused } from '@react-navigation/native'

const InstDescProfileScreen = (props: any) => {
    const {
        partner
        //  data 
    } = props
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const [data, setData]: any = useState({})
    const [loading, setLoading] = useState(false)
    function getProfile() {
        setLoading(false)
        dispatch(
            getOneInst(
                { inst_id: partner },
                (res: any) => {
                    console.log({ res });
                    setLoading(false)
                    setData(res?.institution)
                },
                (err: any) => {
                    console.log({ err });
                    setLoading(false)
                }
            )
        )
    }
    useEffect(() => {
        getProfile()
    }, [isFocused])


    return (
        <View style={styles.containerStyle}>
            <Text style={styles.sectionTitleTextStyle}>{I18n.t("info_inst")}</Text>
            <Divider orientation='horizontal' color={colors.primary} style={styles.dividerStyle} />

            {!!data?.createdAt && <View style={styles.lineContainerStyle}>
                <Icons.AntDesign name="flag" size={15} color={colors.primary} />
                <Text style={styles.descTextStyle}>
                    {` ${I18n.t("createdAt")} ${moment(data?.createdAt)?.format("ll")}`}
                </Text>
            </View>}
            {!!data?.user && <View style={styles.lineContainerStyle}>
                <Icons.AntDesign name="user" size={15} color={colors.primary} />
                <Text style={styles.descTextStyle}>
                    {` ${I18n.t("createdBy")} ${data?.user?.first_name} ${data?.user?.last_name}`}
                </Text>
            </View>}
            {!!data?.user && <View style={styles.lineContainerStyle}>
                <Icons.AntDesign name="team" size={15} color={colors.primary} />
                <Text style={styles.descTextStyle}>
                    {` ${I18n.t("subscribers")} : ${data?.subscribers?.length}`}
                </Text>
            </View>}

            {(!!data?.address || !!data?.web || !!data?.region) && <View>
                <Text style={styles.sectionTitleTextStyle}>{I18n.t("coordinates")}</Text>
                <Divider orientation='horizontal' color={colors.primary} style={styles.dividerStyle} />
                {!!data?.address && <View style={styles.lineContainerStyle}>
                    <Icons.Entypo name="map" size={15} color={colors.primary} />
                    <Text style={styles.descTextStyle}>
                        {` ${I18n.t("address")} : ${data?.address}`}
                    </Text>
                </View>}
                {!!data?.region && <View style={styles.lineContainerStyle}>
                    <Icons.Feather name="map-pin" size={15} color={colors.primary} />
                    <Text style={styles.descTextStyle}>
                        {`${data?.region}`}
                    </Text>
                </View>}
                {!!data?.web && <View style={styles.lineContainerStyle}>
                    <Icons.MCI name="web" size={15} color={colors.primary} />
                    <Text style={styles.descTextStyle}>
                        {`${data?.web}`}
                    </Text>
                </View>}
            </View>}


            <Text style={styles.sectionTitleTextStyle}>{I18n.t("features")}</Text>
            <Divider orientation='horizontal' color={colors.primary} style={styles.dividerStyle} />
            <Text style={styles.descTextStyle}>
                {`${I18n.t("type")} : ${I18n.t(data?.type)}`}
            </Text>

            <Text style={styles.sectionTitleTextStyle}>{I18n.t("plus_details")}</Text>
            <Divider orientation='horizontal' color={colors.primary} style={styles.dividerStyle} />


        </View>
    )
}

export default InstDescProfileScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 15
    },
    sectionTitleTextStyle: {
        fontFamily: fonts.type.NunitoSemiBold,
        fontSize: fonts.size.font14,
        color: colors.sereneBlue,
        marginTop: 10
    },
    dividerStyle: {
        marginVertical: 10,
        marginBottom: 20
    },
    lineContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
    },
    descTextStyle: {
        fontFamily: fonts.type.NunitoRegular,
        fontSize: fonts.size.font12,
        color: colors.gray
    }
})