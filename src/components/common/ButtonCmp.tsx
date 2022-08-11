import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import fonts from '../../theme/fonts'
import colors from '../../styles/colors'

const ButtonCmp = (props: any) => {
    const { label, action } = props
    return (
        <Pressable
        onPress={action}
        style={styles.containerStyle} >
            <Text style={styles.labelTextStyle}>{label}</Text>
        </Pressable>
    )
}

export default ButtonCmp

const styles = StyleSheet.create({
    containerStyle: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        backgroundColor : colors.primary,
    },
    labelTextStyle: {
        fontFamily: fonts.type.NunitoSemiBold,
        fontSize: fonts.size.font14,
        color : colors.white

    }
})