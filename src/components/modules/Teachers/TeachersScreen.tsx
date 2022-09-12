import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeachersList } from '../../../store/actions/teachersActions'
import TeacherCmp from './components/TeacherCmp'
import colors from '../../../styles/colors'

const TeachersScreen = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch()
  const state = useSelector((state: any) => state)
  const { loading } = useSelector((state: any) => state?.Teachers)
  const [list, setList] = useState([])
  function getPage() {
    dispatch(getTeachersList(
      {},
      (res: any) => {
        console.log({ res });
        setList(res?.teachers)
      },
      (err: any) => {
        console.log({ err });

      }
    ))
  }
  useEffect(() => {
    getPage()
  }, [])

  return (
    <View style={styles.containerStyle}>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <TeacherCmp
            data={item}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item?._id}
        refreshControl={
          <RefreshControl
            style={{ width: 0, height: 0 }}
            colors={[colors.primary]}
            refreshing={loading}
            onRefresh={() => {
              getPage()
            }}
          />
        }
      />
    </View>
  )
}

export default TeachersScreen

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white
  }
})