import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommentCmp from './CommentCmp'
import CommentInputCmp from './CommentInputCmp'
import colors from '../../../../styles/colors'
import { getPostsComments } from '../../../../store/actions/postsActions'
import { useIsFocused } from '@react-navigation/native'

const CommentsList = (props: any) => {
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const { comments, loadingComments } = useSelector((state: any) => state?.Comment)
  const { post, refListComments } = props;

  function getList() {
    dispatch(getPostsComments(
      { post },
      () => {
        refListComments?.current?.scrollToEnd()
      },
      () => { }
    ))

  }


  useEffect(() => {
    getList()
  }, [isFocused])
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white
      }}
    >
      <FlatList
        ref={refListComments}
        data={comments}
        renderItem={({ item }) => <CommentCmp data={item} />}
        refreshControl={
          <RefreshControl
            style={{ width: 0, height: 0 }}
            colors={[colors.primary]}
            refreshing={loadingComments}
            onRefresh={() => {
              getList()
            }}
          />
        }
      />

    </View>
  )
}

export default CommentsList

const styles = StyleSheet.create({})