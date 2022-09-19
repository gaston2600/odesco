import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../../styles/colors'
import NetworkTabNavigator from '../../../navigation/tabs/NetworkTabNavigator'
import { useDispatch, useSelector } from 'react-redux'
import { getNetwork } from '../../../store/actions/networkActions'

const NetworkScreen = () => {
  const dispatch = useDispatch();
    const { defaultPartner } = useSelector((state: any) => state?.Inst)
    const { members, pendings, requests, loading } = useSelector((state: any) => state?.Network)
    
    function getPage() {
        dispatch(
            getNetwork(
                {
                    partner: defaultPartner
                }
            )
        )
    }

    useEffect(() => {
        getPage()
    }, [])

  return (
    <View style={styles.containerStyle}>
      {/* <Text>NetworkScreen</Text> */}
      <NetworkTabNavigator refresh={getPage} />
    </View>
  )
}

export default NetworkScreen

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white
  }
})