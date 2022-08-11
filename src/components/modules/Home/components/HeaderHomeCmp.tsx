import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../../styles/colors'
import Icons from '../../../../styles/icons'
import SearchCmp from '../../../common/SearchCmp'
import { useSelector } from 'react-redux'
import { urls } from '../../../../utils'

const HeaderHomeCmp = () => {
    const [searchText, setSearchText] = useState("")
    const { user } = useSelector((state: any) => state?.User)
console.log('====================================');
console.log(`${urls.baseURL}/${user?.avatar?.path}`);
console.log('====================================');
    return (
        <View style={styles.containerStyle}>
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Image source={{
                    uri: user?.avatar?.path ? `${urls.baseURL}/${user?.avatar?.path}` : "https://www.preprod.odesco.l-wa.com/assets/img/no-user.png"
                }}
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 50
                    }}
                />
            </View>
            <View style={{
                flex: 5,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <SearchCmp value={searchText}
                    setValue={setSearchText}
                />
            </View>
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Icons.Entypo name="dots-three-vertical" size={20} color={colors.white} />

            </View>

        </View>
    )
}

export default HeaderHomeCmp

const styles = StyleSheet.create({
    containerStyle: {
        height: 70,
        width: "100%",
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }

})