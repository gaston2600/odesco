import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { useDispatch, useSelector } from 'react-redux'
import { getRoomsList } from '../../../store/actions/chatActions'
import { useIsFocused } from '@react-navigation/native'

const ChatScreen = (props: any) => {
  const dispatch = useDispatch()
  const isFocused =useIsFocused()
  const { defaultPartner } = useSelector((state: any) => state?.Inst)

  function getPage() {
    dispatch(
      getRoomsList(
        {
          partner: defaultPartner,
          limit: 1000
        },
        (res: any) => {
          console.log({ res });
        },
        (err: any) => {
          console.log({ err });
        }
      )
    )
  }
  useEffect(() => {
    getPage()
  }, [isFocused])

  return (
    <View>
      <Text>chatScreen</Text>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})