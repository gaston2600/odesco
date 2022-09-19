import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import colors from '../../../../styles/colors';

const InvitNetwokScreen = (props: any) => {
    const { refresh } = props;
    const { members, pendings, requests, loading } = useSelector((state: any) => state?.Network)
    return (
        <ScrollView
            style={styles.containerStyle}
            refreshControl={
                <RefreshControl
                    style={{ width: 0, height: 0 }}
                    colors={[colors.primary]}
                    refreshing={loading}
                    onRefresh={() => {
                        refresh()
                    }}
                />
            }
        >
            <Text>InvitNetwokScreen</Text>
        </ScrollView>
    )
}

export default InvitNetwokScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white
    }
})