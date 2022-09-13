import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icons from '../../../../styles/icons'
import colors from '../../../../styles/colors'
import I18n from "react-native-i18n";
import fonts from '../../../../theme/fonts';
import SelectInstitutionModal from '../../../modals/institutions/SelectInstitutionModal';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsList, likePost } from '../../../../store/actions/postsActions';

const LikePostCmp = (props: any) => {
    const { post, data ,refresh } = props;
    const dispatch = useDispatch()
    const [visibleSelectInst, setVisibleSelectInst] = useState(false)
    const [loadingPostLike, setLoadingPostLike] = useState(false)
    const { defaultPartner } = useSelector((state: any) => state?.Inst)
    function confirmSelecInstModal(params: any) {
        setLoadingPostLike(true)
        dispatch(likePost({
            post, data: {
                partner: params?.type === "Partner" ? params?._id : null,
                inst_id: params?.type === "Institution" ? params?._id : null,
            }
        },
            (res: any) => {
                setLoadingPostLike(false)
                setVisibleSelectInst(false)
                if(refresh) refresh()
                // dispatch(getPostsList({ partner: defaultPartner }, () => null, () => null))
                
            },
            (err: any) => {
                setLoadingPostLike(false)
                console.log({ err, params });
            }
        ))

    }
    return (
        <TouchableOpacity
            onPress={() => {
                setVisibleSelectInst(true)
            }}
            style={styles.containerStyle}>
            {loadingPostLike ? <ActivityIndicator color={colors.primary} /> : <Icons.AntDesign name="like2" size={20} color={colors.primary} />}
            <Text style={styles.textStyle}>{I18n.t("like")}</Text>
            <SelectInstitutionModal
                visible={visibleSelectInst}
                setVisible={setVisibleSelectInst}
                confirm={confirmSelecInstModal}
                selectedList={data?.likes?.map((v: any) => v?.institution?._id ? ({ _id: v?.institution?._id, type: "Institution" }) : ({ _id: v?.partner?._id, type: "Partner" }))}
            />
        </TouchableOpacity>
    )
}

export default LikePostCmp

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        // borderWidth :.3,
        // padding : 5,
        // borderRadius : 5
    },
    textStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        marginLeft: 5,
        color: colors.black
    }
})