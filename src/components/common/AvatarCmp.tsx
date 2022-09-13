import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, Image } from '@rneui/base'
import { extractImage } from '../../helpers/extractImage'
import colors from '../../styles/colors'

const AvatarCmp = ({ uri, name, size, inversed }: any) => {

    return (
        !uri ?
            (<Avatar
                size={size}
                rounded
                title={String(name)?.toUpperCase()}
                titleStyle={{
                    color: inversed ? colors.primary : colors.white , 
                }}
                containerStyle={{
                    backgroundColor: inversed ? colors.white : colors.primary,
                    borderWidth: 0.5,
                    borderColor: inversed ? colors.primary : `${colors.primaryLight}`
                }}
            />) :
            (<Avatar
                size={size}
                rounded
                source={{ uri }}
                containerStyle={{ borderWidth: 1, borderColor: inversed ? colors.white : colors.primary }}

            />)

    )
}

export default AvatarCmp

const styles = StyleSheet.create({})