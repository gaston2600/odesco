import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommentCmp from './CommentCmp'
import CommentInputCmp from './CommentInputCmp'
import colors from '../../../../styles/colors'
import { getPostsComments } from '../../../../store/actions/postsActions'

const CommentsList = (props :any) => {
  const {post} =props;
  const dispatch = useDispatch()
    
  const { comments, loadingComments } = useSelector((state: any) => state?.Comment)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white
      }}
    >
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentCmp data={item} />}
        refreshControl={
          <RefreshControl
              style={{ width: 0, height: 0 }}
              colors={[colors.primary]}
              refreshing={loadingComments}
              onRefresh={() => {
                dispatch(getPostsComments({ post }))
              }}
          />
      }
      />
      
    </View>
  )
}

export default CommentsList

const styles = StyleSheet.create({})