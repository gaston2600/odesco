import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import HeaderHomeCmp from './components/HeaderHomeCmp'
import colors from '../../../styles/colors'
import PostsListCmp from '../Posts/PostsListCmp'

const HomeScreen = () => {
 
  return (
    <View style={styles.containerStyle}>
      <StatusBar barStyle={'default'} backgroundColor={colors.primary} />
      <HeaderHomeCmp />
      <PostsListCmp />
      
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