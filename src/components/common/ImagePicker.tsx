import metrics from "../../theme/metrics";
import React, { useEffect, useRef, useState } from "react";
import {
    Image,
    PermissionsAndroid,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import colors from "../../styles/colors";
import { Divider } from "@rneui/themed";
import Icons from "../../styles/icons";
import fonts from "../../theme/fonts";
const [height, width] = [metrics.screenHeight, metrics.screenWidth]
const ImagePicker = (props: any) => {
    const {
        takeImage,
        addImage,
        refImageModal,
        fromTask,
        setArreterModalVisible,
        setTerminerModalVisible,
        arreterModalVisible,
        terminerModalVisible,
    } = props;
    const [fromArreter, setFromArreter] = useState(true)

    return (
        <Modalize
            scrollViewProps={{ showsVerticalScrollIndicator: false, }}
            withHandle={false}
            ref={refImageModal}
            modalHeight={height / 8.5}
            onOpen={() => {
                if (fromTask) {
                    if (arreterModalVisible) {
                        setArreterModalVisible(!arreterModalVisible);
                        setFromArreter(true)
                    } else if (terminerModalVisible) {
                        setFromArreter(false)
                        setTerminerModalVisible(!terminerModalVisible);
                    }
                }
            }}
            onClosed={() => {
                if (fromTask) {
                    if (fromArreter) {
                        setArreterModalVisible(!arreterModalVisible);
                    } else {
                        setTerminerModalVisible(!terminerModalVisible);
                    }
                }
            }}
        // closeOnOverlayTap
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                }}
            >
                <Pressable
                    onPress={takeImage}
                    style={{
                        alignItems: "center",
                        padding: 5,
                    }}
                >
                    <Image
                        source={require("../../../assets/images/camera.png")}
                        style={{ height: width * 0.15, width: width * 0.15 }}
                    />
                    <Text
                        style={{
                            fontFamily: fonts.type.NunitoMedium,
                            fontSize: fonts.size.font12,
                            color: colors.darkBlue,
                        }}
                    >
                        Caméra
                    </Text>
                </Pressable>
                <Divider
                    width={2}
                    orientation="vertical"
                    color={colors.darkBlue}
                    style={{ opacity: 0.4 }}
                />
                <Pressable
                    onPress={() => {
                        addImage();
                    }}
                    style={{
                        alignItems: "center",
                        padding: 5,
                    }}
                >
                    <Image
                        source={require("../../../assets/images/galerie.png")}
                        style={{ height: width * 0.15, width: width * 0.15 }}
                    />
                    <Text
                        style={{
                            fontFamily: fonts.type.NunitoMedium,
                            fontSize: fonts.size.font12,
                            color: colors.darkBlue,
                        }}
                    >
                        Galerie
                    </Text>
                </Pressable>
            </View>
            <Pressable
                onPress={() => {
                    refImageModal?.current?.close();
                }}
                style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                }}
            >
                <Icons.AntDesign name="close" size={25} color={colors.black} />
            </Pressable>
        </Modalize>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({});
