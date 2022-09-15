import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileTabNavigator from '../../../navigation/tabs/ProfileTabNavigator'

const ProfileScreen = (props: any) => {
    console.log({ props });
    const { space, navigation } = props

    return (
        <View
            style={{
                flex: 1
            }}
        >
            <ProfileTabNavigator partner={space?._id} data={space} type={space?.type} navigation={navigation} />
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})