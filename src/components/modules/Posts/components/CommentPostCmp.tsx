import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import fonts from '../../../../theme/fonts'
import Icons from '../../../../styles/icons'
import I18n from "react-native-i18n";
import colors from '../../../../styles/colors';
import { HomeContext } from "../../../../Context/HomeContext";

const CommentPostCmp = (props: any) => {

    const { navigation ,post, openCommentModalize, closeCommentModalize } = props

    const context = useContext(HomeContext)
    return (
        <Pressable
            onPress={() => {
                navigation?.navigate("CommentsScreen",{post })
            }
            }
            style={styles.containerStyle}>
            <Icons.AntDesign name="message1" size={20} color={colors.primary} />
            <Text style={styles.textStyle}>{I18n.t("comment")}</Text>
        </Pressable>
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
        marginLeft: 5,
        color: colors.black
    }
})