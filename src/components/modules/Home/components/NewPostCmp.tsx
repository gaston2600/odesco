import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons from '../../../../styles/icons'
import colors from '../../../../styles/colors'
import I18n from 'react-native-i18n'
import fonts from '../../../../theme/fonts'
import globalStyles from '../../../../styles/globalStyles'

const NewPostCmp = (props: any) => {
    const { navigation } = props

    return (
        <Pressable
            onPress={() => {
                console.log("pressed");

                navigation?.navigate("NewPostScreen")
            }}
            style={[styles.containerStyle, globalStyles.shadow]}>
            <View style={{
                flex: 1,
                padding: 10
            }}>
                <Icons.Feather name="edit" size={20} color={colors.primary} />
            </View>
            <View style={{
                flex: 5,
                padding: 10
            }}>
                <Text style={styles.textStyle}>{I18n.t("new_post")}</Text>
            </View>
            <View style={{
                flex: 1,
                borderLeftWidth: 1,
                borderLeftColor: colors.primary,
                padding: 10
            }}>
                <Icons.FontAwesome name="photo" size={20} color={colors.primary} />
            </View>
            <View style={{
                flex: 1,
                borderLeftWidth: 1,
                borderLeftColor: colors.primary,
                padding: 10
            }}>
                <Icons.Ionicons name="document-attach-outline" size={20} color={colors.primary} />
            </View>

        </Pressable>
    )
}

export default NewPostCmp

const styles = StyleSheet.create({
    containerStyle: {
        // padding: 10,
        marginHorizontal: 5,
        marginVertical: 10,
        // borderWidth: 1,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white
    },
    textStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12
    }
})