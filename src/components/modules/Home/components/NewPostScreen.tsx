import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Icons from '../../../../styles/icons'
import colors from '../../../../styles/colors'
import metrics from "../../../../theme/metrics";
import I18n from 'react-native-i18n'
import fonts from '../../../../theme/fonts';
import { Divider } from '@rneui/themed';
import AvatarCmp from '../../../common/AvatarCmp';
import { useSelector } from 'react-redux';
import { extractImage } from '../../../../helpers/extractImage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from '../../../common/ImagePicker';

const { screenHeight, screenWidth } = metrics
const NewPostScreen = (props: any) => {
    const { navigation } = props
    const { user } = useSelector((state: any) => state?.User)
    const refImageModal = useRef(null)
    const [payload, setPayload] = useState({
        desc: "",
        is_private: false,
        partner_type: "Institution",
        inst_id: "62d930b91681f7002a0f9e9c",
        gallery: null
    })

    const [pictures, setPictures] = useState([])
    const [pics, setPics] = useState([])
    const addImage = () => {
        try {
            launchImageLibrary(
                {
                    mediaType: "photo",
                },
                (resp: any) => {
                    // console.log("resp ADD IMAGE", resp);
                    try {
                        const pic = resp.assets[0];
                        setPics([
                            ...pictures,
                            {
                                uri: pic.uri,
                                type: pic.type,
                                name: pic.fileName,
                            },
                        ]);
                    } catch (error) {
                        console.log("error set image", error);
                    }
                }
            );
        } catch (error) {
            console.log("error get image", error);
        }
        refImageModal?.current?.close();
    };
    const takeImage = () => {
        try {
            launchCamera(
                {
                    mediaType: "photo",
                },
                (resp: any) => {
                    // console.log("resp ADD IMAGE", resp);
                    try {
                        const pic = resp.assets[0];
                        setPics([
                            ...pictures,
                            {
                                uri: pic.uri,
                                type: pic.type,
                                name: pic.fileName,
                            },
                        ]);
                    } catch (error) {
                        console.log("error set image", error);
                    }
                }
            );
        } catch (error) {
            console.log("error get image", error);
        }
        refImageModal?.current?.close();
    };


    return (
        <View style={styles.containerStyle}>
            <View style={styles.headerContainerStyle}>
                <Pressable
                    onPress={() => {
                        navigation?.goBack()
                    }}
                    style={{
                        flex: 1,
                        padding: 10
                    }}>
                    <Icons.AntDesign name="close" size={30} color={colors.black} />
                </Pressable>
                <View style={{
                    flex: 4,
                    padding: 10
                }}>
                    <Text style={[styles.titleTextStyle]}>{I18n.t("new_post")}</Text>
                </View>
                <View style={{
                    flex: 1,
                    padding: 10
                }}>
                    <Text style={{
                        fontFamily: fonts.type.NunitoMedium,
                        fontSize: fonts.size.font12,
                        color: payload?.desc?.length ? colors.blue : colors.grey
                    }}>
                        {I18n.t("publish")}
                    </Text>
                </View>
            </View>
            <Divider orientation="horizontal" />

            <View style={styles.bodyContainerstyle}>
                {/* <Text>NewPostScreen</Text> */}
                {/* ----------------------SELECT INST SECTION */}
                <View
                    style={{
                        flexDirection: "row",
                        marginVertical: 10
                    }}
                >
                    <View>
                        <AvatarCmp
                            // name={user?.first_name?.slice(0, 2)}
                            uri={extractImage(user?.avatar?.path)}
                            size={40}
                        />
                    </View>

                    <View>
                        <Text style={styles.titleTextStyle}>{`${user?.first_name} ${user?.last_name}`}</Text>

                    </View>
                </View>
                <View>
                    <TextInput
                        value={payload?.desc}
                        onChangeText={(desc: string) => setPayload({ ...payload, desc })}
                        style={styles.textInputStyle}
                        multiline
                        focusable
                        numberOfLines={6}
                    />

                </View>
                <View style={styles.footerContainerStyle}>
                    <Pressable
                        style={styles.iconContainerStyle}
                        onPress={() => {
                            refImageModal?.current?.open()
                        }}
                    >
                        <Icons.FontAwesome name="photo" size={35} color={colors.primary} />
                    </Pressable>
                    <Pressable
                        style={styles.iconContainerStyle}
                        onPress={() => {
                            refImageModal?.current?.open()
                        }}
                    >
                        <Icons.FontAwesome name="youtube-play" size={35} color={colors.primary} />
                    </Pressable>
                </View>

            </View>

            <ImagePicker
                refImageModal={refImageModal}
                takeImage={takeImage}
                addImage={addImage}
            />
        </View>
    )
}

export default NewPostScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        // height: "100%",
        // width: "100%",
        backgroundColor: colors.white
    },

    headerContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        // flex: 1,
        width: "100%",
        height: screenHeight * .1
    },
    titleTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font14,
        color: colors.black
    },
    bodyContainerstyle: {
        flexGrow: 1,
        // flex: 1,
        // borderWidth: 1,
        padding: 10
    },
    textInputStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        color: colors.blackTrans,
        // flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.grey,
        maxHeight : screenHeight*.5
    },
    footerContainerStyle: {
        // padding: 10,
        // margin: 15,
        flexDirection: "row",
        alignItems: "center"
    },
    iconContainerStyle: {
        // padding: 10,
        margin: 10
    }
})