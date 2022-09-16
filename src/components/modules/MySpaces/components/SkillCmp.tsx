import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider } from '@rneui/themed'
import fonts from '../../../../theme/fonts'
import colors from '../../../../styles/colors'
import I18n from "react-native-i18n"

const SkillCmp = (props: any) => {
    const { data  ,deleteSkill } = props;
    return (
        <Pressable 
        onLongPress={()=>{
            Alert.alert(
                I18n.t("delete"),
                I18n.t("delete_msg"),
                [
                    {
                        text: I18n.t("cancel"),
                        // onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: I18n.t("delete"), onPress: () => deleteSkill(data) }
                ]
            );
        }}
        style={styles.itemContainerStyle}>
            <Text style={[styles.titleTextStyle, { fontFamily: fonts.type.NunitoBold }]}>{data}</Text>
            <Divider orientation='horizontal' />
        </Pressable>
    )
}

export default SkillCmp

const styles = StyleSheet.create({
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

})