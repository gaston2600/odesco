import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Modalize } from 'react-native-modalize'
import Icons from '../../styles/icons'
import colors from '../../styles/colors'

const CommentsModalize = (props: any) => {
    const { modalizeRef } = props
    return (
        <Modalize ref={modalizeRef}
            HeaderComponent={(
                <View style={styles.headerContainerStyle}>
                    <View>
                        <Text>21 J'aime</Text>
                    </View>
                    <Pressable onPress={() => {
                        modalizeRef?.current?.close()
                    }}>
                        <Icons.AntDesign name="close" size={25} color={colors.black} />
                    </Pressable>
                </View>
            )}
        >
            <Text>Comments modalize</Text>
        </Modalize>
    )
}

export default CommentsModalize

const styles = StyleSheet.create({
    headerContainerStyle:{
        flexDirection :"row",
        alignItems :"center",
        justifyContent :"space-between",
        padding : 10
    }
})