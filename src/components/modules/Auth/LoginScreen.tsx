import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import metrics from '../../../theme/metrics';
import ButtonCmp from '../../common/ButtonCmp';
import {login} from '../../../store/actions';
import {ScreenHeight, ScreenWidth} from '@rneui/base';
import colors from '../../../styles/colors';
import Icons from '../../../styles/icons';
import fonts from '../../../theme/fonts';
import messaging from '@react-native-firebase/messaging';

const {screenWidth, screenHeight} = metrics;
const LoginScreen = (props: any) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: 'gaston2600@gmail.com',
    password: '12345678',
    deviceId: '',
  });
  const [loadingLogin, setLoadingLogin] = useState(false);

  const handelChangeText = (key: string, value: 'string') => {
    switch (key) {
      case 'email':
        setData(prev => ({...prev, email: value}));
        break;
      case 'password':
        setData(prev => ({...prev, password: value}));
        break;

      default:
        break;
    }
  };

  const submit = ({email, password, deviceId}: any) => {
    setLoadingLogin(true);
    dispatch(
      login(
        email,
        password,
        deviceId,
        (res: any) => {
          console.log('-----------------login', {res});
          setLoadingLogin(false);
        },
        (err: any) => {
          setLoadingLogin(false);
          console.log({err});
        },
      ),
    );
  };

  async function getDeviceToken() {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    setData((prev: any) => ({...prev, deviceId: token}));
  }
  useEffect(() => {
    getDeviceToken();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerStyle}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // style={{height: '70%'}}
      >
        <View style={styles.headerContainerStyle}>
          <Image
            source={require('../../../../assets/images/odesco_logo.jpg')}
            style={{
              height: 250,
              width: 250,
            }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.bodyContainerStyle}>
          <View style={styles.textInputContainerStyle}>
            <View style={styles.iconContainerStyle}>
              <Icons.FontAwesome name="user" size={25} color={colors.white} />
            </View>

            <TextInput
              editable
              keyboardType="email-address"
              style={styles.textInputStyle}
              value={data?.email}
              onChangeText={(text: any) => handelChangeText('email', text)}
              placeholder="Adresse E-mail"
            />
          </View>
          <View style={styles.textInputContainerStyle}>
            <View style={styles.iconContainerStyle}>
              <Icons.Entypo name="key" size={25} color={colors.white} />
            </View>
            <TextInput
              style={styles.textInputStyle}
              value={data?.password}
              onChangeText={(text: any) => handelChangeText('password', text)}
              placeholder="Mot de passe"
              secureTextEntry
            />
          </View>
        </View>
        <View style={styles.buttonContainerStle}>
          <Pressable
            onPress={() => {
              submit(data);
            }}
            style={styles.buttonStyle}>
            {loadingLogin ? (
              <ActivityIndicator size={'small'} color={colors.white} />
            ) : (
              <Text style={styles.buttonTextStyle}>Login</Text>
            )}
          </Pressable>
          {/* <ButtonCmp
          label={'Connexion'}
          width={ScreenWidth * 0.3}
          action={() => {
            submit(data);
          }}
          loading={loadingLogin}
        /> */}
        </View>
      </ScrollView>
      <Pressable
        onPress={() => {
          navigation?.goBack();
        }}
        style={styles.backButtonContainer}>
        <Icons.AntDesign name="left" size={25} color={colors.gray} />
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  textInputStyle: {
    // borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: screenWidth * 0.7,
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.black,
  },
  headerContainerStyle: {
    height: ScreenHeight * 0.4,
    // flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainerStyle: {
    flex: 2,
  },
  textInputContainerStyle: {
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginVertical: 15,
  },
  iconContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors.primary}50`,
    padding: 5,
    width: 50,
    height: 50,
    borderRadius: 150,
  },
  buttonContainerStle: {
    // flex: 1,
    height: ScreenHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: ScreenWidth * 0.7,
    padding: 15,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontFamily: fonts.type.NunitoBold,
    fontSize: fonts.size.font14,
    color: colors.white,
  },
  backButtonContainer: {
    padding: 10,
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 50,
    // borderWidth: 0.5,
    borderColor: colors.gray,
  },
});
