import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../../styles/colors'
import showMoreTextStyles from "./showMoreTextStyles";
import I18n from "react-native-i18n";

const TruncatedFooterCmp = ({ handlePress }: any) => {
    return (
        <Text style={showMoreTextStyles.textStyle} onPress={handlePress}>{I18n.t("seeMore")}</Text>
    )
}

export default TruncatedFooterCmp

const styles = StyleSheet.create({})