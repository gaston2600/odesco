import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, Image } from '@rneui/base'
import { extractImage } from '../../helpers/extractImage'
import colors from '../../styles/colors'

const AvatarCmp = ({ uri, name, size }: any) => {

    return (
        !uri ?
            (<Avatar
                size={size}
                rounded
                title={String(name)?.toUpperCase()}
                containerStyle={{ backgroundColor: colors.primary, borderWidth: 0.5, borderColor: `${colors.primaryLight}` }}
            />) :
            (<Avatar
                size={size}
                rounded
                source={{ uri }}
                containerStyle={{ borderWidth: 1, borderColor: colors.primary }}

            />)

    )
}

export default AvatarCmp

const styles = StyleSheet.create({})