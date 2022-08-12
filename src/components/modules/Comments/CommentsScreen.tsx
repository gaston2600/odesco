import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPostsComments } from '../../../store/actions/postsActions';
import CommentsList from './components/CommentsList';
import CommentInputCmp from './components/CommentInputCmp';

const CommentsScreen = (props: any) => {

    const { post } = props?.route?.params;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPostsComments({ post }))
    }, [post])

    return (
        <View style={{
            flex: 1
        }}>
            <CommentsList post={post} />
            <CommentInputCmp post={post} />
        </View>
    )
}

export default CommentsScreen

const styles = StyleSheet.create({})