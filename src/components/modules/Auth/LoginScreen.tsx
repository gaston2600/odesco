import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import metrics from '../../../theme/metrics';
import ButtonCmp from '../../common/ButtonCmp';
import { login } from '../../../store/actions';

const { screenWidth, screenHeight } = metrics;
const LoginScreen = () => {

    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const [data, setData] = useState({ email: "gaston2600@gmail.com", password: "12345678" })

    const handelChangeText = (key: string, value: "string") => {
        switch (key) {
            case "email":
                setData(prev => ({ ...prev, email: value }))
                break;
            case "password":
                setData(prev => ({ ...prev, password: value }))
                break;

            default:
                break;
        }
    }

    const submit = ({ email, password }: any) => {
        

        dispatch(login(email, password, (res: any) => {
            

        }, (err: any) => {
            console.log({ err });
        }))
    }

    return (
        <View style={styles.containerStyle}>
            <View style={{}}>
                <TextInput
                    editable
                    keyboardType='email-address'
                    style={styles.textInputStyle}
                    value={data?.email}
                    onChangeText={(text: any) => handelChangeText("email", text)}
                />
                <TextInput
                    style={styles.textInputStyle}
                    value={data?.password}
                    onChangeText={(text: any) => handelChangeText("password", text)}
                />
            </View>
            <View style={{}}>
                <ButtonCmp
                    label={"Connexion"}
                    action={() => {
                        submit(data)
                    }}
                />
            </View>

        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textInputStyle: {
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        width: screenWidth * .7
    }
})