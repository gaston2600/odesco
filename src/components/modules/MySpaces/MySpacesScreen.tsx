import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../styles/colors';
import AvatarCmp from '../../common/AvatarCmp';
import { extractImage } from '../../../helpers/extractImage';
import fonts from '../../../theme/fonts';
import I18n from "react-native-i18n";
import metrics from "../../../theme/metrics"
import globalStyles from '../../../styles/globalStyles';
import { Divider } from '@rneui/themed';
const { screenWhidth } = metrics

const MySpacesScreen = (props: any) => {
    const { space, navigation } = props

    const [data, setData] = useState({
        name: space?.type === "Partner" ? `${space?.first_name} ${space?.last_name}` : space?.name,
        avatar: space?.type === "Partner" ? space?.avatar : space?.logo,
        type: space?.type === "Partner" ? "partner" : "institute",
    })

    const listMenu = [
        {
            name: "Mon profile",
            icon: require("../../../../assets/icons/menu/inst.png"),
            route: "ProfileScreen"
        },
        {
            name: "Cours",
            icon: require("../../../../assets/icons/menu/icon_soutien_scolaire.png")
        },
        {
            name: "Soutien Scolaire",
            icon: require("../../../../assets/icons/menu/icon_soutien_scolaire.png")
        },
        {
            name: "Évenements",
            icon: require("../../../../assets/icons/menu/events.png")
        }
    ]

    function renderMenuItem(params: any) {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (params?.route) {
                        navigation?.navigate(params?.route)
                    }

                }}
                style={styles.menuItemContainerStyle}>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center"
                    }}
                >
                    <Image
                        source={params.icon}
                        style={{
                            height: 50,
                            width: 50
                        }}
                    />
                </View>
                <View
                    style={{
                        flex: 5,
                        padding: 10
                    }}
                >
                    <Text style={styles.menuTitleTextStyle}>{params?.name}</Text>
                </View>

            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.containerStyle}>
            <View style={styles.headerContainerStyle}>
                <AvatarCmp
                    // name={String(data?.name)?.slice(0, 2)}
                    uri={extractImage(data?.avatar)}
                    size={70}
                />
                <View>
                    <Text style={styles.nameTextStyle}>{data?.name}</Text>
                    <Text style={styles.typeTextStyle}>{I18n.t(data?.type)}</Text>
                </View>
            </View>
            <Divider orientation='horizontal' />
            <View style={styles.bodyContainerStyle}>
                <FlatList
                    // numColumns={2}
                    // columnWrapperStyle={{
                    //     alignItems: "center",
                    //     justifyContent: "space-evenly"
                    // }}
                    data={listMenu}
                    renderItem={({ item }) => renderMenuItem(item)}
                    keyExtractor={item=>item?.name}
                    ItemSeparatorComponent={()=><Divider orientation='horizontal' />}
                />
            </View>


        </View>
    )
}

export default MySpacesScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white
    },
    headerContainerStyle: {
        padding: 20,
        flexDirection: "row"
    },
    nameTextStyle: {
        fontFamily: fonts.type.NunitoBold,
        fontSize: fonts.size.font14,
        color: colors.darkBlue,
        marginLeft: 10
    },
    typeTextStyle: {
        fontFamily: fonts.type.NunitoSemiBold,
        fontSize: fonts.size.font12,
        color: colors.gray,
        marginLeft: 10
    },
    bodyContainerStyle: {
        flex: 1
    },
    menuItemContainerStyle: {
        // borderWidth: 1,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5
    },
    menuTitleTextStyle: {
        fontFamily: fonts.type.NunitoSemiBold,
        fontSize: fonts.size.font14,
        color: colors.black
    },
    menuDescTextStyle: {
        fontFamily: fonts.type.NunitoRegular,
        fontSize: fonts.size.font12,
        color: colors.gray
    },
})