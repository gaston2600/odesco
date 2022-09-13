import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getOneTeacher, getTeachersList, subscribeToTeacher } from '../../../store/actions/teachersActions';
import colors from '../../../styles/colors';
import AvatarCmp from '../../common/AvatarCmp';
import { extractImage } from '../../../helpers/extractImage';
import I18n from "react-native-i18n"
import fonts from '../../../theme/fonts';
import TeacherProfileTabScreen from '../../../navigation/tabs/TeacherProfileTabScreen';
import { Skeleton } from "@rneui/themed";
import Icons from '../../../styles/icons';
import SelectInstitutionModal from '../../modals/institutions/SelectInstitutionModal';

const TeacherDetailsScreen = (props: any) => {
    const { teacher } = props?.route?.params;
    const dispatch = useDispatch()
    const [data, setData]: any = useState({})
    console.log({ teacher });

    function getProfile() {
        dispatch(
            getOneTeacher(
                {
                    teacher
                },
                (res: any) => {
                    console.log({ res });
                    setData(res?.teacher)
                },
                (err: any) => {
                    console.log({ err });

                }
            )
        )
    }
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
                    getProfile()
                    setLoadingFollow(false)
                    setVisibleSelectInst(false)
                },
                (err: any) => {
                    setLoadingFollow(false)
                }
            )
        )
    }


    useEffect(() => {
        getProfile()

        return () => {
            setData({})
        }
    }, [teacher])


    return (
        <View
            style={styles.containerStyle}
        >
            <View style={styles.headerContainerStyle}>
                <View style={{
                    flex: 1.5
                }}>
                    <AvatarCmp
                        name={String(data?.first_name)?.slice(0, 2)}
                        uri={extractImage(data?.avatar?.path)}
                        size={60}
                    />
                </View>

                <View style={{
                    flex: 5,
                    paddingLeft: 10
                }} >
                    {(!!data?.first_name || !!data?.last_name) && <Text style={styles.titleTextStyle}>{`${data?.first_name} ${data?.last_name}`}</Text>}
                    {/* <Text style={styles.descTextStyle}>{I18n.t(data?.partnertype)}</Text> */}
                    {!!data?.email && <View style={styles.rowContainer}>
                        <Icons.FontAwesome name="envelope-o" size={10} color={colors.darkBlue} />
                        <Text style={styles.descTextStyle}>{data?.email}</Text>
                    </View>}
                    {!!data?.working_place && <View style={styles.rowContainer}>
                        <Icons.FontAwesome name="map-marker" size={15} color={colors.darkBlue} />
                        <Text style={styles.descTextStyle}>{data?.working_place}</Text>
                    </View>}
                    {!!data?.pro_phone && <View style={styles.rowContainer}>
                        <Icons.FontAwesome name="phone" size={10} color={colors.darkBlue} />
                        <Text style={styles.descTextStyle}>{data?.pro_phone}</Text>
                    </View>}
                    {!!data?.subscribers && <View style={styles.rowContainer}>
                        <Icons.FontAwesome name="group" size={10} color={colors.darkBlue} />
                        <Text style={styles.descTextStyle}>{data?.subscribers?.length}</Text>
                    </View>}
                </View>
                <View style={{
                    flex: 1.5,
                    justifyContent: "center"
                }}>
                    <Pressable
                        onPress={() => {
                            setVisibleSelectInst(true)
                        }}
                        style={styles.followContainerStyle}>
                        <Text style={styles.followTextStyle}>
                            {I18n.t("follow")}
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                }}
            >
                <TeacherProfileTabScreen teacher={data} />
            </View>
            <SelectInstitutionModal
                visible={visibleSelectInst}
                setVisible={setVisibleSelectInst}
                confirm={confirmSelecInstModal}
                selectedList={data?.subscribers?.map((v: any) => v?.institution?._id ? ({ _id: v?.institution?._id, type: "Institution" }) : ({ _id: v?.partner, type: "Partner" }))}
            />
        </View>
    )
}

export default TeacherDetailsScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white
    },
    headerContainerStyle: {
        // height: 70,
        width: "100%",
        flexDirection: "row",
        padding: 10
    },
    titleTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        color: colors.darkBlue
    },
    descTextStyle: {
        fontFamily: fonts.type.NunitoRegular,
        fontSize: fonts.size.font10,
        color: colors.gray,
        marginLeft: 5
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
    rowContainer: {
        flexDirection: "row",
        alignItems: "center"
    }
})