import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../../styles/colors'
import NetworkTabNavigator from '../../../navigation/tabs/NetworkTabNavigator'
import { useDispatch, useSelector } from 'react-redux'
import { getNetwork } from '../../../store/actions/networkActions'
import Icons from '../../../styles/icons'
import I18n from 'react-native-i18n'
import fonts from '../../../theme/fonts'
import MembersListModal from '../../modals/network/MembersListModal'

const NetworkScreen = () => {
  const dispatch = useDispatch();
  const { defaultPartner } = useSelector((state: any) => state?.Inst)
  const { members, pendings, requests, loading } = useSelector((state: any) => state?.Network)

  const [showMembersListModal, setShowMembersListModal] = useState(false)

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
      <Pressable
        onPress={() => {
          setShowMembersListModal(true)
        }}
        style={styles.barSearchContainerStyle}>
        <Text style={styles.barTextStyle}>{I18n.t("search")}</Text>
        <Icons.AntDesign name="search1" size={20} color={colors.gray} />
      </Pressable>
      <NetworkTabNavigator refresh={getPage} />
      <MembersListModal
        visible={showMembersListModal}
        setVisible={setShowMembersListModal}
      />
    </View>
  )
}

export default NetworkScreen

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white
  },
  barSearchContainerStyle: {
    // width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  barTextStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.grey
  }
})