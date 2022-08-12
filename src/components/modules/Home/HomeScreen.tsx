import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import HeaderHomeCmp from './components/HeaderHomeCmp'
import colors from '../../../styles/colors'
import PostsListCmp from '../Posts/PostsListCmp'
import CommentsModalize from '../../modals/CommentsModalize'

const HomeScreen = (props: any) => {
  const { navigation } = props
  const modalizeRef = useRef(null)
  const openCommentModalize = () => {
    modalizeRef?.current?.open();
  }
  const closeCommentModalize = () => {
    modalizeRef?.current?.close();
  }

  return (
    <View style={styles.containerStyle}>
      <StatusBar barStyle={'default'} backgroundColor={colors.primary} />
      <HeaderHomeCmp />
      <PostsListCmp
      navigation={navigation}
        openCommentModalize={openCommentModalize}
        closeCommentModalize={closeCommentModalize}
      />
      <CommentsModalize modalizeRef={modalizeRef} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center"
  }
})