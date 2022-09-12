import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getOneTeacher } from '../../../store/actions/teachersActions';
import colors from '../../../styles/colors';
import AvatarCmp from '../../common/AvatarCmp';
import { extractImage } from '../../../helpers/extractImage';
import I18n from "react-native-i18n"
import fonts from '../../../theme/fonts';
import TeacherProfileTabScreen from '../../../navigation/tabs/TeacherProfileTabScreen';

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
                    <Text style={styles.titleTextStyle}>{`${data?.first_name} ${data?.last_name}`}</Text>
                    <Text style={styles.descTextStyle}>{I18n.t(data?.partnertype)}</Text>
                </View>
                <View style={{
                    flex: 1.5
                }}>
                    <View style={styles.followContainerStyle}>
                        <Text style={styles.followTextStyle}>
                            {I18n.t("follow")}
                        </Text>
                    </View>
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                }}
            >
                <TeacherProfileTabScreen teacher={data} />
            </View>

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