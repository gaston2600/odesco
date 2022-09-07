import { Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../styles/colors'
import { Formik } from 'formik';
import fonts from '../../../theme/fonts';
import I18n from "react-native-i18n"
import ButtonCmp from '../../common/ButtonCmp';
import metrics from "../../../theme/metrics";
import * as yup from "yup";
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { postInst } from '../../../store/actions';

const { screenWidth } = metrics
const AddInstScreen = (props: any) => {
    const { navigation } = props;
    const { user } = useSelector((state: any) => state?.User)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    async function submit(params: any) {

        console.log({ ...params, user_id: user?._id })
        setLoading(true)
        dispatch(postInst(
            { ...params, user_id: user?._id },
            (res: any) => {
                setLoading(false)
                navigation?.goBack()
            },
            (err: any) => {
                setLoading(false)
            }
        ))

    }

    return (
        <View style={styles.containerStyle}>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <Formik
                    initialValues={{
                        name: "",
                        type: "training_center",
                        phone: "",
                        web: "",
                        address: "",
                        desc: "",
                    }}
                    validationSchema={yup.object().shape({
                        name: yup
                            .string()
                            .required(`${I18n.t("name")} : ${I18n.t("required")}`),
                        phone: yup
                            .string()
                            .required(`${I18n.t("phone")} : ${I18n.t("required")}`),
                        address: yup
                            .string()
                            .required(`${I18n.t("address")} : ${I18n.t("required")}`),
                    })}
                    onSubmit={submit}
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <View style={{ height: "100%" }}>
                            <View>
                                <Text style={styles.titleTextStyle}>{I18n.t("inst_name")}</Text>
                                <TextInput
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    style={styles.textInputStyle}
                                    placeholder={I18n.t("inst_name")}
                                />
                                {errors.name && touched.name ? (
                                    <Text style={styles.errorTextStyle}>{errors.name}</Text>
                                ) : null}
                                <Text style={styles.titleTextStyle}>{I18n.t("type")}</Text>

                                <View style={styles.itemContainerStyle}>
                                    <Picker
                                        selectedValue={values.type}
                                        onValueChange={(itemValue) =>
                                            setFieldValue("type", itemValue)
                                        }>
                                        <Picker.Item style={styles.itemPickerTextStyle} value="training_center" label={I18n.t("training_center")} />
                                        <Picker.Item style={styles.itemPickerTextStyle} value="elementary_school" label={I18n.t("elementary_school")} />
                                        <Picker.Item style={styles.itemPickerTextStyle} value="middle_school" label={I18n.t("middle_school")} />
                                        <Picker.Item style={styles.itemPickerTextStyle} value="high_school" label={I18n.t("high_school")} />
                                        <Picker.Item style={styles.itemPickerTextStyle} value="university" label={I18n.t("university")} />
                                    </Picker>
                                </View>

                                <Text style={styles.titleTextStyle}>{I18n.t("phone")}</Text>
                                <TextInput
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                    style={styles.textInputStyle}
                                    placeholder={I18n.t("phone")}
                                />
                                {errors.phone && touched.phone ? (
                                    <Text style={styles.errorTextStyle}>{errors.phone}</Text>
                                ) : null}
                                <Text style={styles.titleTextStyle}>{I18n.t("webSite")}</Text>
                                <TextInput
                                    onChangeText={handleChange('web')}
                                    onBlur={handleBlur('web')}
                                    value={values.web}
                                    style={styles.textInputStyle}
                                    placeholder={I18n.t("webSite")}
                                />
                                <Text style={styles.titleTextStyle}>{I18n.t("address")}</Text>
                                <TextInput
                                    onChangeText={handleChange('address')}
                                    onBlur={handleBlur('address')}
                                    value={values.address}
                                    style={styles.textInputStyle}
                                    placeholder={I18n.t("address")}
                                />
                                {errors.address && touched.address ? (
                                    <Text style={styles.errorTextStyle}>{errors.address}</Text>
                                ) : null}
                                <Text style={styles.titleTextStyle}>{I18n.t("description")}</Text>
                                <TextInput
                                    onChangeText={handleChange('desc')}
                                    onBlur={handleBlur('desc')}
                                    value={values.desc}
                                    style={styles.textInputStyle}
                                    placeholder={I18n.t("description")}
                                />
                            </View>
                            <View style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                            }}>
                                <View style={styles.buttonContainerStyle}>
                                    <ButtonCmp
                                        label={I18n.t("cancel")}
                                        action={() => navigation?.goBack()}
                                        width={screenWidth * .3}
                                    />
                                    <ButtonCmp
                                        label={I18n.t("save")}
                                        action={handleSubmit}
                                        width={screenWidth * .3}
                                        loading={loading}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                </Formik>
            </KeyboardAvoidingView>
        </View >
    )
}

export default AddInstScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 15
    },
    textInputStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.grey,
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        margin: 5,
        paddingHorizontal: 10
    },
    titleTextStyle: {
        fontFamily: fonts.type.NunitoSemiBold,
        fontSize: fonts.size.font12,
    },
    buttonContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginVertical: 15
    },
    errorTextStyle: {
        fontFamily: fonts.type.NunitoRegular,
        fontSize: fonts.size.font10,
        color: colors.red,
        marginLeft: 10
    },
    itemContainerStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.grey
    },
    itemPickerTextStyle: {
        fontFamily: fonts.type.NunitoRegular,
        fontSize: fonts.size.font12
    }
})