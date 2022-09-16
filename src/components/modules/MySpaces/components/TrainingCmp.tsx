import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import fonts from '../../../../theme/fonts'
import colors from '../../../../styles/colors'
import Icons from '../../../../styles/icons'
import moment from 'moment'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import I18n from "react-native-i18n"

const TrainingCmp = (props: any) => {
    const { data, edit, deleteFormation } = props
    const refMenu = useRef(null)
    function deleteItem() {
        Alert.alert(
            I18n.t("delete"),
            I18n.t("delete_msg"),
            [
                {
                    text: I18n.t("cancel"),
                    // onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: I18n.t("delete"), onPress: () => deleteFormation(data) }
            ]
        );
    }
    return (
        <View style={styles.itemStyle}>
            <View style={styles.itemContainerStyle}>
                <Text style={[styles.titleTextStyle, { fontFamily: fonts.type.NunitoBold }]}>{data?.institution}</Text>
                <Text style={styles.titleTextStyle}>{data?.diplome}</Text>
                <View style={styles.rowContainer}>
                    <Text style={styles.titleTextStyle}>{moment(data?.startDate).format("MMM YYYY")}</Text>
                    {data?.endDate && <Text style={styles.titleTextStyle}> - </Text>}
                    {data?.endDate && <Text style={styles.titleTextStyle}>{moment(data?.endDate).format("MMM YYYY")}</Text>}
                </View>
            </View>
            <Pressable
                onPress={() => {
                    refMenu?.current?.open()
                }}
                style={styles.editIconContainerStyle}>
                <Menu
                    ref={refMenu}
                >
                    <MenuTrigger />
                    <MenuOptions>
                        <MenuOption onSelect={() => edit(data)}>
                            <Text style={[styles.menuTextStyle]}>Édit</Text>
                        </MenuOption>
                        <MenuOption onSelect={deleteItem} >
                            <Text style={[styles.menuTextStyle, { color: 'red' }]}>Delete</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
                <Icons.Entypo name="dots-three-vertical" size={15} style={styles.editIconContainerStyle} />
            </Pressable>
        </View>

    )
}

export default TrainingCmp

const styles = StyleSheet.create({
    itemStyle: {
        flexDirection: "row",
    },
    itemContainerStyle: {
        padding: 10,
        marginTop: 5,
        flex: 9
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
    editIconContainerStyle: {
        padding: 5,
        flex: 1
    },
    menuTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        color: colors.gray
    }
})