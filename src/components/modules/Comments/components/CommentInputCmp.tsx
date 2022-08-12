import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../../styles/colors'
import Icons from '../../../../styles/icons'
import I18n from 'react-native-i18n'
import fonts from '../../../../theme/fonts'
import { useDispatch } from 'react-redux'

const CommentInputCmp = () => {
    const dispatch = useDispatch()
    const [text, setText] = useState("")

    function postComment(data:any) {
        console.log()
    }
    return (
        <View style={styles.containerStyle}>
            <TextInput
                value={text}
                onChangeText={setText}
                style={styles.textInputStyle}
                placeholder={I18n.t("comment")}
                placeholderTextColor={`${colors.primary}77`}
                multiline
            />
            <Pressable
                style={styles.iconContainerStyle}
            >
                <Icons.Ionicons name="send-outline" size={25} color={colors.white} />
            </Pressable>
        </View>
    )
}

export default CommentInputCmp

const styles = StyleSheet.create({
    containerStyle: {
        // borderWidth: 1,
        padding: 5,
        flexDirection: "row",
        width: "100%",
        backgroundColor : colors.lightGray
    },
    textInputStyle: {
        backgroundColor: colors.white,
        flex: 8,
        borderRadius: 5,
        fontFamily : fonts.type.NunitoMedium,
        fontSize : fonts.size.font14,
        paddingHorizontal : 15
    },
    iconContainerStyle: {
        alignItems: "center",
        justifyContent: "center",
        flex: 2,
        height : 50,
        backgroundColor: colors.primary,
        margin: 5,
        borderRadius: 4
    }
})