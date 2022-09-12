import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import fonts from '../../../../theme/fonts';
import colors from '../../../../styles/colors';
import AvatarCmp from '../../../common/AvatarCmp';
import { extractImage } from '../../../../helpers/extractImage';
import I18n from "react-native-i18n"
import globalStyles from '../../../../styles/globalStyles';

const TeacherCmp = (props: any) => {
    const { data, navigation } = props;
    console.log({ data });

    return (
        <Pressable
            onPress={() => {
                console.log("pressed");

                navigation?.navigate("TeacherDetailsScreen", { teacher: data?._id })
            }}
            style={[styles.containerStyle, globalStyles.shadow]}>
            <View style={{
                flex: 1
            }}>
                <AvatarCmp
                    name={String(data?.first_name)?.slice(0, 2)}
                    uri={extractImage(data?.avatar?.path)}
                    size={45}
                />
            </View>

            <View style={{
                flex: 5,
                paddingLeft: 10
            }} >
                <Text style={styles.titleTextStyle}>{`${data?.first_name} ${data?.last_name}`}</Text>
                <Text style={styles.descTextStyle}>{I18n.t(data?.partnertype)}</Text>
            </View>
            <View style={{
                flex: 1.5
            }}>
                <View style={styles.followContainerStyle}>
                    <Text style={styles.followTextStyle}>
                        {I18n.t("follow")}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

export default TeacherCmp

const styles = StyleSheet.create({
    containerStyle: {
        margin: 10,
        // borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        flexDirection: "row",
        // width: "100%"
    },
    titleTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        color: colors.darkBlue
    },
    descTextStyle: {
        fontFamily: fonts.type.NunitoRegular,
        fontSize: fonts.size.font10,
        color: colors.gray
    },
    followContainerStyle: {
        padding: 5,
        // paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: colors.sereneBlue,
        alignItems: "center",
        justifyContent: "center"
    },
    followTextStyle: {
        fontFamily: fonts.type.NunitoRegular,
        fontSize: fonts.size.font10,
        color: colors.white
    },
})