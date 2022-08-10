import MaterialCommunityIconsI from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIconsI from "react-native-vector-icons/SimpleLineIcons";
import MaterialIconsI from "react-native-vector-icons/MaterialIcons";
import FontAwesomeI from "react-native-vector-icons/FontAwesome";
import FontAwesome5I from "react-native-vector-icons/FontAwesome5";
import FoundationI from "react-native-vector-icons/Foundation";
import EvilIconsI from "react-native-vector-icons/EvilIcons";
import OcticonsI from "react-native-vector-icons/Octicons";
import IoniconsI from "react-native-vector-icons/Ionicons";
import FeatherI from "react-native-vector-icons/Feather";
import EntypoI from "react-native-vector-icons/Entypo";
import ZocialI from "react-native-vector-icons/Zocial";
import AntDesignI from "react-native-vector-icons/AntDesign";
import React from "react";

SimpleLineIconsI.loadFont();
AntDesignI.loadFont();
MaterialIconsI.loadFont();
FontAwesomeI.loadFont();
FoundationI.loadFont();
EvilIconsI.loadFont();
IoniconsI.loadFont();
OcticonsI.loadFont();
FeatherI.loadFont();
EntypoI.loadFont();
ZocialI.loadFont();

function MCI(props: any) {
    return <MaterialCommunityIconsI {...props} />;
}

function SpIcon(props: any) {
    return <SimpleLineIconsI {...props} />;
}
function AntDesign(props: any) {
    return <AntDesignI {...props} />;
}
function MaterialIcons(props: any) {
    return <MaterialIconsI {...props} />;
}
function FontAwesome(props: any) {
    return <FontAwesomeI {...props} />;
}
function FontAwesome5(props: any) {
    return <FontAwesome5I {...props} />;
}
function Foundation(props: any) {
    return <FoundationI {...props} />;
}
function EvilIcons(props: any) {
    return <EvilIconsI {...props} />;
}
function Ionicons(props: any) {
    return <IoniconsI {...props} />;
}
function Octicons(props: any) {
    return <OcticonsI {...props} />;
}
function Feather(props: any) {
    return <FeatherI {...props} />;
}
function Entypo(props: any) {
    return <EntypoI {...props} />;
}
function Zocial(props: any) {
    return <ZocialI {...props} />;
}

export default {
    MCI,
    SpIcon,
    AntDesign,
    MaterialIcons,
    FontAwesome,
    FontAwesome5,
    Foundation,
    EvilIcons,
    Ionicons,
    Octicons,
    Feather,
    Entypo,
    Zocial,
};