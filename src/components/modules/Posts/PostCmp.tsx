import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../../styles/colors'
import HeaderPostCmp from './components/HeaderPostCmp';
import fonts from '../../../theme/fonts';
import ReadMore from 'react-native-read-more-text';
import TruncatedFooterCmp from '../../common/showMoreText/TruncatedFooterCmp';
import RevealedFooterCmp from '../../common/showMoreText/RevealedFooterCmp';
import { extractImage } from '../../../helpers/extractImage';
import FbGrid from "react-native-fb-image-grid";
import LikePostCmp from './components/LikePostCmp';
import CommentPostCmp from './components/CommentPostCmp';
import { Divider } from '@rneui/base';
import I18n from "react-native-i18n";
import Icons from '../../../styles/icons';
const PostCmp = (props: any) => {
    const { navigation, data, index, openCommentModalize, closeCommentModalize } = props;
    return (
        <View style={styles.containerStyle}>
            <HeaderPostCmp data={data} />
            <View>
                {/* <Text style={styles.descTextStyle}>{data?.desc}</Text> */}
                <ReadMore
                    numberOfLines={3}
                    renderTruncatedFooter={(handlePress) => <TruncatedFooterCmp handlePress={handlePress} />}
                    renderRevealedFooter={(handlePress) => <RevealedFooterCmp handlePress={handlePress} />}
                    onReady={() => null}>
                    <Text style={styles.descTextStyle}>
                        {data?.desc}
                    </Text>
                </ReadMore>
            </View>
            {data?.gallery?.length ? <View
                style={{
                    height: 200
                }}
            >
                <FbGrid
                    images={data?.gallery?.map((v: any) => extractImage(v?.img?.path))}
                    onPress={() => null}
                />

            </View> : null}
            <View style={[styles.footerContainerStyle, { paddingHorizontal: 10 }]}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <Icons.AntDesign name={data?.is_liked ? "heart" : "hearto"} size={12} color={colors.primary} />
                    <Text style={[styles.commentsTextStyle, { marginLeft: 3 }]}>{data?.likes?.length}</Text>
                </View>
                <View>
                    <Text style={styles.commentsTextStyle}>{`${data?.comments?.length || 0} ${I18n.t("comments")}`}</Text>
                </View>
            </View>
            <View style={{
                flex: 1,
                borderTopWidth: 1,
                borderColor: `${colors.grey}77`,
                margin: 5

            }} />
            <View
                style={styles.footerContainerStyle}
            >

                <LikePostCmp />
                <CommentPostCmp
                navigation={navigation}
                post={data?._id}
                    openCommentModalize={openCommentModalize}
                    closeCommentModalize={closeCommentModalize}
                />
            </View>
        </View>
    )
}

export default PostCmp

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 15,
        marginVertical: 10,

        // borderWidth: 1,

    },
    descTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font14
    },
    footerContainerStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    commentsTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font10,
        color: colors.black
    }
})