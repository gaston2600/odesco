import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../../styles/colors'
import showMoreTextStyles from "./showMoreTextStyles";
import I18n from "react-native-i18n";

const RevealedFooterCmp = ({ handlePress }: any) => {
    return (
        <Text style={showMoreTextStyles.textStyle} onPress={handlePress}>{I18n.t("seeLess")}</Text>
    )
}

export default RevealedFooterCmp

const styles = StyleSheet.create({})