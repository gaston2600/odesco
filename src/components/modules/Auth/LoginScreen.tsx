import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign';
import { colors } from '@styles';
import icons from '@icons';

const LoginScreen = () => {
    const state = useSelector(state => state)
    console.log({ state });

    return (
        <View>
            <Text>LoginScreen</Text>
            <icons.MCI name="egg-outline" size={30} color="#900" />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})