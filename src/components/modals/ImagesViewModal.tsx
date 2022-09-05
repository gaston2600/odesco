import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import Icons from '../../styles/icons';
import colors from '../../styles/colors';

const ImagesViewModal = (props: any) => {
    const { visible, close, images } = props
    // const images = [{
    //     // Simplest usage.
    //     url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

    //     // width: number
    //     // height: number
    //     // Optional, if you know the image size, you can set the optimization performance

    //     // You can pass props to <Image />.
    //     props: {
    //         // headers: ...
    //     }

    // }]
    return (
        <Modal
            visible={visible}
        // transparent={true}
        >

            <ImageViewer imageUrls={images} />
            <Pressable
                onPress={close}
                style={{
                    position: "absolute",
                    top: 30,
                    right: 20,
                    backgroundColor: colors.black,
                    borderRadius : 100,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10
                }}
            >
                <Icons.AntDesign name="close" size={20} color={colors.white} />
            </Pressable>
        </Modal>
    )
}

export default ImagesViewModal

const styles = StyleSheet.create({})