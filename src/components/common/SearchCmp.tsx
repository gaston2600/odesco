import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import colors from '../../styles/colors'
import Icons from '../../styles/icons'
import fonts from '../../theme/fonts'

const SearchCmp = (props: any) => {
    const { value, setValue } = props
    return (
        <View style={styles.containerStyle}>
            <Icons.AntDesign name="search1" color={colors.grey} size={16} style={{ padding: 5 }} />
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder="Rechercher"
                placeholderTextColor={colors.grey}
                style={{
                    flex: 1,
                    fontFamily: fonts.type.NunitoMedium,
                    fontSize : fonts.size.font14
                }}
            />
            {value === "" ? null : <Pressable
                onPress={() => {
                    setValue("")
                }}
            >
                <Icons.AntDesign name="close" color={colors.grey} size={16} style={{ padding: 5 }} />
            </Pressable>}
        </View>

    )
}

export default SearchCmp

const styles = StyleSheet.create({
    containerStyle: {
        // flex: 1,
        backgroundColor: colors.white,
        width: "100%",
        // padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})    