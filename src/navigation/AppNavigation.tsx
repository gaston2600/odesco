import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AuthStack from './stacks/AuthStack'
import { useSelector } from 'react-redux'
import configAxios from '../services'
import TabNavigator from './tabs/TabNavigator'

const AppNavigation = () => {
    const { auth, token } = useSelector((state: any) => state.User)
    const state = useSelector((state: any) => state)
    console.log('====================================');
    console.log({state});
    console.log('====================================');

    useEffect(() => {
        configAxios(token);
    }, [token]);

    return (
        <View style={{
            flex: 1
        }}>{
                auth ? <TabNavigator /> : <AuthStack />
            }
        </View>
    )
}

export default AppNavigation

const styles = StyleSheet.create({})