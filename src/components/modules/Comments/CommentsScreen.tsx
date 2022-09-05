import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPostsComments } from '../../../store/actions/postsActions';
import CommentsList from './components/CommentsList';
import CommentInputCmp from './components/CommentInputCmp';
const CommentsScreen = (props: any) => {
    const dispatch = useDispatch()
    const { post } = props?.route?.params;

    useEffect(() => {
        dispatch(getPostsComments({ post }, () => null, () => null))
    }, [post])
    const refListComments = useRef(null)
    return (
        <View style={{
            flex: 1
        }}>
            <CommentsList
                post={post}
                refListComments={refListComments}
            />
            <CommentInputCmp
                post={post}
                refListComments={refListComments}
            />
        </View>
    )
}

export default CommentsScreen

const styles = StyleSheet.create({})