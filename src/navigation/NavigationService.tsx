import * as React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "../styles/icons";

export function navigate(name: any, params: any) {
  const navigation = useNavigation();
  navigation.navigate(name, params);
}
export const navigationRef: any = React.createRef();

export function OpenDrawer({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.menuButton}
      onPress={() => navigation.openDrawer()}
    >
      <Icon.MaterialIcons
        name={"sort"}
        size={40}
        color={"#333"}
        style={styles.menuIcon}
      />
    </TouchableOpacity>
  );
}

export function GoHome({ navigation: { navigate } }) {
  return (
    <TouchableOpacity
      style={styles.menuButton}
      onPress={() => navigate("Home")}
    >
      <Icon.AntDesign
        name={"arrowleft"}
        size={25}
        color={"#333"}
        style={styles.menuIcon}
      />
    </TouchableOpacity>
  );
}
export function GoBack({ navigation: { goBack }, color }) {
  return (
    <TouchableOpacity style={styles.menuButton} onPress={() => goBack()}>
      <Icon.AntDesign
        name={"left"}
        size={25}
        color={color ? color : "#333"}
        style={styles.menuIcon}
      />
    </TouchableOpacity>
  );
}
export function GoBackWithAction(props: any) {
  const { action } = props;
  return (
    <TouchableOpacity style={styles.menuButton} onPress={() => action()}>
      <Icon.AntDesign
        name={"arrowleft"}
        size={25}
        color={"#333"}
        style={styles.menuIcon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    width: 50,
    height: 50,
    zIndex: 999,
    alignItems: "center",

    // padding: 5,

    // borderWidth: 0.5, borderColor: 'green'
  },
  menuIcon: {
    // color: "#333",
    fontWeight: "normal",
    zIndex: 9999,
    marginTop: 10,
    // borderWidth: 0.5, borderColor: 'red'
  },
});
