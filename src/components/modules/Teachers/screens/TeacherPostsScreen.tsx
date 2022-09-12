import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getPostsList, getTeacherPosts } from '../../../../store/actions';
import PostCmp from '../../Posts/PostCmp';
import colors from '../../../../styles/colors';
import fonts from '../../../../theme/fonts';

const TeacherPostsScreen = (props: any) => {
    const { teacher, navigation } = props;
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    function getPosts() {
        setLoading(true)
        dispatch(getTeacherPosts({ limit: 100, offset: 0, partner: teacher?._id, filters: null }, (
            res: any
        ) => {
            // console.log({ res });
            setPosts(res?.posts)
            setLoading(false)
        },
            (err: any) => {
                setLoading(false)
                console.log({ err });

            }))
    }

    const [isVisibleImageModal, setIsVisibleImageModal] = useState(false)
    const [imagesModalList, setImagesModalList] = useState([])
    const showImages = (images: any) => {
        setIsVisibleImageModal(true)
        setImagesModalList(images)
    }

    useEffect(() => {
        getPosts()
    }, [teacher])

    return (
        <View style={styles.containerStyle}>
            <FlatList
                data={posts}
                renderItem={({ item, index }) => (
                    <PostCmp data={item} index={index}
                        navigation={navigation}
                        showImages={false}
                        openCommentModalize={null}
                        closeCommentModalize={null}
                    />)}
                refreshControl={
                    <RefreshControl
                        style={{ width: 0, height: 0 }}
                        colors={[colors.primary]}
                        refreshing={loading}
                        onRefresh={() => {
                            getPosts()
                        }}
                    />
                }
                ListEmptyComponent={() => (
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text
                            style={{
                                fontFamily: fonts.type.NunitoMedium,
                                fontSize: fonts.size.font12,
                                color: colors.grey
                            }}
                        >Aucune Publication</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default TeacherPostsScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white
    }
})