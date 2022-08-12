import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostCmp from './PostCmp'
import { useIsFocused } from '@react-navigation/native'
import { getPostsList } from '../../../store/actions/postsActions'
import colors from '../../../styles/colors'
import ImagesViewModal from '../../modals/ImagesViewModal'

const PostsListCmp = (props: any) => {
    const { navigation, openCommentModalize, closeCommentModalize } = props;
    const { posts, count, loadingPosts } = useSelector((state: any) => state.Posts)
    const dispatch = useDispatch()

    const isFocused = useIsFocused()

    const [loading, setLoading] = useState(false)
    const [posts_list, setPosts_list] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(10)

    // const getPage = (page = 1) => {
    //     const offset = page === 1 || page === 0 ? 0 : limit * (page - 1);
    //     console.log({ page, offset });

    //     setCurrentPage(page);
    //     setLoading(true);

    //     NotifSrv.getList({
    //         limit,
    //         offset,
    //         unreaded,
    //         // filters: {
    //         //   isReaded: unreaded ? false : "",
    //         // },
    //     })
    //         .then((res: any) => {
    //             console.log({ res });

    //             setLoading(false);
    //             if (page === 1) {
    //                 setNotifications(res?.notifications || []);
    //             } else {
    //                 setNotifications([...notifications, ...res?.notifications]);
    //             }

    //             setCountAll(res?.counts || 0);
    //         })
    //         .catch((e: any) => {
    //             setLoading(false);
    //             console.log("==========+++> ERR", e);
    //             setNotifications([]);
    //         });
    // };

    const isCloseToBottom = ({
        layoutMeasurement,
        contentOffset,
        contentSize,
    }: any) => {
        const paddingToBottom = 20;
        return (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
        );
    };

    useEffect(() => {
        dispatch(getPostsList({ limit, offset: 0, filters: null }, null, null))
    }, [isFocused])
    return (
        <View style={styles.containerStyle}>

            <FlatList
                data={posts}
                renderItem={({ item, index }) => {
                    return <PostCmp data={item} index={index}
                        navigation={navigation}
                        openCommentModalize={openCommentModalize}
                        closeCommentModalize={closeCommentModalize}
                    />
                }}
                keyExtractor={item => `posts_${item?._id}`}
                refreshControl={
                    <RefreshControl
                        style={{ width: 0, height: 0 }}
                        colors={[colors.primary]}
                        refreshing={loadingPosts}
                        onRefresh={() => {
                            dispatch(getPostsList({ limit, offset: 0, filters: null }, null, null))
                        }}
                    />
                }
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        console.log("________________close to bottom");
                        // if (count > notifications.length) {
                        //     getPage(current_page + 1);
                        //     console.log("get", current_page + 1);
                        // }
                    }
                }}
            />
            {/* <ImagesViewModal visible={true} close={() => {
                console.log('====================================');
                console.log("close modal");
                console.log('====================================');
            }} /> */}
        </View>
    )
}

export default PostsListCmp

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    }
})