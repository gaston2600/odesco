import { ActivityIndicator, FlatList, Image, TouchableOpacity, RefreshControl, StyleSheet, Text, TextInp, TouchableOpacityut, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import fonts from '../../../../theme/fonts'
import colors from '../../../../styles/colors'
import I18n from "react-native-i18n";
import { useDispatch, useSelector } from 'react-redux';
import Icons from '../../../../styles/icons';
import { Button, Divider } from '@rneui/themed';
import { extractImage } from '../../../../helpers/extractImage';
import { editUser, getMyInstitutions, getMyPartners } from '../../../../store/actions';
import { useIsFocused } from '@react-navigation/native';

const MenuContextCmp = (props: any) => {
    const { close, navigation } = props
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const { myInstitutions, myPartners, loading } = useSelector((state: any) => state?.Inst)
    const { user } = useSelector((state: any) => state?.User)

    const [showAddPartner, setShowAddPartner] = useState(false)
    const [ref_code, setRef_code] = useState("")
    const [loadingAddPartner, setLoadingAddPartner] = useState(false)

    function getMyInsitutions() {
        dispatch(getMyInstitutions({}))
        dispatch(getMyPartners({ user: user?._id }))
    }

    const toogleAddPartner = () => {
        setShowAddPartner(!showAddPartner)
        setRef_code("")
    }


    function renderInst(params: any, empty: boolean = false) {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (empty) {
                        navigation?.navigate("AddNewInstScreen", {})
                    } else {
                        navigation?.navigate("MySpaces", { space: { ...params?.institute, type: "Institution" } })
                    }
                    close()
                }}
                style={[styles.instContainerStyle, !params?.institute?.active && !empty && { backgroundColor: colors.grey }]}>
                <View style={{
                    flex: 2
                }}>
                    <Image
                        source={empty ? require("../../../../../assets/images/add.png") : require("../../../../../assets/images/inst.png")}
                        style={{
                            height: 50,
                            width: 50,
                            marginTop: -20,
                            borderWidth: 0.5,
                            borderRadius: 50,
                            borderColor: colors.primary,
                            backgroundColor: colors.white
                        }}
                    />
                </View>
                <View style={{
                    flex: 1
                }}>
                    <Text
                        adjustsFontSizeToFit
                        style={[styles.instTitleTextStyle, {
                            color: empty ? colors.primary : (!params?.institute?.active ? colors.white : colors.grey)
                        }]}>
                        {empty ? I18n.t("add_new") : params?.institute?.name}
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }
    function renderPartners(params: any, empty: boolean = false) {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (empty) {
                        toogleAddPartner()
                    } else {
                        navigation?.navigate("MySpaces", { space: { ...params, type: "Partner" } })
                        close()
                    }
                }}
                style={styles.instContainerStyle}>
                <View style={{
                    flex: 2
                }}>
                    <Image
                        source={empty ? require("../../../../../assets/images/add.png") : (params?.avatar?.path ? { uri: extractImage(params?.avatar?.path) } : require("../../../../../assets/images/inst.png"))}
                        style={{
                            height: 50,
                            width: 50,
                            marginTop: -20,
                            borderWidth: 0.5,
                            borderRadius: 50,
                            borderColor: colors.primary,
                            backgroundColor: colors.white
                        }}
                    />
                </View>
                <View style={{
                    flex: 1
                }}>
                    <Text
                        adjustsFontSizeToFit
                        style={[styles.instTitleTextStyle, {
                            color: empty ? colors.primary : colors.grey
                        }]}>
                        {empty ? I18n.t("add_new") : `${params?.first_name} ${params?.last_name}`}
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }

    function addPartner(params: any) {
        if (params?.length) {
            setLoadingAddPartner(true)
            dispatch(
                editUser({
                    id: user?._id,
                    data: { ref_code }
                }, (res: any) => {
                    setLoadingAddPartner(false)
                    dispatch(getMyPartners({ user: user?._id }))
                },
                    (err: any) => {
                        setLoadingAddPartner(false)
                    }
                )
            )
        }
    }
    useEffect(() => {
        getMyInsitutions()
    }, [isFocused])
    return (
        <View>
            <View>
                <Text style={styles.titleTextStyle}>{I18n.t("myPartners")}</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={myPartners}
                    renderItem={({ item }) => renderPartners(item)}
                    ListFooterComponent={() => renderPartners({}, true)}
                    refreshControl={
                        <RefreshControl
                            style={{ width: 0, height: 0 }}
                            colors={[colors.primary]}
                            refreshing={loading}
                        />
                    }

                />
                {
                    showAddPartner &&
                    <View style={styles.addPartnerConatinerStyle}>
                        <TextInput
                            value={ref_code}
                            onChangeText={setRef_code}
                            style={styles.textIputStyle}
                            placeholder={I18n.t("code_access")}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                addPartner(ref_code)
                            }}
                            style={{
                                backgroundColor: colors.primary,
                                padding: 5,
                                borderRadius: 5
                            }}
                        >
                            {loadingAddPartner ?
                                <ActivityIndicator color={colors.white} size="small" /> :
                                <Text
                                    style={{
                                        fontFamily: fonts.type.NunitoMedium,
                                        fontSize: fonts.size.font10,
                                        color: colors.white
                                    }}>
                                    {I18n.t("save")}
                                </Text>}
                        </TouchableOpacity>
                    </View>
                }
                <Divider orientation='horizontal' style={styles.dividerStyle} />
            </View>

            <View>
                <Text style={styles.titleTextStyle}>{I18n.t("myInsts")}</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={myInstitutions}
                    renderItem={({ item }) => renderInst(item)}
                    ListFooterComponent={() => renderInst({}, true)}
                    refreshControl={
                        <RefreshControl
                            style={{ width: 0, height: 0 }}
                            colors={[colors.primary]}
                            refreshing={loading}
                        />
                    }
                />
            </View>
            <TouchableOpacity
                onPress={close}
                style={styles.closeContainerStyle}
            >
                <Icons.AntDesign name="close" size={20} color={colors.black} />
            </TouchableOpacity>
        </View>
    )
}

export default MenuContextCmp

const styles = StyleSheet.create({
    titleTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font14,
        color: colors.primary
    },
    instContainerStyle: {
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 70,
        minHeight: 70,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: colors.primary,
        marginHorizontal: 5,
        marginTop: 20,
        padding: 5
    },
    instTitleTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font10,
        color: colors.grey
    },
    dividerStyle: {
        marginVertical: 10,
    },
    closeContainerStyle: {
        position: "absolute",
        top: 5,
        right: 5,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: colors.black
    },
    addPartnerConatinerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // borderWidth :1,
        marginVertical: 5,
    },
    textIputStyle: {
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: colors.grey,
        width: "70%",
        padding: 5,
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        color: colors.gray
    }

})