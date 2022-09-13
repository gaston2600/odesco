import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Icons from '../../../../styles/icons'
import colors from '../../../../styles/colors'
import metrics from "../../../../theme/metrics";
import I18n from 'react-native-i18n'
import fonts from '../../../../theme/fonts';
import { Divider } from '@rneui/themed';
import AvatarCmp from '../../../common/AvatarCmp';
import { useDispatch, useSelector } from 'react-redux';
import { extractImage } from '../../../../helpers/extractImage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from '../../../common/ImagePicker';
import { postPost, selectSpace } from '../../../../store/actions';
import SelectInstitutionModal from '../../../modals/institutions/SelectInstitutionModal';

const { screenHeight, screenWidth } = metrics
const NewPostScreen = (props: any) => {
    const dispatch = useDispatch()
    const { navigation } = props
    const { user } = useSelector((state: any) => state?.User)
    const { myPartners, defaultPartner, myInstitutions } = useSelector((state: any) => state?.Inst)
    const { selectedSpace } = useSelector((state: any) => state?.User)
    const [loadingNewPost, setLoadingNewPost] = useState(false)

    useEffect(() => {

        const temp = { ...myPartners?.filter((v: any) => v?._id === defaultPartner)?.[0], type: "Partner" }
        if (!!defaultPartner && !!myPartners?.length && !selectedSpace) {
            dispatch(selectSpace(temp))
        }
    }, [myPartners, defaultPartner])


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


    const [visibleSelectInst, setVisibleSelectInst] = useState(false)
    const [loadingPostLike, setLoadingPostLike] = useState(false)

    function confirmSelecInstModal(params: any) {
        console.log(params);
        let temp = null
        if (params?.type === "Partner") {
            temp = { ...myPartners?.filter((v: any) => v?._id === params?._id)?.[0], type: "Partner" }
        } else {
            temp = { ...myInstitutions?.filter((v: any) => v?.institute?._id === params?._id)?.[0]?.institute, type: "Instition" }
        }


        dispatch(selectSpace(temp))
        setVisibleSelectInst(false)

    }

    function submit() {
        setLoadingNewPost(true)
        dispatch(
            postPost({
                partner: selectedSpace?._id,
                partner_type: selectedSpace?.type,
                desc: payload?.desc,
            }, () => {
                setLoadingNewPost(false)
                navigation?.goBack()
            }, () => {
                setLoadingNewPost(false)
            }
            )
        )
    }
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
                <Pressable
                    onPress={submit}
                    style={{
                        flex: 1,
                        padding: 10
                    }}>
                    {loadingNewPost ? <ActivityIndicator color={colors.sereneBlue} /> : <Text style={{
                        fontFamily: fonts.type.NunitoMedium,
                        fontSize: fonts.size.font12,
                        color: payload?.desc?.length ? colors.blue : colors.grey
                    }}>
                        {I18n.t("publish")}
                    </Text>}
                </Pressable>
            </View>
            <Divider orientation="horizontal" />

            <View style={styles.bodyContainerstyle}>
                {/* <Text>NewPostScreen</Text> */}
                {/* ----------------------SELECT INST SECTION */}
                <Pressable
                    onPress={() => {
                        setVisibleSelectInst(true)
                    }}
                    style={{
                        flexDirection: "row",
                        marginVertical: 10,
                    }}
                >
                    <View>
                        <AvatarCmp
                            name={selectedSpace?.type === "Partner" ? selectedSpace?.first_name?.slice(0, 2) : selectedSpace?.name?.slice(0, 2)}
                            uri={extractImage(selectedSpace?.avatar?.path)}
                            size={40}
                        />
                    </View>

                    <View style={{
                        paddingLeft: 10,
                    }}>
                        <Text style={styles.titleTextStyle}>{selectedSpace?.type === "Partner" ? `${selectedSpace?.first_name} ${selectedSpace?.last_name}` : selectedSpace?.name}</Text>

                    </View>
                </Pressable>
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
            <SelectInstitutionModal
                visible={visibleSelectInst}
                setVisible={setVisibleSelectInst}
                confirm={confirmSelecInstModal}
                selectedList={[{ _id: selectedSpace?._id, type: selectedSpace?.type }]}
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
        maxHeight: screenHeight * .5
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