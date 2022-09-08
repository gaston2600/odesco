import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderHomeCmp from '../Home/components/HeaderHomeCmp'
import colors from '../../../styles/colors'
import { useSelector } from 'react-redux'
import AvatarCmp from '../../common/AvatarCmp'
import { extractImage } from '../../../helpers/extractImage'
import fonts from '../../../theme/fonts'
import { Divider } from '@rneui/themed'

const MenuScreen = (props: any) => {
  const { myInstitutions, myPartners, loading } = useSelector((state: any) => state?.Inst)

  const listMenu = [
    {
      name: "Évenement",
      icon: require("../../../../assets/icons/menu/events.png"),
      desc: "description Évenement"
    },
    {
      name: "Groupe",
      icon: require("../../../../assets/icons/menu/groupe.png"),
      desc: "description Groupe"
    },
    {
      name: "Membres",
      icon: require("../../../../assets/icons/menu/members.png"),
      desc: "description Membres"
    },
    {
      name: "Offre d'emploi",
      icon: require("../../../../assets/icons/menu/job.png"),
      desc: "description Offre d'emploi"
    },
    {
      name: "Établissement",
      icon: require("../../../../assets/icons/menu/inst.png"),
      desc: "description Établissement"
    },

  ]

  const [selectedInst, setSelectedInst] = useState({
    id: -1,
    type: ""
  })

  const toggleInst = (data: any) => {
    setSelectedInst(data?.id === selectedInst?.id ? null : data)
  }

  const renderInst = (data: any) => {
    const inversed = selectedInst?.type === "Institution" && selectedInst?.id === data?.institute?._id
    return (
      < Pressable
        onPress={() => {
          toggleInst({ id: data?.institute?._id, type: "Institution" })
        }
        }
        style={styles.instContainerStyle} >

        <AvatarCmp
          name={String(data?.institute?.name)?.slice(0, 2)}
          uri={extractImage(data?.avatar?.path)}
          size={60}
          inversed={inversed}
        />
        <Text style={[styles.instTiteTextStyle, {
          color: inversed ? colors.primary : colors.blackTrans
        }]}>{`${data?.institute?.name}`}</Text>
      </ Pressable>
    )
  }
  const renderPartners = (data: any) => {
    const inversed = selectedInst?.type === "Partner" && selectedInst?.id === data?._id
    return (
      <Pressable
        onPress={() => {
          toggleInst({ id: data?._id, type: "Partner" })
        }}
        style={styles.instContainerStyle}>

        <AvatarCmp
          // name={String(data?.institute?.name)?.slice(0, 2)}
          uri={extractImage(data?.avatar?.path)}
          size={60}
          inversed={inversed}
        />
        <Text style={[styles.instTiteTextStyle, {
          color: inversed ? colors.primary : colors.blackTrans
        }]}>{`${data?.first_name} ${data?.last_name}`}</Text>
      </Pressable>
    )
  }

  const renderMenuItem = (data: any) => {
    return (
      <View style={styles.menuItemContainerStyle}>
        <View
          style={{
            flex: 1,
            alignItems: "center"
          }}
        >
          <Image
            source={data.icon}
            style={{
              height: 50,
              width: 50
            }}
          />
        </View>
        <View
          style={{
            flex: 5,
            padding: 10
          }}
        >
          <Text style={styles.menuTitleTextStyle}>{data?.name}</Text>
          <Text style={styles.menuDescTextStyle}>{data?.desc}</Text>
        </View>

      </View>
    )
  }
  return (
    <View style={styles.containerStyle}>
      <HeaderHomeCmp />
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          horizontal
          keyExtractor={item => item?._id}
          data={myInstitutions?.concat(myPartners)}
          renderItem={({ item }) => item?.institute ? renderInst(item) : renderPartners(item)}
        />
      </View>
      <Divider orientation='horizontal' style={{ marginVertical: 5 }} />
      <ScrollView
        style={styles.menuListContainer}>
        {
          listMenu?.map((item: any, index: any) => <View>{renderMenuItem(item)}<Divider orientation='horizontal' /></View>)
        }
        {/* <FlatList
          data={listMenu}
          renderItem={({ item, index }: any) => renderMenuItem(item)}
          ItemSeparatorComponent={() => <Divider orientation='horizontal' />}
        /> */}
      </ScrollView>

    </View>
  )
}

export default MenuScreen

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.lightGray
  },
  headerContainerStyle: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  instContainerStyle: {
    height: 100,
    margin: 5,
    // borderWidth: 1
  },
  instTiteTextStyle: {
    fontFamily: fonts.type.NunitoRegular,
    fontSize: fonts.size.font10,
    maxWidth: 70,
    alignSelf: "center"
  },
  menuListContainer: {
    // flexGrow: 1,
    // borderWidth: 1
  },
  menuItemContainerStyle: {
    // borderWidth: 1,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5
  },
  menuTitleTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font14,
    color: colors.black
  },
  menuDescTextStyle: {
    fontFamily: fonts.type.NunitoRegular,
    fontSize: fonts.size.font12,
    color: colors.gray
  },
})