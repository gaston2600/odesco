import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../../styles/colors'
import Icons from '../../../../styles/icons'
import I18n from 'react-native-i18n'
import fonts from '../../../../theme/fonts'
import { useDispatch } from 'react-redux'
import SelectInstitutionModal from '../../../modals/institutions/SelectInstitutionModal'
import { postComment } from "../../../../store/actions/commentActions";
import { getPostsComments } from '../../../../store/actions/postsActions'
const CommentInputCmp = (props: any) => {
    const dispatch = useDispatch()
    const { post, refListComments } = props;
    const [payload, setPayload] = useState({
        institution: "",
        message: "",
        partner: null,
        partner_type: "Institution",
    })
    const [visibleSelectInst, setVisibleSelectInst] = useState(false)
    const [Loading, setLoading] = useState(false)

    const showSelecInstModal = () => {
        if (!Loading) {
            setVisibleSelectInst(true)
        }

    }

    const hideSelecInstModal = () => {
        setVisibleSelectInst(false)
    }

    const confirmSelecInstModal = (data: any) => {
        console.log("from modal ", { data });
        setLoading(true)
        setPayload(({
            ...payload,
            partner: data?.type === "Partner" ? data?._id : null,
            institution: data?.type === "Institution" ? data?._id : null,
            partner_type: data?.type
        }))
        dispatch(postComment(
            {
                data: {
                    ...payload,
                    partner: data?.type === "Partner" ? data?._id : null,
                    institution: data?.type === "Institution" ? data?._id : null,
                    partner_type: data?.type
                }, post
            },
            (res: any) => {
                setPayload(prev => ({ ...prev, message: "" }))
                setLoading(false)
                dispatch(getPostsComments({ post },
                    () => {
                        refListComments?.current?.scrollToEnd()
                    },
                    () => { }
                ))

            }, (err: any) => {
                setLoading(false)
                console.log({ err });

            }))

        setVisibleSelectInst(false)
    }


    return (
        <View style={styles.containerStyle}>
            <TextInput
                value={payload?.message}
                onChangeText={(message: String) => setPayload((prev: any) => ({ ...prev, message }))}
                style={styles.textInputStyle}
                placeholder={I18n.t("comment")}
                placeholderTextColor={`${colors.primary}77`}
                multiline
            />
            <Pressable
                style={styles.iconContainerStyle}
                onPress={showSelecInstModal}
            >
                {Loading ?
                    <ActivityIndicator color={colors.white} /> :
                    <Icons.Ionicons name="send-outline" size={25} color={colors.white} />
                    // <Text>Comment</Text>
                }
            </Pressable>
            <SelectInstitutionModal
                visible={visibleSelectInst}
                setVisible={setVisibleSelectInst}
                confirm={confirmSelecInstModal}
            />
        </View>
    )
}

export default CommentInputCmp

const styles = StyleSheet.create({
    containerStyle: {
        // borderWidth: 1,
        padding: 5,
        flexDirection: "row",
        width: "100%",
        backgroundColor: colors.lightGray
    },
    textInputStyle: {
        backgroundColor: colors.white,
        flex: 8,
        borderRadius: 5,
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font14,
        paddingHorizontal: 15
    },
    iconContainerStyle: {
        alignItems: "center",
        justifyContent: "center",
        flex: 2,
        height: 50,
        backgroundColor: colors.primary,
        margin: 5,
        borderRadius: 4
    }
})