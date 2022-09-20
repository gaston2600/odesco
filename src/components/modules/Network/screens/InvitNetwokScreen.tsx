import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import colors from '../../../../styles/colors';
import MemberCmp from '../components/MemberCmp';
import I18n from 'react-native-i18n';
import globalStyles from '../../../../styles/globalStyles';

const InvitNetwokScreen = (props: any) => {
    const { refresh } = props;
    const { members, pendings, requests, loading } = useSelector((state: any) => state?.Network)
    return (
        <View
            style={styles.containerStyle}
        >
            <FlatList
                data={requests}
                renderItem={({ item }: any) => (
                    <MemberCmp
                        data={item?.user}
                        type="invitation"
                    />
                )}
                keyExtractor={item => item?._id}
                numColumns={3}
                columnWrapperStyle={{
                    // justifyContent:"space-evenly",

                }}
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

export default InvitNetwokScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white
    }
})