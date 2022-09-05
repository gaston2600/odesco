import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderPostCmp from '../../Posts/components/HeaderPostCmp'
import colors from '../../../../styles/colors'
import { getTimeAgo } from '../../../../helpers/getTimeAgo'
import { Avatar } from '@rneui/base'
import fonts from '../../../../theme/fonts'
import { extractImage } from '../../../../helpers/extractImage'
import AvatarCmp from '../../../common/AvatarCmp'

const CommentCmp = (props: any) => {
    const { data } = props
    return (
        <View style={styles.containerStyle}>
            <AvatarCmp
                name={data?.institution ? data?.institution?.name?.slice(0,2) : `${data?.partner?.first_name?.[0]}${data?.partner?.last_name?.[0]}`}
                uri={extractImage(data?.institution ? data?.institution?.logo?.path : data?.partner?.avatar?.path)}
                size={40}
            />
            <View style={styles.bodyContainerStyle}>
                <Text style={styles.titleTextStyle}>{data?.partner?.first_name ? `${data?.partner?.first_name} ${data?.partner?.last_name}` : data?.institution?.name}</Text>
                <Text style={styles.timeTextStyle}>{getTimeAgo(data?._id)}</Text>
                <Text style={styles.messageTextStyle}>{data?.message}</Text>
            </View>

        </View>
    )
}

export default CommentCmp

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        marginVertical: 5,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    bodyContainerStyle: {
        backgroundColor: colors.lightGray,
        flex: 1,
        padding: 5,
        margin: 5,
        borderRadius: 5
    },
    titleTextStyle: {
        fontFamily: fonts.type.NunitoSemiBold,
        fontSize: fonts.size.font14,
        color: colors.black
    },
    timeTextStyle: {
        fontFamily: fonts.type.NunitoRegular,
        fontSize: fonts.size.font10,
        color: colors.grey
    },
    messageTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        color: colors.black
    }
})