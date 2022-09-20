import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import colors from '../../../../styles/colors';
import MemberCmp from '../components/MemberCmp';
import globalStyles from '../../../../styles/globalStyles';
import I18n from 'react-native-i18n';

const PendingInvitaionNetworkScreen = (props: any) => {
    const { refresh } = props;
    const { pendings, loading } = useSelector((state: any) => state?.Network)
    return (
        <View
            style={styles.containerStyle}
        >
            <FlatList
                data={pendings}
                renderItem={({ item }: any) => (
                    <MemberCmp
                        data={item?.user}
                        type="pending"
                    />
                )}
                keyExtractor={item => item?._id}
                numColumns={3}
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
                ListEmptyComponent={() => (
                    <View style={globalStyles.center}>
                        <Text style={globalStyles.defaultText}>{I18n.t("empty_result")}</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default PendingInvitaionNetworkScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white
    }
})