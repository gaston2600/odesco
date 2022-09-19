import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import fonts from '../../../../theme/fonts';
import colors from '../../../../styles/colors';
import AvatarCmp from '../../../common/AvatarCmp';
import { extractImage } from '../../../../helpers/extractImage';
import I18n from "react-native-i18n"
import globalStyles from '../../../../styles/globalStyles';
import SelectInstitutionModal from '../../../modals/institutions/SelectInstitutionModal';
import { useDispatch } from 'react-redux';
import { getTeachersList, subscribeToTeacher } from '../../../../store/actions/teachersActions';

const TeacherCmp = (props: any) => {
    const { data, navigation, hideFollow } = props;
    const dispatch = useDispatch()
    // console.log({ data });
    const [visibleSelectInst, setVisibleSelectInst] = useState(false)
    const [loadingFollow, setLoadingFollow] = useState(false)

    function confirmSelecInstModal(params: any) {
        setLoadingFollow(true)
        dispatch(
            subscribeToTeacher(
                {
                    teacher: data?._id,
                    data: {
                        partner: params?._id
                    }
                },
                (res: any) => {
                    dispatch(getTeachersList(
                        {},
                        () => null,
                        () => null
                    ))

                    setLoadingFollow(false)
                    setVisibleSelectInst(false)
                },
                (err: any) => {
                    setLoadingFollow(false)
                }
            )
        )
    }

    return (
        <Pressable
            onPress={() => {
                if (!hideFollow) {
                    navigation?.navigate("TeacherDetailsScreen", { teacher: data?._id })
                }
            }}
            style={[styles.containerStyle, globalStyles.shadow]}>
            <View style={{
                flex: 1
            }}>
                <AvatarCmp
                    name={String(data?.first_name)?.slice(0, 2)}
                    uri={extractImage(data?.avatar?.path)}
                    size={45}
                />
            </View>

            <View style={{
                flex: 5,
                paddingLeft: 10
            }} >
                <Text style={styles.titleTextStyle}>{`${data?.first_name} ${data?.last_name}`}</Text>
                <Text style={styles.descTextStyle}>{I18n.t(data?.partnertype)}</Text>
            </View>
            <View style={{
                flex: 1.5,
                // alignItems: "center",
                justifyContent: "center"
            }}>
                {hideFollow ? null : <Pressable
                    onPress={() => {
                        setVisibleSelectInst(true)
                    }}
                    style={styles.followContainerStyle}>
                    {loadingFollow ?
                        <ActivityIndicator color={colors.white} size="small" /> :
                        <Text style={styles.followTextStyle}>
                            {I18n.t("follow")}
                        </Text>}
                </Pressable>}
            </View>
            <SelectInstitutionModal
                visible={visibleSelectInst}
                setVisible={setVisibleSelectInst}
                confirm={confirmSelecInstModal}
                selectedList={data?.subscribers?.map((v: any) => v?.institution?._id ? ({ _id: v?.institution?._id, type: "Institution" }) : ({ _id: v?.partner, type: "Partner" }))}
            />
        </Pressable>
    )
}

export default TeacherCmp

const styles = StyleSheet.create({
    containerStyle: {
        margin: 10,
        // borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        flexDirection: "row",
        // width: "100%"
    },
    titleTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        color: colors.darkBlue
    },
    descTextStyle: {
        fontFamily: fonts.type.NunitoRegular,
        fontSize: fonts.size.font10,
        color: colors.gray
    },
    followContainerStyle: {
        padding: 5,
        // paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: colors.sereneBlue,
        alignItems: "center",
        justifyContent: "center"
    },
    followTextStyle: {
        fontFamily: fonts.type.NunitoRegular,
        fontSize: fonts.size.font10,
        color: colors.white
    },
})