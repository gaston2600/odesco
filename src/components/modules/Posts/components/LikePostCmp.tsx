import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons from '../../../../styles/icons'
import colors from '../../../../styles/colors'
import I18n from "react-native-i18n";
import fonts from '../../../../theme/fonts';

const LikePostCmp = () => {
    return (
        <View style={styles.containerStyle}>
            <Icons.AntDesign name="like2" size={20} color={colors.primary} />
            <Text style={styles.textStyle}>{I18n.t("like")}</Text>
        </View>
    )
}

export default LikePostCmp

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        // borderWidth :.3,
        // padding : 5,
        // borderRadius : 5
    },
    textStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        marginLeft: 5,
        color: colors.black
    }
})