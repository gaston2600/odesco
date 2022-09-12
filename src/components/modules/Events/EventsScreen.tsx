import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import EventTabNavigator from '../../../navigation/tabs/EventTabNavigator'
import colors from '../../../styles/colors'
import Icons from '../../../styles/icons'
import fonts from '../../../theme/fonts'
import { Divider } from '@rneui/themed'

const EventsScreen = (props: any) => {

    const [searchInput, setSearchInput] = useState("")

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white
            }}>
            <View
                style={{
                    flexDirection: "row",
                    // width: "100%",
                    borderWidth: 1,
                    borderColor: colors.grey,
                    borderRadius: 5,
                    margin: 15
                }}
            >
                <TextInput
                    value={searchInput}
                    onChangeText={setSearchInput}
                    style={styles.textInputStyle}
                />
                <Pressable
                    onPress={() => {
                        if (searchInput !== "") {
                            setSearchInput("")
                        }
                    }}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 5,
                        flex: 1,
                    }}
                >
                    <Icons.AntDesign name={searchInput !== "" ? "close" : "search1"} size={20} color={colors.gray} />
                </Pressable>

            </View>
            <Divider orientation='horizontal' />
            <View
                style={{
                    flex: 1
                }}
            >
                <EventTabNavigator searchInput={searchInput} />
            </View>

        </View>
    )
}

export default EventsScreen

const styles = StyleSheet.create({
    textInputStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        color: colors.gray,
        paddingHorizontal: 5,
        flex: 8

    }
})