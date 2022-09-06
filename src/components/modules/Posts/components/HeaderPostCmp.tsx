import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AvatarCmp from '../../../common/AvatarCmp'
import { extractImage } from '../../../../helpers/extractImage'
import fonts from '../../../../theme/fonts'
import colors from '../../../../styles/colors'
import I18n from '../../../../translation/I18n'
import { getTimeAgo } from '../../../../helpers/getTimeAgo'

const HeaderPostCmp = (props: any) => {
    const { data } = props;
    const post = {
        name: data?.institution ? data?.institution?.name : `${data?.partner?.first_name} ${data?.partner?.last_name}`,
        path: data?.institution ? data?.institution?.logo?.path : data?.partner?.avatar?.path,
        type: data?.institution ? data?.institution?.type : data?.partner?.partnertype

    }
    return (
        <View style={styles.containerStyle}>
            <View style={styles.rowContainer}>
                <View style={{
                    flex: 1
                }}>
                    <AvatarCmp
                        uri={extractImage(post?.path)}
                        name={String(post?.name)?.slice(0, 2)}
                        size={45}
                    />
                </View>
                <View
                    style={{
                        flex: 5,
                        height: "100%"
                    }}
                >
                    <Text style={styles.titleTextStyle}>{post?.name}</Text>
                    <Text style={styles.typeTextStyle}>{I18n.t(post?.type)}</Text>
                    <Text style={styles.dateTextStyle}>{getTimeAgo(data?._id)}</Text>
                </View>

            </View>

        </View>
    )
}

export default HeaderPostCmp

const styles = StyleSheet.create({
    containerStyle: {
        // borderWidth: 1,
        paddingVertical: 5,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    titleTextStyle: {
        fontFamily: fonts.type.NunitoSemiBold,
        color: colors.black,
        fontSize: fonts.size.font14
    },
    typeTextStyle: {
        fontFamily: fonts.type.NunitoRegular,
        color: colors.grey,
        fontSize: fonts.size.font12
    },
    dateTextStyle: {
        fontFamily: fonts.type.NunitoRegular,
        color: colors.darkBlue,
        fontSize: fonts.size.font12
    }

})