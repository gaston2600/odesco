import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Modalize } from 'react-native-modalize'
import { Divider, Tooltip } from '@rneui/themed'
import colors from '../../../styles/colors'
import fonts from '../../../theme/fonts'
import I18n from "react-native-i18n"
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import ButtonCmp from '../../common/ButtonCmp'
import metrics from "../../../theme/metrics"
import globalStyles from '../../../styles/globalStyles'


const { screenWidth } = metrics
const AddFormationModal = (props: any) => {
    const { visible, setVisible, submit, loading } = props
    const [payload, setPayload] = useState(
        {
            institution: "",
            diplome: "",
            startDate: null,
            endDate: null,
        }
    )
    const [showStartDate, setShowStartDate] = useState(false)
    const [showEndDate, setShowEndDate] = useState(false)

    return (
        <Modal
            onShow={() => {
                setPayload({
                    institution: "",
                    diplome: "",
                    startDate: null,
                    endDate: null,
                })
            }}
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible);
            }}
            style={{
            }}
        >
            <View style={{
                flex: 1,
                padding: 40,
                paddingVertical: "25%"
                // backgroundColor: colors.white
            }}>
                <ScrollView
                    style={[styles.containerStyle, globalStyles.shadow]}
                >
                    <Text style={styles.headerTitleTextStyle}>{I18n.t("addFormation")}</Text>
                    <Divider style={{
                        marginVertical: 10
                    }} />
                    <View style={styles.lineContainerStyle}>
                        <Text style={styles.titleTextStyle}>{I18n.t("inst_name")}</Text>
                        <TextInput
                            placeholder={I18n.t("inst_name")}
                            value={payload?.institution}
                            onChangeText={(institution: string) => setPayload({ ...payload, institution })}
                            style={styles.textInputStyle}
                        />
                    </View>
                    <View style={styles.lineContainerStyle}>
                        <Text style={styles.titleTextStyle}>{I18n.t("diplome")}</Text>
                        <TextInput
                            placeholder={I18n.t("diplome")}
                            value={payload?.diplome}
                            onChangeText={(diplome: string) => setPayload({ ...payload, diplome })}
                            style={styles.textInputStyle}
                        />
                    </View>


                    <Pressable
                        onPress={() => setShowStartDate(true)}
                        style={styles.lineContainerStyle}>
                        <Text style={styles.titleTextStyle}>{I18n.t("startDate")}</Text>
                        <TextInput
                            placeholder={I18n.t("startDate")}
                            editable={false}
                            value={payload?.startDate ? moment(payload?.startDate).format("ll") : ""}
                            style={styles.textInputStyle}
                        />
                    </Pressable>
                    <Pressable
                        onPress={() => setShowEndDate(true)}
                        style={styles.lineContainerStyle}>
                        <Text style={styles.titleTextStyle}>{I18n.t("endDate")}</Text>
                        <TextInput
                            placeholder={I18n.t("endDate")}
                            editable={false}
                            value={payload?.endDate ? moment(payload?.endDate).format("ll") : ""}
                            style={styles.textInputStyle}
                        />
                    </Pressable>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "flex-end",
                            justifyContent: "center"

                        }}
                    >
                        <View style={styles.buttonContainerStyle}>
                            <ButtonCmp
                                label={I18n.t("cancel")}
                                action={() => setVisible(false)}
                                width={screenWidth * .3}
                            />
                            <ButtonCmp
                                label={I18n.t("save")}
                                action={() => submit(payload)}
                                width={screenWidth * .3}
                                loading={loading}
                            />
                        </View>
                    </View>

                </ScrollView>


            </View>
            <DatePicker
                modal
                mode='date'
                maximumDate={new Date()}
                open={showStartDate}
                date={payload?.endDate || new Date()}
                onConfirm={(startDate) => {
                    setShowStartDate(false)
                    setPayload({ ...payload, startDate })
                }}
                onCancel={() => {
                    setShowStartDate(false)
                }}
            />
            <DatePicker
                modal
                mode='date'
                minimumDate={payload?.startDate || new Date()}
                open={showEndDate}
                date={new Date()}
                onConfirm={(endDate) => {
                    setShowEndDate(false)
                    setPayload({ ...payload, endDate })
                }}
                onCancel={() => {
                    setShowEndDate(false)
                }}
            />
        </Modal>
    )
}

export default AddFormationModal

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white,
        // borderWidth: 1,
        borderRadius: 5,
        padding: 10
    },
    headerTitleTextStyle: {
        fontFamily: fonts.type.NunitoSemiBold,
        fontSize: fonts.size.font14,
        color: colors.primary,
        // marginVertical: 10
    },
    titleTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        color: colors.darkBlue
    },
    textInputStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.grey,
        width: "100%",
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        color: colors.darkGray,
        marginVertical: 10
    },
    lineContainerStyle: {

    },
    buttonContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginVertical: 15
    },
})