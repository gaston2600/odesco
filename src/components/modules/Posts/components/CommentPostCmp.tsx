import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import fonts from '../../../../theme/fonts'
import Icons from '../../../../styles/icons'
import I18n from "react-native-i18n";
import colors from '../../../../styles/colors';

const CommentPostCmp = () => {
  return (
    <View style={styles.containerStyle}>
            <Icons.AntDesign name="message1" size={20} color={colors.primary} />
            <Text style={styles.textStyle}>{I18n.t("comment")}</Text>
        </View>
  )
}

export default CommentPostCmp

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        // flex : 1
    },
    textStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        marginLeft :5,
        color : colors.black
    }
})