import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PhotoBrowser from 'react-native-photo-browser';

const ImagesViewModal = (props: any) => {
    const { visible, close } = props
    const mediaList = [{
        photo:
            'http://farm3.static.flickr.com/2667/4072710001_f36316ddc7_b.jpg',
        selected: true,
        caption: 'Grotto of the Madonna',
    },
    {
        photo:
            'http://farm3.static.flickr.com/2449/4052876281_6e068ac860_b.jpg',
        thumb:
            'http://farm3.static.flickr.com/2449/4052876281_6e068ac860_q.jpg',
        selected: false,
        caption: 'Beautiful Eyes',
    },]
    return (
        <Modal>
            {/* <PhotoBrowser
                onBack={close}
                mediaList={mediaList}
                initialIndex={0}
                displayNavArrows={true}
                displaySelectionButtons={true}
                displayActionButton={true}
                startOnGrid={true}
                enableGrid={true}
                useCircleProgress
                onSelectionChanged={()=>null}
                onActionButton={()=>null}
                alwaysDisplayStatusBar={true}
                // customTitle={(index, rowCount) => `${index} sur ${rowCount}`}
            /> */}
        </Modal>
    )
}

export default ImagesViewModal

const styles = StyleSheet.create({})