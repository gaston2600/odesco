import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import colors from '../../../../styles/colors'
import Icons from '../../../../styles/icons'
import SearchCmp from '../../../common/SearchCmp'
import { useSelector } from 'react-redux'
import { urls } from '../../../../utils'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import MenuContextCmp from './MenuContextCmp'
import globalStyles from '../../../../styles/globalStyles'

const HeaderHomeCmp = () => {
    const [searchText, setSearchText] = useState("")
    const { user } = useSelector((state: any) => state?.User)
    const menuRef = useRef(null)
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

            <View>
                <Pressable
                    onPress={() => {
                        menuRef?.current?.open()
                    }}
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Icons.MCI name="dots-grid" size={40} color={colors.white} />
                </Pressable>
                <Menu
                    ref={menuRef}
                >
                    <MenuTrigger />
                    <MenuOptions
                        optionsContainerStyle={[{
                            width: "80%",
                            padding: 10,
                            shadowColor: colors.primary
                        }, globalStyles.shadow]}
                    >
                        <MenuContextCmp
                            close={() => menuRef?.current?.close()}
                        />
                    </MenuOptions>
                </Menu>
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