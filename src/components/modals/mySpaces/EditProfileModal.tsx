import { Modal, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../styles/colors';
import fonts from '../../../theme/fonts';
import I18n from 'react-native-i18n'
import ButtonCmp from '../../common/ButtonCmp';
import { ScreenWidth } from '@rneui/base';
import { useDispatch } from 'react-redux';
import { editPartner } from '../../../store/actions';

const EditProfileModal = (props: any) => {
    const { visible, setVisible, data, refresh } = props
    const dispatch = useDispatch()
    const [payload, setPayload] = useState(
        {
            first_name: data?.first_name,
            last_name: data?.last_name,
            address: data?.address,
            pro_mobile: data?.pro_mobile,
            pro_email: data?.pro_email
        }
    )
    const [loading, setLoading] = useState(false)

    function checkData(params: any) {
        let msg = ""
        if (!params?.first_name) {
            ToastAndroid.show(`${I18n.t("required")} : ${I18n.t("first_name")} `, ToastAndroid.SHORT)
            msg = "err"
        }
        else if (!params?.last_name) {
            ToastAndroid.show(`${I18n.t("required")} : ${I18n.t("last_name")} `, ToastAndroid.SHORT)
            msg = "err"
        }
        else if (!params?.address) {
            ToastAndroid.show(`${I18n.t("required")} : ${I18n.t("address")} `, ToastAndroid.SHORT)
            msg = "err"
        }
        else if (!params?.pro_email) {
            ToastAndroid.show(`${I18n.t("required")} : ${I18n.t("pro_email")} `, ToastAndroid.SHORT)
            msg = "err"
        }
        else if (!params?.pro_mobile) {
            ToastAndroid.show(`${I18n.t("required")} : ${I18n.t("pro_mobile")} `, ToastAndroid.SHORT)
            msg = "err"
        }
        else {
            msg = ""
        }
        return msg
    }

    function submit() {
        if (!!checkData(payload)) {
        }
        else {
            setLoading(true)
            dispatch(
                editPartner(
                    {
                        partner: data?._id,
                        data: {
                            ...payload
                        }
                    },
                    (res: any) => {
                        console.log("success delete trainings", res);
                        refresh()
                        setLoading(false)
                        setVisible(false)
                    },
                    (err: any) => {
                        console.log({ err })
                        setLoading(false)
                    }
                )
            )
        }
    }

    return (
        <Modal
            visible={visible}
        >
            <View style={styles.containerStyle}>
                <Text style={styles.titleTextStyle}>{I18n.t("edit_profile")}</Text>
                <Text style={styles.itemTitleTextStyle}>{I18n.t("first_name")}</Text>
                <TextInput
                    value={payload?.first_name}
                    onChangeText={first_name => setPayload({ ...payload, first_name })}
                    placeholder={I18n.t("first_name")}
                    style={styles.textInputStyle}
                />
                <Text style={styles.itemTitleTextStyle}>{I18n.t("last_name")}</Text>
                <TextInput
                    value={payload?.last_name}
                    onChangeText={last_name => setPayload({ ...payload, last_name })}
                    placeholder={I18n.t("last_name")}
                    style={styles.textInputStyle}
                />
                <Text style={styles.itemTitleTextStyle}>{I18n.t("address")}</Text>
                <TextInput
                    value={payload?.address}
                    onChangeText={address => setPayload({ ...payload, address })}
                    placeholder={I18n.t("address")}
                    style={styles.textInputStyle}
                />
                <Text style={styles.itemTitleTextStyle}>{I18n.t("pro_email")}</Text>
                <TextInput
                    value={payload?.pro_email}
                    onChangeText={pro_email => setPayload({ ...payload, pro_email })}
                    placeholder={I18n.t("pro_email")}
                    style={styles.textInputStyle}
                />
                <Text style={styles.itemTitleTextStyle}>{I18n.t("pro_mobile")}</Text>
                <TextInput
                    value={payload?.pro_mobile}
                    onChangeText={pro_mobile => setPayload({ ...payload, pro_mobile })}
                    placeholder={I18n.t("pro_mobile")}
                    style={styles.textInputStyle}
                />
                <View style={styles.buttonContainerStyle}>
                    <ButtonCmp
                        label={I18n.t("cancel")}
                        action={() => {
                            setVisible(false)
                        }}
                        width={ScreenWidth * .3}
                    />
                    <ButtonCmp
                        label={I18n.t("save")}
                        action={submit}
                        width={ScreenWidth * .3}
                        loading={loading}
                    />
                </View>
            </View>

        </Modal>
    )
}

export default EditProfileModal

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 15
    },
    titleTextStyle: {
        fontFamily: fonts.type.NunitoSemiBold,
        fontSize: 14,
        color: colors.darkBlue,
        marginVertical: 10
    },
    itemTitleTextStyle: {
        fontFamily: fonts.type.NunitoSemiBold,
        fontSize: 12,
        color: colors.darkBlue,
        marginVertical: 10
    },
    textInputStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: 12,
        color: colors.darkBlue,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.grey
    },
    buttonContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginVertical: 15
    },
})