import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons from '../../../../styles/icons'
import colors from '../../../../styles/colors'
import metrics from "../../../../theme/metrics";
import I18n from 'react-native-i18n'
import fonts from '../../../../theme/fonts';
import { Divider } from '@rneui/themed';
import AvatarCmp from '../../../common/AvatarCmp';
import { useSelector } from 'react-redux';
import { extractImage } from '../../../../helpers/extractImage';

const { screenHeight, screenWidth } = metrics
const NewPostScreen = (props: any) => {
    const { navigation } = props
    const { user } = useSelector((state: any) => state?.User)

    return (
        <View>
            <View style={styles.headerContainerStyle}>
                <Pressable
                    onPress={() => {
                        navigation?.goBack()
                    }}
                    style={{
                        flex: 1,
                        padding: 10
                    }}>
                    <Icons.AntDesign name="close" size={30} color={colors.black} />
                </Pressable>
                <View style={{
                    flex: 4,
                    padding: 10
                }}>
                    <Text style={styles.titleTextStyle}>{I18n.t("new_post")}</Text>
                </View>
                <View style={{
                    flex: 1,
                    padding: 10
                }}>
                    <Text style={{
                        fontFamily: fonts.type.NunitoRegular,
                        fontSize: fonts.size.font12,
                        color: colors.grey
                    }}>Publier</Text>
                </View>
            </View>
            <Divider orientation="horizontal" />

            <View style={styles.bodyContainerstyle}>
                <Text>NewPostScreen</Text>
                {/* ----------------------SELECT INST SECTION */}
                <View
                    style={{
                        flexDirection: "row"
                    }}
                >
                    <View>
                        <AvatarCmp
                            // name={user?.first_name?.slice(0, 2)}
                            uri={extractImage(user?.avatar?.path)}
                            size={40}
                        />
                    </View>

                    <View>
                        <Text style={styles.titleTextStyle}>{`${user?.first_name} ${user?.last_name}`}</Text>

                    </View>
                </View>
            </View>


        </View>
    )
}

export default NewPostScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white
    },

    headerContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: screenHeight * .1
    },
    titleTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font14,
        color: colors.black
    },
    bodyContainerstyle: {
        // flexGrow: 1,
        borderWidth: 1
    }
})